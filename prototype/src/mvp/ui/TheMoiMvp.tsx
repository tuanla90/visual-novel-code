/**
 * THẺ MỚI — thay dòng toast chữ "Bảng điều tra có thêm thẻ mới.": các thẻ vừa vào hồ sơ hiện thành giấy thu nhỏ (cùng
 * hình dạng như trên bảng điều tra: giấy nhớ vàng, phiếu kẻ dòng, ảnh chụp, giấy tờ), rơi xuống góc trên phải ngay dưới
 * nút Hồ sơ, ghim nghiêng nhẹ, giữ một lúc rồi thu nhỏ bay vào nút Hồ sơ (số đếm trên nút nháy — CSS `:has`).
 *
 * Một đợt = các thẻ đến cùng lúc: xếp chồng lệch (tối đa 3 tờ, thừa ghi "+n thẻ nữa") — một nhịp duy nhất, không bắt người
 * chơi chờ từng tờ. Đợt sau (thẻ đến khi đợt trước còn đang bay) do nơi gọi xếp hàng: mỗi đợt một lần gắn component (`key`).
 * Giảm chuyển động (`prefers-reduced-motion`): chỉ hiện rồi ẩn, không rơi không bay (CSS).
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gocNghieng, type LoaiTheBang } from '../engine/bang-dieu-tra';
import { anhTheoTen } from './anh-mvp';
import { THOI_GIAN_THE_MOI, type TheMoi } from './the-moi';
import { NHIP } from './v7/nhip';

export interface TheMoiMvpProps {
  /** Các thẻ của đợt này (cố định suốt đời component — đợt mới thì gắn lại bằng `key`). */
  danhSach: readonly TheMoi[];
  dienTen: (t: string) => string;
  /** Hết hoạt ảnh (đã bay vào nút Hồ sơ). */
  onXong: () => void;
}

const TOI_DA_HIEN = 3;

const NHAN_LOAI: Record<LoaiTheBang, string> = { note: 'Query note',
  tin: 'Giấy nhớ',
  phieu: 'Phiếu tra cứu',
  vat: 'Vật chứng',
  'tai-lieu': 'Tài liệu',
  hoi: 'Câu hỏi',
};

const boNgoac = (t: string): string => t.replace(/^\[|\]$/g, '');

/** Khoảng cách (theo đơn vị CSS của khung game) từ tâm chồng thẻ tới tâm nút Hồ sơ; không đo được → `null`. */
function duongBay(el: HTMLElement | null): { x: number; y: number } | null {
  if (!el) return null;
  const nut = el.closest('.game')?.querySelector('.topbar__capsule-btn--dossier');
  if (!nut) return null;
  const a = el.getBoundingClientRect();
  const b = nut.getBoundingClientRect();
  if (a.width <= 0 || el.offsetWidth <= 0) return null;
  // Khung game có thể bị co (máy giả lập màn dọc) — đổi khoảng cách màn hình về đơn vị CSS của phần tử.
  const tiLe = el.offsetWidth / a.width;
  return { x: (b.left + b.width / 2 - (a.left + a.width / 2)) * tiLe, y: (b.top + b.height / 2 - (a.top + a.height / 2)) * tiLe };
}

export function TheMoiMvp({ danhSach, dienTen, onXong }: TheMoiMvpProps) {
  const chong = useRef<HTMLDivElement>(null);
  const [bay, setBay] = useState<{ x: number; y: number } | null | false>(false);

  useEffect(() => {
    const { vao, giu, bay: thoiGianBay } = THOI_GIAN_THE_MOI;
    const t1 = setTimeout(() => setBay(duongBay(chong.current)), (vao + giu) * NHIP);
    const t2 = setTimeout(onXong, (vao + giu + thoiGianBay) * NHIP);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onXong]);

  if (danhSach.length === 0) return null;
  const hien = danhSach.slice(0, TOI_DA_HIEN);
  const thua = danhSach.length - hien.length;
  const dangBay = bay !== false;
  const ten = danhSach.map((t) => dienTen(boNgoac(t.nhan)));
  const loiDoc =
    danhSach.length === 1 ? `Hồ sơ có thẻ mới: ${ten[0]}.` : `Hồ sơ có ${danhSach.length} thẻ mới: ${ten.join('; ')}.`;
  const style = (bay ? { '--bay-x': `${bay.x}px`, '--bay-y': `${bay.y}px` } : {}) as CSSProperties;

  return (
    <div className={`the-moi${dangBay ? ' is-bay' : ''}${bay === null ? ' is-bay-mac-dinh' : ''}`}>
      <p className="the-moi__doc" role="status">
        {loiDoc}
      </p>
      <div ref={chong} className="the-moi__chong" style={style} aria-hidden="true">
        {hien
          .map((t, i) => {
            const anh = t.anh && (t.loai === 'vat' || t.loai === 'tai-lieu') ? anhTheoTen(t.anh) : undefined;
            const st = { '--i': i, '--r': `${gocNghieng(t.id)}deg` } as CSSProperties;
            return (
              <div key={t.id} className={`the-moi__the the-moi__the--${t.loai}`} style={st}>
                <span className="the-moi__ghim" />
                {anh ? <img className="the-moi__anh" src={anh} alt="" draggable={false} /> : null}
                <span className="the-moi__loai">{NHAN_LOAI[t.loai]}</span>
                <span className="the-moi__ten">{ten[i]}</span>
              </div>
            );
          })
          // Tờ đầu tiên nằm trên cùng: vẽ ngược để tờ đầu là phần tử cuối.
          .reverse()}
        <span className="the-moi__dau">{danhSach.length > 1 ? `${danhSach.length} thẻ mới` : 'Thẻ mới'}</span>
        {thua > 0 ? <span className="the-moi__thua">+{thua} thẻ nữa</span> : null}
      </div>
    </div>
  );
}
