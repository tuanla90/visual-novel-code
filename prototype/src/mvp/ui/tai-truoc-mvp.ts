/**
 * TẢI TRƯỚC THEO VĂN BẢN: nhìn trước các nút sắp chạy trong kịch bản (theo `ĐI TỚI`, rẽ nhánh, điểm khám phá) và tải
 * + giải mã sẵn nền cảnh, chân dung, ảnh chèn sắp cần — để vào cảnh mới ảnh đã nằm trong bộ nhớ, không hiện trễ.
 *
 * - `anhSapToi` là hàm thuần (trả URL theo thứ tự gần → xa), có test.
 * - Hàng đợi tải chạy nền: tối đa 2 ảnh cùng lúc, ưu tiên thấp, nhường lúc máy rảnh; mỗi URL chỉ tải một lần mỗi phiên.
 * - Nhân vật của prototype (có trong `shared/ids`) còn được gọi trước bước tách nền (`requestCutout`) vì chân dung của
 *   chúng đi qua đó.
 */
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { isCharacterId, isExpressionOf } from '../../shared/ids';
import { resolvePortrait } from '../../shared/ui/visuals/art-slots';
import { requestCutout } from '../../shared/ui/visuals/portrait-cutout';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { anhChanDung, anhNen, anhSprite, anhTheoTen } from './anh-mvp';

/** Nhìn trước tối đa bấy nhiêu nút / bấy nhiêu chuỗi nối tiếp. */
export const NUT_NHIN_TRUOC = 60;
export const CHUOI_NHIN_TRUOC = 5;
const TOI_DA_URL = 40;
const SONG_SONG = 2;

export interface AnhSapToi {
  url: string;
  /** Chân dung của nhân vật prototype → cần cả bước tách nền. */
  tachNen: boolean;
}

function duongDi(nut: NutMvp): string[] {
  switch (nut.type) {
    case 'goto':
      return [nut.to];
    case 'jump-if':
      return [nut.to];
    case 'consequence':
      return nut.hauQua.flatMap((h) => (h.kind === 'di-toi' ? [h.chuoi] : []));
    case 'branch':
      return nut.choices.flatMap((c) => c.hauQua.flatMap((h) => (h.kind === 'di-toi' ? [h.chuoi] : [])));
    case 'explore':
      return nut.diem.map((d) => d.chuoi);
    default:
      return [];
  }
}

function nguoiNoi(nut: NutMvp): { speaker: string; expression?: string }[] {
  switch (nut.type) {
    case 'line':
      return [{ speaker: nut.speaker, ...(nut.expression ? { expression: nut.expression } : {}) }];
    case 'question':
    case 'branch':
    case 'doi-chat':
      return [{ speaker: nut.asker.speaker }];
    case 'create-character':
      return [{ speaker: nut.asker.speaker, ...(nut.asker.expression ? { expression: nut.asker.expression } : {}) }];
    case 'stage':
      return nut.action === 'vao' ? [{ speaker: nut.nhanVat }] : [];
    default:
      return [];
  }
}

/** Ảnh của một người nói: ảnh MVP riêng nếu có, không thì chân dung prototype. */
function anhNguoiNoi(speaker: string, expression: string | undefined): AnhSapToi | undefined {
  if (speaker === 'narrator') return undefined;
  if (isCharacterId(speaker)) {
    const bc = expression ?? 'neutral';
    if (!isExpressionOf(speaker, bc)) {
      const rieng = anhTheoTen(`char-${speaker}-${bc}`);
      if (rieng) return { url: rieng, tachNen: false };
    }
    const url = resolvePortrait(speaker, bc).url;
    return url ? { url, tachNen: true } : undefined;
  }
  const url = anhChanDung(speaker === 'player' ? 'nguoi-choi' : speaker, expression);
  return url ? { url, tachNen: false } : undefined;
}

/** Ảnh sắp cần, gần → xa, không trùng. `s.conTro` rỗng (đang ở bản đồ / ngày mới) → mở đầu chuỗi của ngày kế. */
export function anhSapToi(kb: KichBanMvp, s: TrangThaiMvp): AnhSapToi[] {
  const chuoi = new Map(kb.chuoi.map((c) => [c.id, c]));
  const hangDoi: { id: string; tu: number }[] = [];
  if (s.conTro) hangDoi.push({ id: s.conTro.chuoi, tu: s.conTro.nut });
  else {
    const ke = kb.lich.ngay.find((n) => n.so === s.ngay + 1);
    if (ke?.chuoi) hangDoi.push({ id: ke.chuoi, tu: 0 });
  }
  const daThay = new Set<string>();
  const ra: AnhSapToi[] = [];
  const co = new Set<string>();
  const them = (a: AnhSapToi | undefined): void => {
    if (a && !co.has(a.url)) {
      co.add(a.url);
      ra.push(a);
    }
  };
  let soNut = 0;
  let soChuoi = 0;
  while (hangDoi.length > 0 && soNut < NUT_NHIN_TRUOC && soChuoi < CHUOI_NHIN_TRUOC && ra.length < TOI_DA_URL) {
    const { id, tu } = hangDoi.shift()!;
    if (daThay.has(id)) continue;
    daThay.add(id);
    const c = chuoi.get(id);
    if (!c) continue;
    soChuoi++;
    const nen = anhNen(c.canh);
    if (nen) them({ url: nen, tachNen: false });
    for (const nut of c.nodes.slice(tu)) {
      if (++soNut > NUT_NHIN_TRUOC) break;
      for (const n of nguoiNoi(nut)) them(anhNguoiNoi(n.speaker, n.expression));
      if (nut.type === 'image') {
        const u = anhTheoTen(nut.imageId);
        if (u) them({ url: u, tachNen: false });
      }
      if (nut.type === 'explore') {
        for (const d of nut.diem) {
          const u = anhSprite(d.sprite);
          if (u) them({ url: u, tachNen: false });
        }
      }
      for (const toi of duongDi(nut)) hangDoi.push({ id: toi, tu: 0 });
    }
  }
  return ra;
}

// ---- hàng đợi tải nền ----
const daXep = new Set<string>();
const cho: string[] = [];
let dangTai = 0;

function tai(url: string): Promise<void> {
  const img = new Image();
  img.decoding = 'async';
  (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'low';
  img.src = url;
  return (img.decode ? img.decode() : Promise.resolve()).catch(() => undefined);
}

function chayTiep(): void {
  while (dangTai < SONG_SONG && cho.length > 0) {
    const url = cho.shift()!;
    dangTai++;
    void tai(url).finally(() => {
      dangTai--;
      chayTiep();
    });
  }
}

/** Xếp ảnh vào hàng đợi tải nền (bỏ qua ảnh đã xếp). Môi trường không có `Image` (test) thì thôi. */
export function xepTaiTruoc(anh: readonly AnhSapToi[]): void {
  if (typeof Image === 'undefined') return;
  for (const a of anh) {
    if (daXep.has(a.url)) continue;
    daXep.add(a.url);
    cho.push(a.url);
    if (a.tachNen) requestCutout(a.url);
  }
  const roi = (globalThis as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (roi) roi(chayTiep, { timeout: 1500 });
  else setTimeout(chayTiep, 50);
}

/** Gọi mỗi khi con trỏ kịch bản dịch chuyển. */
export function taiTruocTheoVan(kb: KichBanMvp, s: TrangThaiMvp): void {
  xepTaiTruoc(anhSapToi(kb, s));
}
