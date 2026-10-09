/**
 * MÀN ĐỐI CHẤT CHỈ Ô (gói B21, `[ĐỐI CHẤT … · chỉ ô · tính vạch]`, docs/mua-1/loi-note-bang-chan-ly.md §5): người hỏi đưa MỘT dữ kiện sai;
 * người chơi bác bằng cách CHỈ MỘT Ô trên bảng chân lý (bảng vẽ ở chế độ chỉ, đọc ô nào cũng được). Đáp án nhiều ô thì chỉ đủ các ô
 * (bấm lại ô đã chỉ để bỏ chọn); ô trống bắt buộc ("?" — chưa ai biết) chỉ bằng tiêu đề cột gạch chéo. KHÔNG làm sáng ô đích khi
 * rê/chọn (lộ đáp án). Máy chấm ở `xuLy({ type: 'chi-o' })`: đúng thì đi tiếp, sai thì một vạch ở lề sổ và chỉ lại.
 * Lượt mẫu (`· mẫu`) không vào màn này: bộ chuyển đổi thành lời viết sẵn.
 */
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { banDungSan } from '../engine/dong-thoi-gian';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { DongThoiGianMvp } from './DongThoiGianMvp';
import './DoiChatMvp.css';

type NutDoiChat = Extract<NutMvp, { type: 'doi-chat' }>;

export interface DoiChatChiOMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  nut: NutDoiChat;
  /** Các ô đang chỉ dở (`<dtg>:<ô>`). */
  oDangChon: readonly string[];
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  dienThoai: boolean;
  onChi: (o: string) => void;
}

/** Mã bảng chân lý của lượt này (mọi đáp án chỉ ô cùng một bảng — máy kiểm bảo đảm). */
export function bangCuaChiO(nut: NutDoiChat): string | null {
  const tk = nut.bangChung.flatMap((b) => b.o ?? [])[0];
  return tk ? (tk.split(':')[0] ?? null) : null;
}

export function DoiChatChiOMvp({ kb, s, nut, oDangChon, dienTen, tenNguoiNoi, dienThoai, onChi }: DoiChatChiOMvpProps) {
  const dtgId = bangCuaChiO(nut);
  const dtg = dtgId ? kb.dongThoiGian?.[dtgId] : undefined;
  if (!dtg) return <p className="game__error">Đối chất {nut.id}: không có bảng chân lý để chỉ ô.</p>;
  // Bảng đã dựng ở màn trước (người chơi đặt note); chưa dựng (nhảy tới) thì dùng bản dựng sẵn.
  const luu = s.dongThoiGian?.[dtg.id];
  const daDat = luu?.xong ? luu.o : banDungSan(dtg);
  return (
    <div className="mc doi-chat doi-chat--chi-o" role="group" aria-label="Đối chất: chỉ ô trên bảng chân lý">
      <div className="doi-chat__bang">
        <DongThoiGianMvp
          kb={kb}
          dtg={dtg}
          the={[]}
          daDat={daDat}
          xong
          chiXem
          dienThoai={dienThoai}
          dienTen={dienTen}
          tenNguoiNoi={tenNguoiNoi}
          chiO={{ daChon: oDangChon, onChi }}
        />
      </div>
      <div className="dialog-container doi-chat__hop">
        <div className="dialog dialog--glass" data-speaker={nut.asker.speaker}>
          <div className="dialog__speaker">
            <span>{tenNguoiNoi(nut.asker.speaker)}</span>
          </div>
          <p className="dialog__text doi-chat__gt">
            {dienTen(nut.asker.text)
              .split('**')
              .map((doan, i) => (i % 2 === 1 ? <mark key={i} className="doi-chat__diem"><CodeText text={doan} /></mark> : <CodeText key={i} text={doan} />))}
          </p>
          <div className="doi-chat__thanh">
            <span className="doi-chat__chi-o-huong-dan" aria-live="polite">
              {oDangChon.length > 0
                ? `Đã chỉ ${oDangChon.length} ô — chỉ tiếp ô còn lại, hoặc chạm lại ô đã chỉ để bỏ chọn.`
                : 'Chỉ vào ô trên bảng chân lý để bác lại.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
