/**
 * BẠN ĐI CÙNG Ở MÀN TRA (gói B14 mục A): ảnh mặt ở góc phải trên như các màn khác; bấm vào thì bạn gợi ý bằng bóng thoại, bậc 1
 * rồi bậc 2 (theo mẫu `BanDiCungHoiDapMvp` của buổi hỏi nhân chứng). Bóng thoại ở lại cho tới khi người chơi đóng hoặc chạy lại.
 * Trạng thái (bậc, bóng đang hiện) do màn tra giữ; lời lấy từ thẻ thử thách (`engine/goi-y-man-tra.ts`), không gọi mạng.
 * Bóng thoại mọc sang trái dọc mép trên, không phủ lên hàng "LẤY CỘT", ô lọc hay nút CHẠY mà lời gợi ý nhắc tới.
 */
import { CodeText } from '../../../shared/ui/CodeText';
import type { BongManTra } from '../../engine/goi-y-man-tra';
import { anhTheoTen } from '../anh-mvp';

export interface BanDiCungManTraProps {
  /** Mã những người đứng ở góc (người gợi ý của thẻ, hoặc bạn đang có mặt). */
  nguoi: readonly string[];
  bong: BongManTra | null;
  ten: (ma: string) => string;
  dienTen: (t: string) => string;
  /** Bấm vào bạn (hoặc "Gợi ý rõ hơn"): xin gợi ý kế tiếp. */
  onHoi: () => void;
  onDong: () => void;
}

export function BanDiCungManTra({ nguoi, bong, ten, dienTen, onHoi, onDong }: BanDiCungManTraProps) {
  if (nguoi.length === 0) return null;
  return (
    <aside className="v7-ban" aria-label="Bạn đi cùng">
      <div className="v7-ban__mat">
        {nguoi.map((ma) => {
          const anh = anhTheoTen(`chibi-${ma}`);
          return (
            <button key={ma} type="button" className={`v7-ban__nguoi${bong?.ai === ma ? ' is-noi' : ''}`} data-nhan-vat={ma} aria-label={`Hỏi ý ${ten(ma)}`} title={`Hỏi ý ${ten(ma)}`} onClick={onHoi}>
              {anh ? <img src={anh} alt="" draggable={false} /> : <span aria-hidden="true">{ten(ma).charAt(0)}</span>}
            </button>
          );
        })}
      </div>
      {bong ? (
        <div className="v7-ban__bong" role="status" data-bac={bong.bac} data-nhan-vat={bong.ai}>
          <b>{ten(bong.ai)}</b>
          <p>
            <CodeText text={dienTen(bong.loi)} />
          </p>
          <div className="v7-ban__nut">
            {bong.bac === 1 ? (
              <button type="button" className="v7-ban__them" onClick={onHoi}>
                Gợi ý rõ hơn
              </button>
            ) : null}
            <button type="button" className="v7-ban__dong" onClick={onDong}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
