/**
 * NGUỒN TÊN TẠM cho biến `{{nv.…}}` / `{{truong.…}}` của bộ đọc nội dung (gói 12a-1).
 *
 * - Tên nhân vật: đúng `CHARACTER_NAMES` của game (qua `characterName`), dạng `ten`. Các dạng khác
 *   (`ho-ten`, tên trong câu như "bác Tư") chưa có nguồn thống nhất — gói 12b chuyển nguồn sang
 *   `noi-dung/nhan-vat.yaml` và thêm dạng.
 * - Tên trường: GIỮ TÊN CŨ ở bước chuẩn hóa để không đổi chữ (QĐ-079/QĐ-080 đổi sang "Trường Đại học
 *   Chấn Hưng" ở đợt viết lại).
 *
 * Dùng chung cho test (faithfulness) và lệnh `npm run kiem-noi-dung`.
 */
import type { BangTen } from '../../../../tools/noi-dung/bien.ts';
import { characterName } from '../../../shared/display-names';
import { CHARACTER_IDS } from '../../../shared/ids';

export const TRUONG_TAM = {
  'ten-day-du': 'Trường Đại học Hoa Phượng',
  'ten-ngan': 'Hoa Phượng',
} as const;

export function bangTenTam(): BangTen {
  return {
    nv: Object.fromEntries(CHARACTER_IDS.map((id) => [id, { ten: characterName(id) }])),
    truong: { ...TRUONG_TAM },
  };
}
