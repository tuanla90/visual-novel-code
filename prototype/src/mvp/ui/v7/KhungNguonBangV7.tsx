import { IconLock, IconPin } from '../../../shared/ui/icons';
import type { NguonPhieuV7 } from './canh-tra';

export type { NguonPhieuV7 };

export interface KhungNguonBangV7Props {
  bang: { ten: string; cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[]; soDong: number };
  daChonBang: boolean;
  onChonBang?: (ten: string) => void;
  chonBang: boolean;
  danhSachBangChon?: string[];
  nguonPhieu?: NguonPhieuV7 | null;
  dienTen: (t: string) => string;
  tongDong: number;
  khoa: boolean;
  khoiNoi: boolean;
  bangNoiDuoc: readonly string[];
  cauNoiBang?: { bang: string; cot: string };
  cotChung: string[];
  onDoiNoiBang: (bang?: string, cot?: string) => void;
  onMoXemTruoc: () => void;
  /** Gói B17: đổi nhãn trên màn theo mức SQL (`engine/nhan-man-tra.ts`); thiếu = giữ chữ tiếng Việt. */
  nhan?: (chu: string) => string;
}

export function KhungNguonBangV7({
  bang,
  daChonBang,
  onChonBang,
  chonBang,
  danhSachBangChon,
  nguonPhieu,
  dienTen,
  tongDong,
  khoa,
  khoiNoi,
  bangNoiDuoc,
  cauNoiBang,
  cotChung,
  onDoiNoiBang,
  onMoXemTruoc,
  nhan = (chu) => chu,
}: KhungNguonBangV7Props) {
  const coNhieuBangGoc = danhSachBangChon && danhSachBangChon.length > 1;
  const coNoiBang = !!cauNoiBang?.bang;

  return (
    <div className="v7-cot v7-cot--nguon">
      <span className="v7-cot__nhan">{nhan('1. NGUỒN BẢNG')}</span>
      <div className="v7-cau__bang">
        {nguonPhieu ? (
          <span
            className="v7-o v7-o--bang v7-o--phieu"
            title={`Phiếu đã ghim "${dienTen(nguonPhieu.nhan)}" dùng làm nguồn, tên tạm ${bang.ten}`}
          >
            <IconPin className="v7-bt" /> {dienTen(nguonPhieu.nhan)}
          </span>
        ) : coNhieuBangGoc ? (
          <select
            className={`v7-o v7-o--bang v7-o--chon-bang${daChonBang ? '' : ' is-trong'}`}
            aria-label="Chọn bảng để tra"
            disabled={khoa}
            value={daChonBang ? bang.ten : ''}
            onChange={(e) => {
              if (onChonBang) onChonBang(e.target.value);
            }}
          >
            <option value="">chọn bảng…</option>
            {danhSachBangChon.map((ten) => (
              <option key={ten} value={ten}>
                {ten}
              </option>
            ))}
          </select>
        ) : chonBang ? (
          <select
            className={`v7-o v7-o--bang v7-o--chon-bang${daChonBang ? '' : ' is-trong'}`}
            aria-label="Chọn bảng để tra"
            disabled={khoa}
            value={daChonBang ? bang.ten : ''}
            onChange={(e) => {
              if (onChonBang) onChonBang(e.target.value);
            }}
          >
            <option value="">chọn bảng…</option>
            <option value={bang.ten}>{bang.ten}</option>
          </select>
        ) : (
          <span className="v7-o v7-o--bang" title={`Bảng ${bang.ten}`}>
            <IconLock className="v7-bt" /> {bang.ten}
          </span>
        )}
        <small>{daChonBang ? `${tongDong} dòng` : 'chưa chọn bảng'}</small>
      </div>

      {khoiNoi ? (
        <div className="v7-noi-vung" aria-label="Nối với bảng khác">
          <span className="v7-o v7-o--dau" aria-hidden="true">
            {nhan('NỐI VỚI')}
          </span>
          <button
            type="button"
            className={`v7-o v7-o--bang v7-o--noi-bang${cauNoiBang?.bang ? '' : ' is-trong'}`}
            disabled={khoa}
            aria-label={`Nối với bảng: ${cauNoiBang?.bang || 'chưa nối'} — bấm để đổi`}
            onClick={() => {
              const k = cauNoiBang?.bang ? bangNoiDuoc.indexOf(cauNoiBang.bang) + 1 : 0;
              const b = bangNoiDuoc[k % (bangNoiDuoc.length + 1)] ?? undefined;
              onDoiNoiBang(b);
            }}
          >
            {cauNoiBang?.bang || 'chưa nối'}
          </button>
          {cauNoiBang?.bang ? (
            <>
              <span className="v7-o v7-o--dau" aria-hidden="true">
                {nhan('THEO')}
              </span>
              <button
                type="button"
                className="v7-o v7-o--cot"
                disabled={khoa}
                aria-label={`Khóa nối: ${cauNoiBang.cot} — bấm để đổi`}
                onClick={() => {
                  const ke = cotChung[(cotChung.indexOf(cauNoiBang.cot) + 1) % Math.max(1, cotChung.length)];
                  onDoiNoiBang(cauNoiBang.bang, ke ?? '');
                }}
              >
                {cauNoiBang.cot || 'chưa chọn cột'}
              </button>
            </>
          ) : null}
        </div>
      ) : null}

      {/* Nút Khảo sát / Xem trước dữ liệu */}
      {daChonBang ? (
        <div className="v7-xem-truoc-vung">
          <button
            type="button"
            className={`v7-btn-preview${coNoiBang ? ' is-co-noi' : ''}`}
            onClick={onMoXemTruoc}
            title={coNoiBang ? 'Xem trước dữ liệu kèm các cột mới nối từ bảng khác' : nguonPhieu ? `Xem trước dữ liệu mẫu từ phiếu "${dienTen(nguonPhieu.nhan)}"` : 'Xem trước 6 dòng mẫu của bảng'}
            aria-label={nguonPhieu ? 'Xem trước dữ liệu phiếu nguồn' : 'Xem trước dữ liệu mẫu'}
          >
            <span className="v7-btn-preview__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span className="v7-btn-preview__text">
              {coNoiBang ? 'Xem trước bảng nối' : nguonPhieu ? 'Khảo sát phiếu nguồn' : 'Khảo sát bảng'}
            </span>
            {coNoiBang && <span className="v7-btn-preview__dot" aria-hidden="true" />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
