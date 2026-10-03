/**
 * MÀN MỞ MÀN CỦA BẢN MVP: tên game + menu Chơi mới / Chơi tiếp / Nạp / Cài đặt.
 * "Lưu" không nằm ở đây (chưa có ván để lưu) — lưu ở menu trong lúc chơi; từ đây chỉ nạp được.
 * Chơi mới khi đang có ván → hỏi xác nhận trước khi xóa (lỡ tay là mất tiến độ).
 */
import './tieu-de-mvp.css';
import { useEffect, useState } from 'react';
import { AudioSettingsModal } from '../../shared/audio/AudioSettingsModal';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { KICH_BAN, nhanTienDo, useKhoMvp } from '../store/kho-mvp';
import { anhNen, taiTruocAnh } from './anh-mvp';
import { LuuNapMvp } from './LuuNapMvp';

export interface TieuDeMvpProps {
  /** Vào màn chơi. `moi` = ván mới (kho đã xóa), không thì chơi tiếp trạng thái đang có. */
  onVao: (moi: boolean) => void;
}

export function TieuDeMvp({ onVao }: TieuDeMvpProps) {
  const s = useKhoMvp((k) => k.trangThai);
  const oLuu = useKhoMvp((k) => k.oLuu);
  const napTuO = useKhoMvp((k) => k.napTuO);
  const [nap, setNap] = useState(false);
  const [caiDat, setCaiDat] = useState(false);
  const [hoiChoiLai, setHoiChoiLai] = useState(false);
  const coVan = s !== null;
  const coONap = oLuu.some((o) => o !== null);
  const nen = anhNen('cong-truong');
  // Trong lúc người chơi đọc màn mở màn: tải sẵn nền và nhân vật của đoạn đầu (xe buýt → cổng → sảnh KTX → phòng 408).
  useEffect(() => {
    taiTruocAnh([
      'bg-mvp-xe-buyt', 'bg-mvp-cong-ktx', 'bg-mvp-sanh-ktx', 'bg-mvp-phong-ktx',
      'char-nguoi-choi', 'char-tung-ao-xanh', 'char-tung-ao-xanh-happy', 'char-tung-ao-xanh-thinking',
    ]);
  }, []);

  return (
    <main className="tdm" aria-label="Màn hình mở màn">
      {nen ? <img className="tdm__nen" src={nen} alt="" draggable={false} /> : null}
      <div className="tdm__phu" aria-hidden="true" />
      <div className="tdm__khung">
        <p className="tdm__kicker">Chương 1 · Chữ ký H</p>
        <h1 className="tdm__ten">{KICH_BAN.tenGame}</h1>
        <p className="tdm__lead">Một lá thư, vài manh mối và những bảng dữ liệu. Năm nhất đại học, bạn bước vào CLB Thám Tử.</p>
        <nav className="tdm__menu" aria-label="Menu chính">
          {coVan ? (
            <button type="button" className="tdm__nut tdm__nut--chinh" onClick={() => onVao(false)} autoFocus>
              Chơi tiếp
              <small>{nhanTienDo(s)}</small>
            </button>
          ) : null}
          <button
            type="button"
            className={`tdm__nut${coVan ? '' : ' tdm__nut--chinh'}`}
            onClick={() => (coVan ? setHoiChoiLai(true) : onVao(true))}
            autoFocus={!coVan}
          >
            Chơi mới
          </button>
          <button type="button" className="tdm__nut" onClick={() => setNap(true)} disabled={!coONap} title={coONap ? undefined : 'Chưa có ván nào được lưu'}>
            Nạp ván đã lưu
          </button>
          <button type="button" className="tdm__nut" onClick={() => setCaiDat(true)}>
            Cài đặt
          </button>
        </nav>
        <p className="tdm__chan">Lưu ván trong lúc chơi bằng nút Lưu ở thanh trên cùng.</p>
      </div>

      <AudioSettingsModal open={caiDat} onClose={() => setCaiDat(false)} />
      {nap ? (
        <LuuNapMvp
          mode="load"
          oLuu={oLuu}
          coTienDo
          canhHienTai="cong-truong"
          onLuu={() => undefined}
          onNap={(o) => {
            setNap(false);
            if (napTuO(o)) onVao(false);
          }}
          onDong={() => setNap(false)}
        />
      ) : null}
      <ConfirmDialog
        open={hoiChoiLai}
        title="Chơi mới từ đầu?"
        message="Ván đang chơi sẽ bị xóa. Các ô đã lưu vẫn giữ nguyên."
        confirmLabel="Xóa và chơi mới"
        onConfirm={() => {
          setHoiChoiLai(false);
          onVao(true);
        }}
        onCancel={() => setHoiChoiLai(false)}
      />
    </main>
  );
}
