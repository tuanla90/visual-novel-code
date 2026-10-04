export interface KhungCotVaXepV7Props {
  chonCot: readonly string[] | null;
  bang: { ten: string; cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[]; soDong: number } | null;
  cotLay: string[];
  onDoiCot: (tenCot: string) => void;
  khoa: boolean;
  onChonTatCaCot: () => void;
  khoiSapXep: boolean;
  cauXep: { cot: string; giam: boolean } | null;
  cot: string[];
  onDoiXep: (updater: (prev: { cot: string; giam: boolean } | null) => { cot: string; giam: boolean } | null) => void;
}

/**
 * Cột 3: Lấy Cột (SELECT) & Sắp Xếp (ORDER BY).
 * Tách biệt khỏi Cột 1 để Cột 1 dành riêng cho nguồn bảng & JOIN.
 * Danh sách cột có thanh cuộn riêng, không vỡ bố cục khi bảng có nhiều cột.
 */
export function KhungCotVaXepV7({
  chonCot,
  bang,
  cotLay,
  onDoiCot,
  khoa,
  onChonTatCaCot,
  khoiSapXep,
  cauXep,
  cot,
  onDoiXep,
}: KhungCotVaXepV7Props) {
  return (
    <div className="v7-cot v7-cot--phu">
      <span className="v7-cot__nhan">{chonCot ? '3. CỘT & SẮP XẾP' : '3. SẮP XẾP'}</span>

      {chonCot && bang ? (
        <div className="v7-lay" role="group" aria-label="Các cột lấy ra">
          <div className="v7-lay__dau-nhan">
            <span className="v7-o v7-o--dau" aria-hidden="true">
              LẤY CỘT
            </span>
            <button
              type="button"
              className="v7-lay__chon-tat-ca"
              disabled={khoa}
              onClick={onChonTatCaCot}
            >
              {bang.cot.every((c) => cotLay.includes(c.ten)) ? 'Bỏ chọn hết' : 'Tất cả (*)'}
            </button>
          </div>
          <div className="v7-lay__danh-sach">
            {bang.cot.map((c) => {
              const bat = cotLay.includes(c.ten);
              return (
                <button
                  key={c.ten}
                  type="button"
                  className={`v7-o v7-o--lay${bat ? ' is-bat' : ''}`}
                  disabled={khoa}
                  aria-pressed={bat}
                  aria-label={`Cột ${c.ten}: ${bat ? 'đang lấy — bấm để bỏ' : 'chưa lấy — bấm để lấy'}`}
                  onClick={() => onDoiCot(c.ten)}
                >
                  <span className="v7-o--lay__icon" aria-hidden="true">
                    {bat ? (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </span>
                  <span className="v7-o--lay__ten">{c.ten}</span>
                </button>
              );
            })}
          </div>
          {cotLay.length === 0 ? <small className="v7-lay__nhac">bấm cột muốn xem</small> : null}
        </div>
      ) : null}

      {khoiSapXep ? (
        <div className="v7-dk v7-xep" aria-label="Xếp kết quả">
          <span className="v7-o v7-o--dau" aria-hidden="true">
            XẾP THEO
          </span>
          <button
            type="button"
            className={`v7-o v7-o--cot${cauXep ? '' : ' is-trong'}`}
            disabled={khoa}
            aria-label={`Xếp theo: ${cauXep ? cauXep.cot : 'chưa xếp'} — bấm để đổi`}
            onClick={() =>
              onDoiXep((prev) => {
                const k = prev ? cot.indexOf(prev.cot) + 1 : 0;
                const ke = cot[k];
                return ke === undefined ? null : { cot: ke, giam: prev?.giam ?? false };
              })
            }
          >
            {cauXep ? cauXep.cot : 'chưa xếp'}
          </button>
          {cauXep ? (
            <button
              type="button"
              className="v7-o v7-o--phep"
              disabled={khoa}
              aria-label={`Chiều xếp: ${cauXep.giam ? 'giảm dần' : 'tăng dần'} — bấm để đổi`}
              onClick={() => onDoiXep((prev) => (prev ? { ...prev, giam: !prev.giam } : null))}
            >
              <span className="v7-xep__chieu-icon" aria-hidden="true">
                {cauXep.giam ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                )}
              </span>
              <span>{cauXep.giam ? 'giảm dần' : 'tăng dần'}</span>
            </button>
          ) : null}
        </div>
      ) : (
        <div className="v7-cot__mac-dinh">Theo thứ tự bảng</div>
      )}
    </div>
  );
}
