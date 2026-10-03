/**
 * Việc đang làm do một nhân vật nhắc (`> NHẮC VIỆC <ai>: …`, 01/10/2026): ảnh mặt tròn + câu nói ngắn, đặt ở góc trên
 * trái sân khấu (nhãn địa điểm dời sang góc phải). Khác "Nhiệm vụ" trên thanh trên (câu hỏi lớn của chặng): đây là bước
 * nhỏ đang làm, nói bằng giọng nhân vật — Tùng "Chưa biết là ai, lớp nào…", Hà Vy "Khoan, tính lại đã…".
 *
 * Ảnh mặt cắt từ chính ảnh chân dung 768×1360 (hay 1536×2736 cùng tỉ lệ): đầu nằm quanh điểm (50%, 20%) chiều cao ảnh,
 * rộng ~45% khung → ảnh đặt rộng 220% ô tròn, dịch sao cho điểm đó vào giữa ô (CSS `.nhac-viec__mat img`).
 * Đổi câu → trượt vào lại (key theo câu). Trang trí thuần; trình đọc màn hình đọc "Việc đang làm — <tên> nhắc: <câu>".
 */
import { useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { NhacViecMvp as NhacViec } from '../engine/trang-thai';
import { anhChanDung } from './anh-mvp';
import './NhacViecMvp.css';

export interface NhacViecMvpProps {
  kb: KichBanMvp;
  nhac: NhacViec;
  dienTen: (t: string) => string;
  /** Tên người chơi (khi người nhắc là `player`); rỗng → "Bạn". */
  tenNguoiChoi?: string;
}

export function NhacViecMvp({ kb, nhac, dienTen, tenNguoiChoi }: NhacViecMvpProps) {
  const [moRong, setMoRong] = useState(false);
  const laNguoiChoi = nhac.nhanVat === 'player';
  const nv = kb.nhanVat.find((n) => n.id === nhac.nhanVat);
  const ten = laNguoiChoi ? tenNguoiChoi || 'Bạn' : (nv?.ten ?? 'Nhân vật');
  const url = anhChanDung(laNguoiChoi ? 'nguoi-choi' : nhac.nhanVat, nhac.bieuCam ?? (laNguoiChoi ? undefined : nv?.bieuCam[0]));
  const cau = dienTen(nhac.text);
  return (
    <aside
      key={`${nhac.nhanVat}|${cau}`}
      className={`nhac-viec${moRong ? ' is-expanded' : ''}`}
      aria-label={`Việc đang làm — ${ten} nhắc: ${cau}`}
      data-nhan-vat={nhac.nhanVat}
      onClick={() => setMoRong((v) => !v)}
      title={cau}
      role="note"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setMoRong((v) => !v);
        }
      }}
    >
      <span className="nhac-viec__mat" aria-hidden="true">
        {url ? <img src={url} alt="" draggable={false} /> : <span className="nhac-viec__chu-tat">{ten.trim().charAt(0)}</span>}
      </span>
      <span className="nhac-viec__noi">
        <span className="nhac-viec__ten">{ten}</span>
        <span className="nhac-viec__cau">{cau}</span>
      </span>
    </aside>
  );
}
