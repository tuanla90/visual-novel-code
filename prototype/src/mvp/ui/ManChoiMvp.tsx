/**
 * MÀN CHƠI BẢN MVP — lối vào từ nút "Chơi bản MVP" ở màn tiêu đề (QĐ-077 gói 1). Ghép máy `engine/may.ts` với
 * giao diện: HUD (ngày/khung/uy tín), sân khấu MVP, hộp thoại VN (tái dùng `DialogBox`), câu hỏi (`MultipleChoice`),
 * bản đồ trường + màn trong địa điểm (vật tương tác), thử thách SQL, hồ sơ, sổ tay, lịch sử thoại (`BacklogModal`), Lưu/Nạp,
 * màn tạo nhân vật (`TaoNhanVatMvp`: tên + ngành, không hỏi giới tính — QĐ-084).
 * Người chơi đang đứng ở nơi nào (bản đồ hay trong một nơi) là trạng thái GIAO DIỆN (đi lại không tốn khung, không lưu);
 * sang ngày mới thì về bản đồ.
 * Trạng thái nằm trong `store/kho-mvp.ts` (khóa riêng), không đụng store prototype.
 */
import './mvp.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LoiMvp } from '../../content/mvp/types';
import { isFacilitatorMode } from '../../app/facilitator-mode';
import { isEffectId } from '../../shared/ids';
import { AudioSettingsModal } from '../../shared/audio/AudioSettingsModal';
import { useAudioStore } from '../../shared/audio/audio-store';
import { soundEngine } from '../../shared/audio/sound-engine';
import { DialogBox } from '../../shared/ui/DialogBox';
import { MultipleChoice } from '../../shared/ui/MultipleChoice';
import { CodeText } from '../../shared/ui/CodeText';
import { BacklogModal } from '../../shared/vn/BacklogModal';
import { useVnStore } from '../../shared/vn/vn-store';
import { ObjectionEffect } from '../../story/ui/ObjectionEffect';
import type { DialogueLine, MultipleChoiceQuestion } from '../../story/types';
import { canGioiThieu, dienTen as dienTenMay, khungNhin, tenNguoiNoi, type KhungNhinMvp } from '../engine/may';
import { giaTriTuHoSo } from '../engine/giay-nho';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { nhayToi, type MaDiemNhayMvp } from '../engine/tu-choi';
import { KICH_BAN, nhanTienDo, useKhoMvp } from '../store/kho-mvp';
import { BAN_DO_MVP } from './ban-do-mvp';
import { BangQuanSatMvp } from './BangQuanSatMvp';
import { BanDoMvp } from './BanDoMvp';
import { GioiThieuMvp } from './GioiThieuMvp';
import { HoSoMvp, type TabHoSoMvp } from './HoSoMvp';
import { HudMvp } from './HudMvp';
import { KetMvp } from './KetMvp';
import { KhamPhaMvp } from './KhamPhaMvp';
import { LocThuMvp } from './LocThuMvp';
import { LuuNapMvp } from './LuuNapMvp';
import { ManChieuMvp } from './ManChieuMvp';
import { ManThuThachMvp } from './ManThuThachMvp';
import { NoiMvp } from './NoiMvp';
import { SanKhauMvp } from './SanKhauMvp';
import { TaiLieuMvp } from './TaiLieuMvp';
import { TaoNhanVatMvp } from './TaoNhanVatMvp';
import { TraSoMvp } from './TrangSoMvp';

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
  const datTrangThai = useKhoMvp((k) => k.datTrangThai);

  /** Hồ sơ và Sổ cá nhân là hai tab của cùng một khung (phong cách hòm đồ prototype); `null` = đóng. */
  const [kho, setKho] = useState<TabHoSoMvp | null>(null);
  const [lichSuMo, setLichSuMo] = useState(false);
  const [luuNap, setLuuNap] = useState<'save' | 'load' | null>(null);
  const [caiDat, setCaiDat] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  /** Nơi đang đứng trong ngày (`null` = bản đồ). Gắn với ngày: sang ngày khác coi như về bản đồ. */
  const [dangO, setDangO] = useState<{ ngay: number; noi: string } | null>(null);

  const viewportMode = useVnStore((k) => k.viewportMode);
  const setSkipMode = useVnStore((k) => k.setSkipMode);
  const clearBacklog = useVnStore((k) => k.clearBacklog);
  const bgmEnabled = useAudioStore((k) => k.bgmEnabled);

  useEffect(() => {
    if (!s) batDau();
  }, [s, batDau]);

  const baoToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2800);
  }, []);

  // Nhạc nền như prototype: trình duyệt chỉ cho phát âm thanh sau thao tác đầu tiên của người chơi.
  useEffect(() => {
    if (!bgmEnabled) {
      soundEngine.stopBgm();
      return;
    }
    const start = (): void => soundEngine.startBgm();
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [bgmEnabled]);
  useEffect(() => () => soundEngine.stopBgm(), []);

  // Báo khi hồ sơ có thêm mục (kèm tiếng chuông như prototype).
  const demTruoc = useRef(s ? soHoSo(s) : 0);
  useEffect(() => {
    const dem = s ? soHoSo(s) : 0;
    if (dem > demTruoc.current) {
      soundEngine.playSfx('clue_unlock');
      baoToast('Hồ sơ có thêm mục mới.');
    }
    demTruoc.current = dem;
  }, [s, baoToast]);
  // Sổ cá nhân tự có dòng mới ([GHI SỔ], QĐ-092) → báo, để người chơi biết mà mở xem.
  const soTrangTruoc = useRef(s ? s.soTay.length : 0);
  useEffect(() => {
    const dem = s ? s.soTay.length : 0;
    if (dem > soTrangTruoc.current) {
      const moi = s ? kb.soTay[s.soTay[dem - 1] ?? ''] : undefined;
      soundEngine.playSfx('page');
      baoToast(moi?.chuThich ? `Sổ cá nhân có dòng mới: ${moi.chuThich.replace(/`/g, '')}` : 'Sổ cá nhân có dòng mới.');
    }
    soTrangTruoc.current = dem;
  }, [s, kb, baoToast]);

  const kn: KhungNhinMvp | null = s ? khungNhin(kb, s) : null;
  const loaiKn = kn?.kind;
  useEffect(() => {
    if (loaiKn !== 'line' && loaiKn !== 'feedback') setSkipMode(false);
  }, [loaiKn, setSkipMode]);
  // Tiếng "rung" khi nhân vật sững sờ (như prototype).
  const bieuCamNoi = kn?.kind === 'line' || kn?.kind === 'feedback' ? kn.loi.expression : undefined;
  useEffect(() => {
    if (bieuCamNoi === 'stunned') soundEngine.playSfx('shake');
  }, [bieuCamNoi]);

  const tiep = useCallback(() => hanhDong({ type: 'tiep' }), [hanhDong]);
  const dongGioiThieu = useCallback((nhanVat: string) => hanhDong({ type: 'da-gioi-thieu', nhanVat }), [hanhDong]);
  const dongKho = useCallback(() => setKho(null), []);
  const choiLai = useCallback(() => {
    clearBacklog();
    xoa();
    batDau();
  }, [clearBacklog, xoa, batDau]);

  if (!s || !kn) return null;
  const dienTen = (t: string): string => dienTenMay(kb, s, t);
  // Màn "Nhân vật mới" (như prototype): nhân vật có thẻ giới thiệu nói lần đầu → hiện trước lời thoại.
  const gioiThieu = canGioiThieu(kb, s, kn);
  const modalMo = kho !== null || lichSuMo || luuNap !== null || caiDat || gioiThieu !== null;
  const loiHienTai: { speaker: string; expression?: string } | null =
    kn.kind === 'line' || kn.kind === 'feedback'
      ? kn.loi
      : kn.kind === 'question' || kn.kind === 'branch'
        ? { speaker: kn.nut.asker.speaker }
        : kn.kind === 'create-character'
          ? kn.nut.asker
          : null;
  const dem = s.giaiDoan === 'ngay' && s.khung >= kb.lich.khung.length;
  const rung = kn.kind === 'effect' || loiHienTai?.expression === 'stunned';
  const laDoc = viewportMode === 'mobile';
  const laGiaLap = laDoc && typeof window !== 'undefined' && window.innerWidth > 768;
  const noiDangO = kn.kind === 'chon-dia-diem' && dangO && dangO.ngay === s.ngay ? kn.diaDiem.find((d) => d.diaDiem.id === dangO.noi) : undefined;

  // Bảng người quan sát (`?facilitator=1`): nhảy tới phần SQL = máy tự chơi ván mới tới đó (engine/tu-choi.ts).
  const quanSat = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);
  const nhay = (id: MaDiemNhayMvp): string | null => {
    let moi: TrangThaiMvp;
    try {
      moi = nhayToi(kb, id);
    } catch (e) {
      return e instanceof Error ? e.message : String(e);
    }
    clearBacklog();
    setKho(null);
    setLichSuMo(false);
    setLuuNap(null);
    setDangO(null);
    datTrangThai(moi);
    return null;
  };
  const bangQuanSat = quanSat ? <BangQuanSatMvp kb={kb} s={s} loaiManHinh={kn.kind} onNhay={nhay} /> : null;

  const nutVn = {
    keyboardEnabled: !modalMo,
    onOpenNotebook: () => setKho('ho-so'),
    notebookCount: soHoSo(s),
    onOpenBacklog: () => setLichSuMo(true),
    onOpenSave: () => setLuuNap('save'),
    onOpenLoad: () => setLuuNap('load'),
    onOpenAudio: () => setCaiDat(true),
  };

  const noiDung = (() => {
    switch (kn.kind) {
      case 'line':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} display={kn.display === 'card' ? 'card' : 'dialog'} speakerName={tenNguoiNoi(kb, kn.loi.speaker)} onAdvance={tiep} {...nutVn} />;
      case 'feedback':
        return <DialogBox line={thanhLine(kb, s, kn.loi)} hint={`Phản hồi ${kn.viTri + 1}/${kn.tong}`} speakerName={tenNguoiNoi(kb, kn.loi.speaker)} onAdvance={tiep} {...nutVn} />;
      case 'chon-dia-diem':
        return noiDangO ? (
          <NoiMvp
            key={noiDangO.diaDiem.id}
            kb={kb}
            noi={noiDangO}
            khung={kb.lich.khung[s.khung]?.id ?? null}
            khungConLai={kn.khungConLai}
            onChon={(duKien) => hanhDong({ type: 'chon-du-kien', diaDiem: noiDangO.diaDiem.id, duKien })}
            onVeBanDo={() => setDangO(null)}
          />
        ) : (
          <BanDoMvp
            banDo={BAN_DO_MVP}
            diaDiem={kn.diaDiem}
            khungConLai={kn.khungConLai}
            chinhXong={s.chinhXong}
            tenBuoiToi={kb.lich.buoiToi.ten}
            onDen={(noi) => setDangO({ ngay: s.ngay, noi })}
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
            giayNho={giaTriTuHoSo(kb, s.hoSo)}
          />
        );
      case 'effect':
        return isEffectId(kn.effectId) ? <ObjectionEffect effectId={kn.effectId} onDone={tiep} /> : <HieuUngLa onDone={tiep} />;
      case 'projector':
        return <ManChieuMvp kb={kb} duLieu={kb.duLieu} nut={kn.nut} onTiep={tiep} />;
      case 'notebook-lookup':
        return <TraSoMvp kb={kb} trang={kn.trang} dienTen={dienTen} onTiep={tiep} />;
      case 'trial-filter':
        return <LocThuMvp duLieu={kb.duLieu} nut={kn.nut} lanThu={kn.lanThu} onChon={(giaTri) => hanhDong({ type: 'chon-o', giaTri })} />;
      case 'create-character':
        return (
          <TaoNhanVatMvp
            key={`${s.conTro?.chuoi ?? ''}-${s.conTro?.nut ?? 0}`}
            kb={kb}
            nut={kn.nut}
            dienTen={dienTen}
            onDatTen={(ten) => hanhDong({ type: 'dat-ten', ten })}
            onChonNganh={(nganh) => hanhDong({ type: 'chon-nganh', nganh })}
          />
        );
      case 'explore':
        return <KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={kn.diem} onXem={(chuoi) => hanhDong({ type: 'xem-diem', chuoi })} />;
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
    <div className={`game mvp-game${laDoc ? ' game--portrait' : ''}${gioiThieu ? ' game--debut' : ''}`}>
      {toast ? <div className="vn-toast" role="status">{toast}</div> : null}
      {gioiThieu ? <GioiThieuMvp key={gioiThieu} kb={kb} nhanVat={gioiThieu} onDong={dongGioiThieu} /> : null}
      <HudMvp
        kb={kb}
        s={s}
        soHoSo={soHoSo(s)}
        soTrangSo={s.soTay.length}
        onMoHoSo={() => setKho('ho-so')}
        onMoSoTay={() => setKho('so-tay')}
        onMoLuu={() => setLuuNap('save')}
        onMoNap={() => setLuuNap('load')}
        onMoLichSu={() => setLichSuMo(true)}
        onMoCaiDat={() => setCaiDat(true)}
        onBatDauLai={choiLai}
        onVeTieuDe={onVeTieuDe}
      />
      <SanKhauMvp
        kb={kb}
        canh={noiDangO ? noiDangO.diaDiem.canh : s.canh}
        dem={dem}
        speaker={loiHienTai?.speaker}
        expression={loiHienTai?.expression}
        shaking={rung}
        coDan={kn.kind !== 'chon-dia-diem' && kn.kind !== 'explore'}
        tenNguoiChoi={s.tenNguoiChoi}
      >
        {noiDung}
      </SanKhauMvp>

      {kho ? (
        <HoSoMvp
          kb={kb}
          hoSo={s.hoSo}
          soTay={s.soTay}
          tenNguoiChoi={s.tenNguoiChoi}
          nganh={s.nganh}
          daGap={s.daGioiThieu ?? []}
          tab={kho}
          onDoiTab={setKho}
          dienTen={dienTen}
          onDong={dongKho}
        />
      ) : null}
      <BacklogModal open={lichSuMo} onClose={() => setLichSuMo(false)} />
      <AudioSettingsModal open={caiDat} onClose={() => setCaiDat(false)} />
      {luuNap ? (
        <LuuNapMvp
          mode={luuNap}
          oLuu={oLuu}
          coTienDo={kn.kind !== 'end'}
          canhHienTai={noiDangO ? noiDangO.diaDiem.canh : s.canh}
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
        {bangQuanSat}
      </div>
    );
  }
  return (
    <>
      {game}
      {bangQuanSat}
    </>
  );
}

/** Hiệu ứng không có trong `EFFECT_IDS` của prototype: bỏ qua ngay (không chặn người chơi). */
function HieuUngLa({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    onDone();
  }, [onDone]);
  return null;
}
