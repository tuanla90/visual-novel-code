/**
 * MÀN CHƠI BẢN MVP — lối vào từ nút "Chơi bản MVP" ở màn tiêu đề (QĐ-077 gói 1). Ghép máy `engine/may.ts` với
 * giao diện: HUD (ngày/khung/uy tín), sân khấu MVP, hộp thoại VN (tái dùng `DialogBox`), câu hỏi (`MultipleChoice`),
 * danh sách địa điểm, thử thách SQL, hồ sơ, sổ tay, lịch sử thoại (`BacklogModal`), Lưu/Nạp.
 * Trạng thái nằm trong `store/kho-mvp.ts` (khóa riêng), không đụng store prototype.
 */
import './mvp.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LoiMvp } from '../../content/mvp/types';
import { isEffectId } from '../../shared/ids';
import { DialogBox } from '../../shared/ui/DialogBox';
import { MultipleChoice } from '../../shared/ui/MultipleChoice';
import { CodeText } from '../../shared/ui/CodeText';
import { BacklogModal } from '../../shared/vn/BacklogModal';
import { useVnStore } from '../../shared/vn/vn-store';
import { ObjectionEffect } from '../../story/ui/ObjectionEffect';
import type { DialogueLine, MultipleChoiceQuestion } from '../../story/types';
import { dienTen as dienTenMay, khungNhin, tenNguoiNoi, type KhungNhinMvp } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { KICH_BAN, nhanTienDo, useKhoMvp } from '../store/kho-mvp';
import { DanhSachDiaDiem } from './DanhSachDiaDiem';
import { HoSoMvp } from './HoSoMvp';
import { HudMvp } from './HudMvp';
import { KetMvp } from './KetMvp';
import { LocThuMvp } from './LocThuMvp';
import { LuuNapMvp } from './LuuNapMvp';
import { ManChieuMvp } from './ManChieuMvp';
import { ManThuThachMvp } from './ManThuThachMvp';
import { SanKhauMvp } from './SanKhauMvp';
import { TaiLieuMvp } from './TaiLieuMvp';
import { ChepSoMvp, SoCaNhanMvp, TraSoMvp } from './TrangSoMvp';

export interface ManChoiMvpProps {
  onVeTieuDe: () => void;
}

function soHoSo(s: TrangThaiMvp): number {
  return s.hoSo.manhMoi.length + s.hoSo.taiLieu.length + s.hoSo.bangChung.length;
}

/** Lời MVP → kiểu `DialogueLine` của hộp thoại prototype (chỉ khác ở tập người nói; nhãn truyền riêng). */
function thanhLine(kb: typeof KICH_BAN, s: TrangThaiMvp, loi: LoiMvp): DialogueLine {
  return { speaker: loi.speaker, expression: loi.expression, text: dienTenMay(kb, s, loi.text) } as unknown as DialogueLine;
}

export function ManChoiMvp({ onVeTieuDe }: ManChoiMvpProps) {
  const kb = KICH_BAN;
  const s = useKhoMvp((k) => k.trangThai);
  const oLuu = useKhoMvp((k) => k.oLuu);
  const batDau = useKhoMvp((k) => k.batDau);
  const hanhDong = useKhoMvp((k) => k.hanhDong);
  const xoa = useKhoMvp((k) => k.xoa);
  const luuVaoO = useKhoMvp((k) => k.luuVaoO);
  const napTuO = useKhoMvp((k) => k.napTuO);

  const [hoSoMo, setHoSoMo] = useState(false);
  const [soTayMo, setSoTayMo] = useState(false);
  const [lichSuMo, setLichSuMo] = useState(false);
  const [luuNap, setLuuNap] = useState<'save' | 'load' | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const viewportMode = useVnStore((k) => k.viewportMode);
  const setSkipMode = useVnStore((k) => k.setSkipMode);
  const clearBacklog = useVnStore((k) => k.clearBacklog);

  useEffect(() => {
    if (!s) batDau();
  }, [s, batDau]);

  const baoToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2800);
  }, []);

  // Báo khi hồ sơ có thêm mục.
  const demTruoc = useRef(s ? soHoSo(s) : 0);
  useEffect(() => {
    const dem = s ? soHoSo(s) : 0;
    if (dem > demTruoc.current) baoToast('Hồ sơ có thêm mục mới.');
    demTruoc.current = dem;
  }, [s, baoToast]);

  const kn: KhungNhinMvp | null = s ? khungNhin(kb, s) : null;
  const loaiKn = kn?.kind;
  useEffect(() => {
    if (loaiKn !== 'line' && loaiKn !== 'feedback') setSkipMode(false);
  }, [loaiKn, setSkipMode]);

  const tiep = useCallback(() => hanhDong({ type: 'tiep' }), [hanhDong]);
  const choiLai = useCallback(() => {
    clearBacklog();
    xoa();
    batDau();
  }, [clearBacklog, xoa, batDau]);

  if (!s || !kn) return null;
  const dienTen = (t: string): string => dienTenMay(kb, s, t);
  const modalMo = hoSoMo || soTayMo || lichSuMo || luuNap !== null;
  const loiHienTai: { speaker: string; expression?: string } | null =
    kn.kind === 'line' || kn.kind === 'feedback' ? kn.loi : kn.kind === 'question' || kn.kind === 'branch' ? { speaker: kn.nut.asker.speaker } : null;
  const dem = s.giaiDoan === 'ngay' && s.khung >= kb.lich.khung.length;
  const rung = kn.kind === 'effect' || loiHienTai?.expression === 'stunned';
  const laDoc = viewportMode === 'mobile';
  const laGiaLap = laDoc && typeof window !== 'undefined' && window.innerWidth > 768;

  const nutVn = {
    keyboardEnabled: !modalMo,
    onOpenNotebook: () => setHoSoMo(true),
    notebookCount: soHoSo(s),
    onOpenBacklog: () => setLichSuMo(true),
    onOpenSave: () => setLuuNap('save'),
    onOpenLoad: () => setLuuNap('load'),
  };

  const noiDung = (() => {
    switch (kn.kind) {
      case 'line':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} display={kn.display === 'card' ? 'card' : 'dialog'} speakerName={tenNguoiNoi(kb, kn.loi.speaker)} onAdvance={tiep} {...nutVn} />;
      case 'feedback':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} hint={`Phản hồi ${kn.viTri + 1}/${kn.tong}`} speakerName={tenNguoiNoi(kb, kn.loi.speaker)} onAdvance={tiep} {...nutVn} />;
      case 'chon-dia-diem':
        return (
          <DanhSachDiaDiem
            kb={kb}
            diaDiem={kn.diaDiem}
            khungConLai={kn.khungConLai}
            chinhXong={s.chinhXong}
            onChon={(diaDiem, duKien) => hanhDong({ type: 'chon-du-kien', diaDiem, duKien })}
            onKetThucNgay={() => hanhDong({ type: 'ket-thuc-ngay' })}
          />
        );
      case 'question': {
        const q = {
          id: kn.nut.id,
          asker: { speaker: kn.nut.asker.speaker, text: dienTen(kn.nut.asker.text) },
          choices: kn.nut.choices.map((c) => ({ id: c.id, text: dienTen(c.text), correct: c.correct, feedback: [] })),
        } as unknown as MultipleChoiceQuestion;
        return <MultipleChoice question={q} attempts={kn.lanThu} gameKey={s.batDauLuc} askerLabel={tenNguoiNoi(kb, kn.nut.asker.speaker)} onChoose={(id) => hanhDong({ type: 'chon', luaChon: id })} />;
      }
      case 'branch':
        return (
          <div className="mc mvp-renhanh" role="group" aria-labelledby="mvp-renhanh-hoi">
            <div className="mc__overlay" aria-label="Các lựa chọn">
              <ul className="mc__choices">
                {kn.luaChon.map((c) => (
                  <li key={c.id} className="mc__choice-item">
                    <button type="button" className="mc__choice" onClick={() => hanhDong({ type: 'chon', luaChon: c.id })}>
                      <CodeText text={dienTen(c.text)} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dialog-container mc__dialog-container">
              <div className="dialog dialog--glass" data-speaker={kn.nut.asker.speaker}>
                <div className="dialog__speaker">
                  <span>{tenNguoiNoi(kb, kn.nut.asker.speaker)}</span>
                </div>
                <p id="mvp-renhanh-hoi" className="dialog__text mc__prompt">
                  <CodeText text={dienTen(kn.nut.asker.text)} />
                </p>
                <div className="mc__status-bar">
                  <span className="mc__note">Chọn là chốt — không quay lại được.</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'line-pick':
        return (
          <div className="mvp-lop" role="group" aria-label="Chọn dòng SQL">
            <p className="mvp-lop__huongdan">{kn.lanThu > 0 ? 'Chưa đúng dòng — chọn lại.' : 'Chọn dòng có vấn đề.'}</p>
            <ul className="mc__choices">
              {kn.nut.lines.map((d) => (
                <li key={d.index} className="mc__choice-item">
                  <button type="button" className="mc__choice mono" onClick={() => hanhDong({ type: 'chon-dong', index: d.index })}>
                    {d.sql}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'show-document':
        return <TaiLieuMvp kb={kb} id={kn.documentId} dienTen={dienTen} onCat={tiep} />;
      case 'challenge':
      case 'fix-query':
        return (
          <ManThuThachMvp
            key={`${kn.thuThach.id}-${kn.kind}`}
            kb={kb}
            duLieu={kb.duLieu}
            the={kn.thuThach}
            mode={kn.kind}
            dienTen={dienTen}
            onXong={() => hanhDong({ type: 'xong-thu-thach', thuThach: kn.thuThach.id })}
          />
        );
      case 'effect':
        return isEffectId(kn.effectId) ? <ObjectionEffect effectId={kn.effectId} onDone={tiep} /> : <HieuUngLa onDone={tiep} />;
      case 'projector':
        return <ManChieuMvp kb={kb} duLieu={kb.duLieu} nut={kn.nut} onTiep={tiep} />;
      case 'notebook-lookup':
        return <TraSoMvp kb={kb} trang={kn.trang} dienTen={dienTen} onTiep={tiep} />;
      case 'notebook-copy':
        return <ChepSoMvp kb={kb} trang={kn.trang} dienTen={dienTen} lanThu={kn.lanThu} tenNguoiNoi={(sp) => tenNguoiNoi(kb, sp)} onChon={(id) => hanhDong({ type: 'chon', luaChon: id })} />;
      case 'trial-filter':
        return <LocThuMvp duLieu={kb.duLieu} nut={kn.nut} lanThu={kn.lanThu} onChon={(giaTri) => hanhDong({ type: 'chon-o', giaTri })} />;
      case 'end':
        return <KetMvp ketQua={kn.ketQua} onChoiLai={choiLai} onVeTieuDe={onVeTieuDe} />;
      case 'error':
        return (
          <div className="game__error" role="alert">
            <p>Nội dung không nhất quán: {kn.message}</p>
            <p>Chạy `npm run kiem-noi-dung:mvp` để tìm lỗi; hoặc bắt đầu lại từ menu.</p>
          </div>
        );
    }
  })();

  const game = (
    <div className={`game mvp-game${laDoc ? ' game--portrait' : ''}`}>
      {toast ? <div className="vn-toast" role="status">{toast}</div> : null}
      <HudMvp
        kb={kb}
        s={s}
        soHoSo={soHoSo(s)}
        onMoHoSo={() => setHoSoMo(true)}
        onMoSoTay={() => setSoTayMo(true)}
        onMoLuu={() => setLuuNap('save')}
        onMoNap={() => setLuuNap('load')}
        onMoLichSu={() => setLichSuMo(true)}
        onBatDauLai={choiLai}
        onVeTieuDe={onVeTieuDe}
      />
      <SanKhauMvp kb={kb} canh={s.canh} dem={dem} speaker={loiHienTai?.speaker} expression={loiHienTai?.expression} shaking={rung}>
        {noiDung}
      </SanKhauMvp>

      {hoSoMo ? <HoSoMvp kb={kb} hoSo={s.hoSo} dienTen={dienTen} onDong={() => setHoSoMo(false)} /> : null}
      {soTayMo ? <SoCaNhanMvp kb={kb} trang={s.soTay} dienTen={dienTen} onDong={() => setSoTayMo(false)} /> : null}
      <BacklogModal open={lichSuMo} onClose={() => setLichSuMo(false)} />
      {luuNap ? (
        <LuuNapMvp
          mode={luuNap}
          oLuu={oLuu}
          coTienDo={kn.kind !== 'end'}
          onLuu={(o) => {
            luuVaoO(o, nhanTienDo(s));
            baoToast(`Đã lưu vào ô ${o + 1}.`);
            setLuuNap(null);
          }}
          onNap={(o) => {
            const moi = napTuO(o);
            if (moi) {
              clearBacklog();
              baoToast(`Đã nạp ô ${o + 1}: ${nhanTienDo(moi)}.`);
            }
            setLuuNap(null);
          }}
          onDong={() => setLuuNap(null)}
        />
      ) : null}
    </div>
  );

  if (laGiaLap) {
    return (
      <div className="game-simulator-backdrop">
        <div className="game-simulator-bezel">
          <div className="game-simulator-island">
            <div className="game-simulator-island-camera" />
          </div>
          {game}
          <div className="game-simulator-home-bar" />
        </div>
      </div>
    );
  }
  return game;
}

/** Hiệu ứng không có trong `EFFECT_IDS` của prototype: bỏ qua ngay (không chặn người chơi). */
function HieuUngLa({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}
