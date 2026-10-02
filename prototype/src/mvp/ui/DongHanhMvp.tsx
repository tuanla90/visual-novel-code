/**
 * BẠN ĐỒNG HÀNH (user chốt 02/10/2026: bộ ba người chơi – Tùng – Hà Vy): dải ảnh mặt tròn "Đi cùng" ở góc trên phải sân khấu,
 * cho người chơi luôn thấy ai đang đi với mình. Ai có mặt lấy từ chính kịch bản: Tùng / Hà Vy có lời trong chuỗi đang chạy thì
 * đang đi cùng. Bấm một người: người ấy nói lại việc đang nhắc (nếu chính họ nhắc), không thì một câu đúng giọng
 * (Tùng nói về người, Hà Vy nói về dữ liệu).
 */
import { useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { anhChanDung } from './anh-mvp';

const BO_BA = ['tung', 'ha-vy'] as const;

const CAU: Record<string, readonly string[]> = {
  tung: ['Tớ đi cùng đây. Cần hỏi ai thì bảo, người thì tớ quen.', 'Tớ cá là… thôi, cậu cứ xem đã.', 'Đi đâu tiếp cứ để tớ dẫn đường.'],
  'ha-vy': ['Đừng cá. Xem dữ liệu nói gì đã.', 'Thiếu căn cứ thì cứ nói là thiếu.', 'Có dữ liệu rồi mới đoán. Đoán trước là hỏng.'],
};

/** Tùng / Hà Vy có lời (thoại, nhắc việc, hỏi) trong chuỗi đang chạy. */
function dongHanhCua(kb: KichBanMvp, s: TrangThaiMvp): string[] {
  const c = kb.chuoi.find((x) => x.id === s.conTro?.chuoi);
  if (!c) return [];
  const noi = new Set<string>();
  for (const n of c.nodes) {
    if (n.type === 'line' || n.type === 'reminder') noi.add(n.speaker);
    else if (n.type === 'question' || n.type === 'doi-chat' || n.type === 'branch') noi.add(n.asker.speaker);
  }
  return BO_BA.filter((id) => noi.has(id));
}

export function DongHanhMvp({ kb, s, dienTen }: { kb: KichBanMvp; s: TrangThaiMvp; dienTen: (t: string) => string }) {
  const ds = dongHanhCua(kb, s);
  const [noi, setNoi] = useState<{ ai: string; cau: string } | null>(null);
  const [luot, setLuot] = useState(0);
  if (ds.length === 0) return null;
  const hoi = (id: string): void => {
    const nhac = s.nhacViec && s.nhacViec.nhanVat === id ? dienTen(s.nhacViec.text) : null;
    const cau = nhac ?? CAU[id]?.[luot % (CAU[id]?.length ?? 1)] ?? '';
    setLuot(luot + 1);
    setNoi(noi?.ai === id && noi.cau === cau ? null : { ai: id, cau });
  };
  return (
    <aside className="dong-hanh" aria-label={`Đi cùng: ${ds.map((id) => kb.nhanVat.find((n) => n.id === id)?.ten ?? id).join(', ')}`}>
      <span className="dong-hanh__nhan">Đi cùng</span>
      {ds.map((id) => {
        const nv = kb.nhanVat.find((n) => n.id === id);
        const url = anhChanDung(id, nv?.bieuCam[0]);
        return (
          <button key={id} type="button" className={`dong-hanh__nguoi${noi?.ai === id ? ' is-noi' : ''}`} aria-label={`Hỏi ${nv?.ten ?? id}`} title={`Hỏi ${nv?.ten ?? id}`} onClick={() => hoi(id)}>
            {url ? <img src={url} alt="" draggable={false} /> : <span>{(nv?.ten ?? id).charAt(0)}</span>}
          </button>
        );
      })}
      {noi ? (
        <button type="button" className="dong-hanh__cau" onClick={() => setNoi(null)} aria-label={`${kb.nhanVat.find((n) => n.id === noi.ai)?.ten ?? noi.ai}: ${noi.cau} — bấm để đóng`}>
          <b>{kb.nhanVat.find((n) => n.id === noi.ai)?.ten ?? noi.ai}</b> {noi.cau}
        </button>
      ) : null}
    </aside>
  );
}
