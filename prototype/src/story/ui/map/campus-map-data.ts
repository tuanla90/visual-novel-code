export interface CampusPoi {
  id: string;
  name: string;
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  sceneId?: string;
  category: 'academic' | 'facility' | 'club' | 'living';
  description: string;
  storyNote: string;
}

export const CAMPUS_POIS: CampusPoi[] = [
  {
    id: 'dorm-b',
    name: 'Ký túc xá khu B',
    x: 18,
    y: 72,
    category: 'living',
    description: 'Khu nội trú sinh viên năm nhất, nơi bạn và Trần Tùng ở chung phòng 302.',
    storyNote: 'Nơi khởi đầu ngày mới trước khi Tùng dẫn bạn đi dạo quanh trường.',
  },
  {
    id: 'canteen',
    name: 'Căng tin & Thể thao',
    x: 22,
    y: 35,
    category: 'facility',
    description: 'Khu ăn uống sầm uất, nơi sinh viên các khoa tụ tập giải lao giữa các tiết học.',
    storyNote: 'Địa điểm Tùng rủ sang làm cốc trà đá sau khi dẫn đường.',
  },
  {
    id: 'lecture-a',
    name: 'Giảng đường A',
    x: 48,
    y: 28,
    category: 'academic',
    description: 'Khu giảng đường trung tâm với các hội trường lớn và phòng đào tạo.',
    storyNote: 'Nơi tập trung các lớp học đại cương năm nhất.',
  },
  {
    id: 'lecture-b',
    name: 'Giảng đường B',
    x: 75,
    y: 32,
    sceneId: 'corridor-b',
    category: 'academic',
    description: 'Dãy nhà 3 tầng nhìn ra hàng phượng. Hành lang tầng 1 có đặt chiếc Hộp góp ý bằng gỗ.',
    storyNote: 'Hiện trường phát hiện phong bì thư nặc danh và khu vực bác Tư làm việc.',
  },
  {
    id: 'library',
    name: 'Thư viện Trung tâm',
    x: 52,
    y: 68,
    category: 'facility',
    description: 'Tòa nhà tri thức 4 tầng hiện đại, trang bị điều hòa và hệ thống máy tra cứu số.',
    storyNote: 'Nơi cung cấp tư liệu và tài liệu lưu trữ của trường.',
  },
  {
    id: 'club-room',
    name: 'Phòng CLB Thám tử',
    x: 82,
    y: 65,
    sceneId: 'clb-room',
    category: 'club',
    description: 'Căn phòng nhỏ tông ấm ở góc tầng 2: bảng trắng, tủ hồ sơ cũ và bàn làm việc.',
    storyNote: 'Căn cứ điều tra của Minh Anh, Hà Vy và bạn.',
  },
  {
    id: 'debrief-room',
    name: 'Phòng Giải trình CTSV',
    x: 50,
    y: 50,
    sceneId: 'debrief-room',
    category: 'academic',
    description: 'Phòng họp hội đồng Phòng Công tác Sinh viên với máy chiếu và bục đối chất.',
    storyNote: 'Nơi diễn ra buổi đối chất dữ liệu then chốt ở Phần 4.',
  },
];
