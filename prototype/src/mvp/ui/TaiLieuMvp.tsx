/**
 * Màn "tài liệu / bằng chứng vừa nhận" (`[HIỆN TÀI LIỆU]`, `Hiện tài liệu:` của dữ kiện): thẻ hồ sơ + nút
 * "Cất vào hồ sơ" (bấm → máy đi tiếp). Không dùng DocumentReveal của prototype (kiểu `DocumentCard` đóng băng).
 */
import type { KichBanMvp } from '../../content/mvp/types';
import { TheHoSo } from './TheHoSo';

export interface TaiLieuMvpProps {
  kb: KichBanMvp;
  id: string;
  dienTen: (t: string) => string;
  onCat: () => void;
}

export function TaiLieuMvp({ kb, id, dienTen, onCat }: TaiLieuMvpProps) {
  const the = kb.hoSo[id];
  return (
    <div className="mvp-lop mvp-lop--tailieu" role="dialog" aria-label="Tài liệu mới">
      <p className="mvp-lop__banner">Đã thêm vào Hồ sơ</p>
      {the ? <TheHoSo the={the} dienTen={dienTen} /> : <p className="game__error">Không có thẻ hồ sơ này.</p>}
      <div className="mvp-lop__nut">
        <button type="button" className="btn btn--primary" onClick={onCat} autoFocus>
          Cất vào hồ sơ
        </button>
      </div>
    </div>
  );
}
