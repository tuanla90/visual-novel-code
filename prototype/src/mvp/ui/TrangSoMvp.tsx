/**
 * Trang sổ (QĐ-083, đặc tả §12.5):
 *   - `[TRA SỔ <trang> · <phần>]` → chỉ hiện trang chị Linh (chữ viết tay), bấm "Tiếp".
 *   - `[CHÉP SỔ <trang>]` → trang chị Linh + lời Hà Vy + chọn đoạn code (đúng một đáp án, sai thì chọn lại,
 *     không phạt) — phản hồi do máy điều khiển (khung nhìn `feedback`), đây chỉ hiện lựa chọn.
 */
import type { KichBanMvp, TrangSoMvp as TrangSo } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';

const NHAN_LOAI: Record<TrangSo['loai'], string> = { 'cú pháp': 'Cú pháp', 'tâm đắc': 'Tâm đắc', 'lỗi thường gặp': 'Lỗi thường gặp' };

export function TrangChiLinh({ trang, dienTen }: { trang: TrangSo; dienTen: (t: string) => string }) {
  return (
    <article className="mvp-so">
      <header className="mvp-so__dau">
        <span className="mvp-so__loai">{NHAN_LOAI[trang.loai]}</span>
        <h3 className="mvp-so__tieude">{dienTen(trang.ten)}</h3>
        <p className="mvp-so__chu-thich">Sổ chị Linh</p>
      </header>
      <div className="mvp-so__tay">
        {trang.trangChiLinh.map((d, i) => (
          <p key={i}>
            <CodeText text={dienTen(d)} />
          </p>
        ))}
      </div>
    </article>
  );
}

export interface TraSoMvpProps {
  kb: KichBanMvp;
  trang: string;
  dienTen: (t: string) => string;
  onTiep: () => void;
}

export function TraSoMvp({ kb, trang, dienTen, onTiep }: TraSoMvpProps) {
  const t = kb.soTay[trang];
  return (
    <div className="mvp-lop mvp-lop--so" role="dialog" aria-label="Tra sổ chị Linh">
      {t ? <TrangChiLinh trang={t} dienTen={dienTen} /> : <p className="game__error">Không có trang sổ này.</p>}
      <div className="mvp-lop__nut">
        <button type="button" className="btn btn--primary" onClick={onTiep} autoFocus>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export interface ChepSoMvpProps extends Omit<TraSoMvpProps, 'onTiep'> {
  lanThu: number;
  tenNguoiNoi: (speaker: string) => string;
  onChon: (id: string) => void;
}

export function ChepSoMvp({ kb, trang, dienTen, lanThu, tenNguoiNoi, onChon }: ChepSoMvpProps) {
  const t = kb.soTay[trang];
  if (!t) return <p className="game__error">Không có trang sổ này.</p>;
  return (
    <div className="mvp-lop mvp-lop--so" role="dialog" aria-label="Chép sổ">
      <TrangChiLinh trang={t} dienTen={dienTen} />
      {t.haVy.map((l, i) => (
        <p key={i} className="mvp-so__havy">
          <strong>{tenNguoiNoi(l.speaker)}:</strong> <CodeText text={dienTen(l.text)} />
        </p>
      ))}
      {t.chonDoanCode ? (
        <div className="mvp-so__chon" role="group" aria-label="Chọn đoạn code đúng để chép vào sổ">
          <p className="mvp-so__hoi">{lanThu > 0 ? 'Chưa đúng — chọn lại thoải mái, không phạt.' : 'Đoạn nào đúng? Chọn để chép vào sổ cá nhân.'}</p>
          <ul className="mc__choices mvp-so__ds">
            {t.chonDoanCode.map((c) => (
              <li key={c.id} className="mc__choice-item">
                <button type="button" className="mc__choice" onClick={() => onChon(c.id)}>
                  <CodeText text={dienTen(c.text)} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
