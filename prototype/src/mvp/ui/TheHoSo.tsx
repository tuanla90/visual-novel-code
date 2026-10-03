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

  if (the.loai === 'doc') {
    return (
      <article className="mvp-the mvp-the--doc mvp-doc-to">
        {/* Tiêu ngữ / Phần đầu văn bản với một số thanh chữ nhật skeleton */}
        <div className="mvp-doc-to__quoc-hieu">
          <span className="mvp-the__loai">{NHAN_LOAI[the.loai]}</span>
          <div className="mvp-doc-to__header-bars" aria-hidden="true">
            <span className="mvp-doc-to__bar mvp-doc-to__bar--sm" />
            <span className="mvp-doc-to__bar mvp-doc-to__bar--xs" />
          </div>
        </div>

        <header className="mvp-the__dau mvp-doc-to__dau">
          <h3 className="mvp-the__tieude"><CodeText text={dienTen(the.heading)} /></h3>
          {nguon ? <p className="mvp-the__nguon">Nguồn: <CodeText text={dienTen(nguon)} /></p> : null}
        </header>

        {/* Đoạn văn bản trước dạng fake hình chữ nhật */}
        <div className="mvp-doc-to__gia-lap" aria-hidden="true">
          <span className="mvp-doc-to__bar mvp-doc-to__bar--full" />
          <span className="mvp-doc-to__bar mvp-doc-to__bar--90" />
          <span className="mvp-doc-to__bar mvp-doc-to__bar--75" />
        </div>

        {/* Phần chữ thật ở đoạn quan trọng */}
        <div className="mvp-doc-to__trong-tam">
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
        </div>

        {/* Đoạn văn bản sau dạng fake hình chữ nhật */}
        <div className="mvp-doc-to__gia-lap" aria-hidden="true">
          <span className="mvp-doc-to__bar mvp-doc-to__bar--85" />
          <span className="mvp-doc-to__bar mvp-doc-to__bar--60" />
        </div>

        {/* Chân văn bản với con dấu tròn đỏ */}
        <footer className="mvp-doc-to__chan">
          <div className="mvp-doc-to__ky-ten" aria-hidden="true">
            <span className="mvp-doc-to__bar mvp-doc-to__bar--sm" />
            <span className="mvp-doc-to__bar mvp-doc-to__bar--xs" />
          </div>
          <div className="mvp-doc-to__dau-do" aria-label="Dấu xác nhận tài liệu">
            <div className="mvp-doc-to__dau-do-vien">
              <span className="mvp-doc-to__dau-do-chu">XÁC NHẬN</span>
              <span className="mvp-doc-to__dau-do-sao">★</span>
              <span className="mvp-doc-to__dau-do-so">HỒ SƠ CLB</span>
            </div>
          </div>
        </footer>
      </article>
    );
  }

  return (
    <article className={`mvp-the mvp-the--${the.loai}`}>
      <header className="mvp-the__dau">
        <span className="mvp-the__loai">{NHAN_LOAI[the.loai]}</span>
        <h3 className="mvp-the__tieude"><CodeText text={dienTen(the.heading)} /></h3>
        {nguon ? <p className="mvp-the__nguon">Nguồn: <CodeText text={dienTen(nguon)} /></p> : null}
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
