/**
 * Màn kết bản MVP: kết thật / kết thường (QĐ-086/090), kèm MỘT câu hỏi đóng về cách nhập câu ở phòng máy (QĐ-092:
 * user muốn biết người chơi thử thích kéo thả, bấm khối hay gõ tay) — ghi telemetry `mvp_input_feedback`, không chữ tự do.
 */
import { useState } from 'react';
import { track } from '../../shared/telemetry/track';
import { TEN_CACH_NHAP } from '../engine/trinh-dung';

export interface KetMvpProps {
  ketQua: 'that' | 'thuong';
  onChoiLai: () => void;
  onVeTieuDe: () => void;
}

const LUA_CHON = [
  { id: 'keo', nhan: TEN_CACH_NHAP.keo },
  { id: 'khoi', nhan: TEN_CACH_NHAP.khoi },
  { id: 'go', nhan: TEN_CACH_NHAP.go },
  { id: 'mot-cach', nhan: 'Mình chỉ thử một cách' },
] as const;

export function KetMvp({ ketQua, onChoiLai, onVeTieuDe }: KetMvpProps) {
  const [daChon, setDaChon] = useState<string | null>(null);
  return (
    <section className="endscreen mvp-ket" aria-labelledby="mvp-ket-tieude">
      <p className="mvp-chal__kicker">Hết Vụ 1 — Chữ ký H.</p>
      <h2 id="mvp-ket-tieude" className="endscreen__title">
        {ketQua === 'that' ? 'Kết thật: người nộp không phải người viết' : 'Kết thường: chỉ là một ý kiến sinh viên'}
      </h2>
      <p className="endscreen__lead">
        {ketQua === 'that'
          ? 'Nhật ký in và lời kể sáng thứ Hai là hai nguồn riêng, cùng khớp với lời Hoài. CLB giữ được phòng.'
          : 'Dữ liệu chỉ ra ai cần hỏi, không chỉ ra ai đã làm. Lần sau, ghé thêm vài nơi để có bằng chứng thứ hai.'}
      </p>
      <div className="mvp-ket__hoi" role="group" aria-labelledby="mvp-ket-hoi">
        <p id="mvp-ket-hoi" className="mvp-ket__cau">Ở phòng máy, bạn thấy cách nhập câu nào dễ chơi nhất?</p>
        <div className="mvp-ket__chon">
          {LUA_CHON.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`btn btn--small${daChon === c.id ? ' btn--primary' : ''}`}
              aria-pressed={daChon === c.id}
              disabled={daChon !== null}
              onClick={() => {
                setDaChon(c.id);
                track({ type: 'mvp_input_feedback', preferred: c.id });
              }}
            >
              {c.nhan}
            </button>
          ))}
        </div>
        {daChon ? <p className="mvp-ket__cam-on">Cảm ơn bạn!</p> : null}
      </div>
      <div className="endscreen__actions">
        <button type="button" className="btn btn--primary" onClick={onChoiLai} autoFocus>
          Chơi lại từ đầu
        </button>
        <button type="button" className="btn" onClick={onVeTieuDe}>
          Về màn tiêu đề
        </button>
      </div>
    </section>
  );
}
