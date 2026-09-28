/**
 * NGUỒN TÊN TẠM cho biến `{{nv.…}}` / `{{truong.…}}` của bộ đọc nội dung (gói 12a-1, thêm dạng ở 12a-2).
 *
 * - Tên nhân vật, lấy từ nguồn sẵn có của game (gói 12b chuyển sang `noi-dung/nhan-vat.yaml`):
 *   - `ten`: `CHARACTER_NAMES` (qua `characterName`) — "Bác Tư", "Hà Vy".
 *   - `ho-ten`: `fullName` của hồ sơ nhân vật (`src/evidence/character-profiles.ts`) — "Trần Tùng".
 *   - `trong-cau`: tên gọi giữa câu, danh xưng đầu tên viết thường — "bác Tư" (tên không có danh
 *     xưng thì bằng `ten`).
 * - Tên trường: GIỮ TÊN CŨ ở bước chuẩn hóa để không đổi chữ (QĐ-079/QĐ-080 đổi sang "Trường Đại học
 *   Chấn Hưng" ở đợt viết lại). Dạng `ten-khong-tien-to` = tên đầy đủ bỏ chữ "Trường" đầu ("cổng trường
 *   Đại học Hoa Phượng").
 *
 * Dùng chung cho lệnh `npm run kiem-noi-dung`, `npm run noi-dung:sinh` và test.
 */
import type { BangTen } from '../../../../tools/noi-dung/bien.ts';
import { characterName } from '../../../shared/display-names';
import { CHARACTER_IDS } from '../../../shared/ids';
import { CHARACTER_PROFILES } from '../../../evidence/character-profiles';

const TEN_DAY_DU = 'Trường Đại học Hoa Phượng';

export const TRUONG_TAM = {
  'ten-day-du': TEN_DAY_DU,
  'ten-ngan': 'Hoa Phượng',
  'ten-khong-tien-to': TEN_DAY_DU.replace(/^Trường /, ''),
} as const;

/** Danh xưng đứng đầu tên hiển thị, viết thường khi tên nằm giữa câu. */
const DANH_XUNG = ['Bác', 'Chú', 'Cô', 'Thầy', 'Anh', 'Chị', 'Em'];

export function tenTrongCau(ten: string): string {
  const [dau = '', ...con] = ten.split(' ');
  return DANH_XUNG.includes(dau) && con.length > 0 ? [dau.toLowerCase(), ...con].join(' ') : ten;
}

export function bangTenTam(): BangTen {
  return {
    nv: Object.fromEntries(
      CHARACTER_IDS.map((id) => {
        const ten = characterName(id);
        return [id, { ten, 'ho-ten': CHARACTER_PROFILES[id].fullName, 'trong-cau': tenTrongCau(ten) }];
      }),
    ),
    truong: { ...TRUONG_TAM },
  };
}
