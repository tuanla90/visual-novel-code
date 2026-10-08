/**
 * CẢNH KHÁM PHÁ (`[KHÁM PHÁ]`, đặc tả §18.6) — nền của cảnh đang đứng với các vật / người bấm được, dùng chung lớp CSS
 * với màn trong địa điểm (`NoiMvp`): khung giữ tỉ lệ ảnh, điểm đặt theo % (chân ảnh), vuốt ngang trên điện thoại dọc.
 *
 * Khác `NoiMvp`: không tốn khung, nút rời cảnh chỉ có khi máy cho (gói B13, xem dưới); chỗ CHƯA xem luôn sáng viền trắng (cảnh dạy người chơi bấm vật),
 * chỗ đã xem mờ đi; chỗ có "sau:" hiện dần (máy đã lọc, xem `diemDangHien`). Nhãn qua `nhanDiemKhamPha` — không lộ nội dung.
 *
 * Ba kiểu (02/10/2026, user chốt):
 *   - cảnh thường: như trên; người (`nv:`) có nhãn tên dưới chân, điểm có `dấu:` mang huy hiệu ! (việc chính) / ? (tùy chọn) —
 *     dùng cho PHÒNG CLB có 3–4 người để bấm vào nói chuyện;
 *   - `bản đồ`: nền là bản đồ trường, mỗi điểm `ghim:<mã>` là một ghim nơi đến có tên, dấu ! / ?, và ẢNH MẶT những người đang ở đó
 *     (`có:`) — chỉ hiện người đã gặp và đã biết lịch (thẻ nhân vật có dòng "Lịch");
 *   - `quan sát <nv>`: chân dung nhân vật phóng to, mỗi điểm `vung:<mã>` là một chi tiết để soi (kiểu Sherlock Holmes).
 *   - `dàn` (gói B19, user 08/10: cảnh đông người dùng chân dung đã duyệt, không vẽ ảnh nhóm): nền cảnh đang đứng, chân dung những
 *     người bấm được đứng một hàng trên dàn (quá 6 người thì hàng sau nhỏ hơn), quầng sáng khi rê / chạm, nhãn dưới chân, dấu ! / ?.
 *
 * 03/10/2026 (user): màn `· Hà Vy soi` KHÔNG mồi kính lúp nữa: chi tiết ẩn, rê chuột (hay chạm) qua đúng chỗ mới hiện kính.
 * Lần soi đầu (mở đầu, chưa có Hà Vy) vẫn hiện kính để dạy thao tác.
 * 05/10/2026 (gói B12, user): chi tiết ẩn KHÔNG nháy, không phát sáng dù để lâu; muốn biết việc chính hay cần gợi ý thì hỏi bạn
 * đi cùng. Dấu "!" / "?" của điểm bấm giữ nguyên.
 * 05/10/2026 (gói B13, user: "cho user freely khám phá"): bộ mùa 1 có nút rời cảnh do máy cho (`roi`): "Về bản đồ" ở nơi tới từ
 * bản đồ, "Đi tiếp" ở cảnh khác khi việc chính đã xong mà còn chỗ chưa xem. Máy không tự đẩy người chơi đi nữa.
 * 06/10/2026 (gói B15): ghim nơi đã ghé và nhân chứng đã gặp vẫn bấm được (`vaoLai`: vào lại cảnh / hỏi lại). Việc chính của ngày
 * xong thì có nút hết ngày (`hetNgay`) ở góc TRÁI dưới, màu đêm, khác hẳn nút "Về bản đồ" ở góc phải dưới; còn ghim có dấu chưa
 * ghé thì hỏi lại một câu trước khi hết ngày.
 * 06/10/2026 (gói B17): dấu theo mức nhập vai (`mucNhapVai`, luật ở `engine/muc-choi.ts`): "Có người dẫn" thêm một chấm nhỏ tĩnh
 * trên mọi vật bấm được (kể cả chi tiết ẩn); "Tự dò" bỏ dấu và viền sáng trên vật; "Như thật" bỏ cả dấu trên ghim và người. Thiếu
 * (bộ MVP) = như cũ.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { DiemKhamPhaMvp, KichBanMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { DiemKhamPhaHienMvp } from '../engine/may';
import { dauTheoMuc } from '../engine/muc-choi';
import type { MucNhapVaiMvp } from '../engine/trang-thai';
import { danhSoTrung, nhanDiemKhamPha } from '../engine/nhan-cho-xem';
import { anhChanDung, anhNen, anhSprite, anhTheoTen } from './anh-mvp';
import { dangO } from '../engine/lich-nhan-vat';
import { BAN_DO_MVP, TI_LE_NEN } from './ban-do-mvp';
import { DAO_CU_CANH } from './dao-cu-canh';
import './b19.css';

export interface KhamPhaMvpProps {
  kb: KichBanMvp;
  /** Mã nút `[KHÁM PHÁ]` (khóa để cuộn giữa ảnh một lần). */
  id: string;
  canh: string;
  diem: DiemKhamPhaHienMvp[];
  onXem: (chuoi: string) => void;
  /** `dan` (gói B19): chân dung những người bấm được đứng trên dàn của cảnh. */
  kieu?: 'ban-do' | 'quan-sat' | 'dan';
  /** Kiểu `quan-sat`: nhân vật được soi. */
  nhanVat?: string;
  /** Nhân vật đã gặp (đã hiện thẻ giới thiệu) — bản đồ chỉ hiện ảnh mặt của người đã gặp và có "Lịch". */
  daGap?: readonly string[];
  /** Bản đồ: ngày trong truyện (vd "Thứ Tư, 11/09") hiện trên đầu — lịch của nhân vật tính theo thứ. */
  homNay?: string;
  /** Bản đồ: thứ trong truyện (0 = Chủ nhật) và giờ ("HH:MM") — ai đang ở ghim nào tính theo lịch "Thường ở". */
  thu?: number;
  gio?: string;
  /** Quan sát: dáng / bộ đồ của nhân vật được soi (thiếu = dáng đầu tiên). */
  dang?: string;
  /** Quan sát: mở bằng cảnh cắt đôi mắt Hà Vy, kính lóe sáng, rồi các điểm soi mới hiện (user chốt 02/10/2026). */
  haVySoi?: boolean;
  /** Gói B13: nút rời cảnh ("Về bản đồ" / "Đi tiếp"); `null` / thiếu = không có nút. */
  roi?: { kieu: 've-ban-do' | 'di-tiep'; nhan: string } | null;
  onRoi?: () => void;
  /** Gói B15: nút hết ngày (nhãn của dòng `[HẾT NGÀY]`); `conChuaGhe` > 0 thì hỏi lại trước. `null` / thiếu = không có nút. */
  hetNgay?: { nhan: string; conChuaGhe: number } | null;
  onHetNgay?: () => void;
  /** Gói B17 (bộ mùa 1): mức nhập vai quyết định dấu nào hiện. Thiếu = như cũ (bộ MVP). */
  mucNhapVai?: MucNhapVaiMvp;
}

/** Nút hết ngày (gói B15): bấm là hết ngày; còn nơi có dấu chưa ghé thì mở một câu hỏi lại ngắn ngay trên nút. */
function NutHetNgay({ hetNgay, onHetNgay }: { hetNgay: { nhan: string; conChuaGhe: number }; onHetNgay: () => void }) {
  const [hoi, setHoi] = useState(false);
  const het = (): void => {
    soundEngine.playSfx('select');
    setHoi(false);
    onHetNgay();
  };
  return (
    <div className="mvp-canh__het-ngay">
      {hoi ? (
        <div className="mvp-canh__het-ngay-hoi" role="alertdialog" aria-label="Hết ngày khi còn nơi chưa ghé">
          <p>Còn {hetNgay.conChuaGhe} nơi chưa ghé. Hết ngày luôn chứ?</p>
          <div className="mvp-canh__het-ngay-chon">
            <button type="button" className="btn" onClick={() => setHoi(false)}>
              Ở lại đã
            </button>
            <button type="button" className="btn btn--primary" onClick={het}>
              Hết ngày
            </button>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="btn mvp-canh__nut mvp-canh__het-ngay-nut"
        aria-expanded={hetNgay.conChuaGhe > 0 ? hoi : undefined}
        title="Hết ngày"
        onClick={() => {
          if (hetNgay.conChuaGhe > 0) {
            soundEngine.playSfx('select');
            setHoi((v) => !v);
          } else het();
        }}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
        <span>{hetNgay.nhan}</span>
      </button>
    </div>
  );
}

/**
 * PHÒNG CLB CÓ NGƯỜI NGỒI (user 03/10/2026: "ảnh 4 thành viên đang ngồi ở chỗ thay vì 4 cái ảnh đứng sừng sững"): cảnh phòng CLB
 * mà các người để bấm là thành viên CLB thì nền là ảnh họ đang ngồi (`bg-mvp-phong-clb-ngoi-<mã những người có mặt>`), mỗi người
 * là một vùng bấm đúng chỗ ngồi. Khách (Nam, Quân…) vẫn đứng như cũ. Không có ảnh khớp nhóm người → về cách cũ.
 * Vùng ngồi tính theo % ảnh 1360×768 (ảnh do Topview sửa từ nền phòng CLB, art/nguon/topview-2026-10-03) = khung bao ảnh viền
 * `vien-ngoi-<mã người>.webp` (viền trắng vẽ sẵn theo dáng người, tách từ lớp "chỉ giữ người" của Topview; ba ảnh ngồi chung chỗ).
 */
const CHO_NGOI: Record<string, { x: number; y: number; rong: number; cao: number }> = {
  duy: { x: 2.43, y: 17.84, rong: 18.01, cao: 50.91 },
  'ha-vy': { x: 30.96, y: 22.66, rong: 13.97, cao: 56.25 },
  'minh-anh': { x: 55.29, y: 17.06, rong: 12.79, cao: 28.65 },
  tung: { x: 67.5, y: 24.09, rong: 23.24, cao: 74.61 },
};
const THU_TU_NGOI = Object.keys(CHO_NGOI);

/** Ảnh phòng CLB có đúng những thành viên này ngồi (thiếu thì `undefined`). */
function anhPhongNgoi(canh: string, nguoi: readonly string[]): string | undefined {
  if (canh !== 'phong-clb' || nguoi.length === 0) return undefined;
  return anhTheoTen(`bg-mvp-phong-clb-ngoi-${maNgoi(nguoi)}`);
}

function maNgoi(nguoi: readonly string[]): string {
  return THU_TU_NGOI.filter((n) => nguoi.includes(n)).join('-');
}


const DAU: Record<NonNullable<DiemKhamPhaMvp['dau']>, { chu: string; doc: string }> = {
  chinh: { chu: '!', doc: 'việc chính' },
  phu: { chu: '?', doc: 'chuyện thêm' },
};

function HuyHieu({ d, hien = true }: { d: DiemKhamPhaHienMvp; hien?: boolean }) {
  if (!hien || !d.diem.dau || d.daXem) return null;
  return (
    <span className={`mvp-dau mvp-dau--${d.diem.dau}`} aria-hidden="true">
      {DAU[d.diem.dau].chu}
    </span>
  );
}

/** Cảnh cắt "Hà Vy quan sát": hiện khoảng 1,7 giây lúc vừa vào màn soi (chưa soi điểm nào), bấm để bỏ qua. */
function useCatCanhHaVy(bat: boolean): { dang: boolean; boQua: () => void } {
  const [dang, setDang] = useState(bat);
  useEffect(() => {
    if (!dang) return;
    soundEngine.playSfx('chime');
    const id = window.setTimeout(() => setDang(false), 1700);
    return () => window.clearTimeout(id);
  }, [dang]);
  return { dang, boQua: () => setDang(false) };
}

export function KhamPhaMvp({ kb, id, canh, diem, onXem: xem, kieu, nhanVat, daGap = [], homNay: _homNay, thu, gio, dang, haVySoi, roi, onRoi, hetNgay, onHetNgay, mucNhapVai }: KhamPhaMvpProps) {
  const catCanh = useCatCanhHaVy(!!haVySoi && kieu === 'quan-sat' && diem.every((d) => !d.daXem));
  // Gói B17: dấu "!" / "?" chỉ hiện ở loại điểm mà mức nhập vai cho (ghim / người / vật); không có mức thì hiện hết như cũ.
  const dauMuc = mucNhapVai ? dauTheoMuc(mucNhapVai) : null;
  const laGhim = (d: DiemKhamPhaMvp): boolean => kieu === 'ban-do' || d.sprite.startsWith('ghim:');
  const coDau = (d: DiemKhamPhaMvp): boolean => !dauMuc || dauMuc[laGhim(d) ? 'ghim' : d.sprite.startsWith('nv:') ? 'nguoi' : 'vat'];
  const onXem = (chuoi: string): void => {
    soundEngine.playSfx('select');
    xem(chuoi);
  };
  // Không còn nút "Danh sách" (user chốt 02/10/2026): danh sách chữ làm lộ chi tiết ẩn; mỗi chỗ bấm vẫn có nhãn đọc cho trình đọc màn hình.
  const vungRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const v = vungRef.current;
    if (!v || v.scrollWidth <= v.clientWidth) return;
    // Màn hẹp phải vuốt ngang: mở ra ở chỗ có dấu ! (việc chính) để người chơi không phải đi tìm; không có thì giữa ảnh.
    const chinh = v.querySelector<HTMLElement>('[data-chinh="1"]');
    if (chinh) {
      const r = chinh.getBoundingClientRect();
      const rv = v.getBoundingClientRect();
      v.scrollLeft = Math.max(0, Math.min(v.scrollWidth - v.clientWidth, v.scrollLeft + r.left + r.width / 2 - (rv.left + rv.width / 2)));
    } else v.scrollLeft = (v.scrollWidth - v.clientWidth) / 2;
  }, [id]);
  const tenCanh = kb.canh.find((c) => c.id === canh)?.ten ?? '';
  const nv = nhanVat ? kb.nhanVat.find((n) => n.id === nhanVat) : undefined;
  const laBanDo = kieu === 'ban-do';
  const laQuanSat = kieu === 'quan-sat';
  const laDan = kieu === 'dan';
  // Màn quan sát: mặt bàn thám tử (ảnh ui-nen-quan-sat), chân dung nằm trong khung ảnh ghim; vòng soi là chiếc kính lúp.
  const nen = laBanDo ? BAN_DO_MVP.anh : laQuanSat ? (anhTheoTen('ui-nen-quan-sat') ?? anhNen(canh)) : anhNen(canh);
  const kinhLup = anhTheoTen('ui-kinh-lup');
  const tiLe = laBanDo ? { rong: BAN_DO_MVP.rong, cao: BAN_DO_MVP.cao } : TI_LE_NEN;
  const soDe = { '--ti-le': `${tiLe.rong} / ${tiLe.cao}`, '--ti-le-so': tiLe.rong / tiLe.cao } as CSSProperties;
  const nhan = danhSoTrung(diem.map((d) => nhanDiemKhamPha(kb, d.diem)));
  const nhanDoc = (i: number, d: DiemKhamPhaHienMvp): string => `${nhan[i] ?? ''}${d.diem.dau && !d.daXem && coDau(d.diem) ? ` (${DAU[d.diem.dau].doc})` : ''}`;
  const tieuDe = laBanDo ? 'Đi đâu bây giờ?' : laQuanSat ? `Quan sát ${nv?.trongCau ?? ''}` : tenCanh;
  // User 06/10: bỏ thời gian trên bản đồ vì góc trên bên trái HUD đã có; tránh đè với bạn đi cùng.
  const phu = '';
  /** Người đang ở một nơi mà người chơi ĐÃ BIẾT: đã gặp và thẻ nhân vật có dòng "Lịch". */
  const nguoiBiet = (d: DiemKhamPhaMvp): string[] => {
    // Người kịch bản đặt ở đây (`có:`) cộng người lịch "Thường ở" đặt ở ghim này vào thứ, giờ của bản đồ.
    const theoLich = thu !== undefined && gio && d.sprite.startsWith('ghim:') ? dangO(kb.nhanVat, thu, gio, d.sprite.slice(5)) : [];
    return [...new Set([...(d.co ?? []), ...theoLich])].filter((n) => daGap.includes(n) && !!kb.nhanVat.find((x) => x.id === n)?.gioiThieu?.lich);
  };

  const anhQuanSat = laQuanSat && nhanVat ? anhChanDung(nhanVat, dang ?? nv?.bieuCam[0]) : undefined;
  const thanhVienNgoi = !laBanDo && !laQuanSat ? diem.map((d) => d.diem.sprite).filter((sp) => sp.startsWith('nv:') && sp.slice(3) in CHO_NGOI).map((sp) => sp.slice(3)) : [];
  const nenNgoi = anhPhongNgoi(canh, thanhVienNgoi);
  const anhMatVy = anhTheoTen('cat-canh-ha-vy-mat');

  return (
    <div className={`mvp-canh mvp-khampha${laBanDo ? ' mvp-bando' : ''}${laQuanSat ? ' mvp-soinv' : ''}${dauMuc?.cham ? ' mvp-khampha--cham' : ''}${dauMuc && !dauMuc.vat ? ' mvp-khampha--khong-dau-vat' : ''}`} role="region" aria-label={laBanDo ? 'Bản đồ trường' : laQuanSat ? tieuDe : `Khám phá: ${tenCanh}`}>
      {nen ? <div className={`mvp-canh__mo${laBanDo ? ' mvp-bando__mo' : ''}${laQuanSat ? ' mvp-soinv__ban' : ''}${laDan ? ' mvp-dan__nen' : ''}`} style={{ backgroundImage: `url("${nen}")` }} aria-hidden="true" /> : null}
      <div className="mvp-canh__dau">
        <div className="mvp-canh__tieude">
          <h2>{tieuDe}</h2>
          {phu ? <p>{phu}</p> : null}
        </div>
      </div>
      {/* Nút rời cảnh nằm góc phải dưới: góc phải trên là chỗ của khung "Đi cùng" (.mvp-stage__canh-ban). */}
      {roi && onRoi ? (
        <button
          type="button"
          className={`btn mvp-canh__nut mvp-canh__roi mvp-canh__roi--${roi.kieu}`}
          onClick={() => {
            soundEngine.playSfx('select');
            onRoi();
          }}
        >
          {roi.kieu === 've-ban-do' ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
          <span>{roi.nhan}</span>
        </button>
      ) : null}
      {/* Nút hết ngày (gói B15) nằm góc trái dưới: không dưới khung "Đi cùng" (phải trên), không đè "Về bản đồ" (phải dưới). */}
      {hetNgay && onHetNgay && !laQuanSat ? <NutHetNgay key={id} hetNgay={hetNgay} onHetNgay={onHetNgay} /> : null}

      {laDan ? (
        <div className="mvp-dan" data-so-nguoi={diem.length}>
          <div className={`mvp-dan__hang${diem.length > 6 ? ' is-hai-hang' : ''}`}>
            {diem.map((d, i) => {
              const [ma = '', bc] = d.diem.sprite.startsWith('nv:') ? d.diem.sprite.slice(3).split('/') : [''];
              const nvDan = kb.nhanVat.find((n) => n.id === ma);
              const url = anhChanDung(ma, bc ?? nvDan?.bieuCam[0]);
              const tenDan = d.diem.nhan ? d.diem.nhan.split(':')[0] : (nvDan?.ten ?? ma);
              return (
                <button
                  key={d.diem.chuoi}
                  type="button"
                  className={`mvp-dan__nguoi${d.daXem ? ' is-da-xem' : ''}${d.vaoLai ? ' is-vao-lai' : ''}${diem.length > 6 && i < diem.length - 6 ? ' is-hang-sau' : ''}`}
                  aria-label={nhanDoc(i, d)}
                  title={`${nhan[i] ?? ''}${d.diem.dau && !d.daXem && coDau(d.diem) ? ` (${DAU[d.diem.dau].doc})` : ''}${d.vaoLai ? ', hỏi lại được' : d.daXem ? ' — đã xem' : ''}`}
                  disabled={d.daXem && !d.vaoLai}
                  data-diem={d.diem.chuoi}
                  data-chinh={d.diem.dau === 'chinh' && !d.daXem && coDau(d.diem) ? '1' : undefined}
                  onClick={() => onXem(d.diem.chuoi)}
                >
                  {url ? <img className="mvp-dan__anh" src={url} alt="" draggable={false} /> : <span className="mvp-dan__tam" aria-hidden="true" />}
                  <HuyHieu d={d} hien={coDau(d.diem)} />
                  <span className="mvp-dan__ten">{tenDan}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : laQuanSat ? (
        <div className={`mvp-soinv__vung${catCanh.dang ? ' dang-cat-canh' : ''}${haVySoi ? ' co-ha-vy' : ''}`} data-soi-an={haVySoi ? '1' : undefined}>
          {catCanh.dang ? (
            <button type="button" className="mvp-catcanh" onClick={catCanh.boQua} aria-label="Hà Vy quan sát — bấm để bỏ qua">
              <span className="mvp-catcanh__dai">
                {anhMatVy ? <img className="mvp-catcanh__anh" src={anhMatVy} alt="" draggable={false} /> : null}
                <span className="mvp-catcanh__loe" aria-hidden="true" />
                <span className="mvp-catcanh__chu">
                  Hà Vy quan sát
                  <span className="mvp-catcanh__phu">Nhìn cả chỗ không ai để ý</span>
                </span>
              </span>
            </button>
          ) : null}
          <div className="mvp-soinv__khung">
            {anhQuanSat ? <img className="mvp-soinv__anh" src={anhQuanSat} alt={`Chân dung ${nv?.ten ?? ''}`} draggable={false} /> : <div className="mvp-soinv__anh mvp-stage__nen-tam" />}
            {diem.map((d, i) => (
              <button
                key={d.diem.chuoi}
                type="button"
                className={`mvp-soi${d.daXem ? ' is-da-xem' : ''}${haVySoi ? ' mvp-soi--an' : ''}`}
                style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` }}
                aria-label={nhanDoc(i, d)}
                title={`${nhan[i] ?? ''}${d.daXem ? ' — đã soi' : ''}`}
                disabled={d.daXem}
                data-diem={d.diem.chuoi}
                onClick={() => onXem(d.diem.chuoi)}
              >
                {kinhLup ? <img className="mvp-soi__kinh" src={kinhLup} alt="" draggable={false} /> : <span className="mvp-soi__vong" aria-hidden="true" />}
                {d.daXem ? <span className="mvp-soi__nhan">{nhan[i]}</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mvp-canh__vung" ref={vungRef}>
          <div className={`mvp-canh__khung${laBanDo ? ' mvp-bando__khung' : ''}${nenNgoi ? ' is-ngoi' : ''}`} style={soDe}>
            {nenNgoi ?? nen ? <img className="mvp-canh__nen" src={nenNgoi ?? nen} alt="" draggable={false} /> : <div className="mvp-canh__nen mvp-stage__nen-tam" />}
            {(!laBanDo && !laQuanSat ? (DAO_CU_CANH[canh] ?? []).filter((dc) => !diem.some((d) => d.diem.sprite === dc.sprite)) : []).map((dc) => {
              const url = anhSprite(dc.sprite);
              if (!url) return null;
              const style = { left: `${dc.x}%`, top: `${dc.y}%`, width: `${dc.rong}%` } as CSSProperties;
              return (
                <div
                  key={dc.sprite}
                  className="mvp-diem mvp-diem--khampha is-cho"
                  style={style}
                  aria-hidden="true"
                >
                  <img className="mvp-diem__anh" src={url} alt="" draggable={false} />
                </div>
              );
            })}
            {diem.map((d, i) => {
              const ngoi = nenNgoi && d.diem.sprite.startsWith('nv:') ? CHO_NGOI[d.diem.sprite.slice(3)] : undefined;
              if (ngoi) {
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-ngoi${d.daXem ? ' is-da-xem' : ''}${d.vaoLai ? ' is-vao-lai' : ''}`}
                    style={{ left: `${ngoi.x}%`, top: `${ngoi.y}%`, width: `${ngoi.rong}%`, height: `${ngoi.cao}%` }}
                    aria-label={nhanDoc(i, d)}
                    title={`${nhan[i] ?? ''}${d.vaoLai ? ', hỏi lại được' : d.daXem ? ' — đã nói chuyện' : ''}`}
                    disabled={d.daXem && !d.vaoLai}
                    data-diem={d.diem.chuoi}
                    data-chinh={d.diem.dau === 'chinh' && !d.daXem && coDau(d.diem) ? '1' : undefined}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    {anhTheoTen(`vien-ngoi-${d.diem.sprite.slice(3)}`) ? (
                      <img className="mvp-ngoi__vien" src={anhTheoTen(`vien-ngoi-${d.diem.sprite.slice(3)}`)} alt="" draggable={false} />
                    ) : null}
                    <HuyHieu d={d} hien={coDau(d.diem)} />
                    <span className="mvp-ngoi__ten">{kb.nhanVat.find((n) => n.id === d.diem.sprite.slice(3))?.ten}</span>
                  </button>
                );
              }
              if (laBanDo || d.diem.sprite.startsWith('ghim:')) {
                const nguoi = nguoiBiet(d.diem);
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-ghim${d.daXem ? ' is-xong' : ''}${d.vaoLai ? ' is-vao-lai' : ''}${d.diem.dau && !d.daXem && coDau(d.diem) ? ` is-${d.diem.dau}` : ''}${d.diem.x >= 80 ? ' mvp-ghim--phai' : d.diem.x <= 20 ? ' mvp-ghim--trai' : ''}`}
                    style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%` }}
                    aria-label={`${nhanDoc(i, d)}${nguoi.length > 0 ? ` — đang ở đây: ${nguoi.map((n) => kb.nhanVat.find((x) => x.id === n)?.ten ?? n).join(', ')}` : ''}${d.daXem ? ' — đã ghé' : ''}${d.xemHet ? ', đã xem hết' : ''}${d.vaoLai ? ', vào lại được' : ''}`}
                    title={`${nhan[i] ?? ''}${d.diem.dau && !d.daXem && coDau(d.diem) ? ` (${DAU[d.diem.dau].doc})` : ''}${d.daXem ? ' — đã ghé' : ''}${d.xemHet ? ', đã xem hết' : ''}${d.vaoLai ? ', vào lại được' : ''}`}
                    disabled={d.daXem && !d.vaoLai}
                    data-diem={d.diem.chuoi}
                    data-chinh={d.diem.dau === 'chinh' && !d.daXem && coDau(d.diem) ? '1' : undefined}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    <HuyHieu d={d} hien={coDau(d.diem)} />
                    {/* Gói B15: nơi đã ghé và đã xem hết mọi chỗ mang dấu tích; nơi đã ghé mà còn chỗ chưa xem thì không dấu. */}
                    {d.daXem && d.xemHet ? (
                      <span className="mvp-dau mvp-dau--het" aria-hidden="true">
                        ✓
                      </span>
                    ) : null}
                    <svg className="mvp-ghim__kim" viewBox="0 0 24 32" width="24" height="32" aria-hidden="true">
                      <path d="M12 31s10-11.2 10-19A10 10 0 0 0 2 12c0 7.8 10 19 10 19Z" fill="currentColor" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3.6" fill="#fff" />
                    </svg>
                    <span className="mvp-ghim__nhan">
                      <span className="mvp-ghim__ten">{nhan[i]}</span>
                      {nguoi.length > 0 ? (
                        <span className="mvp-ghim__nguoi" aria-hidden="true">
                          {nguoi.slice(0, 3).map((n) => {
                            const url = anhChanDung(n, kb.nhanVat.find((x) => x.id === n)?.bieuCam[0]);
                            return (
                              <span key={n} className="mvp-ghim__mat" data-nv={n} title={kb.nhanVat.find((x) => x.id === n)?.ten}>
                                {url ? <img src={url} alt="" draggable={false} /> : null}
                              </span>
                            );
                          })}
                          {nguoi.length > 3 ? <span className="mvp-ghim__them">+{nguoi.length - 3}</span> : null}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              }
              if (d.diem.sprite.startsWith('vung:')) {
                // Chi tiết ẨN trên cảnh: không có dấu, người chơi tự tìm; không nháy dù để lâu (gói B12). Vùng có dấu (đầu mối "!" /
                // chuyện thêm "?", luật 04/10) thì vòng và huy hiệu hiện sẵn như vật bấm.
                return (
                  <button
                    key={d.diem.chuoi}
                    type="button"
                    className={`mvp-an${d.daXem ? ' is-da-xem' : ''}${d.diem.dau && coDau(d.diem) ? ' is-co-dau' : ''}`}
                    style={{ left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` }}
                    aria-label={nhanDoc(i, d)}
                    title={`${nhan[i] ?? 'Soi chi tiết'}${d.daXem ? ' — đã xem' : ''}`}
                    disabled={d.daXem}
                    data-diem={d.diem.chuoi}
                    onClick={() => onXem(d.diem.chuoi)}
                  >
                    <span className="mvp-an__goi-y" aria-hidden="true" />
                    {d.diem.dau && coDau(d.diem) ? <HuyHieu d={d} /> : null}
                    {/* Gói B17, "Có người dẫn": chấm nhỏ tĩnh trên cả chi tiết ẩn (ngoại lệ duy nhất của quyết định 05/10). */}
                    {dauMuc?.cham && !d.daXem ? <span className="mvp-an__cham" aria-hidden="true" /> : null}
                    {kinhLup && !d.daXem ? (
                      <img className="mvp-an__kinh" src={kinhLup} alt="" draggable={false} aria-hidden="true" />
                    ) : null}
                  </button>
                );
              }
              const url = anhSprite(d.diem.sprite);
              const laNguoi = d.diem.sprite.startsWith('nv:');
              const style = { left: `${d.diem.x}%`, top: `${d.diem.y}%`, width: `${d.diem.rong}%` } as CSSProperties;
              return (
                <button
                  key={d.diem.chuoi}
                  type="button"
                  className={`mvp-diem mvp-diem--khampha is-${d.daXem ? 'da-xem' : 'mo'}${d.vaoLai ? ' is-vao-lai' : ''}${url ? '' : ' is-tam'}${d.diem.sprite.startsWith('nv:') ? ' is-nguoi' : ''}`}
                  style={style}
                  aria-label={nhanDoc(i, d)}
                  title={`${nhan[i] ?? ''}${d.diem.dau && !d.daXem && coDau(d.diem) ? ` (${DAU[d.diem.dau].doc})` : ''}${d.vaoLai ? ', hỏi lại được' : d.daXem ? ' — đã xem' : ''}`}
                  disabled={d.daXem && !d.vaoLai}
                  data-diem={d.diem.chuoi}
                  data-chinh={d.diem.dau === 'chinh' && !d.daXem && coDau(d.diem) ? '1' : undefined}
                  onClick={() => onXem(d.diem.chuoi)}
                >
                  {url ? <img className="mvp-diem__anh" src={url} alt="" draggable={false} /> : <span className="mvp-diem__tam" aria-hidden="true" />}
                  {d.diem.dau && coDau(d.diem) ? <HuyHieu d={d} /> : d.daXem || (dauMuc && !dauMuc.cham) ? null : <span className="mvp-diem__cham" aria-hidden="true" />}
                  {laNguoi && d.diem.dau ? (
                    // Nhãn của điểm (phần trước dấu ":") thay cho tên thật: người chưa tự giới thiệu chỉ hiện cách gọi tạm ("Cô ở quầy").
                    <span className="mvp-diem__ten">{d.diem.nhan ? d.diem.nhan.split(':')[0] : kb.nhanVat.find((n) => n.id === d.diem.sprite.slice(3))?.ten}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {laQuanSat || laDan ? null : <p className="mvp-canh__vuot">Vuốt ngang để xem cả cảnh</p>}

    </div>
  );
}
