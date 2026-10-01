/**
 * HAI MẶT CỦA PHÒNG (user chốt 30/09): bảng điều tra là mặt chính của phòng CLB; mở laptop thì sang màn tra v7, thẻ trên
 * bảng thành giấy nhớ dán quanh màn hình; tra đúng thì quay về bảng, phiếu mới được ghim và sợi chỉ tự vẽ từ các thẻ đã dùng.
 *
 *   'bang' → (mở laptop) → 'may' → (tra đúng, bấm ghim) → 'ghim' → (tiếp tục) → onXong
 *
 * Phòng máy không có bảng trên tường nên vào thẳng màn máy; phiếu vẫn ghim lên bảng sau khi tra đúng.
 * Buổi họp (`fix-query`) là màn chiếu: không có bảng, xong là đi tiếp.
 */
import { useState } from 'react';
import type { BoDuLieuMvp, KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import type { TrangThaiMvp } from '../../engine/trang-thai';
import { nguonBangTongHop, type NguonTongHop } from '../../engine/trinh-dung-tong-hop';
import { BangGhimMvp } from './BangGhimMvp';
import { ManTraV7, type CanhTra } from './ManTraV7';
import { ManTongHopMvp, type KetQuaTraTongHop } from './ManTongHopMvp';

export interface PhongTraMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  duLieu: BoDuLieuMvp | null;
  the: TheThuThachMvp;
  mode: 'challenge' | 'fix-query';
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /** Tên cảnh đang đứng (vd "Phòng CLB", "Trong phòng máy"). */
  noi?: string;
  onDoiCho: (the: string, x: number, y: number) => void;
  onXong: (dung: string[], phieu?: import('../../engine/trang-thai').PhieuTruyVanMvp, ghiChu?: import('../../engine/trang-thai').GhiChuTruyVanMvp[]) => void;
}

type Pha = { ten: 'bang' } | { ten: 'may' } | { ten: 'ghim'; dung: string[]; phieu?: import('../../engine/trang-thai').PhieuTruyVanMvp; ghiChu?: import('../../engine/trang-thai').GhiChuTruyVanMvp[] };

export function PhongTraMvp({ kb, s, duLieu, the, mode, giayNho, dienTen, noi, onDoiCho, onXong }: PhongTraMvpProps) {
  const laPhongMay = noi !== undefined && /phòng máy/i.test(noi);
  const canh: CanhTra = mode === 'fix-query' ? 'man-chieu' : laPhongMay ? 'phong-may' : 'phong-clb';
  const [pha, setPha] = useState<Pha>(() => (mode === 'fix-query' || laPhongMay ? { ten: 'may' } : { ten: 'bang' }));
  const [xong, setXong] = useState(false);
  const nguonTongHop: NguonTongHop[] = [
    ...(duLieu ? nguonBangTongHop(duLieu) : []),
    ...Object.values(s.bang?.phieuTruyVan ?? {}).map((p) => ({ id: p.id, sql: p.sql, cot: p.cot })),
  ];
  const nguonDuocChon = the.nguon ? nguonTongHop.filter((nguon) => nguon.id === the.nguon) : nguonTongHop;

  const hoanTatTongHop = (ketQua: KetQuaTraTongHop): void => {
    if (!the.vatChung) return;
    const phieu = {
      id: the.vatChung.id,
      nhan: the.vatChung.title,
      sql: ketQua.sql,
      cot: ketQua.cot.map((ten, i) => ({
        ten,
        kieu: ten.toLowerCase() === 'so_dong' || typeof ketQua.rows.find((row) => row[i] !== null)?.[i] === 'number' ? 'INTEGER' as const : 'TEXT' as const,
      })),
      nguonId: ketQua.source,
      tongHop: true,
      soDong: ketQua.rows.length,
    };
    const ghiChu = ketQua.selectedNoteColumn && ketQua.noteValues
      ? [{ id: `${phieu.id}-note-${ketQua.selectedNoteColumn}`, nhan: `${phieu.nhan} · ${ketQua.selectedNoteColumn}`, cot: ketQua.selectedNoteColumn, giaTri: ketQua.noteValues.map((v) => String(v ?? '')), nguonId: phieu.id }]
      : [];
    if (mode === 'challenge' && the.vatChung) {
      soundEngine.playSfx('clue_unlock');
      setPha({ ten: 'ghim', dung: [], phieu, ghiChu });
    } else onXong([], phieu, ghiChu);
  };

  if (pha.ten === 'bang') {
    return (
      <div className="phong-tra" data-pha="bang">
        <BangGhimMvp kb={kb} s={s} dienTen={dienTen} onDoiCho={onDoiCho}>
          <button
            type="button"
            className="bang__mo-may"
            onClick={() => {
              soundEngine.playSfx('select');
              setPha({ ten: 'may' });
            }}
            autoFocus
          >
            <span aria-hidden="true">💻</span> Mở laptop
          </button>
        </BangGhimMvp>
      </div>
    );
  }
  if (pha.ten === 'ghim' && the.vatChung) {
    return (
      <div className="phong-tra" data-pha="ghim">
        <BangGhimMvp kb={kb} s={s} dienTen={dienTen} them={{ id: the.vatChung.id, dung: pha.dung, ...(pha.phieu ? { phieu: pha.phieu } : {}), ...(pha.ghiChu ? { ghiChu: pha.ghiChu } : {}) }} moi={the.vatChung.id} onDoiCho={onDoiCho}>
          <button
            type="button"
            className="bang__mo-may bang__mo-may--tiep"
            disabled={xong}
            onClick={() => {
              if (xong) return;
              setXong(true);
              if (pha.phieu || pha.ghiChu?.length) onXong(pha.dung, pha.phieu, pha.ghiChu);
              else onXong(pha.dung);
            }}
            autoFocus
          >
            Tiếp tục
          </button>
        </BangGhimMvp>
      </div>
    );
  }
  return (
    <div className="phong-tra" data-pha="may">
      {the.kieuTrinhDung === 'tong-hop' && duLieu ? <ManTongHopMvp duLieu={duLieu} the={the} nguon={nguonDuocChon} giayNho={giayNho} dienTen={dienTen} onXong={hoanTatTongHop} /> : <ManTraV7
        kb={kb}
        duLieu={duLieu}
        the={the}
        mode={mode}
        canh={canh}
        giayNho={giayNho}
        dienTen={dienTen}
        onXong={(dung, result) => {
          const isNguonDuocKhaiBao = !!the.vatChung && Object.values(kb.thuThach).some((challenge) => challenge.kieuTrinhDung === 'tong-hop' && challenge.nguon === the.vatChung?.id);
          const phieu = result && the.vatChung && isNguonDuocKhaiBao
            ? { id: the.vatChung.id, nhan: the.vatChung.title, sql: result.sql, cot: result.cot, nguonId: '', tongHop: false, soDong: result.soDong }
            : undefined;
          if (the.vatChung && mode !== 'fix-query') {
            soundEngine.playSfx('clue_unlock');
            setPha({ ten: 'ghim', dung, ...(phieu ? { phieu } : {}) });
          } else if (phieu) onXong(dung, phieu);
          else onXong(dung);
        }}
      />}
    </div>
  );
}
