/**
 * MÀN HAI CÂU HỎI ĐẦU VÁN (gói B17, docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md): hiện ngay sau "Chơi mới" ở bộ mùa 1 (trước màn
 * tạo nhân vật), và mở lại từ menu Cài đặt ("Cách chơi") với nấc đang chọn. Hai câu trên một màn, mỗi câu ba thẻ có mô tả hai dòng;
 * chọn sẵn nấc giữa của câu 1 và nấc đầu của câu 2. Bàn phím: mũi tên đổi nấc trong câu đang đứng, Tab sang câu kia, Enter là
 * "Bắt đầu". Màn hẹp xếp dọc (CSS cho cả `@media` lẫn `.game--portrait`). Luật từng nấc: `engine/muc-choi.ts`.
 */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { soundEngine } from '../../shared/audio/sound-engine';
import type { MucNhapVaiMvp, MucSqlMvp } from '../engine/trang-thai';
import { CAU_HOI_NHAP_VAI, CAU_HOI_SQL, DONG_DOI_SAU, NAC_NHAP_VAI, NAC_SQL, NUT_BAT_DAU, type NacMvp } from './chon-muc-chu';
import { GHI_DIEN_THOAI, mucNhapVaiTheoMay, mucSqlTheoMay, useDienThoai } from './dien-thoai';
import './ChonMucMvp.css';

export interface ChonMucMvpProps {
  nhapVai: MucNhapVaiMvp;
  sql: MucSqlMvp;
  /** Chữ trên nút chốt: "Bắt đầu" ở đầu ván (mặc định), "Áp dụng" khi mở từ Cài đặt. */
  nhanNut?: string;
  /** Mở từ Cài đặt: có nút "Hủy", Esc đóng. Thiếu = màn đầu ván (không đóng được, chỉ "Bắt đầu"). */
  onDong?: () => void;
  onXong: (nhapVai: MucNhapVaiMvp, sql: MucSqlMvp) => void;
  /** Đang ở điện thoại (ẩn "Như thật" và "Tự viết", xem dien-thoai.ts). Không truyền → tự nhận biết. */
  dienThoai?: boolean;
}

function NhomNac<M extends string>({ id, cauHoi, nac, chon, onChon }: { id: string; cauHoi: string; nac: readonly NacMvp<M>[]; chon: M; onChon: (m: M) => void }) {
  return (
    <section className="mvp-chon-muc__cau">
      <h3 id={`${id}-hoi`} className="mvp-chon-muc__hoi">
        {cauHoi}
      </h3>
      <div className="mvp-chon-muc__nac" role="radiogroup" aria-labelledby={`${id}-hoi`} data-nhom={id} onClick={() => soundEngine.playSfx('select')}>
        {nac.map((n) => {
          const dang = n.muc === chon;
          return (
            <button
              key={n.muc}
              type="button"
              role="radio"
              aria-checked={dang}
              aria-label={n.ten}
              aria-describedby={`${id}-${n.muc}-mo-ta`}
              tabIndex={dang ? 0 : -1}
              className={`mvp-chon-muc__the${dang ? ' is-chon' : ''}`}
              data-muc={n.muc}
              onClick={() => onChon(n.muc)}
            >
              <b className="mvp-chon-muc__ten" aria-hidden="true">
                {n.ten}
              </b>
              <span id={`${id}-${n.muc}-mo-ta`} className="mvp-chon-muc__mo-ta">
                {n.moTa}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function ChonMucMvp({ nhapVai: nv0, sql: sql0, nhanNut = NUT_BAT_DAU, onDong, onXong, dienThoai: dienThoaiProp }: ChonMucMvpProps) {
  const dienThoaiTuDo = useDienThoai();
  const dienThoai = dienThoaiProp ?? dienThoaiTuDo;
  const [nhapVai0, setNhapVai] = useState<MucNhapVaiMvp>(nv0);
  const [sql0b, setSql] = useState<MucSqlMvp>(sql0);
  // Điện thoại: nấc phải gõ chữ bị ẩn, nấc đã lưu rơi vào đó thì về nấc còn lại.
  const nhapVai = mucNhapVaiTheoMay(nhapVai0, dienThoai);
  const sql = mucSqlTheoMay(sql0b, dienThoai);
  const nacNhapVai = dienThoai ? NAC_NHAP_VAI.filter((n) => n.muc !== 'that') : NAC_NHAP_VAI;
  const nacSql = dienThoai ? NAC_SQL.filter((n) => n.muc !== 'tu-viet') : NAC_SQL;
  const hop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    hop.current?.querySelector<HTMLElement>('[data-nhom="nhap-vai"] [aria-checked="true"]')?.focus();
  }, []);
  useEffect(() => {
    if (!onDong) return;
    const onKey = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape') onDong();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDong]);

  const xong = (): void => {
    soundEngine.playSfx('click');
    onXong(nhapVai, sql);
  };
  const phim = (e: KeyboardEvent<HTMLDivElement>): void => {
    // Không cho phím lọt ra sân khấu (Space / Enter của hộp thoại, ← lùi bước).
    e.stopPropagation();
    if (e.key === 'Escape' && onDong) {
      e.preventDefault();
      onDong();
      return;
    }
    if (e.key === 'Enter') {
      const t = e.target as HTMLElement;
      if (t.tagName === 'BUTTON' && t.getAttribute('role') !== 'radio') return;
      e.preventDefault();
      xong();
      return;
    }
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const buoc = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const nhom = (e.target as HTMLElement).closest<HTMLElement>('[data-nhom]') ?? hop.current?.querySelector<HTMLElement>('[data-nhom="nhap-vai"]');
    if (!nhom) return;
    const nut = [...nhom.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const i = nut.findIndex((b) => b.getAttribute('aria-checked') === 'true');
    const ke = nut[(i + buoc + nut.length) % nut.length];
    if (ke) {
      ke.focus();
      ke.click();
    }
  };

  return (
    <div className={`mvp-chon-muc${onDong ? ' mvp-chon-muc--hop' : ' mvp-chon-muc--man'}`} role="dialog" aria-modal="true" aria-labelledby="nhap-vai-hoi" onClick={(e) => e.stopPropagation()}>
      <div ref={hop} className="mvp-chon-muc__hop" onKeyDown={phim}>
        <NhomNac id="nhap-vai" cauHoi={CAU_HOI_NHAP_VAI} nac={nacNhapVai} chon={nhapVai} onChon={setNhapVai} />
        <NhomNac id="sql" cauHoi={CAU_HOI_SQL} nac={nacSql} chon={sql} onChon={setSql} />
        <footer className="mvp-chon-muc__chan">
          {dienThoai ? <p className="mvp-chon-muc__ghi mvp-chon-muc__ghi--may">{GHI_DIEN_THOAI}</p> : null}
          <p className="mvp-chon-muc__ghi">{DONG_DOI_SAU}</p>
          <div className="mvp-chon-muc__nut">
            {onDong ? (
              <button type="button" className="btn" onClick={onDong}>
                Hủy
              </button>
            ) : null}
            <button type="button" className="btn btn--primary mvp-chon-muc__xong" onClick={xong}>
              {nhanNut}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
