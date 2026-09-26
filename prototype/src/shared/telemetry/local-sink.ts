/**
 * Nơi lưu telemetry bền (QĐ-029): localStorage, mỗi phiên một khóa, khóa có phiên bản.
 *
 * - Chỉ lưu cục bộ, không gửi mạng.
 * - Có bộ đệm trong bộ nhớ: đọc nhanh và vẫn xuất được dữ liệu của tab này khi localStorage
 *   hỏng/đầy. Mọi lỗi lưu bị nuốt (try/catch) — game không bao giờ hỏng vì telemetry; lỗi được
 *   ghi vào `status()` để bảng người quan sát báo lại.
 * - Giới hạn dung lượng: tổng số ký tự và số sự kiện mỗi phiên. Vượt giới hạn → ngừng ghi bền
 *   (không tự xóa phiên cũ — đó là dữ liệu thử nghiệm), bảng người quan sát nhắc xuất rồi xóa.
 */
import type { TelemetryEvent } from './events';
import type { SessionIdStore, TelemetrySink } from './track';

/** Tăng khi đổi cấu trúc lưu; khóa cũ bị bỏ qua (không đọc nhầm). */
export const TELEMETRY_STORAGE_VERSION = 1;
export const TELEMETRY_KEY_PREFIX = `clb-tham-tu-du-lieu:telemetry:v${TELEMETRY_STORAGE_VERSION}`;
const SESSION_KEY_PREFIX = `${TELEMETRY_KEY_PREFIX}:session:`;

/** ~1,5 triệu ký tự: an toàn dưới hạn mức ~5 MB của localStorage, chừa chỗ cho thứ khác. */
export const DEFAULT_MAX_TOTAL_CHARS = 1_500_000;
/** Một lượt chơi bình thường < 500 sự kiện; chặn vòng lặp ghi vô hạn. */
export const DEFAULT_MAX_EVENTS_PER_SESSION = 5_000;

/**
 * Lý do không ghi bền được:
 * - `unavailable`: không mở được localStorage (bị chặn, chế độ riêng tư nghiêm ngặt);
 * - `quota`: trình duyệt báo hết chỗ khi ghi;
 * - `budget`: chạm giới hạn an toàn của game (tổng ký tự hoặc số sự kiện mỗi phiên);
 * - `write-failed`: lỗi ghi khác.
 */
export type TelemetryStorageProblem = 'unavailable' | 'quota' | 'budget' | 'write-failed';

export interface TelemetryStorageStatus {
  /** true khi sự kiện mới đang được ghi bền vào localStorage. */
  persistent: boolean;
  problem: TelemetryStorageProblem | null;
  /** Số khóa phiên không đọc được (JSON hỏng) — bị bỏ qua khi đọc. */
  unreadableSessions: number;
  /** Số sự kiện bị bỏ vì vượt giới hạn số sự kiện mỗi phiên. */
  droppedEvents: number;
  usedChars: number;
  maxChars: number;
}

export interface PersistentTelemetrySink extends TelemetrySink {
  status(): TelemetryStorageStatus;
  /** Mã phiên theo thứ tự tạo. */
  sessionIds(): string[];
}

export interface LocalStorageSinkOptions {
  /** `null` = không có localStorage (chỉ giữ trong bộ nhớ). */
  storage: Storage | null;
  maxTotalChars?: number;
  maxEventsPerSession?: number;
}

type StoredEvent = TelemetryEvent extends infer E ? (E extends unknown ? Omit<E, 'sessionId'> : never) : never;

function sessionKey(id: string): string {
  return `${SESSION_KEY_PREFIX}${id}`;
}

function isStoredEvent(x: unknown): x is StoredEvent {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.type === 'string' && typeof o.at === 'number';
}

function strip(e: TelemetryEvent): StoredEvent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sessionId, ...rest } = e;
  return rest as StoredEvent;
}

function isQuotaError(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) return false;
  const e = err as { name?: unknown; code?: unknown };
  return e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22 || e.code === 1014;
}

export function createLocalStorageSink(options: LocalStorageSinkOptions): PersistentTelemetrySink {
  const storage = options.storage;
  const maxChars = options.maxTotalChars ?? DEFAULT_MAX_TOTAL_CHARS;
  const maxEvents = options.maxEventsPerSession ?? DEFAULT_MAX_EVENTS_PER_SESSION;

  const order: string[] = [];
  const cache = new Map<string, TelemetryEvent[]>();
  /** Độ dài chuỗi đã ghi cho từng phiên (để tính tổng dung lượng). */
  const sizes = new Map<string, number>();
  let problem: TelemetryStorageProblem | null = storage ? null : 'unavailable';
  let unreadableSessions = 0;
  let droppedEvents = 0;

  const usedChars = () => [...sizes.values()].reduce((a, b) => a + b, 0);

  function safeGet(key: string): string | null {
    if (!storage) return null;
    try {
      return storage.getItem(key);
    } catch {
      problem = 'unavailable';
      return null;
    }
  }

  /** Đọc mọi khóa phiên (không dùng khóa mục lục: một khóa hỏng chỉ mất một phiên). */
  function load(): void {
    if (!storage) return;
    let keys: string[] = [];
    try {
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k !== null && k.startsWith(SESSION_KEY_PREFIX)) keys.push(k);
      }
    } catch {
      problem = 'unavailable';
      keys = [];
    }
    const loaded: { id: string; events: TelemetryEvent[]; size: number }[] = [];
    for (const key of keys) {
      const id = key.slice(SESSION_KEY_PREFIX.length);
      const raw = safeGet(key);
      if (raw === null || id === '') continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }
      if (!Array.isArray(parsed)) {
        unreadableSessions += 1;
        continue;
      }
      const events = parsed.filter(isStoredEvent).map((e) => ({ ...e, sessionId: id }) as TelemetryEvent);
      loaded.push({ id, events, size: raw.length });
    }
    // Thứ tự phiên theo thời điểm sự kiện đầu tiên (localStorage không giữ thứ tự khóa).
    loaded.sort((a, b) => (a.events[0]?.at ?? 0) - (b.events[0]?.at ?? 0));
    for (const s of loaded) {
      order.push(s.id);
      cache.set(s.id, s.events);
      sizes.set(s.id, s.size);
    }
  }

  /** Ghi một khóa; trả về false nếu không ghi được (đã đặt `problem`). */
  function safeSet(key: string, value: string): boolean {
    if (!storage) return false;
    try {
      storage.setItem(key, value);
      return true;
    } catch (err) {
      problem = isQuotaError(err) ? 'quota' : 'write-failed';
      return false;
    }
  }

  function persistSession(id: string): void {
    if (!storage || problem === 'unavailable') return;
    const events = cache.get(id) ?? [];
    const json = JSON.stringify(events.map(strip));
    const projected = usedChars() - (sizes.get(id) ?? 0) + json.length;
    if (projected > maxChars) {
      problem = 'budget';
      return;
    }
    if (safeSet(sessionKey(id), json)) sizes.set(id, json.length);
  }

  load();

  return {
    write(event) {
      const id = event.sessionId;
      let list = cache.get(id);
      if (!list) {
        list = [];
        cache.set(id, list);
        order.push(id);
      }
      if (list.length >= maxEvents) {
        droppedEvents += 1;
        problem = 'budget';
        return;
      }
      list.push(event);
      persistSession(id);
    },
    readAll() {
      return order.flatMap((id) => cache.get(id) ?? []);
    },
    clear() {
      order.length = 0;
      cache.clear();
      sizes.clear();
      droppedEvents = 0;
      unreadableSessions = 0;
      if (!storage) return;
      try {
        const keys: string[] = [];
        for (let i = 0; i < storage.length; i++) {
          const k = storage.key(i);
          if (k !== null && k.startsWith(TELEMETRY_KEY_PREFIX)) keys.push(k);
        }
        for (const k of keys) storage.removeItem(k);
        problem = null;
      } catch {
        problem = 'write-failed';
      }
    },
    status() {
      return {
        persistent: storage !== null && problem === null,
        problem,
        unreadableSessions,
        droppedEvents,
        usedChars: usedChars(),
        maxChars,
      };
    },
    sessionIds() {
      return [...order];
    },
  };
}

// ---------- Mã phiên hiện tại (sống cùng tiến độ chơi) ----------

/**
 * Mã phiên hiện tại được giữ trong sessionStorage — cùng nơi và cùng vòng đời với tiến độ chơi
 * (QĐ-004): F5 giữ nguyên phiên, đóng tab/"Chơi lại từ đầu" sang phiên mới.
 */
export const SESSION_POINTER_KEY = `${TELEMETRY_KEY_PREFIX}:current-session`;

export function createSessionIdStore(storage: Storage | null): SessionIdStore {
  return {
    load() {
      if (!storage) return null;
      try {
        const v = storage.getItem(SESSION_POINTER_KEY);
        return v && /^[A-Za-z0-9-]{8,64}$/.test(v) ? v : null;
      } catch {
        return null;
      }
    },
    save(id) {
      if (!storage) return;
      try {
        storage.setItem(SESSION_POINTER_KEY, id);
      } catch {
        /* Không lưu được mã phiên: F5 sẽ mở phiên mới — chấp nhận, game vẫn chạy. */
      }
    },
  };
}

/** Lấy Storage của trình duyệt mà không ném lỗi (truy cập có thể bị chặn). */
export function safeBrowserStorage(kind: 'localStorage' | 'sessionStorage'): Storage | null {
  try {
    const s = globalThis[kind];
    if (!s) return null;
    s.getItem('__probe__');
    return s;
  } catch {
    return null;
  }
}
