/**
 * Thẻ hồ sơ MVP (ho-so/*.md → `TheHoSoMvp`): giấy nhớ `clue-`, tài liệu `doc-`, bằng chứng `ev-`.
 * Trường hiện: Nguồn, Nội dung / Nội dung hiển thị (các dòng trích). Không hiện mã.
 * Dùng ở màn "tài liệu vừa nhận" (TaiLieuMvp) và ngăn kéo Hồ sơ (HoSoMvp).
 */
import type { TheHoSoMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';

const NHAN_LOAI: Record<TheHoSoMvp['loai'], string> = { clue: 'Giấy nhớ', doc: 'Tài liệu', ev: 'Bằng chứng' };

export function TheHoSo({ the, dienTen }: { the: TheHoSoMvp; dienTen: (t: string) => string }) {
  const nguon = the.fields['Nguồn'];
  const noiDung = the.fields['Nội dung'] ?? (the.quotes['Nội dung hiển thị'] ? undefined : the.fields['Nội dung hiển thị']);
  const trich = the.quotes['Nội dung hiển thị'] ?? [];
  return (
    <article className={`mvp-the mvp-the--${the.loai}`}>
      <header className="mvp-the__dau">
        <span className="mvp-the__loai">{NHAN_LOAI[the.loai]}</span>
        <h3 className="mvp-the__tieude">{dienTen(the.heading)}</h3>
        {nguon ? <p className="mvp-the__nguon">Nguồn: {dienTen(nguon)}</p> : null}
      </header>
      {noiDung ? (
        <p className="mvp-the__noidung">
          <CodeText text={dienTen(noiDung)} />
        </p>
      ) : null}
      {trich.length > 0 ? (
        <blockquote className="mvp-the__trich">
          {trich.map((d, i) => (
            <p key={i}>
              <CodeText text={dienTen(d)} />
            </p>
          ))}
        </blockquote>
      ) : null}
    </article>
  );
}
