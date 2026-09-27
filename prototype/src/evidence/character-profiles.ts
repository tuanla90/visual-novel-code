import type { CharacterId, ExpressionOf } from '../shared/ids';

export interface CharacterProfile<C extends CharacterId = CharacterId> {
  id: C;
  name: string;
  fullName: string;
  title: string;
  age: number;
  year: string;
  major: string;
  role: string;
  quote: string;
  bio: string[];
  detectiveNote: string[];
  expressions: readonly ExpressionOf<C>[];
  accentColor: string;
}

export const CHARACTER_PROFILES: Record<CharacterId, CharacterProfile> = {
  'minh-anh': {
    id: 'minh-anh',
    name: 'Minh Anh',
    fullName: 'Lê Minh Anh',
    title: 'Chủ nhiệm CLB Thám tử Dữ liệu',
    age: 19,
    year: 'Năm thứ hai (K23)',
    major: 'Kinh tế Quốc tế',
    role: 'Trưởng nhóm điều tra & Người dẫn dắt vụ án',
    quote: 'Dữ liệu không biết nói dối, chỉ có người đọc chưa biết cách đặt câu hỏi đúng thôi.',
    bio: [
      'Năng nổ, nhiệt huyết và có trực giác nhạy bén trước những điểm bất thường. Minh Anh là người sáng lập kiêm Chủ nhiệm CLB Thám tử Dữ liệu.',
      'Cô luôn giữ tinh thần trách nhiệm cao nhất với câu lạc bộ và các thành viên, kiên quyết làm sáng tỏ vụ lá thư nặc danh để bảo vệ danh dự tập thể.',
    ],
    detectiveNote: [
      'Tiếp nhận lá thư nặc danh từ khe cửa phòng CLB vào sáng sớm.',
      'Cung cấp manh mối chữ ký “H” và phân tích cấu trúc mã sinh viên.',
      'Luôn nhắc nhở cả nhóm: Không vội vàng kết luận khi chưa có đối chứng tài liệu gốc.',
    ],
    expressions: ['neutral', 'worried', 'happy'] as const,
    accentColor: '#c8102e',
  },
  'ha-vy': {
    id: 'ha-vy',
    name: 'Hà Vy',
    fullName: 'Trần Hà Vy',
    title: 'Chuyên gia Phân tích Dữ liệu',
    age: 19,
    year: 'Năm thứ hai (K23)',
    major: 'Hệ thống Thông tin Kinh tế',
    role: 'Thành viên cốt cán & Hướng dẫn truy vấn SQL',
    quote: 'Muốn tìm gì thì viết nấy: SELECT chọn cột, FROM chọn bảng, WHERE chọn điều kiện.',
    bio: [
      'Điềm đạm, sắc sảo và yêu thích sự chuẩn xác tuyệt đối của toán học và cơ sở dữ liệu. Hà Vy là "bộ não phân tích" đáng tin cậy của CLB.',
      'Cô có khả năng diễn giải những câu lệnh SQL phức tạp thành các thao tác bảng tính thân quen, giúp người mới nhanh chóng nắm bắt logic.',
    ],
    detectiveNote: [
      'Hướng dẫn trích xuất sinh viên tên bắt đầu bằng "H" (LIKE).',
      'Định hướng liên hệ danh sách nhiều lớp bằng toán tử IN (giống bộ lọc Filter Excel).',
      'Phát hiện lỗ hổng logic nghiêm trọng trong câu lệnh dùng phép OR của Quân.',
    ],
    expressions: ['neutral', 'thinking', 'smile'] as const,
    accentColor: '#0f766e',
  },
  quan: {
    id: 'quan',
    name: 'Quân',
    fullName: 'Đặng Hoàng Quân',
    title: 'Phụ trách Trích xuất Dữ liệu',
    age: 19,
    year: 'Năm thứ hai (K23)',
    major: 'Thương mại Điện tử',
    role: 'Thành viên CLB & Người báo cáo ban đầu',
    quote: 'Em đã tìm thấy danh sách rồi! Dữ liệu nằm ngay trong bảng này, không trật đi đâu được!',
    bio: [
      'Nhiệt tình, xốc vác nhưng đôi lúc quá tự tin và vội vàng đưa ra kết luận trước khi kiểm chứng tính logic của điều kiện giao thoa.',
      'Dù mắc lỗi logic dùng phép nối OR, Quân là người dám chịu trách nhiệm và sẵn sàng đối chất để sửa chữa sai sót.',
    ],
    detectiveNote: [
      'Tạo ra câu truy vấn nối bằng OR dẫn đến kết quả 24 sinh viên bị nghi ngờ sai.',
      'Được CLB hỗ trợ sửa lại câu lệnh truy vấn AND tại buổi giải trình trước CTSV.',
      'Nhận thức sâu sắc bài học về đạo đức trích xuất dữ liệu.',
    ],
    expressions: ['neutral', 'smug', 'stunned'] as const,
    accentColor: '#334155',
  },
  hoai: {
    id: 'hoai',
    name: 'Hoài',
    fullName: 'Nguyễn Thu Hoài',
    title: 'Sinh viên năm nhất',
    age: 18,
    year: 'Năm thứ nhất (K24)',
    major: 'Quản trị Kinh doanh (QT24B)',
    role: 'Nhân chứng & Người bỏ hộ lá thư',
    quote: 'Em… em chỉ bỏ hộ thôi ạ! Em không hề biết bên trong lá thư viết gì cả…',
    bio: [
      'Một cô gái hiền lành, nhút nhát và sợ vướng vào rắc rối. Hoài là thành viên mới của CLB Báo chí trường.',
      'Cô vô tình nhận lời giúp một người đeo huy hiệu CLB Robotics bỏ phong bì vào hộp góp ý tại giảng đường B.',
    ],
    detectiveNote: [
      'Khớp 3 điều kiện: Tên "H" (Hoài), Lớp QT24B (Tòa nhà B), CLB Báo chí.',
      'Được chứng minh vô can nhờ cuốn sổ bàn giao của Bác Tư xác nhận thời điểm đối chứng.',
      'Thông tin cá nhân đã được CLB hủy bỏ bảo mật sau buổi giải trình.',
    ],
    expressions: ['nervous', 'downcast', 'relieved'] as const,
    accentColor: '#7c3aed',
  },
  'bac-tu': {
    id: 'bac-tu',
    name: 'Bác Tư',
    fullName: 'Bác Tư (Nguyễn Văn Tư)',
    title: 'Bảo vệ Giảng đường B',
    age: 58,
    year: 'Cán bộ phục vụ',
    major: 'Ban Quản trị Cơ sở vật chất',
    role: 'Nhân chứng hiện trường & Giữ sổ niêm phong',
    quote: 'Ở đây giờ giấc, người ra người vào bác đều ghi chép cẩn thận vào sổ bàn giao cả.',
    bio: [
      'Tận tụy, kỹ tính và luôn giữ gìn trật tự khuôn viên giảng đường B suốt hơn 10 năm qua.',
      'Bác là người duy nhất nắm rõ quy trình bàn giao chìa khóa hộp góp ý và sổ nhật ký sảnh trực.',
    ],
    detectiveNote: [
      'Cung cấp thông tin về chiếc hộp góp ý bằng gỗ đặt tại hành lang tầng 1.',
      'Cho phép nhóm thám tử kiểm tra sổ nhật ký bàn giao trực sảnh.',
      'Chìa khóa then chốt giúp lật ngược tình thế tại phòng giải trình.',
    ],
    expressions: ['neutral'] as const,
    accentColor: '#78350f',
  },
  tung: {
    id: 'tung',
    name: 'Tùng',
    fullName: 'Trần Tùng',
    title: 'Sinh viên năm nhất',
    age: 18,
    year: 'Năm thứ nhất (K24)',
    major: 'Quản trị Du lịch - Lữ hành (DL24A)',
    role: 'Bạn thân cùng phòng KTX & "Thổ địa" khuôn viên trường',
    quote: 'Đi một vòng từ sáng tới giờ đã thấy trường mình rộng chưa? Có thắc mắc gì cứ hỏi thổ địa này!',
    bio: [
      'Xởi lởi, nhiệt tình và luôn tràn đầy năng lượng tích cực. Tùng là bạn cùng phòng KTX K24 thân thiết nhất của người chơi.',
      'Cậu có sở thích khám phá mọi ngóc ngách trong khuôn viên trường và luôn sẵn sàng làm "hướng dẫn viên du lịch" cho bạn bè.',
    ],
    detectiveNote: [
      'Bạn cùng phòng KTX K24 (phòng 302 khu B Ký túc xá).',
      'Dẫn đường và giới thiệu toàn cảnh các khu giảng đường, thư viện, căng tin trong tuần đầu nhập học.',
      'Cổ vũ và ủng hộ nhiệt tình khi người chơi tham gia CLB Thám tử Dữ liệu.',
    ],
    expressions: ['neutral'] as const,
    accentColor: '#c2410c',
  },
};
