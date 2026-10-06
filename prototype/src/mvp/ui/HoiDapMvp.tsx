/**
 * MÀN HỎI NHÂN CHỨNG (gói B12, docs/mua-1/brief/b12-vu-1.md): giao diện của `[HỎI ĐÁP]`, luật chơi ở `engine/hoi-dap.ts`.
 * Trải nghiệm theo màn thử `tools/thu-hoi-dap/thu-hoi-dap.html` (user đã chơi và ưng), vẽ theo phong cách của game:
 *   - sân khấu như các màn nói chuyện khác (nền cảnh, chân dung nhân chứng đứng trên dàn, ManChoiMvp truyền người nói);
 *   - `HoiDapMvp`: khung hỏi đáp ở nửa dưới sân khấu: nhật ký kiểu chat, khu thao tác theo cách chơi (xem cả đoạn / bấm câu
 *     hỏi / gõ câu hỏi, đổi được ngay), trang sổ "Cần làm rõ" và giấy nhớ đã hỏi ra, nút rời đi, thẻ kết khi đã chào đi;
 *   - `BanDiCungHoiDapMvp`: bạn đi cùng ở góc phải (chỗ của khung "Đi cùng"), avatar bấm được để xin gợi ý, bóng thoại mọc từ
 *     avatar (gợi ý bậc 1, câu hỏi bấm được ở bậc 2, giữ lại khi rời đi với "Hỏi tiếp" / "Vẫn đi"). Avatar đứng yên, không nháy.
 * Điện thoại cầm dọc: khung chiếm nửa dưới; khi gõ (ô nhập có tiêu điểm) khung dời lên nửa trên để bàn phím ảo không che
 * nhật ký (CSS `.mvp-hoidap:focus-within`, viết cho cả `@media` hẹp lẫn `.game--portrait`).
 */
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { KhungHoiDapMvp } from '../engine/hoi-dap';
import type { HanhDongMvp } from '../engine/may';
import type { CachChoiMvp } from '../engine/trang-thai';
import { anhChanDung } from './anh-mvp';
import { useDienThoai } from './dien-thoai';
import './HoiDapMvp.css';

/** Mã ô nhập câu hỏi (nút "Hỏi tiếp" trong bóng thoại đưa tiêu điểm về đây). */
export const MA_O_HOI = 'mvp-hoidap-o';

const CACH_CHOI: { cach: CachChoiMvp; chu: string; ghi: string }[] = [
  { cach: 'tu-dong', chu: 'Xem cả đoạn', ghi: 'Bấm rồi đọc, nhân chứng tự kể.' },
  { cach: 'bam', chu: 'Bấm câu hỏi', ghi: 'Tự chọn hỏi gì, không phải gõ.' },
  { cach: 'go', chu: 'Gõ câu hỏi', ghi: 'Tự nghĩ câu hỏi và gõ ra.' },
];

export interface HoiDapMvpProps {
  kb: KichBanMvp;
  hoiDap: KhungHoiDapMvp;
  dienTen: (t: string) => string;
  /** Tên hiển thị của một người nói (nhân chứng chưa tự giới thiệu thì là cách gọi tạm). */
  tenNguoiNoi: (ma: string) => string;
  tenNguoiChoi: string;
  onHanhDong: (hd: HanhDongMvp) => void;
}

/** Ảnh mặt tròn cắt từ chân dung (dùng chung cách cắt và chỉnh tâm mặt của ô nhắc việc). */
function MatTron({ kb, ma, lop }: { kb: KichBanMvp; ma: string; lop?: string }) {
  const nv = kb.nhanVat.find((n) => n.id === ma);
  const url = anhChanDung(ma === 'player' ? 'nguoi-choi' : ma, ma === 'player' ? undefined : nv?.bieuCam[0]);
  return (
    <span className={`nhac-viec__mat mvp-hd-mat${lop ? ` ${lop}` : ''}`} data-nhan-vat={ma} aria-hidden="true">
      {url ? <img src={url} alt="" draggable={false} /> : <span className="mvp-hd-mat__chu">{(nv?.ten ?? '?').charAt(0)}</span>}
    </span>
  );
}

export function HoiDapMvp({ kb, hoiDap: h, dienTen, tenNguoiNoi, tenNguoiChoi, onHanhDong }: HoiDapMvpProps) {
  // Điện thoại: không có cách "Gõ câu hỏi" (dien-thoai.ts); ManChoiMvp đã đổi ván sang "bấm".
  const dienThoai = useDienThoai();
  const cachChoiHien = dienThoai ? CACH_CHOI.filter((c) => c.cach !== 'go') : CACH_CHOI;
  const [cau, setCau] = useState('');
  const [moSo, setMoSo] = useState(false);
  const nhatKyRef = useRef<HTMLOListElement>(null);
  const tenNc = tenNguoiNoi(h.nhanChung) || 'Nhân chứng';
  // Tên đứng giữa câu: "Bác Thịnh" thành "bác Thịnh", "Cô cán bộ" thành "cô cán bộ".
  const nc = tenNc.replace(/^(Bác|Cô|Chú|Bà|Anh|Chị|Cậu|Em|Nhân) /, (m) => m.toLowerCase());
  const soDong = h.nhatKy.length;
  useEffect(() => {
    const el = nhatKyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [soDong, h.cachChoi, h.daRoi]);

  const gui = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const c = cau.trim();
    if (!c || h.daDong) return;
    setCau('');
    onHanhDong({ type: 'hoi-dap-hoi', cau: c });
  };
  const daRo = h.danhSach.filter((d) => d.xong).length;
  const conMo = h.danhSach.length - daRo;
  const tuHoiRa = h.giayNho.filter((g) => g.an).length;
  const ghiCach = CACH_CHOI.find((c) => c.cach === h.cachChoi)?.ghi ?? '';

  const nutRoiDi = (
    <button type="button" className="btn mvp-hoidap__di" onClick={() => onHanhDong({ type: 'hoi-dap-roi-di' })}>
      {dienTen(h.nutRoiDi)}
    </button>
  );
  const nutKeNot = (chu: string) => (
    <button type="button" className="btn mvp-hoidap__ke" onClick={() => onHanhDong({ type: 'hoi-dap-ke-tiep' })} disabled={!h.conKe && !h.caDoan}>
      {chu}
    </button>
  );

  let thaoTac: ReactNode;
  if (h.daRoi) {
    thaoTac = (
      <div className="mvp-hoidap__ket" role="status">
        <p>
          {h.danhSach.length === 0
            ? `Bạn chào ${nc}${tuHoiRa > 0 ? `, mang về ${tuHoiRa} điều tự hỏi ra.` : '.'}`
            : `Bạn chào ${nc} khi đã rõ ${daRo} trên ${h.danhSach.length} điều trong sổ${tuHoiRa > 0 ? `, và tự hỏi ra thêm ${tuHoiRa} điều ngoài sổ.` : '.'}`}
          {conMo > 0 ? ` Điều còn thiếu vẫn nằm trong sổ; muốn rõ thì phải quay lại gặp ${nc}.` : ''}
        </p>
        <button type="button" className="btn btn--primary mvp-hoidap__tiep" onClick={() => onHanhDong({ type: 'tiep' })} autoFocus>
          Đi tiếp
        </button>
      </div>
    );
  } else if (h.cachChoi === 'tu-dong') {
    thaoTac = (
      <>
        <div className="mvp-hoidap__hang">
          {nutKeNot(h.caDoan ? `Nghe ${nc} kể` : h.conKe ? 'Nghe kể tiếp' : 'Đã kể hết đoạn')}
          {nutRoiDi}
        </div>
        <p className="mvp-hoidap__ghi">
          {h.caDoan ? `Bấm "Nghe ${nc} kể" để đọc cả đoạn như lời kể thường. Muốn tự hỏi thì chọn "Bấm câu hỏi" hoặc "Gõ câu hỏi" ở trên.` : h.conKe ? `Bấm một lần, ${nc} kể một điều.` : `${tenNc} đã kể hết đoạn viết sẵn.`}
        </p>
      </>
    );
  } else if (h.cachChoi === 'bam') {
    thaoTac = (
      <>
        <div className="mvp-hoidap__cau-bam" role="group" aria-label="Câu hỏi bấm được">
          {h.cauBam.map((c) => (
            <button key={c.lop} type="button" className="mvp-hoidap__chip" disabled={h.daDong} onClick={() => onHanhDong({ type: 'hoi-dap-hoi', cau: c.cau, lop: c.lop })}>
              {dienTen(c.cau)}
            </button>
          ))}
        </div>
        <div className="mvp-hoidap__hang">
          {h.daDong && h.conKe ? nutKeNot('Nghe kể nốt') : null}
          {nutRoiDi}
        </div>
        <p className="mvp-hoidap__ghi">{h.daDong ? `${tenNc} không trả lời thêm nữa.` : 'Bấm câu nào, hỏi câu ấy. Có câu chỉ hiện ra sau khi biết điều liên quan.'}</p>
      </>
    );
  } else {
    thaoTac = (
      <>
        <form className="mvp-hoidap__go" onSubmit={gui}>
          <label className="visually-hidden" htmlFor={MA_O_HOI}>
            Câu hỏi cho {nc}
          </label>
          <input
            id={MA_O_HOI}
            type="text"
            value={cau}
            onChange={(e) => setCau(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            maxLength={160}
            autoComplete="off"
            enterKeyHint="send"
            placeholder={h.daDong ? `${tenNc} không trả lời thêm nữa.` : `Gõ câu hỏi cho ${nc}…`}
            disabled={h.daDong}
          />
          <button type="submit" className="btn btn--primary" disabled={h.daDong || !cau.trim()}>
            Hỏi
          </button>
        </form>
        <div className="mvp-hoidap__hang">
          {h.daDong && h.conKe ? nutKeNot('Nghe kể nốt') : null}
          {nutRoiDi}
        </div>
        <p className="mvp-hoidap__ghi">{h.daDong ? 'Hết lượt hỏi. Vẫn có thể nghe kể nốt hoặc chào để đi.' : 'Hỏi mở cũng được. Bí thì bấm vào bạn đi cùng ở góc phải. Thấy đủ thì chào mà đi.'}</p>
      </>
    );
  }

  return (
    <section className={`mvp-hoidap${moSo ? ' is-mo-so' : ''}`} aria-label={`Hỏi chuyện ${nc}`} onClick={(e) => e.stopPropagation()}>
      <div className="mvp-hoidap__chinh">
        <header className="mvp-hoidap__dau">
          <div className="mvp-hoidap__ten">
            <span className="mvp-hoidap__nhan">Hỏi chuyện</span>
            <b>{tenNc}</b>
            {h.conLuot !== null && !h.daRoi ? <small className="mvp-hoidap__luot">{h.daDong ? 'Hết lượt hỏi' : `Còn ${h.conLuot} câu`}</small> : null}
          </div>
          <div className="mvp-hoidap__cach" role="group" aria-label="Cách chơi">
            {cachChoiHien.map((c) => (
              <button key={c.cach} type="button" aria-pressed={h.cachChoi === c.cach} title={c.ghi} onClick={() => onHanhDong({ type: 'doi-cach-choi', cach: c.cach })}>
                {c.chu}
              </button>
            ))}
          </div>
          <button type="button" className="mvp-hoidap__nut-so" aria-expanded={moSo} aria-controls="mvp-hoidap-so" onClick={() => setMoSo((v) => !v)}>
            Sổ{conMo > 0 ? ` · ${conMo} chưa rõ` : ' · đủ'}
          </button>
        </header>
        <ol ref={nhatKyRef} className="mvp-hoidap__nhatky" role="log" aria-live="polite" aria-label="Nhật ký hỏi đáp">
          {h.nhatKy.map((d, i) =>
            d.ai === 'narrator' ? (
              <li key={i} className="mvp-hoidap__dan">
                {dienTen(d.chu)}
              </li>
            ) : d.ai === 'player' ? (
              <li key={i} className="mvp-hoidap__ban">
                <span className="visually-hidden">{tenNguoiChoi || 'Bạn'}: </span>
                <p>{dienTen(d.chu)}</p>
              </li>
            ) : (
              <li key={i} className={`mvp-hoidap__nc${d.moi ? ' is-moi' : ''}`} data-nhan-vat={d.ai}>
                <MatTron kb={kb} ma={d.ai} />
                <div>
                  <b>{tenNguoiNoi(d.ai)}</b>
                  <p>{dienTen(d.chu)}</p>
                </div>
              </li>
            ),
          )}
        </ol>
        <div className="mvp-hoidap__thao-tac">
          {thaoTac}
          {!h.daRoi ? <p className="mvp-hoidap__ghi mvp-hoidap__ghi--cach">{ghiCach}</p> : null}
        </div>
      </div>
      <aside id="mvp-hoidap-so" className="mvp-hoidap__so" aria-label="Sổ CLB: cần làm rõ">
        <div className="mvp-hoidap__so-dau">
          <span className="mvp-hoidap__nhan">Sổ CLB</span>
          <h3>Cần làm rõ</h3>
          <button type="button" className="mvp-hoidap__so-dong" onClick={() => setMoSo(false)} aria-label="Đóng sổ">
            ×
          </button>
        </div>
        <ul className="mvp-hoidap__ds">
          {h.danhSach.map((d) => (
            <li key={d.ma} className={d.xong ? 'is-xong' : undefined}>
              <span className="mvp-hoidap__o" aria-hidden="true">
                {d.xong ? '✓' : ''}
              </span>
              <span>
                {d.xong ? <span className="visually-hidden">Đã rõ: </span> : null}
                {dienTen(d.cau)}
                {!d.xong && d.motPhan ? <small>Mới rõ một nửa.</small> : null}
              </span>
            </li>
          ))}
        </ul>
        {h.du && !h.daRoi ? <p className="mvp-hoidap__du">Các dòng đã gạch cả. Ở lại hỏi thêm hay chào mà đi là do bạn quyết.</p> : null}
        <h4>Giấy nhớ</h4>
        <ul className="mvp-hoidap__giay">
          {h.giayNho.length === 0 ? <li className="is-trong">Chưa có gì. Hỏi ra điều nào, điều ấy thành một tờ giấy nhớ ở đây.</li> : null}
          {h.giayNho.map((g) => (
            <li key={g.duKien} className={g.an ? 'is-an' : undefined}>
              {dienTen(g.chu)}
              {g.an ? <small> · tự hỏi ra</small> : null}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

export interface BanDiCungHoiDapMvpProps {
  kb: KichBanMvp;
  hoiDap: KhungHoiDapMvp;
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  onHanhDong: (hd: HanhDongMvp) => void;
}

/** Bạn đi cùng ở góc phải trong buổi hỏi: avatar bấm được (xin gợi ý) và bóng thoại mọc từ avatar. */
export function BanDiCungHoiDapMvp({ kb, hoiDap: h, dienTen, tenNguoiNoi, onHanhDong }: BanDiCungHoiDapMvpProps) {
  const b = h.bong;
  const dongBong = (): void => onHanhDong({ type: 'hoi-dap-dong-bong' });
  const loi = b ? (b.kieu === 'goi-y-2' ? 'Thử hỏi thế này xem.' : (b.loi ?? '')) : '';
  return (
    <aside className="mvp-hd-ban" aria-label="Bạn đi cùng" onClick={(e) => e.stopPropagation()}>
      <div className="mvp-hd-ban__mat">
        {h.to.nguoiDiCung.map((ma) => (
          <button
            key={ma}
            type="button"
            className={`mvp-hd-ban__nguoi${b?.ai === ma ? ' is-noi' : ''}`}
            data-nhan-vat={ma}
            disabled={h.daRoi}
            aria-label={`Hỏi ý ${tenNguoiNoi(ma)}`}
            title={`Hỏi ý ${tenNguoiNoi(ma)}`}
            onClick={() => onHanhDong({ type: 'hoi-dap-goi-y' })}
          >
            <MatTron kb={kb} ma={ma} />
          </button>
        ))}
      </div>
      {b ? (
        <div className="mvp-hd-ban__bong" role="status" data-kieu={b.kieu} data-nhan-vat={b.ai}>
          <b>{tenNguoiNoi(b.ai)}</b>
          <p>
            {dienTen(loi)}
            {b.kieu === 'giu-lai' && b.dongThieu ? <q>{dienTen(b.dongThieu)}</q> : null}
          </p>
          {b.kieu === 'goi-y-2' && b.cauHoi && b.duKien ? (
            <button type="button" className="mvp-hd-ban__hoi" onClick={() => onHanhDong({ type: 'hoi-dap-hoi', cau: b.cauHoi!, lop: b.duKien! })} disabled={h.daDong}>
              {dienTen(b.cauHoi)}
            </button>
          ) : null}
          {b.kieu === 'giu-lai' ? (
            <div className="mvp-hd-ban__nut">
              <button
                type="button"
                className="mvp-hd-ban__hoi"
                onClick={() => {
                  dongBong();
                  document.getElementById(MA_O_HOI)?.focus();
                }}
              >
                Hỏi tiếp
              </button>
              <button type="button" className="mvp-hd-ban__hoi" onClick={() => onHanhDong({ type: 'hoi-dap-roi-di' })}>
                Vẫn đi
              </button>
            </div>
          ) : null}
          <button type="button" className="mvp-hd-ban__dong" onClick={dongBong}>
            Đóng
          </button>
        </div>
      ) : null}
    </aside>
  );
}
