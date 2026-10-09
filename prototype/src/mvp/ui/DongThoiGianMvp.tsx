/**
 * MÀN BẢNG CHÂN LÝ (trước là "dòng thời gian"; gói B19 + B20, docs/mua-1/loi-note-bang-chan-ly.md §4).
 *
 *   - Ma trận: cột = người (tiêu đề cột; cột "?" chưa biết), dòng = mốc giờ (cột đầu), ô = hành động hiện bằng giấy note.
 *     Ô phải đặt: viền nét đứt, trống (ghi sẵn việc bằng chữ mờ). Ô điền sẵn: note xám. Ô không khai: trống mờ, không nhận thả.
 *   - Bên phải: chồng "Sự thật chờ đặt" — mỗi thẻ nhận được là một giấy note hơi nghiêng. Kéo note vào ô tự do (kéo ra, đổi chỗ,
 *     thay note); không báo đúng sai từng lần thả. Máy cảm ứng: chạm note rồi chạm ô; chạm note trong ô để gỡ.
 *   - Mọi ô phải đặt đã có note thì nút đổi nhãn "Xong": bấm là chấm — note sai ô bật về chồng kèm câu "Kéo sai" của ô sai đầu
 *     tiên; đúng hết thì đi tiếp. Dòng tập dượt (`tap-duot`) vẫn tức thời: thả đúng là xong ô, thả sai thì bật về kèm câu nhắc.
 *   - Cột có ô "không điền được" ("trống bắt buộc"): tiêu đề gạch chéo "là ai? để trống"; kéo note vào tiêu đề ấy bật về ngay kèm
 *     câu "Kéo vào chỗ trống" (bài học, không phải chấm).
 *   - Bản xem lại (`chiXem`): không chồng note; ở buổi họp (`docTungO`) đọc từng ô một.
 * Luật thuần ở `engine/dong-thoi-gian.ts`; máy ghi note đã đặt qua `dat-the-dtg` / `go-the-dtg`.
 */
import { useEffect, useRef, useState, type CSSProperties, type DragEvent, type KeyboardEvent as ReactKeyEvent } from 'react';
import type { DongThoiGianMvp as DongThoiGian, KichBanMvp, LoiMvp, ODongThoiGianMvp } from '../../content/mvp/types';
import { soundEngine } from '../../shared/audio/sound-engine';
import { CodeText } from '../../shared/ui/CodeText';
import { loiKeoSai, maTran, oDatSai, oTrongCuaCot, tenTheDongThoiGian, thaDung, theTrongO, type TheDongThoiGianMvp } from '../engine/dong-thoi-gian';
import { anhTheoTen } from './anh-mvp';
import './b19.css';
import { ChuNote, ChuThichMauNote, lopGiayNguon } from './note-ui';

export interface DongThoiGianMvpProps {
  kb: KichBanMvp;
  dtg: DongThoiGian;
  /** Thẻ của kho note (máy dựng: `theCuaDongThoiGian`); thẻ đã nằm trong ô tự rời chồng. */
  the: readonly TheDongThoiGianMvp[];
  daDat: Readonly<Record<string, string>>;
  xong: boolean;
  /** Bản đã dựng, chỉ xem. */
  chiXem: boolean;
  /** Xem lại ở buổi họp: sáng từng ô, bấm "Ô tiếp" tới ô cuối rồi mới "Tiếp tục". */
  docTungO?: boolean;
  /** Điện thoại: chạm note rồi chạm ô (không kéo thả). */
  dienThoai: boolean;
  dienTen: (t: string) => string;
  tenNguoiNoi: (ma: string) => string;
  /** Đặt một note vào ô (máy ghi; dòng chính không báo đúng sai). Thả sai ở dòng tập dượt không gọi. */
  onDat?: (o: string, the: string) => void;
  /** Nhấc note khỏi ô về chồng (dòng chính). */
  onGo?: (o: string) => void;
  onTiep?: () => void;
  /** Nhãn nút cuối khi chưa tới lúc "Xong" (mặc định "Tiếp tục"). */
  nhanTiep?: string;
  /**
   * Gói B21 (buổi họp chỉ ô, `[ĐỐI CHẤT … · chỉ ô]`): bảng ở chế độ chỉ — đọc ô nào cũng được, bấm một ô (hay tiêu đề cột "?" trống bắt buộc)
   * là trả lời. Không đầu bảng, không chồng, không nút dưới; `daChon` = các ô đang chỉ dở (`<dtg>:<ô>`).
   */
  chiO?: { daChon: readonly string[]; onChi: (o: string) => void; khoa?: boolean };
}

const KHOA_KEO = 'text/plain';
/** Độ nghiêng của chồng note (độ), lặp lại; trong ±1.5°. */
const NGHIENG = [-1.5, 1.1, -0.6, 1.5, -1.1, 0.7];

export function DongThoiGianMvp({ kb, dtg, the, daDat, xong, chiXem, docTungO = false, dienThoai, dienTen, tenNguoiNoi, onDat, onGo, onTiep, nhanTiep = 'Tiếp tục', chiO }: DongThoiGianMvpProps) {
  const [nhac, setNhac] = useState<LoiMvp[] | null>(null);
  /** Note vừa bật về chồng (rung). */
  const [batVe, setBatVe] = useState<ReadonlySet<string>>(new Set());
  const [vuaDat, setVuaDat] = useState<string | null>(null);
  /** Note đã bấm chọn (bấm ô để đặt). */
  const [theChon, setTheChon] = useState<string | null>(null);
  const [theDangKeo, setTheDangKeo] = useState<string | null>(null);
  const [sang, setSang] = useState(0);
  const hen = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (hen.current) clearTimeout(hen.current);
  }, []);

  const tapDuot = dtg.kieu === 'tap-duot';
  const doc = chiXem && docTungO;
  const oCuoi = dtg.o.length - 1;
  const mt = maTran(dtg);
  const ten = (id: string): string => dienTen(tenTheDongThoiGian(kb, dtg, id).nhan);
  /** Gói B21: chữ note có keyword tô màu; giấy theo nguồn. */
  const chuNote = (id: string) => {
    const t = tenTheDongThoiGian(kb, dtg, id);
    return <ChuNote text={dienTen(t.nhan)} keyword={t.keyword} />;
  };
  const giayCua = (id: string): string => lopGiayNguon(tenTheDongThoiGian(kb, dtg, id).nguon);
  const daDung = new Set(Object.values(daDat));
  const chong = the.filter((t) => !daDung.has(t.id));
  const viecO = (o: ODongThoiGianMvp): string => dienTen(o.viec.replace(/\[\?\]/g, '?').trim());

  const bat = (ids: readonly string[]): void => {
    setBatVe(new Set(ids));
    if (hen.current) clearTimeout(hen.current);
    hen.current = setTimeout(() => setBatVe(new Set()), 560);
  };

  /** Đặt note `idThe` vào ô `oId`. Dòng chính: nhận hết (chấm lúc Xong); dòng tập dượt: chỉ nhận thả đúng. */
  const tha = (oId: string, idThe: string): void => {
    const o = dtg.o.find((x) => x.id === oId);
    if (!o || chiXem || o.khoaSan) return;
    if (tapDuot) {
      if (theTrongO(o, daDat) !== null) return; // ô đã xong: bỏ qua, không nhắc
      if (!thaDung(o, idThe, daDat)) {
        soundEngine.playSfx('sai');
        setNhac(loiKeoSai(dtg, o));
        bat([idThe]);
        return;
      }
    }
    soundEngine.playSfx('select');
    setNhac(null);
    setVuaDat(o.id);
    onDat?.(o.id, idThe);
  };

  /** Thả note vào tiêu đề cột "?" (trống bắt buộc): bật về ngay kèm câu riêng. */
  const thaVaoTrong = (cotId: string, idThe: string): void => {
    if (chiXem) return;
    soundEngine.playSfx('sai');
    setNhac(loiKeoSai(dtg, oTrongCuaCot(dtg, cotId), 'trong'));
    bat([idThe]);
  };

  const goKhoiO = (oId: string): void => {
    if (chiXem || tapDuot) return;
    soundEngine.playSfx('tab');
    setNhac(null);
    onGo?.(oId);
  };

  const nhanDropVao = (xuLy: (idThe: string) => void) => ({
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
      const id = e.dataTransfer.getData(KHOA_KEO) || theDangKeo;
      if (id) xuLy(id);
      setTheDangKeo(null);
    },
  });

  /** Bấm ô trống / note trong ô: đang cầm một note thì đặt; không thì (note trong ô) gỡ ra. */
  const bamO = (o: ODongThoiGianMvp, coThe: boolean): void => {
    if (chiXem || o.khoaSan) return;
    if (theChon) {
      tha(o.id, theChon);
      setTheChon(null);
    } else if (coThe) goKhoiO(o.id);
  };

  const bamTrong = (cotId: string): void => {
    if (chiXem || !theChon) return;
    thaVaoTrong(cotId, theChon);
    setTheChon(null);
  };

  const keoNote = (id: string) => ({
    draggable: !chiXem,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.setData(KHOA_KEO, id);
      e.dataTransfer.effectAllowed = 'move';
      setTheDangKeo(id);
    },
    onDragEnd: () => setTheDangKeo(null),
  });

  const veO = (o: ODongThoiGianMvp) => {
    const i = dtg.o.findIndex((x) => x.id === o.id);
    const idThe = theTrongO(o, daDat);
    const daXong = idThe !== null;
    const lop = [
      'bcl__o',
      o.khoaSan ? 'is-khoa' : '',
      daXong && !o.khoaSan ? 'is-co-note' : '',
      !daXong ? 'is-trong' : '',
      daXong && !o.khoaSan ? 'is-co-viec' : '',
      vuaDat === o.id ? 'is-vua-dat' : '',
      doc && i === sang ? 'is-sang' : '',
      doc && i > sang ? 'is-cho' : '',
      chiO ? 'is-chi-duoc' : '',
      chiO?.daChon.includes(`${dtg.id}:${o.id}`) ? 'is-chi' : '',
    ].filter(Boolean).join(' ');
    const chiVaoO = chiO && !chiO.khoa ? { role: 'button', tabIndex: 0, 'aria-pressed': chiO.daChon.includes(`${dtg.id}:${o.id}`), 'aria-label': `Chỉ ô ${i + 1}: ${[o.gio, viecO(o)].filter(Boolean).join(' · ')}`, onClick: () => chiO.onChi(`${dtg.id}:${o.id}`), onKeyDown: (e: ReactKeyEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chiO.onChi(`${dtg.id}:${o.id}`); } } } : {};
    return (
      <div key={o.id} className={lop} data-o={o.id} title={[o.gio, o.noi, viecO(o)].filter(Boolean).join(' · ')} {...nhanDropVao((id) => tha(o.id, id))} {...chiVaoO}>
        {o.khoaSan ? (
          <span className="bcl__note bcl__note--xam">{idThe ? ten(idThe) : viecO(o)}</span>
        ) : daXong && idThe ? (
          <>
          <span className="bcl__o-viec">{viecO(o)}</span>
          <button
            type="button"
            className={`bcl__note bcl__note--o ${giayCua(idThe)}`}
            disabled={chiXem || tapDuot}
            aria-label={`Ô ${i + 1}: ${ten(idThe)}${chiXem || tapDuot ? '' : ' — bấm để gỡ ra'}`}
            data-the={idThe}
            {...(chiXem || tapDuot ? {} : keoNote(idThe))}
            onClick={() => bamO(o, true)}
          >
            <span className="bcl__note-chu">{chuNote(idThe)}</span>
          </button>
          </>
        ) : (
          <button
            type="button"
            className="bcl__khe"
            disabled={chiXem}
            aria-label={`Ô ${i + 1}: còn trống — ${viecO(o)}`}
            onClick={() => bamO(o, false)}
          >
            <span className="bcl__khe-viec">{viecO(o)}</span>
          </button>
        )}
      </div>
    );
  };

  const loi = nhac?.[0];
  const anhNhac = loi ? anhTheoTen(`chibi-${loi.speaker}`) : undefined;
  const khoiNhac = loi ? (
    <div className="bcl__nhac" role="status" key={`${[...batVe].join('')}${loi.text}`}>
      {anhNhac ? <img className="bcl__nhac-mat" src={anhNhac} alt="" draggable={false} /> : null}
      <span>
        {tenNguoiNoi(loi.speaker) ? <b>{tenNguoiNoi(loi.speaker)}</b> : null}
        {nhac?.map((l, k) => (
          <span key={k} className="bcl__nhac-cau">
            <CodeText text={dienTen(l.text)} />
          </span>
        ))}
      </span>
    </div>
  ) : null;

  /** Bấm "Xong": dòng chính chấm — note sai ô bật về chồng kèm câu của ô sai đầu tiên (máy bỏ các note sai khi nhận `tiep`). */
  const bamTiep = (): void => {
    if (!chiXem && !tapDuot && xong) {
      const sai = oDatSai(dtg, daDat);
      const dau = sai[0];
      if (dau) {
        soundEngine.playSfx('sai');
        setNhac(loiKeoSai(dtg, dau));
        bat(sai.map((o) => daDat[o.id] ?? ''));
      }
    }
    onTiep?.();
  };

  const nhanNut = chiXem ? nhanTiep : !tapDuot && xong ? 'Xong' : nhanTiep;
  const nutTiep = doc && sang < oCuoi ? (
    <button type="button" className="btn btn--primary" onClick={() => setSang((x) => Math.min(oCuoi, x + 1))} autoFocus>
      Ô tiếp ({sang + 2}/{dtg.o.length})
    </button>
  ) : (
    <button type="button" className="btn btn--primary bcl__tiep" disabled={!chiXem && !xong} onClick={bamTiep} title={!chiXem && !xong ? 'Đặt hết các ô trước đã' : undefined}>
      {nhanNut}
    </button>
  );

  const luoi = { '--n-cot': mt.cot.length, '--n-hang': mt.hang.length } as CSSProperties;

  return (
    <section className={`bcl${dienThoai ? ' bcl--cham' : ''}${chiXem ? ' bcl--xem' : ''}${chiO ? ' bcl--chi-o' : ''}${theDangKeo ? ' bcl--dang-keo' : ''}${mt.coTieuDe ? '' : ' bcl--mot-cot'}`} role="region" aria-label={`Bảng chân lý: ${dienTen(dtg.ten)}`}>
      {chiO ? null : (
      <header className="bcl__dau">
        <span className="bcl__kicker">Bảng chân lý</span>
        <h2 className="bcl__ten">{dienTen(dtg.ten)}</h2>
        {!chiXem ? (
          <p className="bcl__huong-dan">
            {dienThoai ? 'Chạm note rồi chạm ô để đặt. Xong thì bấm Xong để chấm.' : 'Kéo note sự thật vào đúng ô. Xong thì bấm Xong để chấm.'}
          </p>
        ) : null}
      </header>
      )}
      <div className="bcl__than">
        <div className="bcl__khung">
          <div className="bcl__luoi" style={luoi} role="group" aria-label="Bảng chân lý: cột là người, dòng là mốc giờ">
            {mt.coTieuDe ? <span className="bcl__goc" aria-hidden="true">Giờ</span> : null}
            {mt.coTieuDe
              ? mt.cot.map((c) =>
                  c.trong ? (
                    <button
                      key={c.id}
                      type="button"
                      className={`bcl__cot bcl__cot--trong${chiO ? ' is-chi-duoc' : ''}${chiO?.daChon.includes(`${dtg.id}:?`) ? ' is-chi' : ''}`}
                      data-cot={c.id}
                      aria-label={`${oTrongCuaCot(dtg, c.id)?.khongDien ?? 'phần này'}: chưa biết`}
                      title="Chưa có căn cứ nào cho cột này. Chỗ ấy để trống."
                      disabled={(chiXem && !chiO) || !!chiO?.khoa}
                      aria-pressed={chiO ? chiO.daChon.includes(`${dtg.id}:?`) : undefined}
                      onClick={() => (chiO ? chiO.onChi(`${dtg.id}:?`) : bamTrong(c.id))}
                      {...nhanDropVao((id) => thaVaoTrong(c.id, id))}
                    >
                      <span className="bcl__cot-ten">{c.id === '?' ? '?' : dienTen(c.nhan)}</span>
                      <small className="bcl__cot-nhan">là ai? để trống</small>
                    </button>
                  ) : (
                    <span key={c.id} className="bcl__cot" data-cot={c.id}>
                      <span className="bcl__cot-ten">{dienTen(c.nhan)}</span>
                    </span>
                  ),
                )
              : null}
            {mt.hang.map((h) => (
              <div key={h.khoa} className="bcl__hang" role="presentation">
                <span className="bcl__gio">{h.gio ? dienTen(h.gio) : '—'}</span>
                {mt.cot.map((c) => {
                  const o = h.o[c.id];
                  return o ? <span key={c.id} className="bcl__o-vo">{veO(o)}</span> : <span key={c.id} className="bcl__o-vo"><span className="bcl__o bcl__o--mo" aria-hidden="true" /></span>;
                })}
              </div>
            ))}
          </div>
        </div>
        {!chiXem ? (
          <aside className="bcl__chong" aria-label="Sự thật chờ đặt" {...nhanDropVao((id) => {
            const o = dtg.o.find((x) => daDat[x.id] === id);
            if (o) goKhoiO(o.id);
          })}>
            <span className="bcl__chong-nhan">Sự thật chờ đặt</span>
            <ul className="bcl__ds">
              {chong.map((t, k) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`bcl__note bcl__note--chong ${lopGiayNguon(t.nguon)}${t.tam ? ' is-tam' : ''}${theChon === t.id ? ' is-chon' : ''}${batVe.has(t.id) ? ' is-bat-ve' : ''}`}
                    style={{ '--nghieng': `${NGHIENG[k % NGHIENG.length]}deg` } as CSSProperties}
                    data-the={t.id}
                    aria-label={dienTen(t.nhan)}
                    aria-pressed={theChon === t.id}
                    {...keoNote(t.id)}
                    onClick={() => setTheChon((c) => (c === t.id ? null : t.id))}
                  >
                    <span className="bcl__note-chu"><ChuNote text={dienTen(t.nhan)} keyword={t.keyword} /></span>
                    {t.phu ? <small className="bcl__note-phu">{dienTen(t.phu)}</small> : null}
                  </button>
                </li>
              ))}
            </ul>
            {chong.length === 0 ? <p className="bcl__het">Đã đặt hết. Bấm một note trong ô để gỡ ra.</p> : null}
            <ChuThichMauNote className="bcl__chu-thich" />
          </aside>
        ) : null}
      </div>
      {chiO ? null : (
      <footer className="bcl__chan">
        {khoiNhac ?? <span className="bcl__nhac-trong" />}
        {onTiep ? nutTiep : null}
      </footer>
      )}
    </section>
  );
}
