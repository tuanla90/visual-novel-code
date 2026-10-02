/**
 * CHỌN NHẠC NỀN theo chỗ người chơi đang đứng — hàm thuần, gọi ngay sau `khungNhin` (ManChoiMvp).
 *
 * Màn dài (bản đồ, khám phá, màn tra, đối chất, kết) quyết định nhạc. Màn ngắn chen giữa thoại (câu hỏi, chọn dòng,
 * xem tài liệu, chiếu ảnh…) và lời phản hồi giữ nguyên bài đang phát, để nhạc không đổi qua đổi lại sau vài câu.
 * Thoại thì theo bối cảnh:
 * - đang trong cảnh khám phá, hay đi điều tra một địa điểm → `dieu-tra`;
 * - buổi họp → `doi-chat`;
 * - đã lên `cao-trao` (đối chất) thì giữ tới hết buổi họp, hoặc tới hết chuỗi thoại chứa lần đối chất;
 * - còn lại → `thuong-ngay`.
 */
import type { NhacNen } from '../../shared/audio/nhac-nen';
import type { KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

/** Bài chọn ở bước trước, kèm chuỗi thoại lúc đó (để giữ cao trào tới hết chuỗi). */
export interface NhacTruoc {
  nhac: NhacNen;
  chuoi: string | null;
}

/** Màn ngắn chen giữa thoại: giữ bài đang phát (tạo nhân vật nằm giữa cảnh khám phá mở đầu). */
const GIU_NHAC: ReadonlySet<KhungNhinMvp['kind']> = new Set([
  'create-character',
  'feedback',
  'question',
  'line-pick',
  'branch',
  'show-document',
  'image',
  'projector',
  'notebook-lookup',
]);

export function chonNhacNen(kn: KhungNhinMvp | null, s: TrangThaiMvp | null, truoc: NhacTruoc | null): NhacNen {
  if (!kn || !s) return 'chu-de';
  switch (kn.kind) {
    case 'end':
      return 'ket';
    case 'challenge':
    case 'fix-query':
    case 'trial-filter':
      return 'phan-tich';
    case 'chon-dia-diem':
    case 'explore':
      return 'dieu-tra';
    case 'doi-chat':
    case 'effect':
      return 'cao-trao';
    default:
      break;
  }
  if (GIU_NHAC.has(kn.kind)) return truoc ? truoc.nhac : s.giaiDoan === 'mo-dau' ? 'chu-de' : 'thuong-ngay';

  const boiCanh = s.conTro?.boiCanh;
  const chuoi = s.conTro?.chuoi ?? null;
  if (boiCanh === 'ket') return 'ket';
  if (s.khamPha) return 'dieu-tra';
  if (s.giaiDoan === 'hop' || s.canh === 'phong-hop') return truoc?.nhac === 'cao-trao' ? 'cao-trao' : 'doi-chat';
  if (truoc?.nhac === 'cao-trao' && chuoi !== null && truoc.chuoi === chuoi) return 'cao-trao';
  if (s.giaiDoan === 'mo-dau') return 'chu-de';
  if (boiCanh === 'du-kien') return 'dieu-tra';
  return 'thuong-ngay';
}
