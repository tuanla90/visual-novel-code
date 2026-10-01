/**
 * Bảng người quan sát của bản MVP (gói giao-dien-mvp) — chỉ hiện khi URL có `?facilitator=1` (như QĐ-030 của prototype).
 * Dùng lại lớp CSS `.facilitator*` của `styles/app.css` (dải thu gọn ở đáy, phần mở rộng neo mép phải) nhưng là
 * component riêng: `FacilitatorPanel` gắn chặt store/telemetry/`PART_IDS` của prototype.
 *
 * "Nhảy tới" các điểm SQL (`DIEM_NHAY_MVP`): máy TỰ CHƠI từ ván mới theo một đường đi cố định (`nhayToi`) → trạng thái
 * giống hệt người đã chơi tới đó (ngày/khung/hồ sơ/cờ), nên Lưu/Nạp và chơi tiếp không có gì đặc biệt. Có hỏi xác nhận
 * vì ván MVP đang chơi bị thay (ô lưu giữ nguyên). Bản MVP chưa ghi telemetry riêng nên không có sự kiện nhảy để ghi.
 */
import { useEffect, useState } from "react";
import type { KichBanMvp } from "../../content/mvp/types";
import { ConfirmDialog } from "../../shared/ui/ConfirmDialog";
import { tenKhungHienTai } from "../engine/may";
import type { TrangThaiMvp } from "../engine/trang-thai";
import { DIEM_NHAY_MVP, type MaDiemNhayMvp } from "../engine/tu-choi";

export interface BangQuanSatMvpProps {
  kb: KichBanMvp;
  s: TrangThaiMvp;
  /** Loại khung nhìn hiện tại (`challenge`, `line`…). */
  loaiManHinh: string;
  /** Nhảy: trả `null` khi xong, hoặc lý do không nhảy được. */
  onNhay: (id: MaDiemNhayMvp) => string | null;
}

/** Gắn lớp `facilitator-on` lên <html> để #root chừa dải đáy (CSS của prototype). */
function useChuaDaiDay(): void {
  useEffect(() => {
    const html = document.documentElement;
    const coSan = html.classList.contains("facilitator-on");
    html.classList.add("facilitator-on");
    return () => {
      if (!coSan) html.classList.remove("facilitator-on");
    };
  }, []);
}

function viTri(kb: KichBanMvp, s: TrangThaiMvp): string {
  if (s.giaiDoan === "mo-dau") return "Mở đầu";
  if (s.giaiDoan === "ngay")
    return `Ngày ${s.ngay} · ${tenKhungHienTai(kb, s)}`;
  if (s.giaiDoan === "hop") return "Buổi họp rà soát";
  if (s.giaiDoan === "vu-sau") return `Vụ sau · ${tenKhungHienTai(kb, s)}`;
  return "Kết thúc";
}

export function BangQuanSatMvp({
  kb,
  s,
  loaiManHinh,
  onNhay,
}: BangQuanSatMvpProps) {
  useChuaDaiDay();
  const [mo, setMo] = useState(false);
  const [hoi, setHoi] = useState<MaDiemNhayMvp | null>(null);
  const [dangNhay, setDangNhay] = useState(false);
  const [bao, setBao] = useState<string | null>(null);
  const diemHoi = DIEM_NHAY_MVP.find((d) => d.id === hoi);
  const tongVach = kb.lich.luat.uyTin ?? 0;

  const nhay = (id: MaDiemNhayMvp): void => {
    const diem = DIEM_NHAY_MVP.find((d) => d.id === id);
    setHoi(null);
    setDangNhay(true);
    setBao(`Đang tự chơi tới "${diem?.nhan ?? id}"…`);
    // Nhường một nhịp cho dòng "Đang tự chơi…" hiện ra trước khi máy chạy (đồng bộ, vài trăm bước).
    setTimeout(() => {
      const loi = onNhay(id);
      setDangNhay(false);
      setBao(
        loi
          ? `Không nhảy tới được: ${loi}`
          : `Đã tới "${diem?.nhan ?? id}". Ván này do máy tự chơi tới đây (tên mặc định, ngành đầu danh sách).`,
      );
    }, 0);
  };

  return (
    <>
      <aside
        className={`facilitator mvp-quansat${mo ? " facilitator--open" : ""}`}
        aria-label="Bảng người quan sát (MVP)"
      >
        <div className="facilitator__bar">
          <p className="facilitator__brief">
            <strong>Người quan sát · MVP</strong> · {viTri(kb, s)} ·{" "}
            {loaiManHinh}
          </p>
          <button
            type="button"
            className="btn facilitator__toggle"
            aria-expanded={mo}
            aria-controls="mvp-quansat-than"
            title={
              mo
                ? "Thu gọn bảng người quan sát"
                : "Mở bảng người quan sát: vị trí, nhảy tới phần SQL"
            }
            onClick={() => setMo((m) => !m)}
          >
            {mo ? "Thu gọn bảng" : "Mở bảng"}
          </button>
        </div>

        {mo ? (
          <div id="mvp-quansat-than" className="facilitator__body">
            <section aria-labelledby="mvp-qs-vitri">
              <h2 id="mvp-qs-vitri" className="facilitator__h">
                Vị trí hiện tại
              </h2>
              <dl className="facilitator__grid">
                <dt>Mốc</dt>
                <dd>{viTri(kb, s)}</dd>
                <dt>Màn</dt>
                <dd>{loaiManHinh}</dd>
                <dt>Chuỗi · nút</dt>
                <dd>
                  {s.conTro ? `${s.conTro.chuoi} · ${s.conTro.nut}` : "—"}
                </dd>
                {s.giaiDoan === "hop" && tongVach > 0 ? (
                  <>
                    <dt>Uy tín</dt>
                    <dd>
                      {s.uyTin}/{tongVach} vạch
                    </dd>
                  </>
                ) : null}
                <dt>Hồ sơ</dt>
                <dd>
                  {s.hoSo.manhMoi.length} giấy nhớ · {s.hoSo.taiLieu.length} tài
                  liệu · {s.hoSo.bangChung.length} bằng chứng
                </dd>
              </dl>
            </section>

            <section aria-labelledby="mvp-qs-nhay">
              <h2 id="mvp-qs-nhay" className="facilitator__h">
                Nhảy tới phần SQL
              </h2>
              <p className="facilitator__muted">
                Máy tự chơi từ đầu theo một đường cố định (đủ bằng chứng cho kết
                thật), dừng ngay trước màn SQL. Ván MVP đang chơi bị thay; ô lưu
                giữ nguyên.
              </p>
              <ul className="mvp-quansat__ds">
                {DIEM_NHAY_MVP.map((d) => (
                  <li key={d.id} className="mvp-quansat__muc">
                    <button
                      type="button"
                      className="btn"
                      disabled={dangNhay}
                      onClick={() => setHoi(d.id)}
                      title={d.moTa}
                    >
                      {d.nhan}
                    </button>
                    <span className="facilitator__muted">{d.moTa}</span>
                  </li>
                ))}
              </ul>
              {bao ? (
                <p className="facilitator__muted" role="status">
                  {bao}
                </p>
              ) : null}
            </section>
          </div>
        ) : null}
      </aside>
      {/* Ngoài <aside> (z-index 15 của dải người quan sát) để hộp hỏi nổi trên thanh trên của game. */}
      <ConfirmDialog
        open={hoi !== null}
        title={`Nhảy tới "${diemHoi?.nhan ?? ""}"?`}
        message="Máy sẽ tự chơi ván MVP mới tới màn này. Tiến độ ván đang chơi bị thay (ô lưu giữ nguyên)."
        confirmLabel="Nhảy tới"
        onConfirm={() => {
          if (hoi) nhay(hoi);
        }}
        onCancel={() => setHoi(null)}
      />
    </>
  );
}
