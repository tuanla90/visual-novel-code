/**
 * DỮ LIỆU NỀN ("nhiễu") của bộ MVP — nâng các bảng trong `noi-dung-mvp/du-lieu.md` lên cỡ một trường thật:
 * khoảng bốn nghìn sinh viên (bốn khóa 2021–2024), gần 20 CLB, sổ sách mới số hóa từ năm 2022.
 *
 * du-lieu.md vẫn là nơi giữ CÁC DÒNG CỦA TRUYỆN (manh mối, bẫy, đáp án). Tệp này chỉ thêm dòng nền quanh chúng, bằng bộ sinh
 * số giả ngẫu nhiên CÓ HẠT CỐ ĐỊNH (chạy lại ra đúng từng dòng), rồi sắp lại cho dòng truyện lẫn vào giữa. Bộ kiểm
 * (`npm run kiem-noi-dung:mvp`) vẫn chạy thật mọi câu SQL có khai số dòng trên bảng ĐÃ thêm nền.
 *
 * LUẬT GIỮ ĐÁP ÁN (đổi bộ sinh phải giữ đủ):
 *  - sinh_vien: không ai thêm tên "Tùng" (bài lọc thử ra đúng 3); lớp BC24A / BC23A không thêm ai có TÊN hay HỌ bắt đầu bằng H
 *    (chữ ký "H" ra đúng Hiếu, Hoài; bẫy cột họ đệm ra đúng Mai); không dùng tên nhân vật truyện.
 *  - lop_sinh_hoat: lớp Báo chí thêm vào không ở tòa B (tòa B + Báo chí ra đúng BC24A, BC23A).
 *  - nhat_ky_in: không tệp nào bắt đầu bằng "kien-nghi"; không thêm dòng của Hiếu, Hoài, clb_robotics quanh 14–16/09.
 *  - tin_nhan: không tin nào bắt đầu bằng câu tin đồn. dang_nhap_kenh: clb_robotics ngày 07/10 chỉ có 2 dòng truyện.
 *  - bai_dang_kenh: không thêm bài của clb_robotics. nhat_ky_su_dung: không phòng nào chuẩn hóa ra "clb-tham-tu".
 *  - don_linh_kien: đơn cũ đã quyết toán (không DA_DUYET / CHO_DUYET), không đứng tên Nam hay Khánh, không phải ba linh kiện
 *    kho đang 0; phiên cũ không ở máy văn phòng xưởng. khoan_chi: KHÔNG thêm (bản xuất giới hạn theo truyện Vụ 5).
 *  - luan_chuyen: phiếu thêm vào chỉ mang mã tài sản của CLB khác (không nối được với sổ tài sản CLB mình).
 *  - luot_don: không thêm lượt nào do SV240251 (Tùng) dẫn, không lượt nào đón SV240317 (Hoài): chín lượt của Tùng, một lượt nhà xe.
 *  - giao_dich: không thêm dòng HOAN. quet_the_thu_vien: KHÔNG thêm (thư viện chỉ in cho mỗi người bản của chính họ).
 * Không import gì (chạy được cả trong công cụ lẫn trong trình duyệt): kich-ban.gen.ts chỉ chứa dòng của truyện, dữ liệu nền
 * được sinh lại lúc nạp trò chơi; bộ kiểm cũng thêm nền trước khi chạy SQL.
 */
type GiaTriO = string | number | null;
/** Hình dạng tối thiểu của một bảng / bộ dữ liệu (khớp cả kiểu của tools lẫn của src/content/mvp/types.ts). */
interface BangDuLieuMvp {
  ten: string;
  dong: GiaTriO[][];
}
interface BoDuLieuMvp {
  bang: BangDuLieuMvp[];
}

/** mulberry32 — đủ tốt, gọn, ra cùng một dãy trên mọi máy. */
function taoNgauNhien(hat: number): () => number {
  let a = hat >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Xn {
  so: (tu: number, den: number) => number;
  chon: <T>(ds: readonly T[]) => T;
  co: (p: number) => boolean;
  tron: <T>(ds: T[]) => T[];
}

function xn(hat: number): Xn {
  const r = taoNgauNhien(hat);
  const so = (tu: number, den: number): number => tu + Math.floor(r() * (den - tu + 1));
  return {
    so,
    chon: (ds) => ds[Math.floor(r() * ds.length)] as (typeof ds)[number],
    co: (p) => r() < p,
    tron: (ds) => {
      for (let i = ds.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        const t = ds[i] as (typeof ds)[number];
        ds[i] = ds[j] as (typeof ds)[number];
        ds[j] = t;
      }
      return ds;
    },
  };
}

const hai = (n: number): string => String(n).padStart(2, '0');
const ba = (n: number): string => String(n).padStart(3, '0');
const NGAY_MS = 86400000;
const tuNgay = (s: string): number => Date.parse(`${s}T00:00:00Z`);
const raNgay = (ms: number): string => new Date(ms).toISOString().slice(0, 10);
const THU = ['CHU_NHAT', 'THU_HAI', 'THU_BA', 'THU_TU', 'THU_NAM', 'THU_SAU', 'THU_BAY'] as const;
const thuCua = (ms: number): number => new Date(ms).getUTCDay();
const gio = (g: number, p: number): string => `${hai(g)}:${hai(p)}`;

const HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đinh', 'Trịnh', 'Mai', 'Lương', 'Tạ', 'Cao', 'Chu', 'Tô', 'Lâm', 'Hà', 'Nguyễn', 'Nguyễn', 'Trần', 'Lê'] as const;
const DEM = ['Văn', 'Thị', 'Minh', 'Thu', 'Ngọc', 'Quốc', 'Đức', 'Thanh', 'Gia', 'Bảo', 'Hải', 'Kim', 'Xuân', 'Tuấn', 'Hữu', 'Thùy', 'Phương', 'Mỹ', 'Tiến', 'Mạnh', 'Nhật', 'Hồng', 'Trọng', 'Diệu', 'Khả', 'Thành', 'Như', 'Công'] as const;
/** Không có tên nhân vật truyện (Tùng, Duy, Linh, Quân, Nam, Khánh, Bách, Thảo, Vy, Anh, Hạnh, Lan, Thịnh, Cường, Quang, Khải, Hiếu, Hoài…). */
const TEN = [
  'An', 'Bình', 'Chi', 'Dũng', 'Dung', 'Giang', 'Hải', 'Hằng', 'Hân', 'Hòa', 'Huy', 'Hùng', 'Hương', 'Hưng', 'Hồng', 'Khoa', 'Kiên', 'Lâm', 'Long',
  'Ly', 'Mai', 'My', 'Nga', 'Ngân', 'Nghĩa', 'Ngọc', 'Nhân', 'Nhi', 'Nhung', 'Oanh', 'Phát', 'Phong', 'Phúc', 'Phương', 'Quyên', 'Quỳnh', 'Sơn', 'Tâm', 'Thành',
  'Thắng', 'Thư', 'Thủy', 'Tiến', 'Toàn', 'Trang', 'Trâm', 'Trí', 'Trinh', 'Trung', 'Tú', 'Tuấn', 'Tuyết', 'Uyên', 'Vân', 'Việt', 'Vinh', 'Vũ', 'Xuân', 'Yến',
  'Đạt', 'Đức', 'Châu', 'Diệp', 'Đông', 'Khang', 'Kiệt', 'Lộc', 'Minh', 'Nguyên', 'Nhật', 'Thiện', 'Thái', 'Tín', 'Trúc', 'Hiền', 'Huyền',
] as const;

const NGANH: readonly { ma: string; ten: string; lop: string }[] = [
  { ma: 'KT', ten: 'Kế toán', lop: 'ABC' },
  { ma: 'QT', ten: 'Quản trị kinh doanh', lop: 'ABC' },
  { ma: 'BC', ten: 'Báo chí', lop: 'AB' },
  { ma: 'TC', ten: 'Tài chính – Ngân hàng', lop: 'AB' },
  { ma: 'MK', ten: 'Marketing', lop: 'AB' },
  { ma: 'DL', ten: 'Du lịch', lop: 'AB' },
  { ma: 'CT', ten: 'Công nghệ thông tin', lop: 'ABC' },
  { ma: 'TM', ten: 'Thương mại điện tử', lop: 'AB' },
  { ma: 'HC', ten: 'Hành chính học', lop: 'AB' },
  { ma: 'LK', ten: 'Luật kinh tế', lop: 'AB' },
  { ma: 'NA', ten: 'Ngôn ngữ Anh', lop: 'ABC' },
  { ma: 'LG', ten: 'Logistics', lop: 'AB' },
];
const KHOA = [2021, 2022, 2023, 2024] as const;

/** Gần 20 CLB của trường (mã dùng cho tài khoản kênh `clb_<mã>` và quỹ). */
const CLB: readonly { ma: string; ten: string; quy: string }[] = [
  { ma: 'tham_tu', ten: 'Thám Tử Dữ Liệu', quy: 'Q-TT' },
  { ma: 'robotics', ten: 'Robotics', quy: 'Q-RB' },
  { ma: 'van_nghe', ten: 'Văn nghệ', quy: 'Q-VN' },
  { ma: 'tinh_nguyen', ten: 'Tình nguyện', quy: 'Q-TN' },
  { ma: 'tieng_anh', ten: 'Tiếng Anh', quy: 'Q-TA' },
  { ma: 'guitar', ten: 'Guitar', quy: 'Q-GT' },
  { ma: 'nhiep_anh', ten: 'Nhiếp ảnh', quy: 'Q-NA' },
  { ma: 'bong_da', ten: 'Bóng đá', quy: 'Q-BD' },
  { ma: 'cau_long', ten: 'Cầu lông', quy: 'Q-CL' },
  { ma: 'co_vua', ten: 'Cờ vua', quy: 'Q-CV' },
  { ma: 'sach', ten: 'Sách và Hành động', quy: 'Q-SA' },
  { ma: 'khoi_nghiep', ten: 'Khởi nghiệp', quy: 'Q-KN' },
  { ma: 'ky_nang', ten: 'Kỹ năng mềm', quy: 'Q-KM' },
  { ma: 'vo_thuat', ten: 'Võ thuật', quy: 'Q-VT' },
  { ma: 'nhay', ten: 'Nhảy hiện đại', quy: 'Q-NH' },
  { ma: 'moi_truong', ten: 'Môi trường xanh', quy: 'Q-MT' },
  { ma: 'ke_toan', ten: 'Kế toán trẻ', quy: 'Q-KE' },
  { ma: 'du_lich', ten: 'Du lịch trải nghiệm', quy: 'Q-DL' },
  { ma: 'truyen_thong', ten: 'Truyền thông', quy: 'Q-TR' },
];

const bangTheo = (d: BoDuLieuMvp, ten: string): BangDuLieuMvp | undefined => d.bang.find((b) => b.ten === ten);
const chu = (v: GiaTriO | undefined): string => String(v ?? '');
/** Sắp theo các cột (chỉ số) tăng dần, so chữ thường. */
function sap(b: BangDuLieuMvp, ...cot: number[]): void {
  b.dong.sort((x, y) => {
    for (const c of cot) {
      const a = chu(x[c]);
      const bb = chu(y[c]);
      if (a !== bb) return a < bb ? -1 : 1;
    }
    return 0;
  });
}

// ---------------------------------------------------------------------------------------------------------------------

function themLop(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'lop_sinh_hoat');
  if (!b) return;
  const r = xn(2101);
  const co = new Set(b.dong.map((h) => chu(h[0])));
  for (const k of KHOA) {
    for (const n of NGANH) {
      for (const chuCai of n.lop) {
        const ma = `${n.ma}${String(k).slice(2)}${chuCai}`;
        if (co.has(ma)) continue;
        // Báo chí thêm vào không ở tòa B: đáp án "tòa B và Báo chí" giữ đúng hai lớp của truyện.
        const toa = n.ma === 'BC' ? r.chon(['A', 'C']) : r.chon(['A', 'A', 'B', 'B', 'C', 'C', 'A']);
        b.dong.push([ma, n.ten, k, toa]);
      }
    }
  }
  // Khóa mới nhất trước, trong khóa theo mã lớp (như danh sách phòng đào tạo xuất ra).
  b.dong.sort((x, y) => Number(y[2]) - Number(x[2]) || (chu(x[0]) < chu(y[0]) ? -1 : 1));
}

function themSinhVien(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'sinh_vien');
  const lop = bangTheo(d, 'lop_sinh_hoat');
  if (!b || !lop) return;
  const r = xn(2102);
  const daCo = new Set(b.dong.map((h) => chu(h[0])));
  const siSo = new Map<string, number>();
  for (const h of b.dong) siSo.set(chu(h[3]), (siSo.get(chu(h[3])) ?? 0) + 1);
  for (const k of KHOA) {
    const yy = String(k).slice(2);
    // Mỗi người một số thứ tự trong khóa; trộn để mã không xếp theo lớp.
    const can: { lop: string }[] = [];
    for (const l of lop.dong.filter((h) => Number(h[2]) === k)) {
      const ma = chu(l[0]);
      const muc = r.so(30, 40);
      for (let i = siSo.get(ma) ?? 0; i < muc; i++) can.push({ lop: ma });
    }
    r.tron(can);
    let stt = 100;
    for (const c of can) {
      let ma: string;
      do {
        stt += 1;
        ma = `SV${yy}${String(stt).padStart(4, '0')}`;
      } while (daCo.has(ma));
      daCo.add(ma);
      const kiengH = c.lop === 'BC24A' || c.lop === 'BC23A';
      let ho: string;
      let ten: string;
      do ho = r.chon(HO);
      while (kiengH && ho.startsWith('H'));
      do ten = r.chon(TEN);
      while (kiengH && ten.startsWith('H'));
      b.dong.push([ma, `${ho} ${r.chon(DEM)}`, ten, c.lop]);
    }
  }
  sap(b, 0);
}

const MON = ['kinh-te-vi-mo', 'nguyen-ly-ke-toan', 'marketing-can-ban', 'triet-hoc', 'tieng-anh-1', 'toan-cao-cap', 'phap-luat-dai-cuong', 'tin-hoc-dai-cuong', 'quan-tri-hoc', 'xac-suat-thong-ke', 'tai-chinh-doanh-nghiep', 'ky-nang-mem', 'lich-su-dang', 'kinh-te-luong', 'co-so-du-lieu', 'luat-thuong-mai', 'nghiep-vu-bao-chi', 'logistics-can-ban'] as const;
const TEP: readonly { mau: string; trang: [number, number] }[] = [
  { mau: 'bai-tap-{mon}.pdf', trang: [2, 8] },
  { mau: 'slide-{mon}.pdf', trang: [8, 40] },
  { mau: 'bao-cao-nhom-{mon}.docx', trang: [4, 18] },
  { mau: 'de-cuong-{mon}.pdf', trang: [3, 12] },
  { mau: 'tieu-luan-{mon}.docx', trang: [10, 28] },
  { mau: 'de-thi-thu-{mon}.pdf', trang: [2, 6] },
  { mau: 'don-xin-nghi-hoc.docx', trang: [1, 1] },
  { mau: 'giay-xac-nhan-sinh-vien.pdf', trang: [1, 1] },
  { mau: 'cv-xin-thuc-tap.pdf', trang: [1, 2] },
  { mau: 'lich-thi-hoc-ky.pdf', trang: [1, 3] },
  { mau: 'thoi-khoa-bieu.pdf', trang: [1, 2] },
  { mau: 'don-dang-ky-ky-tuc-xa.docx', trang: [1, 2] },
];
const TEP_CLB = ['ke-hoach-hoat-dong.docx', 'poster-tuyen-thanh-vien.pdf', 'danh-sach-thanh-vien.xlsx', 'bien-ban-hop.docx', 'thu-moi-su-kien.docx', 'bao-cao-thang.docx'] as const;

function themNhatKyIn(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'nhat_ky_in');
  const sv = bangTheo(d, 'sinh_vien');
  if (!b || !sv) return;
  const r = xn(2103);
  const cam = new Set(['SV240228', 'SV240317']);
  const maCu = sv.dong.map((h) => chu(h[0])).filter((m) => !m.startsWith('SV24') && !cam.has(m));
  const maMoi = sv.dong.map((h) => chu(h[0])).filter((m) => m.startsWith('SV24') && !cam.has(m));
  const dau = tuNgay('2024-02-19');
  const cuoi = tuNgay('2024-09-16');
  const nhapHoc = tuNgay('2024-09-03');
  const he = [tuNgay('2024-06-24'), tuNgay('2024-08-18')];
  for (let ng = dau; ng <= cuoi; ng += NGAY_MS) {
    const thu = thuCua(ng);
    const nghiHe = ng >= (he[0] ?? 0) && ng <= (he[1] ?? 0);
    let n = thu === 0 ? r.so(1, 4) : thu === 6 ? r.so(4, 9) : r.so(12, 22);
    if (nghiHe) n = Math.floor(n / 5);
    const sat = ng >= tuNgay('2024-09-14');
    if (ng === cuoi) n = 2;
    for (let i = 0; i < n; i++) {
      // Ba ngày của truyện (14–16/09): chỉ thêm việc in ban ngày, trước 19 giờ (sáng 16/09 thì trước 8 giờ).
      const g = ng === cuoi ? 7 : sat ? r.so(8, 18) : r.so(7, 21);
      const p = ng === cuoi ? r.so(35, 58) : r.so(0, 59);
      const laClb = r.co(0.06);
      let tk: string;
      let tep: string;
      let trang: number;
      if (laClb) {
        // clb_robotics không có dòng nền từ tháng 9 (các dòng của nó quanh lá thư là dòng truyện).
        const c = r.chon(CLB.filter((x) => x.ma !== 'robotics' || ng < tuNgay('2024-09-01')));
        tk = `clb_${c.ma}`;
        tep = r.chon(TEP_CLB);
        trang = r.so(1, 6);
      } else {
        tk = ng >= nhapHoc && r.co(0.3) ? r.chon(maMoi) : r.chon(maCu);
        const t = r.chon(TEP);
        tep = t.mau.replace('{mon}', r.chon(MON));
        trang = r.so(t.trang[0], t.trang[1]);
      }
      b.dong.push([`${raNgay(ng)} ${gio(g, p)}`, tk, tep, trang]);
    }
  }
  sap(b, 0);
}

const TIN_GOC = [
  'Ai nhặt được ví ở sân bóng', 'Tìm bạn ở ghép gần cổng sau', 'Pass lại giáo trình Kinh tế vi mô', 'Căng tin hôm nay có bún chả', 'Lịch thi giữa kỳ đã có trên cổng đào tạo',
  'Cần mượn máy tính cầm tay chiều nay', 'Thư viện mở tới 22 giờ từ tuần này', 'Ai học Tiếng Anh 1 ca tối cho xin lịch', 'Nhóm chạy bộ sáng mai tập ở sân vận động', 'Tìm người đi chung xe về quê cuối tuần',
  'Phòng B204 đổi sang phòng B301 từ thứ Tư', 'Mất thẻ sinh viên ở nhà xe', 'Tuyển cộng tác viên cho ngày hội việc làm', 'Bán lại vé xem văn nghệ chào tân sinh viên', 'Hỏi cách đăng ký học phần bổ sung',
  'Có ai để quên ô ở giảng đường A', 'Lớp ôn Xác suất mở thêm một buổi', 'Nhà xe tăng giá vé tháng từ tháng 11', 'Quán photo cổng trước nghỉ đến thứ Năm', 'Tìm đồng đội thi ý tưởng khởi nghiệp',
  'Wifi ký túc xá lại chập chờn', 'Cho hỏi hạn nộp lệ phí bảo hiểm', 'Giải cầu lông khoa đăng ký tới thứ Sáu', 'Xin tài liệu ôn Pháp luật đại cương', 'Máy bán nước tầng 2 tòa C hỏng rồi',
  'Đội tình nguyện tuyển người hiến máu đợt 2', 'Ai có lịch xe buýt tuyến mới không', 'Thông báo nghỉ học chiều thứ Sáu để tổng vệ sinh', 'Tìm chủ nhân chùm chìa khóa có móc gấu', 'Hỏi thủ tục xin giấy xác nhận sinh viên',
] as const;

function themTinNhan(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'tin_nhan');
  const sv = bangTheo(d, 'sinh_vien');
  if (!b || !sv) return;
  const r = xn(2104);
  const ma = sv.dong.map((h) => chu(h[0]));
  const dau = Date.parse('2024-10-07T17:00:00Z');
  const cuoi = Date.parse('2024-10-08T12:30:00Z');
  const daDang: string[] = [];
  for (let i = 0; i < 330; i++) {
    let t = dau + Math.floor(((cuoi - dau) * (i + r.so(0, 99) / 100)) / 330);
    const g = new Date(t).getUTCHours();
    if (g >= 1 && g < 6) t += 6 * 3600000; // đêm khuya gần như không ai nhắn
    const iso = new Date(t).toISOString();
    const chuyen = daDang.length > 3 && r.co(0.3);
    const nd = chuyen ? r.chon(daDang) : r.chon(TIN_GOC);
    if (!chuyen) daDang.push(nd);
    const tk = r.co(0.08) ? `clb_${r.chon(CLB.filter((c) => c.ma !== 'robotics' && c.ma !== 'tham_tu')).ma}` : r.chon(ma);
    b.dong.push(['', `${iso.slice(0, 10)} ${iso.slice(11, 16)}`, tk, chuyen ? 'CHUYEN_TIEP' : 'GOC', nd]);
  }
  // Đánh lại mã tin theo thời gian (truyện không nhắc mã tin nào).
  sap(b, 1);
  b.dong.forEach((h, i) => {
    h[0] = `T-${ba(i + 1)}`;
  });
}

function themDangNhapKenh(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'dang_nhap_kenh');
  const sv = bangTheo(d, 'sinh_vien');
  if (!b || !sv) return;
  const r = xn(2105);
  const ma = sv.dong.map((h) => chu(h[0]));
  const NGAY_TIN = '2024-10-07';
  for (let ng = tuNgay('2024-09-16'); ng <= tuNgay('2024-10-08'); ng += NGAY_MS) {
    const ngay = raNgay(ng);
    const n = r.so(34, 52);
    for (let i = 0; i < n; i++) {
      if (ngay === '2024-10-08' && r.co(0.5)) continue; // bản xuất lấy lúc trưa 08/10
      const laClb = r.co(0.25);
      const g = ngay === '2024-10-08' ? r.so(6, 11) : r.so(6, 23);
      if (laClb) {
        const c = r.chon(CLB.filter((x) => x.ma !== 'robotics'));
        b.dong.push([`clb_${c.ma}`, r.chon(['DIEN-THOAI', 'MAY-CLB', 'LAPTOP-CA-NHAN', 'DIEN-THOAI']), ngay, gio(g, r.so(0, 59))]);
      } else {
        b.dong.push([r.chon(ma), r.chon(['DIEN-THOAI', 'DIEN-THOAI', 'LAPTOP-CA-NHAN', 'MAY-THU-VIEN']), ngay, gio(g, r.so(0, 59))]);
      }
    }
    // Kênh Robotics: mỗi chiều một lần từ máy xưởng số 2 hoặc điện thoại trực kênh — trừ ngày 07/10 và 08/10 (đã có dòng truyện).
    if (ngay !== NGAY_TIN && ngay !== '2024-10-08' && thuCua(ng) !== 0) {
      b.dong.push(['clb_robotics', r.chon(['MAY-XUONG-02', 'DIEN-THOAI-TRUC', 'MAY-XUONG-02']), ngay, gio(r.so(14, 17), r.so(0, 59))]);
    }
  }
  sap(b, 2, 3);
}

const VIEC_XUONG = ['Đội thi đấu tập', 'Sinh hoạt thành viên', 'Hướng dẫn thành viên mới', 'Dọn xưởng', 'Lắp mô hình trưng bày', 'Sửa bàn hàn', 'Tập huấn an toàn điện', 'Chạy thử xe dò line', 'Họp ban chủ nhiệm'] as const;

function themDatXuong(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'dat_xuong');
  if (!b) return;
  const r = xn(2106);
  for (let ng = tuNgay('2022-09-05'); ng < tuNgay('2024-10-07'); ng += NGAY_MS) {
    const thu = thuCua(ng);
    const th = new Date(ng).getUTCMonth() + 1;
    if (thu === 0 || th === 7 || (th === 8 && new Date(ng).getUTCDate() < 20) || !r.co(0.46)) continue;
    const toi = r.co(0.45);
    const tu = toi ? 19 : thu === 6 ? 8 : r.chon([14, 14, 15]);
    const dai = r.so(2, 3);
    b.dong.push([raNgay(ng), THU[thu] ?? '', gio(tu, 0), gio(tu + dai, r.chon([0, 0, 30])), r.chon(VIEC_XUONG)]);
  }
  sap(b, 0, 2);
}

const KENH_KHAC = ['khoa_ke_toan', 'khoa_quan_tri', 'khoa_bao_chi', 'khoa_tai_chinh', 'khoa_marketing', 'khoa_du_lich', 'khoa_cntt', 'khoa_ngoai_ngu', 'khoa_luat', 'doan_truong', 'hoi_sinh_vien', 'ky_tuc_xa', 'thu_vien', 'phong_dao_tao', 'phong_ctsv'] as const;

function themBaiDang(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'bai_dang_kenh');
  if (!b) return;
  const r = xn(2107);
  const kenh = [...CLB.filter((c) => c.ma !== 'robotics').map((c) => `clb_${c.ma}`), ...KENH_KHAC];
  for (const k of kenh) {
    const n = r.so(4, 13);
    for (let i = 0; i < n; i++) {
      const laClb = k.startsWith('clb_');
      b.dong.push(['', k, `2024-10-${hai(r.so(1, 9))}`, r.chon(laClb ? ['CHIEU', 'TOI', 'TOI'] : ['SANG', 'SANG', 'CHIEU']), laClb ? r.chon(['DIEN-THOAI', 'DIEN-THOAI', 'MAY-CLB', 'LAPTOP-CA-NHAN']) : r.chon(['MAY-VAN-PHONG', 'MAY-VAN-PHONG', 'DIEN-THOAI'])]);
    }
  }
  const BUOI: Record<string, number> = { SANG: 0, CHIEU: 1, TOI: 2 };
  b.dong.sort((x, y) => (chu(x[2]) !== chu(y[2]) ? (chu(x[2]) < chu(y[2]) ? -1 : 1) : (BUOI[chu(x[3])] ?? 0) - (BUOI[chu(y[3])] ?? 0)));
  b.dong.forEach((h, i) => {
    h[0] = `BD-${ba(i + 1)}`;
  });
}

const PHONG = ['P-KHO-CHUNG', 'clb-robotics', 'clb-van-nghe', 'clb-guitar', 'clb-tieng-anh', 'clb-nhiep-anh', 'clb-co-vua', 'clb-sach', 'hoi-truong-nho', 'phong-hop-1', 'phong-hop-2', 'phong-tap-nhay', 'san-khau', 'clb-tinh-nguyen', 'clb-khoi-nghiep'] as const;
const VIEC_PHONG = ['Họp thành viên', 'Sinh hoạt định kỳ', 'Tập văn nghệ', 'Nhận vật tư', 'Hướng dẫn tân thành viên', 'Tập huấn', 'Họp ban chủ nhiệm', 'Chuẩn bị sự kiện', 'Kiểm kê thiết bị', 'Chiếu phim', 'Tập đàn', 'Luyện nói'] as const;

function themNhatKySuDung(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'nhat_ky_su_dung');
  if (!b) return;
  const r = xn(2108);
  const soDaCo = new Set(b.dong.map((h) => chu(h[0])));
  const so = r.tron(Array.from({ length: 400 }, (_, i) => i + 9));
  let k = 0;
  for (let ngay = 1; ngay <= 31; ngay++) {
    const n = r.so(6, 11);
    for (let i = 0; i < n; i++) {
      let ma: string;
      do ma = `BUOI-${hai(so[k++] ?? 0)}`;
      while (soDaCo.has(ma));
      let p: string = r.chon(PHONG);
      // Mã phòng gõ tay: lệch hoa/thường, thừa dấu cách ở đuôi (như các dòng của truyện).
      if (r.co(0.22)) p = p === p.toUpperCase() ? p.toLowerCase() : p.toUpperCase();
      if (r.co(0.12)) p += '  ';
      const tt = ngay > 23 ? 'DU_KIEN' : r.co(0.07) ? 'HUY' : 'DA_XAC_NHAN';
      b.dong.push([ma, p, `2024-10-${hai(ngay)}`, r.chon(VIEC_PHONG), tt]);
    }
  }
  r.tron(b.dong); // sổ nhập không theo thứ tự ngày (bài ORDER BY)
}

const LINH_KIEN_CU = ['Cảm biến dò line', 'Pin 18650', 'Dây nối', 'Bánh xe', 'Ốc vít', 'Keo dán', 'Mỏ hàn', 'Điện trở', 'Tụ điện', 'Đèn LED', 'Dây điện', 'Thiếc hàn', 'Băng keo cách điện', 'Mạch Arduino', 'Cảm biến siêu âm', 'Động cơ DC', 'Công tắc', 'Giắc cắm', 'Mica tấm', 'Bu lông', 'Đế pin', 'Mạch cầu H', 'Cảm biến hồng ngoại', 'Màn hình LCD', 'Module Bluetooth', 'Dây rút', 'Ống co nhiệt'] as const;

function themDonVaPhien(d: BoDuLieuMvp): void {
  const don = bangTheo(d, 'don_linh_kien');
  const phien = bangTheo(d, 'phien_dang_nhap');
  const kho = bangTheo(d, 'kiem_ke');
  if (!don || !phien || !kho) return;
  const r = xn(2109);
  const coKho = new Set(kho.dong.map((h) => chu(h[0])));
  for (const lk of LINH_KIEN_CU) if (!coKho.has(lk)) kho.dong.push([lk, r.so(2, 60)]);
  const dem: Record<string, number> = {};
  const demPhien: Record<string, number> = {};
  const moPhien = (nam: string, ngay: string): string => {
    demPhien[nam] = (demPhien[nam] ?? 0) + 1;
    const ma = `PH${nam}-${ba(demPhien[nam] ?? 0)}`;
    const sang = r.co(0.15);
    phien.dong.push([ma, r.chon(['MAY-XUONG-01', 'MAY-XUONG-02']), ngay, gio(sang ? r.so(9, 11) : r.so(13, 17), r.so(0, 59))]);
    return ma;
  };
  for (let ng = tuNgay('2022-09-12'); ng <= tuNgay('2024-06-14'); ng += NGAY_MS) {
    const th = new Date(ng).getUTCMonth() + 1;
    if (thuCua(ng) === 0 || th === 7 || th === 8) continue;
    const nam = String(new Date(ng).getUTCFullYear() - (th < 9 ? 1 : 0)).slice(2);
    const ngay = raNgay(ng);
    if (r.co(0.27)) {
      dem[nam] = (dem[nam] ?? 0) + 1;
      const nguoi = nam === '22' ? r.chon(['Long', 'Vũ', 'Trí', 'Phong', 'Kiên']) : r.chon(['Kiên', 'Đức', 'Sơn', 'Bách', 'Thảo', 'Phong']);
      const lk = r.chon(LINH_KIEN_CU);
      const sl = r.so(1, 20);
      don.dong.push([`DLK${nam}-${ba(dem[nam] ?? 0)}`, ngay, nguoi, lk, sl, sl * r.so(3, 45) * 1000, moPhien(nam, ngay), r.co(0.07) ? 'HUY' : 'DA_QUYET_TOAN']);
    }
    if (r.co(0.1)) moPhien(nam, ngay); // phiên mở phần mềm mà không tạo đơn
  }
  // Kỳ này: thêm vài phiên không tạo đơn ở hai máy xưởng (không máy văn phòng).
  let stt = 23;
  for (const ngay of ['2024-09-18', '2024-09-23', '2024-09-25', '2024-09-30', '2024-10-03', '2024-10-08']) {
    stt += 1;
    phien.dong.push([`PH-${stt}`, r.chon(['MAY-XUONG-01', 'MAY-XUONG-02']), ngay, gio(r.so(14, 17), r.so(0, 59))]);
  }
  sap(don, 1, 0);
  sap(phien, 2, 3);
  sap(kho, 0);
}

function themQuyVaChi(d: BoDuLieuMvp): void {
  const quy = bangTheo(d, 'quy');
  if (!quy) return;
  const coQuy = new Set(quy.dong.map((h) => chu(h[0])));
  for (const c of CLB) if (!coQuy.has(c.quy)) quy.dong.push([c.quy, c.ma.toUpperCase(), `Quỹ CLB ${c.ten}`]);
  // Sổ chi KHÔNG thêm dòng nền: theo truyện, thầy Quang chỉ cho xuất các khoản ghi vào quỹ CLB Thám Tử và khoản liên quan ba đơn
  // đang xét (sổ không thuộc CLB). Bảng quỹ thì đủ 19 CLB (bảng tra mã quỹ).
}

const TAI_SAN_CLB: readonly [string, string, string][] = [
  ['MC-01', 'Máy chiếu mini', 'TU_CLB'],
  ['BT-01', 'Bảng trắng di động', 'PHONG_CLB'],
  ['OC-01', 'Ổ cắm kéo dài', 'TU_CLB'],
  ['MI-01', 'Máy in cũ', 'PHONG_CLB'],
  ['TU-01', 'Tủ hồ sơ sắt', 'PHONG_CLB'],
  ['QD-01', 'Quạt đứng', 'PHONG_CLB'],
  ['MAN-01', 'Màn chiếu treo', 'KHO_CHUNG'],
  ['LT-01', 'Laptop CLB', 'TU_CLB'],
];
const DO_CLB_KHAC = ['LOA', 'MIC', 'DAN', 'TRONG', 'DEN', 'MAY-ANH', 'CHAN-MAY', 'BAN', 'GHE', 'BANG', 'MAY-CHIEU', 'AMPLY', 'O-CAM', 'PHONG-NEN'] as const;
const NOI_CHUYEN = ['TU_THIET_BI_CHUNG', 'PHONG_AM_THANH', 'KHO_CHUNG', 'HOI_TRUONG_NHO', 'SAN_KHAU', 'PHONG_HOP_1', 'PHONG_TAP_NHAY'] as const;

function themTaiSan(d: BoDuLieuMvp): void {
  const ts = bangTheo(d, 'tai_san');
  const lc = bangTheo(d, 'luan_chuyen');
  if (!ts || !lc) return;
  const r = xn(2111);
  for (const t of TAI_SAN_CLB) ts.dong.push([...t]);
  sap(ts, 0);
  const soDaCo = new Set(lc.dong.map((h) => chu(h[0])));
  const so = r.tron(Array.from({ length: 480 }, (_, i) => i + 23));
  let k = 0;
  const maClb = ['RB', 'VN', 'GT', 'NA', 'TA', 'NH', 'TN', 'KN', 'SA', 'CV', 'BD', 'CL'];
  for (let ng = tuNgay('2024-09-09'); ng <= tuNgay('2024-10-31'); ng += NGAY_MS) {
    if (thuCua(ng) === 0) continue;
    const n = r.so(1, 5);
    for (let i = 0; i < n; i++) {
      let ma: string;
      do ma = `PX-${so[k++] ?? 0}`;
      while (soDaCo.has(ma));
      const ngay = raNgay(ng);
      const tt = ngay >= '2024-10-29' ? 'DE_XUAT' : r.co(0.06) ? 'TU_CHOI' : 'DA_NHAN';
      lc.dong.push([ma, `${r.chon(maClb)}-${r.chon(DO_CLB_KHAC)}-${hai(r.so(1, 6))}`, r.chon(NOI_CHUYEN), r.chon(['Tổ thiết bị', 'Tổ thiết bị', 'Ban quản lý nhà văn hóa', `CLB ${r.chon(CLB.slice(2)).ten}`]), ngay, tt]);
    }
  }
  sap(lc, 4, 0);
}

function themGiaoDich(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'giao_dich');
  if (!b) return;
  const r = xn(2112);
  let stt = b.dong.length;
  let ct = 104;
  let th = 300;
  for (let phieu = 7; phieu <= 38; phieu++) {
    const n = r.so(1, 3);
    for (let i = 0; i < n; i++) {
      stt += 1;
      const thu = r.co(0.3);
      b.dong.push([`GD-${hai(stt)}`, `PH-${hai(phieu)}`, thu ? 'THU' : 'CHI', r.so(2, 45) * 10000, thu ? `TH-${(th += 1)}` : `CT-${(ct += 1)}`]);
    }
  }
}

const DIEM_DEN = ['KTX', 'KTX', 'KTX', 'KTX', 'KTX', 'KTX', 'HOI_TRUONG', 'HOI_TRUONG', 'NHA_XE'] as const;
/** Sổ đón tân sinh viên của đội tình nguyện, ba đợt nhập học 2022–2024: mỗi đợt 12 tình nguyện viên khóa trên, mỗi người 5–12 lượt. */
function themLuotDon(d: BoDuLieuMvp): void {
  const b = bangTheo(d, 'luot_don');
  const sv = bangTheo(d, 'sinh_vien');
  if (!b || !sv) return;
  const r = xn(2113);
  const daCo = new Set(b.dong.map((h) => chu(h[0])));
  const theoKhoa = (nam: number): string[] => sv.dong.map((h) => chu(h[0])).filter((m) => m.startsWith(`SV${String(nam).slice(2)}`) && m !== 'SV240251' && m !== 'SV240317');
  const NGAY_DAU: Record<number, string> = { 2022: '2022-09-10', 2023: '2023-09-09', 2024: '2024-09-07' };
  let stt = 0;
  for (const nam of [2022, 2023, 2024]) {
    const tan = theoKhoa(nam);
    const tnv = r.tron(theoKhoa(nam - 1)).slice(0, 12);
    if (tan.length === 0) continue;
    for (const t of tnv) {
      const n = r.so(5, 12);
      for (let i = 0; i < n; i++) {
        let ma: string;
        do {
          stt += 1;
          ma = `LD-${String(stt).padStart(4, '0')}`;
        } while (daCo.has(ma));
        daCo.add(ma);
        b.dong.push([ma, raNgay(tuNgay(NGAY_DAU[nam] ?? '2024-09-07') + r.so(0, 1) * NGAY_MS), t, r.chon(tan), r.chon(DIEM_DEN)]);
      }
    }
  }
  sap(b, 1, 0);
}

/** Thêm dữ liệu nền vào bộ dữ liệu đã đọc từ du-lieu.md (sửa tại chỗ, trả lại chính nó). */
export function themNhieuMvp<T extends BoDuLieuMvp>(d: T): T {
  themLop(d);
  themSinhVien(d);
  themNhatKyIn(d);
  themTinNhan(d);
  themDangNhapKenh(d);
  themDatXuong(d);
  themBaiDang(d);
  themNhatKySuDung(d);
  themDonVaPhien(d);
  themQuyVaChi(d);
  themTaiSan(d);
  themGiaoDich(d);
  themLuotDon(d);
  return d;
}
