/**
 * Chữ in trên một tờ giấy nhớ quanh màn hình laptop (gói B14 mục D): tờ có dòng "Chữ trên giấy" thì in cả câu, giá trị kéo vào
 * ô lọc được làm nổi; tờ chưa có câu thì in giá trị và tên thẻ như trước. Chỗ dán, lớp CSS, nhãn đọc: `giay-nho-quanh.ts`.
 */
import type { ReactNode } from 'react';
import type { GiaTriHoSo } from '../../engine/giay-nho';

/** Chữ in trên tờ giấy. */
export function ChuGiay({ g, dienTen }: { g: GiaTriHoSo; dienTen: (t: string) => string }): ReactNode {
  if (g.chu) {
    // "… bắt đầu bằng chữ **H**" → chữ thường xen cụm giá trị làm nổi.
    const phan = g.chu.split(/\*\*([^*]+)\*\*/);
    return (
      <span className="v7-giay__cau">
        {phan.map((p, i) =>
          i % 2 === 1 ? (
            <b key={i} className="v7-giay__gia">
              {p}
            </b>
          ) : p === '' ? null : (
            <span key={i}>{dienTen(p)}</span>
          ),
        )}
      </span>
    );
  }
  return (
    <>
      <span className="v7-giay__chu">{g.nhieu ? g.nhieu.map((v) => <span key={v}>{v}</span>) : g.giaTri}</span>
      <small className="v7-giay__nguon">{dienTen(g.nguon).replace(/^\[|\]$/g, '')}</small>
    </>
  );
}
