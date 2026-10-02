/**
 * HAI NGƯỜI KIỂM PHIẾU (user chốt 02/10/2026): Duy kiểm hình thức, Hà Vy kiểm ý nghĩa. Một dải hai ô dưới đề bài của màn tra
 * và màn gom nhóm; mỗi ô có ảnh chibi, tiêu chí, và dấu đạt / chưa sau mỗi lần chạy (`null` = chưa chạy).
 */
import { anhTheoTen } from '../anh-mvp';

export interface KiemPhieuProps {
  duy: string;
  duyDat: boolean | null;
  vy: string;
  vyDat: boolean | null;
}

function Nguoi({ ma, ten, tieuChi, dat }: { ma: string; ten: string; tieuChi: string; dat: boolean | null }) {
  const anh = anhTheoTen(`chibi-${ma}`);
  return (
    <span className={`v7-kiem__nguoi${dat === true ? ' is-dat' : dat === false ? ' is-chua' : ''}`}>
      {anh ? <img className="v7-kiem__mat" src={anh} alt="" draggable={false} /> : null}
      <span>
        <b>{ten} kiểm</b> {tieuChi}
        {dat === null ? '' : dat ? ' ✓' : ' ✗'}
      </span>
    </span>
  );
}

export function KiemPhieu({ duy, duyDat, vy, vyDat }: KiemPhieuProps) {
  return (
    <p className="v7-kiem" aria-label="Hai người kiểm phiếu">
      <Nguoi ma="duy" ten="Duy" tieuChi={duy} dat={duyDat} />
      <Nguoi ma="ha-vy" ten="Hà Vy" tieuChi={vy} dat={vyDat} />
    </p>
  );
}
