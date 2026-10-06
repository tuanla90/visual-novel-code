/**
 * BẠN ĐI CÙNG TỰ NHẮC Ở CẢNH (gói B17, mức nhập vai "Có người dẫn"): ở cảnh khám phá còn việc chính (điểm "!" chưa xem) mà người
 * chơi để 40 giây không bấm gì thì bạn đang có mặt lên tiếng một bóng thoại gợi ý bậc 1 (lời nhắc việc, câu viết sẵn của
 * `engine/dong-hanh-viet-san.ts`, không gọi mạng). Mỗi cảnh (theo số chỗ đã xem) chỉ nhắc một lần; đóng là thôi. Mức khác không có.
 */
import { useEffect, useState } from 'react';
import type { KichBanMvp } from '../../content/mvp/types';
import { CodeText } from '../../shared/ui/CodeText';
import { loiVietSan } from '../engine/dong-hanh-viet-san';
import type { KhungNhinMvp } from '../engine/may';
import { tenNguoiNoi } from '../engine/may';
import { giayNhacDan, mucNhapVaiCua } from '../engine/muc-choi';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { banDangCoMat } from '../engine/tri-nho-dong-hanh';

export interface NhacDanMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  kn: Extract<KhungNhinMvp, { kind: 'explore' }>;
  /** Đang có hộp thoại khác mở (hồ sơ, Cài đặt…): không đếm giờ. */
  tam?: boolean;
}

export function NhacDanMvp({ kb, s, kn, tam = false }: NhacDanMvpProps) {
  const ms = giayNhacDan(mucNhapVaiCua(s));
  const ban = banDangCoMat(kb, s)[0];
  const loi = ban ? kb.hoiDap?.dongHanh?.loi[ban] : undefined;
  const coViecChinh = kn.diem.some((d) => d.diem.dau === 'chinh' && !d.daXem);
  const chu = loi && s.nhacViec && coViecChinh ? loiVietSan(kb, s, loi, 'goi-y') : null;
  const khoa = `${kn.nut.id}:${kn.diem.filter((d) => d.daXem).length}`;
  const [hien, setHien] = useState<{ khoa: string; mo: boolean } | null>(null);
  const dangHien = hien?.khoa === khoa && hien.mo;
  const daXong = hien?.khoa === khoa;
  const bat = ms !== null && !!chu && !tam && !daXong;
  useEffect(() => {
    if (!bat || ms === null) return;
    let id = window.setTimeout(bao, ms);
    function bao(): void {
      setHien({ khoa, mo: true });
    }
    const lai = (): void => {
      window.clearTimeout(id);
      id = window.setTimeout(bao, ms);
    };
    window.addEventListener('pointerdown', lai);
    window.addEventListener('keydown', lai);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('pointerdown', lai);
      window.removeEventListener('keydown', lai);
    };
  }, [bat, ms, khoa]);
  if (!dangHien || !chu || !ban) return null;
  return (
    <div className="mvp-hd-ban__bong mvp-nhac-dan" role="status" data-nhan-vat={ban} onClick={(e) => e.stopPropagation()}>
      <b>{tenNguoiNoi(kb, ban, s)}</b>
      <p>
        <CodeText text={chu} />
      </p>
      <button type="button" className="mvp-hd-ban__dong" onClick={() => setHien({ khoa, mo: false })}>
        Đóng
      </button>
    </div>
  );
}
