/**
 * MÀN GHÉP MẪU (`[GHÉP MẪU]`, gói B19) trên bảng điều tra.
 *
 * User 09/10/2026: người chơi phải thấy rõ ai đang làm và làm thế nào, để về sau (Vụ 3) không còn ai làm hộ thì tự nối được hai
 * dữ kiện. Lệnh có `· làm mẫu` (nút mang `lamMau`, đúng ba câu) thì diễn ba bước, mỗi bước một câu của người ghép: ghim hai
 * thẻ → nối chỉ đỏ → dán giấy nhớ. Góc dưới là khung người làm mẫu: chân dung, "Minh Anh ghép mẫu · Bước n/3", câu đang nói,
 * nút Tiếp tục sang bước kế (bước cuối thì đi tiếp truyện). Trên bảng, bàn tay mang tên người ghép làm thao tác của bước ấy.
 * Lệnh không có `· làm mẫu` thì diễn một lần như cũ. Người chơi chỉ xem, không kéo thẻ ở màn này.
 */
import { useState } from 'react';
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { anhChanDung } from './anh-mvp';
import { BangGhimMvp } from './v7/BangGhimMvp';
import './ghep-mau-lam-mau.css';

const TEN_BUOC = ['Ghim hai thẻ', 'Nối chỉ đỏ', 'Viết câu hỏi'] as const;

export interface GhepMauMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  nut: Extract<NutMvp, { type: 'ghep-mau' }>;
  dienTen: (t: string) => string;
  tenNguoi: (ma: string) => string;
  onTiep: () => void;
}

export function GhepMauMvp({ kb, s, nut, dienTen, tenNguoi, onTiep }: GhepMauMvpProps) {
  const lamMau = nut.lamMau && nut.lamMau.length === 3 ? nut.lamMau : null;
  const [buoc, setBuoc] = useState<1 | 2 | 3>(1);
  const ghep = { id: nut.the.join('+'), the: nut.the, chu: nut.giayNho, nguoi: nut.nguoi };
  const ten = tenNguoi(nut.nguoi);
  const cau = lamMau?.[buoc - 1];
  const tiep = (): void => {
    if (lamMau && buoc < 3) setBuoc((b) => (b === 1 ? 2 : 3));
    else onTiep();
  };
  const anh = cau ? anhChanDung(cau.speaker === 'player' ? 'nguoi-choi' : cau.speaker, cau.expression) : undefined;
  return (
    <div className="ghep-mau phong-tra">
      <BangGhimMvp kb={kb} s={s} dienTen={dienTen} ghep={ghep} tenNguoi={tenNguoi} {...(lamMau ? { buocGhep: buoc } : {})}>
        {lamMau && cau ? (
          <div className="ghep-lm" role="group" aria-label={`${ten} ghép mẫu, bước ${buoc} trên 3`}>
            <div className="ghep-lm__mat">{anh ? <img src={anh} alt="" draggable={false} /> : null}</div>
            <div className="ghep-lm__than">
              <p className="ghep-lm__dau">
                {ten} ghép mẫu
                <span className="ghep-lm__buoc">
                  Bước {buoc}/3 · {TEN_BUOC[buoc - 1]}
                </span>
              </p>
              <ol className="ghep-lm__cac-buoc" aria-hidden="true">
                {TEN_BUOC.map((t, i) => (
                  <li key={t} className={i + 1 < buoc ? 'is-xong' : i + 1 === buoc ? 'is-dang' : undefined} />
                ))}
              </ol>
              <p className="ghep-lm__cau" aria-live="polite">
                {dienTen(cau.text)}
              </p>
            </div>
            <button key={buoc} type="button" className="bang__mo-may bang__mo-may--tiep ghep-lm__nut" onClick={tiep} autoFocus>
              Tiếp tục
            </button>
          </div>
        ) : (
          <button type="button" className="bang__mo-may bang__mo-may--tiep" onClick={onTiep} autoFocus>
            Tiếp tục
          </button>
        )}
      </BangGhimMvp>
    </div>
  );
}
