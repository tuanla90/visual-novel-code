/**
 * MÀN DÒNG THỜI GIAN (gói B19, docs/mua-1/brief/b19-vu-1-ban-6.md mục 5.1; cách chơi: b19-cach-choi-dong-thoi-gian.md).
 *
 *   - Máy tính: trục ngang các ô (giờ · nơi · việc), cột thẻ bên phải; kéo thẻ thả vào ô (bấm thẻ rồi bấm ô cũng được, cho bàn phím).
 *   - Điện thoại (`dienThoai`): chạm ô → danh sách thẻ → chạm chọn.
 *   - Thả đúng (thẻ ô nhận) là ô xong; thả sai thì thẻ bật về (rung) và người nhắc nói một câu nhẹ — không phạt, không tính vạch.
 *   - Ô khóa sẵn đã điền; phần "không điền được" ("[?]" trong việc) hiện "?" mãi, thả gì vào cũng bật lại kèm câu riêng.
 *   - Xong mọi ô mới bấm được "Tiếp tục". Bản xem lại (`chiXem`): không cột thẻ; ở buổi họp (`docTungO`) đọc từng ô một.
 * Luật thuần ở `engine/dong-thoi-gian.ts`; máy ghi thẻ đã thả qua hành động `dat-the-dtg`.
 */
import { useEffect, useRef, useState, type DragEvent } from 'react';
import type { DongThoiGianMvp as DongThoiGian, KichBanMvp, LoiMvp, ODongThoiGianMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import { CodeText } from '../../shared/ui/CodeText';
import { loiKeoSai, tachViec, tenTheDongThoiGian, thaDung, theTrongO, type TheDongThoiGianMvp } from '../engine/dong-thoi-gian';
import { anhTheoTen } from './anh-mvp';
import './b19.css';

export interface DongThoiGianMvpProps {
  kb: KichBanMvp;
  dtg: DongThoiGian;
  /** Thẻ ở cột thẻ (máy dựng: `theCuaDongThoiGian`). */
  the: readonly TheDongThoiGianMvp[];
  daDat: Readonly<Record<string, string>>;
  xong: boolean;
  /** Bản đã dựng, chỉ xem. */
  chiXem: boolean;
  /** Xem lại ở buổi họp: sáng từng ô, bấm "Ô tiếp" tới ô cuối rồi mới "Tiếp tục". */
  docTungO?: boolean;
  /** Điện thoại: chạm ô → chọn thẻ (không kéo thả). */
  dienThoai: boolean;
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  /** Thả đúng một thẻ vào ô (máy ghi). Thả sai không gọi. */
  onDat?: (o: string, the: string) => void;
  onTiep?: () => void;
  /** Nhãn nút cuối (mặc định "Tiếp tục"). */
  nhanTiep?: string;
}

const KHOA_KEO = 'text/plain';
const TU_BO_KHOP = new Set(['va', 'hoac', 'cua', 'cho', 'trong', 'mot', 'nhung', 'nguoi', 'nay', 'sang', 'ngay', 'gan', 'luc', 'toi', 'tai', 'tren', 'duoc', 'la', 'co', 'vao']);

function tuKhoa(text: string): Set<string> {
  return new Set(
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('vi')
      .split(/[^\p{L}\p{N}:]+/u)
      .filter((word) => word.length > 2 && !TU_BO_KHOP.has(word)),
  );
}

function coThongTinLienQuan(bangChung: string, noiDung: string): boolean {
  const tuBangChung = tuKhoa(bangChung);
  return [...tuKhoa(noiDung)].some((word) => tuBangChung.has(word));
}

/** Ô (hay phần "?" của ô) người chơi đang chọn ở điện thoại / bằng bàn phím. */
type Dich = { o: string; phan: 'o' | 'trong' };

export function DongThoiGianMvp({ kb, dtg, the, daDat, xong, chiXem, docTungO = false, dienThoai, dienTen, tenNguoiNoi, onDat, onTiep, nhanTiep = 'Tiếp tục' }: DongThoiGianMvpProps) {
  // Thẻ đã nằm trong một ô: vẫn kéo được (một thẻ có thể hợp nhiều ô) nhưng mờ đi để người chơi thấy còn thẻ nào chưa dùng.
  const daDung = new Set(Object.values(daDat));
  const [nhac, setNhac] = useState<LoiMvp[] | null>(null);
  const [batVe, setBatVe] = useState<string | null>(null);
  const [vuaDat, setVuaDat] = useState<string | null>(null);
  /** Máy tính: thẻ đã bấm chọn (bấm ô để thả). */
  const [theChon, setTheChon] = useState<string | null>(null);
  const [theDangKeo, setTheDangKeo] = useState<string | null>(null);
  /** Điện thoại: ô đang mở danh sách thẻ. */
  const [dich, setDich] = useState<Dich | null>(null);
  const [sang, setSang] = useState(0);
  const hen = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (hen.current) clearTimeout(hen.current);
  }, []);

  const doc = chiXem && docTungO;
  const oCuoi = dtg.o.length - 1;
  const ten = (id: string): string => dienTen(tenTheDongThoiGian(kb, dtg, id).nhan);
  const theDangXet = the.find((t) => t.id === (theDangKeo ?? theChon));
  const noiDungTheDangXet = theDangXet ? `${dienTen(theDangXet.nhan)} ${theDangXet.phu ? dienTen(theDangXet.phu) : ''}` : '';

  /** Thử thả `idThe` vào ô / phần "?" của ô. */
  const tha = (oId: string, phan: 'o' | 'trong', idThe: string): void => {
    const o = dtg.o.find((x) => x.id === oId);
    if (!o || chiXem) return;
    if (phan === 'o' && thaDung(o, idThe, daDat)) {
      soundEngine.playSfx('select');
      setNhac(null);
      setVuaDat(o.id);
      onDat?.(o.id, idThe);
      return;
    }
    if (phan === 'o' && theTrongO(o, daDat) !== null) return; // ô đã xong: bỏ qua, không nhắc
    soundEngine.playSfx('sai');
    setNhac(loiKeoSai(dtg, o, phan));
    setBatVe(idThe);
    if (hen.current) clearTimeout(hen.current);
    hen.current = setTimeout(() => setBatVe(null), 520);
  };

  const keoVao = (oId: string, phan: 'o' | 'trong') => ({
    onDragOver: (e: DragEvent) => {
      if (!chiXem) {
        e.preventDefault();
        const id = theDangKeo ?? e.dataTransfer.getData(KHOA_KEO);
        if (id) setTheDangKeo(id);
      }
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const id = e.dataTransfer.getData(KHOA_KEO);
      if (id) tha(oId, phan, id);
      setTheDangKeo(null);
    },
  });

  /** Bấm ô / phần "?": điện thoại mở danh sách thẻ; máy tính thả thẻ đang chọn (nếu có). */
  const bamO = (oId: string, phan: 'o' | 'trong'): void => {
    if (chiXem) return;
    if (dienThoai) {
      const o = dtg.o.find((x) => x.id === oId);
      if (phan === 'o' && o && theTrongO(o, daDat) !== null) return;
      soundEngine.playSfx('tab');
      setDich({ o: oId, phan });
      return;
    }
    if (theChon) {
      tha(oId, phan, theChon);
      setTheChon(null);
    }
  };

  const veO = (o: ODongThoiGianMvp, i: number) => {
    const theO = theTrongO(o, daDat);
    const daXong = theO !== null;
    const phan = tachViec(o.viec);
    const coDauHoi = phan.includes(null);
    const nutTrong = (k: number) => (
      <button
        key={`trong-${k}`}
        type="button"
        className="dtg__trong"
        aria-label={`${o.khongDien ?? 'phần này'}: chưa biết`}
        title={`${o.khongDien ? `${o.khongDien.charAt(0).toLocaleUpperCase('vi')}${o.khongDien.slice(1)}` : 'Phần này'}: chưa biết`}
        disabled={chiXem}
        onClick={(e) => {
          e.stopPropagation();
          bamO(o.id, 'trong');
        }}
        {...keoVao(o.id, 'trong')}
      >
        ?
      </button>
    );
    return (
      <li
        key={o.id}
        className={`dtg__o${daXong ? ' is-xong' : ''}${o.khoaSan ? ' is-khoa' : ''}${vuaDat === o.id ? ' is-vua-dat' : ''}${doc && i === sang ? ' is-sang' : ''}${doc && i > sang ? ' is-cho' : ''}${dich?.o === o.id ? ' is-chon' : ''}${theDangXet && [o.gio, o.noi ? dienTen(o.noi) : "", phan.filter((p): p is string => p !== null).map((p) => dienTen(p)).join(" ")].some((text) => typeof text === 'string' && coThongTinLienQuan(noiDungTheDangXet, text)) ? " is-keo-vao" : ""}`}
        data-o={o.id}
        {...keoVao(o.id, 'o')}
      >
        <span className="dtg__so-hang" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <div className={`dtg__o-thoi-gian${theDangXet && o.gio && coThongTinLienQuan(noiDungTheDangXet, o.gio) ? " is-match" : ""}`} data-label="Thời điểm">
          <span className="dtg__nhan-cot">Thời điểm</span>
          <span className={`dtg__gio${o.gio === '?' ? ' is-chua-biet' : ''}`}>{o.gio === '?' ? 'Chưa rõ' : o.gio || '—'}</span>
        </div>
        <div className={`dtg__o-dia-diem${theDangXet && o.noi && coThongTinLienQuan(noiDungTheDangXet, dienTen(o.noi)) ? " is-match" : ""}`} data-label="Địa điểm">
          <span className="dtg__nhan-cot">Địa điểm</span>
          <span className="dtg__noi">{o.noi ? dienTen(o.noi) : '—'}</span>
        </div>
        <div className={`dtg__o-su-kien${theDangXet && coThongTinLienQuan(noiDungTheDangXet, phan.filter((p): p is string => p !== null).map((p) => dienTen(p)).join(" ")) ? " is-match" : ""}`} data-label="Sự kiện cần dựng">
          <span className="dtg__nhan-cot">Sự kiện cần dựng</span>
          <p className="dtg__viec">
            {phan.map((p, k) => (p === null ? nutTrong(k) : <CodeText key={k} text={dienTen(p)} />))}
            {o.khongDien && !coDauHoi ? <> {nutTrong(99)}</> : null}
          </p>
        </div>
        <div className="dtg__o-can-cu" data-label="Căn cứ">
          <span className="dtg__nhan-cot">Căn cứ</span>
        <button
          type="button"
          className={`dtg__khe${daXong ? ' is-co' : ''}`}
          disabled={chiXem || daXong}
          aria-label={daXong ? `Ô ${i + 1}: ${theO ? ten(theO) : 'đã có sẵn'}` : `Ô ${i + 1}: còn trống — ${dienThoai ? 'chạm để chọn thẻ' : 'thả thẻ vào đây'}`}
          onClick={() => bamO(o.id, 'o')}
        >
          {daXong ? (theO ? <span className="dtg__the-dat">{ten(theO)}</span> : <span className="dtg__the-dat is-san">đã có sẵn</span>) : <span className="dtg__khe-trong">{dienThoai ? 'Chạm để chọn bằng chứng' : 'Thả thẻ'}</span>}
        </button>
        </div>
      </li>
    );
  };

  const loi = nhac?.[0];
  const anhNhac = loi ? anhTheoTen(`chibi-${loi.speaker}`) : undefined;
  const khoiNhac = loi ? (
    <div className="dtg__nhac" role="status" key={`${batVe ?? ''}${loi.text}`}>
      {anhNhac ? <img className="dtg__nhac-mat" src={anhNhac} alt="" draggable={false} /> : null}
      <span>
        {tenNguoiNoi(loi.speaker) ? <b>{tenNguoiNoi(loi.speaker)}</b> : null}
        {nhac?.map((l, k) => (
          <span key={k} className="dtg__nhac-cau">
            <CodeText text={dienTen(l.text)} />
          </span>
        ))}
      </span>
    </div>
  ) : null;
  const nutTiep = doc && sang < oCuoi ? (
    <button type="button" className="btn btn--primary" onClick={() => setSang((x) => Math.min(oCuoi, x + 1))} autoFocus>
      Ô tiếp ({sang + 2}/{dtg.o.length})
    </button>
  ) : (
    <button type="button" className="btn btn--primary dtg__tiep" disabled={!chiXem && !xong} onClick={onTiep} title={!chiXem && !xong ? 'Điền hết các ô trước đã' : undefined}>
      {nhanTiep}
    </button>
  );

  return (
    <section className={`dtg${dienThoai ? ' dtg--cham' : ''}${chiXem ? ' dtg--xem' : ''}`} role="region" aria-label={`Ma trận suy luận: ${dienTen(dtg.ten)}`}>
      <header className="dtg__dau">
        <h2 className="dtg__ten">{dienTen(dtg.ten)}</h2>
        {!chiXem ? <p className="dtg__huong-dan">{dienThoai ? 'Xếp bằng chứng vào sự kiện phù hợp. Chạm ô căn cứ để chọn.' : 'Ghép từng sự kiện với bằng chứng xác nhận nó.'}</p> : null}
      </header>
      <div className="dtg__than">
        <div className="dtg__bang-wrap">
          <div className="dtg__bang-dau" aria-hidden="true">
            <span>Mốc</span><span>Thời điểm</span><span>Địa điểm</span><span>Sự kiện cần dựng</span><span>Căn cứ trong hồ sơ</span>
          </div>
          <ol className="dtg__truc" aria-label="Ma trận suy luận: ghép thời điểm, địa điểm, sự kiện và căn cứ">
            {dtg.o.map(veO)}
          </ol>
        </div>
        {!chiXem && !dienThoai ? (
          <aside className="dtg__cot" aria-label="Thẻ để kéo">
            <span className="dtg__cot-nhan">Bằng chứng có thể dùng</span>
            <ul className="dtg__ds">
              {the.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`dtg__the${t.tam ? ' is-tam' : ''}${theChon === t.id ? ' is-chon' : ''}${batVe === t.id ? ' is-bat-ve' : ''}${daDung.has(t.id) ? ' is-da-dat' : ''}`}
                    draggable
                    data-the={t.id}
                    aria-pressed={theChon === t.id}
                    onDragStart={(e) => {
                      e.dataTransfer.setData(KHOA_KEO, t.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setTheDangKeo(t.id);
                    }}
                    onDragEnd={() => setTheDangKeo(null)}
                    onClick={() => setTheChon((c) => (c === t.id ? null : t.id))}
                  >
                    <span className="dtg__the-nhan">{dienTen(t.nhan)}</span>
                    {t.phu ? <span className="dtg__the-phu">{dienTen(t.phu)}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
      <footer className="dtg__chan">
        {khoiNhac && !dich ? khoiNhac : <span className="dtg__nhac-trong" />}
        {onTiep ? nutTiep : null}
      </footer>
      {dich ? (
        <div className="dtg__chon-nen" role="presentation" onClick={() => setDich(null)}>
          <div className="dtg__chon" role="dialog" aria-modal="true" aria-label="Chọn thẻ cho ô" onClick={(e) => e.stopPropagation()}>
            <p className="dtg__chon-hoi">{dich.phan === 'trong' ? 'Chỗ chưa biết — chọn thẻ' : `Ô: ${dienTen(dtg.o.find((x) => x.id === dich.o)?.viec.replace('[?]', '?') ?? '')}`}</p>
            {khoiNhac}
            <ul className="dtg__ds">
              {the.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`dtg__the${t.tam ? ' is-tam' : ''}${batVe === t.id ? ' is-bat-ve' : ''}`}
                    data-the={t.id}
                    onClick={() => {
                      const d = dich;
                      tha(d.o, d.phan, t.id);
                      const o = dtg.o.find((x) => x.id === d.o);
                      if (d.phan === 'o' && o && thaDung(o, t.id, daDat)) setDich(null);
                    }}
                  >
                    <span className="dtg__the-nhan">{dienTen(t.nhan)}</span>
                    {t.phu ? <span className="dtg__the-phu">{dienTen(t.phu)}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn--ghost" onClick={() => setDich(null)}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
