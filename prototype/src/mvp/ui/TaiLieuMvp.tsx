/**
 * Màn "tài liệu / bằng chứng vừa nhận" (`[HIỆN TÀI LIỆU]`, `Hiện tài liệu:` của dữ kiện): thẻ hồ sơ + nút
 * "Cất vào hồ sơ" (bấm → máy đi tiếp). Không dùng DocumentReveal của prototype (kiểu `DocumentCard` đóng băng).
 *
 * 03/10/2026 (user: "làm lại cho đẹp hơn, gaming hơn"): kiểu "nhận vật phẩm" — nền tối có tia sáng xoay, ruy băng
 * "Hồ sơ mới", thẻ bật lên kèm ảnh của thẻ (trường `Ảnh`) nếu có, nhãn loại có màu, nút vàng.
 */
import { nguonKhaiCua, TEN_NGUON_NOTE } from '../engine/note';
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import { CodeText } from '../../shared/ui/CodeText';
import { anhTheoTen } from './anh-mvp';

export interface TaiLieuMvpProps {
  kb: KichBanMvp;
  id: string;
  dienTen: (t: string) => string;
  onCat: () => void;
}

const NHAN_LOAI: Record<TheHoSoMvp['loai'], string> = { clue: 'Giấy nhớ', doc: 'Tài liệu', ev: 'Bằng chứng' };

export function TaiLieuMvp({ kb, id, dienTen, onCat }: TaiLieuMvpProps) {
  const the = kb.hoSo[id];
  if (!the) return <p className="game__error">Không có thẻ hồ sơ này.</p>;
  const anh = the.fields['Ảnh'] ? anhTheoTen(the.fields['Ảnh']) : undefined;
  const nguonKhai = nguonKhaiCua(the.fields);
  const nguon = nguonKhai ? (the.fields['Nguồn trên bảng'] ?? TEN_NGUON_NOTE[nguonKhai]) : the.fields['Nguồn'];
  const noiDung = the.fields['Nội dung'] ?? (the.quotes['Nội dung hiển thị'] ? undefined : the.fields['Nội dung hiển thị']);
  const trich = the.quotes['Nội dung hiển thị'] ?? [];
  return (
    <div className={`mvp-nhan mvp-nhan--${the.loai}`} role="dialog" aria-label={`${NHAN_LOAI[the.loai]} mới: ${dienTen(the.heading)}`}>
      <span className="mvp-nhan__tia" aria-hidden="true" />
      <p className="mvp-nhan__ruy-bang">
        <span aria-hidden="true">+</span> Hồ sơ mới
      </p>
      <article className={`mvp-nhan__the${anh ? ' co-anh' : ''}`}>
        {anh ? (
          <div className="mvp-nhan__anh">
            <img src={anh} alt="" draggable={false} />
          </div>
        ) : null}
        <div className="mvp-nhan__chu">
          <span className="mvp-nhan__loai">{NHAN_LOAI[the.loai]}</span>
          <h3 className="mvp-nhan__tieude"><CodeText text={dienTen(the.heading)} /></h3>
          {nguon ? <p className="mvp-nhan__nguon">Nguồn: <CodeText text={dienTen(nguon)} /></p> : null}
          {noiDung ? (
            <p className="mvp-nhan__noidung">
              <CodeText text={dienTen(noiDung)} />
            </p>
          ) : null}
          {trich.length > 0 ? (
            <blockquote className="mvp-nhan__trich">
              {trich.map((d, i) => (
                <p key={i}>
                  <CodeText text={dienTen(d)} />
                </p>
              ))}
            </blockquote>
          ) : null}
        </div>
      </article>
      <button
        type="button"
        className="mvp-nhan__nut"
        onClick={() => {
          soundEngine.playSfx('select');
          onCat();
        }}
        autoFocus
      >
        Cất vào hồ sơ
      </button>
    </div>
  );
}
