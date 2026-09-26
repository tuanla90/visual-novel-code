import type { GameContent } from '../content/types';
import type { SavedQueryEvidence } from '../evidence/types';
import { partName } from '../shared/display-names';
import { PART_IDS, type ChallengeId, type PartId } from '../shared/ids';
import type { GameStore } from '../shared/store';
import type { TelemetryStorageStatus } from '../shared/telemetry/local-sink';
import { recordJump } from '../shared/telemetry/session-meta';
import { getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import { CHALLENGE_SPECS, QUAN_OR_QUERY } from '../sql-challenge/data/challenges';
import type { RunResult } from '../sql-challenge/types';

/** Bảng người quan sát mở bằng `?facilitator=1` (QĐ-030); người chơi không thấy. */
export function isFacilitatorMode(search: string): boolean {
  return new URLSearchParams(search).get('facilitator') === '1';
}

/** Nhãn dễ đọc cho loại màn (bảng người quan sát hiện cả id). */
const VIEW_LABELS: Record<string, string> = {
  title: 'Màn tiêu đề',
  line: 'Lời thoại',
  feedback: 'Phản hồi sau lựa chọn',
  explore: 'Xem xét',
  gate: 'Điều kiện qua cảnh',
  question: 'Câu hỏi',
  'line-pick': 'Chọn dòng trên màn chiếu',
  'show-document': 'Xem tài liệu',
  challenge: 'Thử thách SQL',
  'fix-query': 'Sửa truy vấn',
  effect: 'Hiệu ứng',
  projector: 'Màn chiếu',
  end: 'Màn kết',
  error: 'Lỗi nội dung',
};

export function viewLabel(kind: string): string {
  return VIEW_LABELS[kind] ?? 'Màn khác';
}

/** Câu trạng thái lưu theo LÝ DO thật. */
export function storageMessage(status: TelemetryStorageStatus | null): { tone: 'ok' | 'warn' | 'error'; text: string } {
  if (!status) return { tone: 'warn', text: 'Dữ liệu chỉ nằm trong bộ nhớ của tab này (chưa bật lưu bền).' };
  const pct = status.maxChars > 0 ? Math.round((status.usedChars / status.maxChars) * 100) : 0;
  switch (status.problem) {
    case null:
      return {
        tone: pct >= 80 ? 'warn' : 'ok',
        text:
          pct >= 80
            ? `Đã dùng ${pct}% chỗ dành cho dữ liệu thử nghiệm — nên xuất rồi xóa.`
            : `Đang lưu vào bộ nhớ trình duyệt (đã dùng ${pct}% chỗ dành cho dữ liệu thử nghiệm).`,
      };
    case 'unavailable':
      return { tone: 'error', text: 'Không đọc/ghi được bộ nhớ trình duyệt (bị chặn). Dữ liệu chỉ còn đến khi đóng tab — hãy xuất trước khi tải lại trang.' };
    case 'quota':
      return { tone: 'error', text: 'Bộ nhớ trình duyệt đã đầy: sự kiện mới chưa được lưu bền. Hãy xuất ngay rồi xóa dữ liệu cũ.' };
    case 'budget':
      return {
        tone: 'error',
        text:
          status.droppedEvents > 0
            ? `Phiên này vượt giới hạn số sự kiện (đã bỏ ${status.droppedEvents} sự kiện). Hãy xuất ngay.`
            : 'Đã chạm giới hạn dung lượng dành cho dữ liệu thử nghiệm: sự kiện mới chưa được lưu bền. Hãy xuất rồi xóa.',
      };
    case 'write-failed':
      return { tone: 'error', text: 'Ghi vào bộ nhớ trình duyệt bị lỗi: sự kiện mới có thể chưa được lưu bền. Hãy xuất ngay.' };
  }
}

// ---------- Nhãn dễ đọc cho tóm tắt (bảng người quan sát hiện id KÈM nhãn) ----------

function shorten(text: string, max = 48): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Chữ của một lựa chọn (câu hỏi trong chuỗi truyện hoặc câu đọc kết quả của thử thách). */
export function choiceText(content: GameContent, questionId: string, choiceId: string): string {
  const questions = [
    ...content.story.sequences.flatMap((s) => s.nodes.flatMap((n) => (n.type === 'question' ? [n.question] : []))),
    ...Object.values(content.challenges).flatMap((c) => (c.content.readQuestion ? [c.content.readQuestion] : [])),
  ];
  const choice = questions.find((q) => q.id === questionId)?.choices.find((c) => c.id === choiceId);
  return choice ? shorten(choice.text) : 'Lựa chọn không còn trong nội dung';
}

/** Chữ của một dòng trên màn chiếu (chọn dòng lỗi). */
export function pickedLineText(content: GameContent, pickId: string, lineIndex: number): string {
  for (const s of content.story.sequences) {
    for (const n of s.nodes) {
      if (n.type === 'line-pick' && n.pick.id === pickId) {
        const line = n.pick.lines.find((l) => l.index === lineIndex);
        return line ? shorten(line.sql.trim()) : `Dòng ${lineIndex}`;
      }
    }
  }
  return `Dòng ${lineIndex}`;
}

export function challengeTitle(content: GameContent, id: ChallengeId): string {
  return content.challenges[id]?.content.title ?? 'Thử thách';
}

/** "27/09 10:32" theo giờ máy. */
export function formatClock(ms: number | null): string {
  if (ms === null) return '—';
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// ---------- Nhảy tới đầu một phần (kiểm thử nội bộ / khi game kẹt) ----------

export interface JumpDeps {
  /** Store zustand của game (chỉ dùng hành động công khai: startGame/resetGame/dispatchStory/…). */
  store: { getState: () => GameStore };
  content: GameContent;
  /** `runQuery` của engine: chạy SQL chuẩn để tự điền vật chứng. */
  run: (sql: string) => Promise<RunResult>;
  now?: () => number;
}

export type JumpOutcome = { ok: true; target: PartId; restarted: boolean; steps: number } | { ok: false; target: PartId; reason: string };

/** Tối đa số bước tự chơi (cả game thật chỉ vài trăm bước). */
const MAX_JUMP_STEPS = 2_000;

/** Phần đích nằm trước (hoặc là) phần đang chơi → phải chơi lại từ đầu trong phiên mới. */
export function jumpNeedsRestart(current: PartId | null, target: PartId): boolean {
  return current === null || PART_IDS.indexOf(target) <= PART_IDS.indexOf(current);
}

/**
 * Nhảy tới đầu phần `target` CHỈ bằng API công khai của store + runtime: game tự chơi (qua lời,
 * chọn đáp án đúng, xem đủ điểm xem xét, đóng tài liệu/hiệu ứng/màn chiếu) và tự điền vật chứng
 * thử thách bằng SQL chuẩn (`CHALLENGE_SPECS`, chạy qua engine) cho tới khi phần đích bắt đầu.
 * Phần đích ở trước/đúng phần hiện tại → "Chơi lại từ đầu" (phiên mới) rồi mới tự chơi.
 * Phiên được đánh dấu "có nhảy phần" kèm khoảng thời gian tự chơi (session-meta) để tóm tắt loại
 * các sự kiện tự động khỏi số liệu.
 */
export async function jumpToPartStart(target: PartId, deps: JumpDeps): Promise<JumpOutcome> {
  const now = deps.now ?? (() => Date.now());
  const s = () => deps.store.getState();
  const restarted = jumpNeedsRestart(s().progress?.currentPart ?? null, target);
  // "Chơi lại" ghi game_reset vào phiên CŨ rồi mở phiên mới; khoảng tự chơi bắt đầu từ đây.
  if (restarted && s().progress !== null) s().resetGame();
  const sessionId = getSessionId();
  const countEvents = () => getTelemetryEvents().filter((e) => e.sessionId === sessionId).length;
  const startAt = now();
  const fromIndex = countEvents();
  if (restarted) s().startGame();
  let steps = 0;

  const finish = (ok: boolean, reason = ''): JumpOutcome => {
    recordJump(sessionId, { target, startAt, endAt: now(), fromIndex, toIndex: countEvents(), ok });
    return ok ? { ok: true, target, restarted, steps } : { ok: false, target, reason };
  };

  const fillChallenge = async (id: ChallengeId, fix: boolean): Promise<string | null> => {
    const spec = CHALLENGE_SPECS[id];
    const def = deps.content.challenges[id];
    if (!spec || !def) return `Không có đặc tả thử thách ${id}.`;
    s().openChallenge(id);
    const r = await deps.run(spec.referenceSql);
    if (!r.ok) return `SQL chuẩn của ${id} không chạy được: ${r.message}`;
    let before: SavedQueryEvidence['before'];
    if (fix) {
      const quan = await deps.run(QUAN_OR_QUERY);
      if (quan.ok) before = { sql: QUAN_OR_QUERY, rowCount: quan.rowCount };
    }
    s().completeChallenge(id, {
      id: def.content.evidence.id,
      challengeId: id,
      sql: spec.referenceSql,
      columns: r.columns,
      rows: r.rows,
      rowCount: r.rowCount,
      savedAt: now(),
      ...(before ? { before } : {}),
    });
    return null;
  };

  for (; steps < MAX_JUMP_STEPS; steps++) {
    const progress = s().progress;
    if (!progress) return finish(false, 'Game chưa bắt đầu.');
    if (progress.currentPart === target) return finish(true);
    const view = s().getView();
    if (!view) return finish(false, 'Không đọc được màn hiện tại.');
    let rejected: string | undefined;
    switch (view.kind) {
      case 'line':
      case 'feedback':
        rejected = s().dispatchStory({ type: 'advance' });
        break;
      case 'explore': {
        if (view.gate?.satisfied) {
          rejected = s().dispatchStory({ type: 'proceed' });
          break;
        }
        const next = view.hotspots.find((h) => !h.visited);
        if (!next) return finish(false, `Đã xem hết điểm xem xét nhưng chưa qua được cảnh (chuỗi ${view.sequence?.id ?? '?'}).`);
        rejected = s().dispatchStory({ type: 'inspect', hotspotId: next.id });
        break;
      }
      case 'gate':
        if (!view.gate.satisfied) return finish(false, `Hồ sơ còn thiếu ${view.gate.missing.join(', ')} (chuỗi ${view.sequence?.id ?? '?'}).`);
        rejected = s().dispatchStory({ type: 'proceed' });
        break;
      case 'question': {
        const right = view.node.question.choices.find((c) => c.correct);
        if (!right) return finish(false, `Câu ${view.node.question.id} không có lựa chọn đúng.`);
        rejected = s().dispatchStory({ type: 'choose', choiceId: right.id });
        break;
      }
      case 'line-pick': {
        const right = view.node.pick.lines.find((l) => l.correct);
        if (!right) return finish(false, `Màn chọn dòng ${view.node.pick.id} không có dòng đúng.`);
        rejected = s().dispatchStory({ type: 'pick-line', lineIndex: right.index });
        break;
      }
      case 'challenge':
      case 'fix-query': {
        const why = await fillChallenge(view.node.challengeId, view.kind === 'fix-query');
        if (why) return finish(false, why);
        rejected = s().dispatchStory({ type: 'complete' });
        break;
      }
      case 'show-document':
      case 'effect':
      case 'projector':
        rejected = s().dispatchStory({ type: 'complete' });
        break;
      case 'end':
        return finish(false, `Đã tới màn kết mà chưa gặp đầu phần ${partName(target)}.`);
      case 'error':
        return finish(false, view.message);
    }
    if (rejected) return finish(false, rejected);
  }
  return finish(false, `Quá ${MAX_JUMP_STEPS} bước tự chơi.`);
}
