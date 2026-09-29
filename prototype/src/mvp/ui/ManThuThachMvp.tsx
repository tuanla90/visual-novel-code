/**
 * Màn thử thách phòng máy bản MVP (`[THỬ THÁCH]`, dữ kiện `Thử thách:`) và màn sửa truy vấn ở buổi họp
 * (`[SỬA TRUY VẤN]` — ô SQL nạp sẵn "Truy vấn nạp sẵn" của thẻ). Chạy thật trên bộ dữ liệu cố định của vụ
 * (du-lieu.md, QĐ-089); chạm là chấm: so tập kết quả với SQL chuẩn của thẻ (sql-mvp.ts). Không phạt khi chạy sai.
 *
 * KHÔNG dùng `ChallengeScreen` của prototype: màn đó gắn với store/kiểu định danh/dataset đóng băng của bản cũ
 * (bảng có cột `clb`, thẻ có bước dẫn + lời Hà Vy theo mã chẩn đoán — bộ MVP chưa có). Tái dùng khung SQL
 * (`SqlCode`, `ResultTable`, CSS `chal-*`). Trình dựng kéo-thả để gói sau (xem báo cáo).
 * Gợi ý không lộ đáp án: giấy nhớ liên quan, mô tả bảng + xem 5 dòng đầu, tra sổ chị Linh. `ghiChu` của thẻ là
 * ghi chú dàn dựng cho người viết (có lời giải) — không hiện.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { BoDuLieuMvp, KichBanMvp, TheThuThachMvp } from '../../content/mvp/types';
import { ResultTable } from '../../sql-challenge/ui/ResultTable';
import { SqlCode } from '../../sql-challenge/ui/SqlCode';
import { chamThuThach, chaySql, xemDongDau, type KetQuaChay, type KetQuaCham } from '../engine/sql-mvp';
import { TheHoSo } from './TheHoSo';
import { TrangChiLinh } from './TrangSoMvp';

export interface ManThuThachMvpProps {
  kb: KichBanMvp;
  duLieu: BoDuLieuMvp | null;
  the: TheThuThachMvp;
  mode: 'challenge' | 'fix-query';
  dienTen: (t: string) => string;
  /** Người chơi bấm "Lưu vào hồ sơ" sau khi đúng. */
  onXong: () => void;
}

type XemBang = { bang: string; kq: KetQuaChay | null };

export function ManThuThachMvp({ kb, duLieu, the, mode, dienTen, onXong }: ManThuThachMvpProps) {
  const [sql, setSql] = useState<string>(mode === 'fix-query' ? (the.truyVanNapSan ?? '') : '');
  const [cham, setCham] = useState<KetQuaCham | null>(null);
  const [dangChay, setDangChay] = useState(false);
  const [soLan, setSoLan] = useState(0);
  const [cotChuan, setCotChuan] = useState<string[]>([]);
  const [xem, setXem] = useState<XemBang | null>(null);
  const [traSo, setTraSo] = useState<string | null>(null);
  const [luuRoi, setLuuRoi] = useState(false);
  const ketQuaRef = useRef<HTMLElement>(null);
  const banRon = useRef(false);

  // Cột của kết quả chuẩn → nói rõ đề cần cột nào (QĐ-019) mà không lộ điều kiện.
  useEffect(() => {
    let song = true;
    if (!duLieu) return;
    chaySql(duLieu, the.sqlChuan).then((r) => {
      if (song && r.ok) setCotChuan(r.cot);
    });
    return () => {
      song = false;
    };
  }, [duLieu, the.sqlChuan]);

  const chay = useCallback(async () => {
    if (!duLieu || banRon.current) return;
    banRon.current = true;
    setDangChay(true);
    try {
      const kq = await chamThuThach(duLieu, sql, the.sqlChuan);
      setCham(kq);
      setSoLan((n) => n + 1);
      setTimeout(() => ketQuaRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0);
    } finally {
      banRon.current = false;
      setDangChay(false);
    }
  }, [duLieu, sql, the.sqlChuan]);

  const xemDong = useCallback(
    (bang: string) => {
      if (!duLieu) return;
      setXem({ bang, kq: null });
      xemDongDau(duLieu, bang).then((kq) => setXem((cu) => (cu && cu.bang === bang ? { bang, kq } : cu)));
    },
    [duLieu],
  );

  const dung = cham?.trangThai === 'dung';
  const manhMoi = the.manhMoiLienQuan.map((id) => kb.hoSo[id]).filter((x) => x !== undefined);
  const trangSo = Object.values(kb.soTay);

  return (
    <div className={`chal mvp-chal${dung ? ' chal--solved' : ''}`} role="region" aria-label={mode === 'fix-query' ? 'Sửa truy vấn' : 'Thử thách phòng máy'}>
      {/* Thanh đầu "máy tính CLB": terminal.css dành hàng lưới đầu (32px) cho thanh này, thiếu nó hai cột co lại. */}
      <div className="terminal-bar">
        <span className="terminal-bar__brand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4" />
          </svg>
          {mode === 'fix-query' ? 'Màn chiếu phòng họp' : 'Máy tính phòng máy'}
        </span>
        <span className="terminal-bar__status">Bộ dữ liệu Vụ 1 · chỉ đọc</span>
      </div>
      <div className="chal__left">
        <section className="chal-card chal-workspace mvp-chal__khung">
          <header className="chal-head">
            <p className="mvp-chal__kicker">{mode === 'fix-query' ? 'Sửa truy vấn trên màn chiếu' : 'Bàn làm việc · phòng máy'}</p>
            <h2 className="chal-head__title">{dienTen(the.tieuDe)}</h2>
            <p className="chal-head__prompt">{dienTen(the.deBai)}</p>
            {cotChuan.length > 0 ? (
              <p className="mvp-chal__cot">
                Kết quả cần có cột: {cotChuan.map((c, i) => (
                  <span key={c}>
                    {i > 0 ? ', ' : ''}
                    <code>{c}</code>
                  </span>
                ))}
                .
              </p>
            ) : null}
          </header>
          <div className="chal-sql mvp-chal__sql" data-region="sql">
            <label className="chal-sql__title" htmlFor="mvp-chal-sql">
              {mode === 'fix-query' ? 'Câu SQL của Quân — sửa rồi chạy' : 'Câu SQL'}
            </label>
            <textarea
              id="mvp-chal-sql"
              className="chal-sql__editor"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              rows={5}
              value={sql}
              disabled={dung || !duLieu}
              placeholder="SELECT … FROM … WHERE …"
              onChange={(e) => setSql(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  void chay();
                }
              }}
            />
            <div className="chal-runbar mvp-chal__runbar">
              <button type="button" className="btn btn--primary chal-run" onClick={() => void chay()} disabled={dung || dangChay || !duLieu || sql.trim() === ''}>
                {dangChay ? 'Đang chạy…' : 'Chạy truy vấn'}
              </button>
              <span className="chal-sql__help">Ctrl+Enter cũng chạy. Chạy sai không mất gì — cứ thử.</span>
            </div>
          </div>
          <section ref={ketQuaRef} className="result mvp-chal__ketqua" aria-live="polite" aria-label="Kết quả">
            {!duLieu ? <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md) nên không chạy được.</p> : null}
            {cham?.trangThai === 'loi' ? (
              <p className="mvp-chal__loi">
                Chưa chạy được: {cham.chay.thongDiep}
                {cham.chay.loai === 'khong-co-cot' ? ' — xem lại tên cột ở "Mô tả các bảng".' : ''}
                {cham.chay.loai === 'khong-co-bang' ? ' — xem lại tên bảng ở "Mô tả các bảng".' : ''}
              </p>
            ) : null}
            {cham && cham.trangThai !== 'loi' ? (
              <>
                <p className={`mvp-chal__nhanxet${dung ? ' is-dung' : ''}`}>
                  {dung ? (
                    <>
                      <strong>Số liệu đây!</strong> {cham.so.soDongNguoiChoi} dòng — khớp kết quả cần tìm.
                    </>
                  ) : (
                    <>
                      Ra <strong>{cham.so.soDongNguoiChoi} dòng</strong>, chưa khớp kết quả cần tìm.
                      {cham.so.cotThieu.length > 0 ? (
                        <>
                          {' '}Còn thiếu cột: {cham.so.cotThieu.map((c) => <code key={c}>{c}</code>)}.
                        </>
                      ) : cham.so.soDongNguoiChoi === 0 ? (
                        ' Ra 0 dòng thì xem lại dữ liệu trước khi xem lại câu hỏi.'
                      ) : cham.so.soDongNguoiChoi > cham.so.soDongChuan ? (
                        ' Hình như đang lấy rộng hơn cần thiết — điều kiện đã đủ chặt chưa?'
                      ) : (
                        ' Hình như đang lọc chặt quá hoặc nhầm cột.'
                      )}
                      {soLan >= 2 ? ' Bí thì tra sổ chị Linh (bên phải).' : ''}
                    </>
                  )}
                </p>
                <ResultTable columns={cham.chay.cot} rows={cham.chay.dong} caption="Kết quả truy vấn của bạn" reveal />
              </>
            ) : null}
            {dung ? (
              <div className="mvp-chal__luu">
                <p className="mvp-chal__vatchung">
                  <strong>{dienTen(the.vatChung.title)}</strong> — {dienTen(the.vatChung.description)}
                </p>
                <button
                  type="button"
                  className="btn btn--primary"
                  disabled={luuRoi}
                  onClick={() => {
                    if (luuRoi) return;
                    setLuuRoi(true);
                    onXong();
                  }}
                  autoFocus
                >
                  Lưu vào hồ sơ và đi tiếp
                </button>
              </div>
            ) : null}
          </section>
        </section>
      </div>
      <aside className="chal__right mvp-chal__phai">
        {the.mucTieuHoc ? (
          <section className="chal-card mvp-chal__muctieu">
            <h3 className="mvp-chal__h3">Hôm nay học gì</h3>
            <p>{dienTen(the.mucTieuHoc)}</p>
          </section>
        ) : null}
        {manhMoi.length > 0 ? (
          <section className="chal-card mvp-chal__manhmoi">
            <h3 className="mvp-chal__h3">Giấy nhớ liên quan</h3>
            {manhMoi.map((m) => (
              <TheHoSo key={m.id} the={m} dienTen={dienTen} />
            ))}
          </section>
        ) : null}
        <section className="chal-card schema is-open mvp-chal__bang">
          <h3 className="mvp-chal__h3">Mô tả các bảng</h3>
          {duLieu?.bang.map((b) => (
            <div key={b.ten} className="mvp-chal__bang-mot">
              <p className="schema__table-head">
                <code className="schema__name">{b.ten}</code>
                <button type="button" className="btn btn--small" onClick={() => xemDong(b.ten)} title={`Xem 5 dòng đầu của bảng ${b.ten}`}>
                  Xem 5 dòng đầu
                </button>
              </p>
              <ul className="mvp-chal__cots">
                {b.cot.map((c) => (
                  <li key={c.ten}>
                    <code>{c.ten}</code> <span className="schema__type">{c.kieu === 'INTEGER' ? 'số' : 'chữ'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {duLieu?.bangAo.map((v) => (
            <div key={v.ten} className="mvp-chal__bang-mot">
              <p className="schema__table-head">
                <code className="schema__name">{v.ten}</code> <span className="schema__type">bảng tra cứu</span>
                <button type="button" className="btn btn--small" onClick={() => xemDong(v.ten)} title={`Xem 5 dòng đầu của ${v.ten}`}>
                  Xem 5 dòng đầu
                </button>
              </p>
            </div>
          ))}
          {xem ? (
            <div className="mvp-chal__xem">
              <p className="mvp-chal__xem-tieude">
                5 dòng đầu của <code>{xem.bang}</code>
                <button type="button" className="btn btn--small" onClick={() => setXem(null)} aria-label="Đóng bảng xem dòng đầu" title="Đóng">
                  Đóng
                </button>
              </p>
              {xem.kq === null ? <p className="mvp-lop__cho">Đang đọc…</p> : null}
              {xem.kq?.ok ? <ResultTable columns={xem.kq.cot} rows={xem.kq.dong} caption={`5 dòng đầu của ${xem.bang}`} /> : null}
              {xem.kq && !xem.kq.ok ? <p className="game__error">{xem.kq.thongDiep}</p> : null}
            </div>
          ) : null}
        </section>
        <section className="chal-card mvp-chal__so">
          <h3 className="mvp-chal__h3">Tra sổ chị Linh</h3>
          <div className="mvp-chal__so-nut">
            {trangSo.map((t) => (
              <button key={t.id} type="button" className={`btn btn--small${traSo === t.id ? ' btn--primary' : ''}`} onClick={() => setTraSo(traSo === t.id ? null : t.id)}>
                {dienTen(t.ten)}
              </button>
            ))}
          </div>
          {traSo && kb.soTay[traSo] ? <TrangChiLinh trang={kb.soTay[traSo]} dienTen={dienTen} /> : null}
        </section>
        {mode === 'fix-query' && the.truyVanNapSan ? (
          <section className="chal-card">
            <h3 className="mvp-chal__h3">Câu gốc trên màn chiếu</h3>
            <SqlCode sql={the.truyVanNapSan} label="Câu SQL gốc của Quân" />
          </section>
        ) : null}
      </aside>
    </div>
  );
}
