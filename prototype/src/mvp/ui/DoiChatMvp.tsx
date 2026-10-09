/**
 * MÀN ĐỐI CHẤT (`[ĐỐI CHẤT]`, 01/10/2026 — đề xuất gameplay §4–5): rival nêu giả thuyết; người chơi chọn một thẻ trong hồ sơ
 * của mình để đáp, hoặc nhận "chưa đủ căn cứ để nói". Máy (engine/may.ts) phân mức theo thẻ đã khai trong kịch bản: đủ căn
 * cứ (kết thúc), hỗ trợ, gợi ý, hay không liên quan; lời phản hồi hiện qua khung `feedback` rồi quay lại đây.
 *
 * Bố cục: khay thẻ hồ sơ (cùng hình dạng với bảng điều tra — giấy nhớ, phiếu, ảnh, giấy tờ; `engine/bang-dieu-tra.ts`
 * dựng) cuộn ngang phía trên; hộp thoại kính của rival với giả thuyết ở dưới (như `[RẼ NHÁNH]`); hai nút: "Trình thẻ này"
 * (cần chọn thẻ) và "Chưa đủ căn cứ để nói". Thẻ đã trình mờ đi, có dấu mức; mức cao nhất đã đạt ghi ở góc.
 * Bàn phím: thẻ là nút (Enter/Space chọn), mũi tên trái/phải chuyển thẻ.
 *
 * 03/10/2026 (user: "quá nhiều dữ kiện mà câu hỏi chung chung"): khay chỉ có thẻ đang trên bảng (bỏ giấy tờ nền) và thẻ cũ
 * mà chính màn này khai; giả thuyết tô nổi chỗ cần bác (`**…**`), dưới là câu hỏi cụ thể (`[CÂU HỎI]`).
 */
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { KichBanMvp, NutMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { dungBang, type TheBang } from '../engine/bang-dieu-tra';
import { SO_LAN_SAI_DOI_CHAT } from '../engine/may';
import { chaySql, type GiaTriSql } from '../engine/sql-mvp';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { TheHoSo } from './TheHoSo';
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
  /** Lần trình sai (thẻ không liên quan) còn lại trước khi hết lượt; thiếu = không hiện. */
  conLuot?: number;
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  onTrinh: (the: string) => void;
  onChuaDu: () => void;
  /**
   * Gói B19: đối chất `· tính vạch` ở buổi chấm — câu hỏi thay cho giả thuyết, không có mức đạt, "chưa đủ căn cứ", uy tín; thẻ trình
   * sai mờ đi với dấu "Chưa đúng", chọn lại tới khi đúng.
   */
  tinhVach?: boolean;
}

const TEN_MUC: Record<Muc, string> = { khong: 'Chưa có', 'goi-y': 'Gợi ý', 'ho-tro': 'Hỗ trợ', du: 'Đủ căn cứ' };
const NHAN_LOAI: Record<TheBang['loai'], string> = { note: 'Query note', tin: 'Giấy nhớ', phieu: 'Phiếu kết quả', vat: 'Vật chứng', 'tai-lieu': 'Tài liệu', hoi: 'Câu hỏi', cau: 'Câu hỏi nối' };

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');
/** Thứ tự trên khay: phiếu kết quả và vật chứng (hay là thứ đáp được) lên đầu, rồi giấy nhớ, giấy tờ cuối. */
const THU_TU: Record<TheBang['loai'], number> = { note: 9, phieu: 0, vat: 1, tin: 2, 'tai-lieu': 3, hoi: 9, cau: 9 };

/** Mức thẻ đã trình (theo kịch bản); thẻ không khai = không liên quan. */
function mucCuaThe(nut: NutDoiChat, id: string): Muc | 'khac' {
  const m = nut.bangChung.find((b) => b.id === id)?.muc;
  // Gói B19: đối chất `· tính vạch` không có mức; thẻ [ĐÚNG] đã trình (hiếm: đúng thì đi tiếp ngay) tính như đủ căn cứ.
  return m === 'dung' ? 'du' : m === 'sai' || m === undefined ? 'khac' : m;
}

export function DoiChatMvp({ kb, s, nut, daTrinh, muc, conLuot, dienTen, tenNguoiNoi, onTrinh, onChuaDu, tinhVach = false }: DoiChatMvpProps) {
  // Thẻ đang trên bảng điều tra, bỏ thẻ "câu hỏi đang mở" và giấy tờ nền (tài liệu) — trừ thẻ chính màn này khai.
  // Thêm thẻ của các vụ trước (đã gỡ khỏi bảng) chỉ khi chính màn này khai: người chơi phải trình được bằng chứng cũ, nhưng
  // khay không độn thẻ của vụ khác. Màn nào cũng khai cả thẻ GỢI Ý (thẻ bẫy) nên khay không lộ riêng đáp án.
  const the = useMemo(() => {
    const bang = dungBang(kb, s);
    const khai = new Set(nut.bangChung.map((x) => x.id));
    const cu = bang.boGhim.filter((t) => khai.has(t.id));
    return [...bang.the.filter((t) => t.loai !== 'tai-lieu' || khai.has(t.id)), ...cu]
      .filter((t) => t.loai !== 'hoi' && t.loai !== 'note' && t.loai !== 'cau')
      .sort((a, b) => THU_TU[a.loai] - THU_TU[b.loai]);
  }, [kb, s, nut]);
  const [chon, setChon] = useState<string | null>(null);
  const [moKhay, setMoKhay] = useState(false);
  const [theDangXemId, setTheDangXemId] = useState<string | null>(null);
  const theChon = chon ? the.find((t) => t.id === chon) : undefined;
  const theDangXem = theDangXemId ? the.find((t) => t.id === theDangXemId) : undefined;
  const chonDuoc = !!theChon && !daTrinh.includes(theChon.id);

  const [ketQuaSql, setKetQuaSql] = useState<{ cot: string[]; dong: GiaTriSql[][] } | null>(null);
  useEffect(() => {
    let huy = false;
    if (!theDangXem?.sql || !kb.duLieu) {
      setKetQuaSql(null);
      return;
    }
    chaySql(kb.duLieu, theDangXem.sql).then((res) => {
      if (huy) return;
      if (res.ok) setKetQuaSql({ cot: res.cot, dong: res.dong });
      else setKetQuaSql(null);
    });
    return () => {
      huy = true;
    };
  }, [theDangXem, kb.duLieu]);

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
      {/* Ngăn kéo thẻ hồ sơ có thể mở ra / thu lại */}
      <div className={`doi-chat__ngan-keo${moKhay ? ' is-mo' : ' is-dong'}`}>
        <div className="doi-chat__ngan-keo-thanh">
          <span className="doi-chat__ngan-keo-tieude">📁 Hồ sơ bằng chứng ({the.length} thẻ)</span>
          <button
            type="button"
            className="doi-chat__ngan-keo-dong"
            onClick={() => setMoKhay(false)}
            aria-label="Thu gọn khay thẻ"
            title="Thu gọn khay thẻ"
          >
            ✕ Thu gọn
          </button>
        </div>
        <div className="doi-chat__khay" role="listbox" aria-label="Thẻ trong hồ sơ" aria-activedescendant={chon ? `dc-the-${chon}` : undefined} onKeyDown={onKey}>
          {the.length === 0 ? <p className="doi-chat__trong">Hồ sơ chưa có thẻ nào.</p> : null}
          {the.map((t) => {
            const daDung = daTrinh.includes(t.id);
            const m = daDung ? mucCuaThe(nut, t.id) : null;
            const anh = t.anh ? anhTheoTen(t.anh) : undefined;
            const tieuDeThe = t.tieuDe ?? dienTen(boNgoac(t.nhan));
            const maNhan = boNgoac(t.nhan);
            return (
              <button
                key={t.id}
                id={`dc-the-${t.id}`}
                type="button"
                role="option"
                aria-selected={chon === t.id}
                data-the={t.id}
                className={`dc-the dc-the--${t.loai}${chon === t.id ? ' is-chon' : ''}${daDung ? ' is-da-trinh' : ''}`}
                title={daDung ? (tinhVach ? 'Đã trình — chưa đúng' : `Đã trình — ${m === 'khac' ? 'không liên quan' : TEN_MUC[m ?? 'khong']}`) : `${NHAN_LOAI[t.loai]}: ${tieuDeThe}`}
                onClick={() => {
                  setChon(t.id);
                }}
                onDoubleClick={() => setTheDangXemId(t.id)}
                disabled={false}
              >
                <span className="dc-the__ghim" aria-hidden="true" />
                {anh ? <img className="dc-the__anh" src={anh} alt="" draggable={false} /> : null}
                <div className="dc-the__hang-dau">
                  <span className="dc-the__loai">{NHAN_LOAI[t.loai]}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    className="dc-the__nut-xem-nhanh"
                    title="Xem chi tiết thẻ này"
                    aria-label={`Xem chi tiết: ${tieuDeThe}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChon(t.id);
                      setTheDangXemId(t.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        e.preventDefault();
                        setChon(t.id);
                        setTheDangXemId(t.id);
                      }
                    }}
                  >
                    👁
                  </span>
                </div>
                <span className="dc-the__nhan">{tieuDeThe}</span>
                {t.tieuDe && maNhan !== t.tieuDe ? <span className="dc-the__ma">{maNhan}</span> : null}
                {t.phu && t.loai !== 'tin' ? <span className="dc-the__phu">{dienTen(t.phu)}</span> : null}
                {daDung ? (
                  <span className={`dc-the__dau dc-the__dau--${tinhVach ? 'khac' : (m ?? 'khac')}`} aria-hidden="true">
                    {tinhVach ? 'Chưa đúng' : m === 'khac' ? 'Không liên quan' : TEN_MUC[m ?? 'khong']}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="dialog-container doi-chat__hop">
        {/* Nút Tab bar mở / thu khay ngay trên nóc hộp thoại */}
        <div className="doi-chat__thanh-tab">
          <button
            type="button"
            className={`doi-chat__tab-toggle${moKhay ? ' is-mo' : ''}`}
            onClick={() => setMoKhay((v) => !v)}
            aria-expanded={moKhay}
            title={moKhay ? 'Thu gọn khay thẻ' : 'Mở hồ sơ chọn thẻ'}
          >
            <span className="doi-chat__tab-icon" aria-hidden="true">📁</span>
            <span>
              {moKhay
                ? 'Thu gọn hồ sơ'
                : theChon
                  ? `Đã chọn: ${theChon.tieuDe ?? dienTen(boNgoac(theChon.nhan))}`
                  : `Mở hồ sơ (${the.length} thẻ)`}
            </span>
            <span className="doi-chat__tab-arrow" aria-hidden="true">{moKhay ? '▼' : '▲'}</span>
          </button>
        </div>

        <div className="dialog dialog--glass" data-speaker={nut.asker.speaker}>
          <div className="dialog__speaker">
            <span>{tenNguoiNoi(nut.asker.speaker)}</span>
            {tinhVach ? null : <span className="doi-chat__nhan-gt">Giả thuyết</span>}
          </div>
          <p className="dialog__text doi-chat__gt">
            {dienTen(nut.asker.text)
              .split('**')
              .map((doan, i) => (i % 2 === 1 ? <mark key={i} className="doi-chat__diem"><CodeText text={doan} /></mark> : <CodeText key={i} text={doan} />))}
          </p>
          {nut.cauHoi ? (
            <p className="doi-chat__cau-hoi">
              <span className="doi-chat__cau-hoi-nhan">Câu hỏi</span> {dienTen(nut.cauHoi)}
            </p>
          ) : null}
          <div className="doi-chat__thanh">
            {tinhVach ? null : (
              <span className={`doi-chat__muc doi-chat__muc--${muc}`} aria-live="polite">
                Mức đã đạt: <b>{TEN_MUC[muc]}</b>
              </span>
            )}
            {conLuot !== undefined ? (
              <span className={`doi-chat__luot${conLuot <= 1 ? ' is-sap-het' : ''}`} title={`Trình thẻ không liên quan ${SO_LAN_SAI_DOI_CHAT} lần là mất uy tín, phần trình bày dừng ở mức đang đạt.`} aria-label={`Uy tín: còn ${conLuot} trên ${SO_LAN_SAI_DOI_CHAT} lần được trình nhầm`}>
                Uy tín
                <span aria-hidden="true">
                  {Array.from({ length: SO_LAN_SAI_DOI_CHAT }, (_x, i) => (
                    <i key={i} className={i < conLuot ? 'is-con' : ''} />
                  ))}
                </span>
              </span>
            ) : null}
            {theChon ? (
              <div className="doi-chat__the-chon-nhom">
                <button
                  type="button"
                  className="doi-chat__the-chon-preview"
                  onClick={() => setMoKhay((v) => !v)}
                  title="Bấm để mở hồ sơ đổi thẻ khác"
                >
                  <span className="doi-chat__the-chon-loai">{NHAN_LOAI[theChon.loai]}:</span>
                  <span className="doi-chat__the-chon-ten">{theChon.tieuDe ?? dienTen(boNgoac(theChon.nhan))}</span>
                  <span className="doi-chat__the-chon-doi">Đổi ▾</span>
                </button>
                <button
                  type="button"
                  className="doi-chat__the-chon-xem"
                  onClick={() => setTheDangXemId(theChon.id)}
                  title="Xem kỹ nội dung thẻ và kết quả truy vấn trước khi trình"
                >
                  👁 Xem kỹ
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="doi-chat__goi-y-btn"
                onClick={() => setMoKhay(true)}
              >
                📁 Bấm để chọn thẻ
              </button>
            )}
            <span className="doi-chat__nut">
              {tinhVach ? null : (
                <button type="button" className="btn btn--ghost doi-chat__chua-du" onClick={onChuaDu} title="Kết thúc phần trình bày ở mức đang đạt">
                  Chưa đủ căn cứ để nói
                </button>
              )}
              <button
                type="button"
                className="btn btn--primary doi-chat__trinh"
                disabled={!chonDuoc && !theChon}
                onClick={() => {
                  if (theChon) {
                    if (chonDuoc) onTrinh(theChon.id);
                  } else {
                    setMoKhay(true);
                  }
                }}
                title={chonDuoc ? `Trình: ${theChon?.tieuDe ?? dienTen(boNgoac(theChon?.nhan ?? ''))}` : 'Mở hồ sơ để chọn một thẻ'}
              >
                {theChon ? 'Trình thẻ này' : 'Chọn một thẻ'}
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Modal xem chi tiết thẻ trong đối chất */}
      {theDangXem ? (
        <div
          className="doi-chat__xem-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết thẻ: ${theDangXem.tieuDe ?? dienTen(boNgoac(theDangXem.nhan))}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setTheDangXemId(null);
          }}
        >
          <div className="doi-chat__xem-hop" onClick={(e) => e.stopPropagation()}>
            <div className="doi-chat__xem-dau">
              <div className="doi-chat__xem-dau-trai">
                <span className="doi-chat__xem-loai">{NHAN_LOAI[theDangXem.loai]}</span>
                <h3 className="doi-chat__xem-tieude">{theDangXem.tieuDe ?? dienTen(boNgoac(theDangXem.nhan))}</h3>
                {boNgoac(theDangXem.nhan) !== theDangXem.tieuDe ? (
                  <span className="doi-chat__xem-ma">{boNgoac(theDangXem.nhan)}</span>
                ) : null}
              </div>
              <button
                type="button"
                className="doi-chat__xem-dong"
                onClick={() => setTheDangXemId(null)}
                aria-label="Đóng xem chi tiết thẻ"
              >
                ✕
              </button>
            </div>

            <div className="doi-chat__xem-than">
              {theDangXem.anh ? (
                <div className="doi-chat__xem-anh-khu">
                  <img className="doi-chat__xem-anh" src={anhTheoTen(theDangXem.anh)} alt="" draggable={false} />
                </div>
              ) : null}

              <div className="doi-chat__xem-noidung">
                {theDangXem.the ? (
                  <TheHoSo the={theDangXem.the} dienTen={dienTen} />
                ) : (
                  <p className="doi-chat__xem-nhan-phu">{dienTen(theDangXem.nhan)}</p>
                )}

                {theDangXem.giaTri && theDangXem.giaTri.length > 0 ? (
                  <div className="doi-chat__xem-giatri-hang">
                    <span className="doi-chat__xem-giatri-nhan">Dữ kiện:</span>
                    {theDangXem.giaTri.map((g) => (
                      <span key={g} className={`doi-chat__xem-giatri-chip${theDangXem.gach.includes(g) ? ' is-gach' : ''}`}>
                        {g}
                      </span>
                    ))}
                  </div>
                ) : null}

                {theDangXem.sql ? (
                  <div className="bang__xem-sql-khu">
                    <span className="bang__xem-sql-nhan">Câu truy vấn SQL:</span>
                    <pre className="bang__xem-sql-code"><code>{theDangXem.sql}</code></pre>
                  </div>
                ) : null}

                {ketQuaSql ? (
                  <div className="bang__xem-bang-khu">
                    <span className="bang__xem-sql-nhan">Kết quả ({ketQuaSql.dong.length} dòng):</span>
                    <div className="bang__xem-bang-cuon">
                      <table className="bang__xem-bang">
                        <thead>
                          <tr>
                            {ketQuaSql.cot.map((c) => (
                              <th key={c} scope="col">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {ketQuaSql.dong.slice(0, 10).map((row, r) => (
                            <tr key={r}>
                              {row.map((val, c) => (
                                <td key={c}>{val === null ? '(trống)' : String(val)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="doi-chat__xem-chan">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setTheDangXemId(null)}
              >
                Đóng
              </button>
              {!daTrinh.includes(theDangXem.id) ? (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    const id = theDangXem.id;
                    setTheDangXemId(null);
                    setChon(id);
                    onTrinh(id);
                  }}
                >
                  Trình thẻ này ngay
                </button>
              ) : (
                <span className="doi-chat__xem-da-trinh-nhan">Thẻ này đã trình trước đó</span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
