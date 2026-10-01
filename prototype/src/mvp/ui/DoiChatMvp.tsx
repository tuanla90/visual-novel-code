/**
 * MÀN ĐỐI CHẤT (`[ĐỐI CHẤT]`, 01/10/2026 — đề xuất gameplay §4–5): rival nêu giả thuyết; người chơi chọn một thẻ trong hồ sơ
 * của mình để đáp, hoặc nhận "chưa đủ căn cứ để nói". Máy (engine/may.ts) phân mức theo thẻ đã khai trong kịch bản: đủ căn
 * cứ (kết thúc), hỗ trợ, gợi ý, hay không liên quan; lời phản hồi hiện qua khung `feedback` rồi quay lại đây.
 *
 * Bố cục: khay thẻ hồ sơ (cùng hình dạng với bảng điều tra — giấy nhớ, phiếu, ảnh, giấy tờ; `engine/bang-dieu-tra.ts`
 * dựng) cuộn ngang phía trên; hộp thoại kính của rival với giả thuyết ở dưới (như `[RẼ NHÁNH]`); hai nút: "Trình thẻ này"
 * (cần chọn thẻ) và "Chưa đủ căn cứ để nói". Thẻ đã trình mờ đi, có dấu mức; mức cao nhất đã đạt ghi ở góc.
 * Bàn phím: thẻ là nút (Enter/Space chọn), mũi tên trái/phải chuyển thẻ.
 */
import { useMemo, useState, type KeyboardEvent } from 'react';
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { dungBang, type TheBang } from '../engine/bang-dieu-tra';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { anhTheoTen } from './anh-mvp';
import './DoiChatMvp.css';

type NutDoiChat = Extract<NutMvp, { type: 'doi-chat' }>;
type Muc = 'khong' | 'goi-y' | 'ho-tro' | 'du';

export interface DoiChatMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  nut: NutDoiChat;
  daTrinh: string[];
  muc: Muc;
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  onTrinh: (the: string) => void;
  onChuaDu: () => void;
}

const TEN_MUC: Record<Muc, string> = { khong: 'Chưa có', 'goi-y': 'Gợi ý', 'ho-tro': 'Hỗ trợ', du: 'Đủ căn cứ' };
const NHAN_LOAI: Record<TheBang['loai'], string> = { tin: 'Giấy nhớ', phieu: 'Phiếu kết quả', vat: 'Vật chứng', 'tai-lieu': 'Tài liệu', hoi: 'Câu hỏi' };

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');
/** Thứ tự trên khay: phiếu kết quả và vật chứng (hay là thứ đáp được) lên đầu, rồi giấy nhớ, giấy tờ cuối. */
const THU_TU: Record<TheBang['loai'], number> = { phieu: 0, vat: 1, tin: 2, 'tai-lieu': 3, hoi: 9 };

/** Mức thẻ đã trình (theo kịch bản); thẻ không khai = không liên quan. */
function mucCuaThe(nut: NutDoiChat, id: string): Muc | 'khac' {
  return nut.bangChung.find((b) => b.id === id)?.muc ?? 'khac';
}

export function DoiChatMvp({ kb, s, nut, daTrinh, muc, dienTen, tenNguoiNoi, onTrinh, onChuaDu }: DoiChatMvpProps) {
  // Thẻ trong hồ sơ, bỏ thẻ "câu hỏi đang mở" (không phải bằng chứng).
  const the = useMemo(
    () =>
      dungBang(kb, s)
        .the.filter((t) => t.loai !== 'hoi')
        .sort((a, b) => THU_TU[a.loai] - THU_TU[b.loai]),
    [kb, s],
  );
  const [chon, setChon] = useState<string | null>(null);
  const theChon = chon ? the.find((t) => t.id === chon) : undefined;
  const chonDuoc = !!theChon && !daTrinh.includes(theChon.id);

  const onKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const i = the.findIndex((t) => t.id === chon);
    const j = e.key === 'ArrowRight' ? Math.min(the.length - 1, i + 1) : Math.max(0, i - 1);
    const t = the[j];
    if (t) {
      setChon(t.id);
      (e.currentTarget.querySelector(`[data-the="${t.id}"]`) as HTMLElement | null)?.focus();
    }
  };

  return (
    <div className="mc doi-chat" role="group" aria-label="Đối chất: trình bằng chứng">
      <div className="doi-chat__khay" role="listbox" aria-label="Thẻ trong hồ sơ" aria-activedescendant={chon ? `dc-the-${chon}` : undefined} onKeyDown={onKey}>
        {the.length === 0 ? <p className="doi-chat__trong">Hồ sơ chưa có thẻ nào.</p> : null}
        {the.map((t) => {
          const daDung = daTrinh.includes(t.id);
          const m = daDung ? mucCuaThe(nut, t.id) : null;
          const anh = t.anh ? anhTheoTen(t.anh) : undefined;
          return (
            <button
              key={t.id}
              id={`dc-the-${t.id}`}
              type="button"
              role="option"
              aria-selected={chon === t.id}
              data-the={t.id}
              className={`dc-the dc-the--${t.loai}${chon === t.id ? ' is-chon' : ''}${daDung ? ' is-da-trinh' : ''}`}
              title={daDung ? `Đã trình — ${m === 'khac' ? 'không liên quan' : TEN_MUC[m ?? 'khong']}` : `${NHAN_LOAI[t.loai]}: ${dienTen(boNgoac(t.nhan))}`}
              onClick={() => setChon(t.id)}
              onDoubleClick={() => !daDung && onTrinh(t.id)}
              disabled={false}
            >
              <span className="dc-the__ghim" aria-hidden="true" />
              {anh ? <img className="dc-the__anh" src={anh} alt="" draggable={false} /> : null}
              <span className="dc-the__loai">{NHAN_LOAI[t.loai]}</span>
              <span className="dc-the__nhan">{dienTen(boNgoac(t.nhan))}</span>
              {t.phu && t.loai !== 'tin' ? <span className="dc-the__phu">{dienTen(t.phu)}</span> : null}
              {daDung ? (
                <span className={`dc-the__dau dc-the__dau--${m ?? 'khac'}`} aria-hidden="true">
                  {m === 'khac' ? 'Không liên quan' : TEN_MUC[m ?? 'khong']}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="dialog-container doi-chat__hop">
        <div className="dialog dialog--glass" data-speaker={nut.asker.speaker}>
          <div className="dialog__speaker">
            <span>{tenNguoiNoi(nut.asker.speaker)}</span>
            <span className="doi-chat__nhan-gt">Giả thuyết</span>
          </div>
          <p className="dialog__text doi-chat__gt">
            <CodeText text={dienTen(nut.asker.text)} />
          </p>
          <div className="doi-chat__thanh">
            <span className={`doi-chat__muc doi-chat__muc--${muc}`} aria-live="polite">
              Mức đã đạt: <b>{TEN_MUC[muc]}</b>
            </span>
            <span className="doi-chat__nut">
              <button type="button" className="btn btn--ghost doi-chat__chua-du" onClick={onChuaDu} title="Kết thúc phần trình bày ở mức đang đạt">
                Chưa đủ căn cứ để nói
              </button>
              <button type="button" className="btn btn--primary doi-chat__trinh" disabled={!chonDuoc} onClick={() => theChon && onTrinh(theChon.id)} title={chonDuoc ? `Trình: ${dienTen(boNgoac(theChon.nhan))}` : 'Chọn một thẻ trong hồ sơ trước'}>
                Trình thẻ này
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
