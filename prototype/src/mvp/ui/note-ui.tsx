/**
 * Phần giao diện chung của NOTE CÓ LOẠI / NGUỒN / KEYWORD (gói B21; luật ở `engine/note.ts`): chữ note có keyword tô màu theo loại keyword
 * (chữ đậm + màu, không nền), chú thích ba màu giấy theo nguồn. Dùng ở bảng chân lý, bảng manh mối, hồ sơ.
 */
import './note.css';
import './note-bang.css';
import { CodeText } from '../../shared/ui/CodeText';
import { tachKeyword, TEN_LOAI_KEYWORD, TEN_NGUON_NOTE, type KeywordNote, type NguonNote } from '../engine/note';

/** Lớp CSS màu giấy theo nguồn (tra xanh lơ, tài liệu trắng ngà, còn lại vàng). */
export function lopGiayNguon(nguon: NguonNote | undefined): string {
  return nguon ? `note-giay--${nguon === 'tra' ? 'tra' : nguon === 'tai-lieu' ? 'tai-lieu' : 'vang'}` : '';
}

/** Chữ của một note: đoạn trùng keyword (khai ở `- Keyword:`) tô màu theo loại; không có keyword thì chữ thường. */
export function ChuNote({ text, keyword }: { text: string; keyword?: readonly KeywordNote[] }) {
  if (!keyword || keyword.length === 0) return <CodeText text={text} />;
  return (
    <>
      {tachKeyword(text, keyword).map((d, i) =>
        d.loai ? (
          <b key={i} className={`nk nk--${d.loai}`} data-keyword={d.loai} title={TEN_LOAI_KEYWORD[d.loai]}>
            {d.chu}
          </b>
        ) : (
          <CodeText key={i} text={d.chu} />
        ),
      )}
    </>
  );
}

const MAU_CHU_THICH: { lop: string; chu: string; nguon: NguonNote[] }[] = [
  { lop: 'tra', chu: 'Tra dữ liệu', nguon: ['tra'] },
  { lop: 'tai-lieu', chu: 'Tài liệu', nguon: ['tai-lieu'] },
  { lop: 'vang', chu: 'Lời kể · quan sát · suy luận', nguon: ['loi-ke', 'quan-sat', 'suy-luan'] },
];

/** Dải chú thích ba màu giấy (đặt ở chân chồng "Sự thật chờ đặt"). */
export function ChuThichMauNote({ className = '' }: { className?: string }) {
  return (
    <ul className={`note-chu-thich ${className}`.trim()} aria-label="Màu giấy theo nguồn">
      {MAU_CHU_THICH.map((m) => (
        <li key={m.lop} title={m.nguon.map((n) => TEN_NGUON_NOTE[n]).join(' · ')}>
          <i className={`note-chu-thich__o note-giay--${m.lop}`} aria-hidden="true" />
          <span>{m.chu}</span>
        </li>
      ))}
    </ul>
  );
}
