/**
 * Trang sổ (QĐ-083, đặc tả §12.5):
 *   - `[TRA SỔ <trang> · <phần>]` → chỉ hiện trang chị Linh (chữ viết tay), bấm "Tiếp".
 *   - `[GHI SỔ <trang>]` (QĐ-092) không có màn riêng: máy tự thêm dòng "Vào sổ cá nhân" của trang vào sổ cá nhân,
 *     màn chơi báo bằng một dòng thông báo.
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
        <p className="mvp-so__chu-thich">Sổ CLB</p>
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
    <div className="mvp-lop mvp-lop--so" role="dialog" aria-label="Tra sổ CLB">
      {t ? <TrangChiLinh trang={t} dienTen={dienTen} /> : <p className="game__error">Không có trang sổ này.</p>}
      <div className="mvp-lop__nut">
        <button type="button" className="btn btn--primary" onClick={onTiep} autoFocus>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
