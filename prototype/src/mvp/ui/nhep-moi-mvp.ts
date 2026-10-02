/**
 * Bộ nhép môi + chớp mắt cho ảnh chân dung RIÊNG của MVP (biểu cảm / dáng đứng ngoài danh sách prototype, người chơi):
 * cùng cơ chế `shared/ui/visuals/talk-rigs.ts` (miếng MIỆNG MỞ và MẮT NHẮM đặt chồng lên ảnh, tọa độ theo điểm ảnh của
 * chính tệp 768×1360), nhưng tra theo TÊN TỆP ảnh của `anh-mvp.ts` thay vì ô ảnh đóng băng của prototype.
 *
 * Nguồn (01/10/2026): Topview GPT Image 2.5 image-edit từ chính ảnh ("chỉ đổi miệng" / "chỉ nhắm mắt", nền xám), miếng cắt
 * bằng art/nguon/cat-mieng-mat.py. Ảnh Tùng vui / gãi đầu / chỉ tay miệng gốc đã mở nên nhép môi chỉ đổi độ mở.
 *
 * 02/10/2026 cắt khít lại (art/nguon/nhep-khit-2026-10-02/): miếng cũ là hộp to nên cằm, cổ áo, viền má, tóc, gọng kính giật
 * theo khi nhép; miếng mới chỉ còn môi và mí mắt (căn khớp cục bộ, bỏ vệt mảnh), ngoài đó là ảnh gốc. Tùng vui / Tùng áo xanh
 * vui mắt đã híp sẵn nên miếng mắt là 1×1 trong suốt (không chớp). Ảnh mới thêm thì chạy lại công cụ và dán thêm một dòng.
 */
import type { TalkRig } from '../../shared/ui/visuals/talk-rigs';
import { anhTheoTen } from './anh-mvp';
import tungHappyMouth from './nhep/char-tung-happy/mouth.webp';
import tungHappyEyes from './nhep/char-tung-happy/eyes.webp';
import tungWorriedMouth from './nhep/char-tung-worried/mouth.webp';
import tungWorriedEyes from './nhep/char-tung-worried/eyes.webp';
import tungSurprisedMouth from './nhep/char-tung-surprised/mouth.webp';
import tungSurprisedEyes from './nhep/char-tung-surprised/eyes.webp';
import tungThinkingMouth from './nhep/char-tung-thinking/mouth.webp';
import tungThinkingEyes from './nhep/char-tung-thinking/eyes.webp';
import tungGaiDauMouth from './nhep/char-tung-gai-dau/mouth.webp';
import tungGaiDauEyes from './nhep/char-tung-gai-dau/eyes.webp';
import tungChiTayMouth from './nhep/char-tung-chi-tay/mouth.webp';
import tungChiTayEyes from './nhep/char-tung-chi-tay/eyes.webp';
import tungAoXanhMouth from './nhep/char-tung-ao-xanh/mouth.webp';
import tungAoXanhEyes from './nhep/char-tung-ao-xanh/eyes.webp';
import tungAoXanhHappyMouth from './nhep/char-tung-ao-xanh-happy/mouth.webp';
import tungAoXanhHappyEyes from './nhep/char-tung-ao-xanh-happy/eyes.webp';
import tungAoXanhWorriedMouth from './nhep/char-tung-ao-xanh-worried/mouth.webp';
import tungAoXanhWorriedEyes from './nhep/char-tung-ao-xanh-worried/eyes.webp';
import tungAoXanhGaiDauMouth from './nhep/char-tung-ao-xanh-gai-dau/mouth.webp';
import tungAoXanhGaiDauEyes from './nhep/char-tung-ao-xanh-gai-dau/eyes.webp';
import tungAoXanhChiTayMouth from './nhep/char-tung-ao-xanh-chi-tay/mouth.webp';
import tungAoXanhChiTayEyes from './nhep/char-tung-ao-xanh-chi-tay/eyes.webp';
import tungAoXanhSurprisedMouth from './nhep/char-tung-ao-xanh-surprised/mouth.webp';
import tungAoXanhSurprisedEyes from './nhep/char-tung-ao-xanh-surprised/eyes.webp';
import tungAoXanhThinkingMouth from './nhep/char-tung-ao-xanh-thinking/mouth.webp';
import tungAoXanhThinkingEyes from './nhep/char-tung-ao-xanh-thinking/eyes.webp';
import tungAoXanhDoiMuMouth from './nhep/char-tung-ao-xanh-doi-mu/mouth.webp';
import tungAoXanhDoiMuEyes from './nhep/char-tung-ao-xanh-doi-mu/eyes.webp';
import haVyDayKinhMouth from './nhep/char-ha-vy-day-kinh/mouth.webp';
import haVyDayKinhEyes from './nhep/char-ha-vy-day-kinh/eyes.webp';
import minhAnhSeriousMouth from './nhep/char-minh-anh-serious/mouth.webp';
import minhAnhSeriousEyes from './nhep/char-minh-anh-serious/eyes.webp';
import minhAnhKhoanhTayMouth from './nhep/char-minh-anh-khoanh-tay/mouth.webp';
import minhAnhKhoanhTayEyes from './nhep/char-minh-anh-khoanh-tay/eyes.webp';
import quanChiManMouth from './nhep/char-quan-chi-man/mouth.webp';
import quanChiManEyes from './nhep/char-quan-chi-man/eyes.webp';
import nguoiChoiMouth from './nhep/char-nguoi-choi/mouth.webp';
import nguoiChoiEyes from './nhep/char-nguoi-choi/eyes.webp';

type Hop = [x: number, y: number, w: number, h: number];

function bo(ten: string, mouth: string, hopMieng: Hop, eyes: string, hopMat: Hop): [string, TalkRig] {
  return [
    ten,
    {
      sourceFile: `${ten}.png`,
      width: 768,
      height: 1360,
      mouth: { src: mouth, x: hopMieng[0], y: hopMieng[1], w: hopMieng[2], h: hopMieng[3] },
      eyes: { src: eyes, x: hopMat[0], y: hopMat[1], w: hopMat[2], h: hopMat[3] },
    },
  ];
}

/** Tên tệp ảnh (không đuôi, như `anhTheoTen`) → bộ miếng. */
export const BO_NHEP_MOI_MVP: ReadonlyMap<string, TalkRig> = new Map<string, TalkRig>([
  bo('char-tung-happy', tungHappyMouth, [365, 292, 92, 76], tungHappyEyes, [348, 179, 1, 1]),
  bo('char-tung-worried', tungWorriedMouth, [366, 302, 85, 55], tungWorriedEyes, [345, 213, 163, 72]),
  bo('char-tung-surprised', tungSurprisedMouth, [382, 305, 61, 54], tungSurprisedEyes, [337, 199, 176, 83]),
  bo('char-tung-thinking', tungThinkingMouth, [377, 297, 65, 43], tungThinkingEyes, [335, 202, 171, 71]),
  bo('char-tung-gai-dau', tungGaiDauMouth, [370, 306, 80, 45], tungGaiDauEyes, [348, 211, 164, 75]),
  bo('char-tung-chi-tay', tungChiTayMouth, [360, 298, 90, 61], tungChiTayEyes, [341, 212, 170, 74]),
  bo('char-tung-ao-xanh', tungAoXanhMouth, [366, 306, 86, 53], tungAoXanhEyes, [338, 213, 174, 72]),
  bo('char-tung-ao-xanh-happy', tungAoXanhHappyMouth, [361, 275, 96, 82], tungAoXanhHappyEyes, [338, 193, 1, 1]),
  bo('char-tung-ao-xanh-worried', tungAoXanhWorriedMouth, [362, 299, 93, 44], tungAoXanhWorriedEyes, [341, 210, 169, 68]),
  bo('char-tung-ao-xanh-gai-dau', tungAoXanhGaiDauMouth, [365, 295, 85, 61], tungAoXanhGaiDauEyes, [348, 205, 163, 72]),
  bo('char-tung-ao-xanh-chi-tay', tungAoXanhChiTayMouth, [364, 290, 93, 62], tungAoXanhChiTayEyes, [349, 207, 166, 71]),
  bo('char-tung-ao-xanh-surprised', tungAoXanhSurprisedMouth, [376, 305, 63, 48], tungAoXanhSurprisedEyes, [337, 197, 171, 82]),
  bo('char-tung-ao-xanh-thinking', tungAoXanhThinkingMouth, [391, 288, 59, 48], tungAoXanhThinkingEyes, [340, 191, 169, 76]),
  bo('char-tung-ao-xanh-doi-mu', tungAoXanhDoiMuMouth, [367, 302, 84, 52], tungAoXanhDoiMuEyes, [341, 211, 169, 68]),
  bo('char-ha-vy-day-kinh', haVyDayKinhMouth, [378, 382, 61, 47], haVyDayKinhEyes, [329, 287, 179, 60]),
  bo('char-minh-anh-serious', minhAnhSeriousMouth, [376, 362, 67, 48], minhAnhSeriousEyes, [314, 257, 200, 66]),
  bo('char-minh-anh-khoanh-tay', minhAnhKhoanhTayMouth, [377, 365, 63, 42], minhAnhKhoanhTayEyes, [309, 256, 204, 65]),
  bo('char-quan-chi-man', quanChiManMouth, [341, 313, 72, 36], quanChiManEyes, [311, 220, 151, 49]),
  bo('char-nguoi-choi', nguoiChoiMouth, [358, 342, 77, 39], nguoiChoiEyes, [312, 232, 186, 74]),
]);

let theoUrl: Map<string, TalkRig> | null = null;

/** Bộ miếng của ảnh đang hiện (so URL mà `anhTheoTen` trả cho tên tệp); ảnh không có bộ → `undefined`. */
export function boNhepMoiTheoUrl(url: string | undefined, chiMuc?: (ten: string) => string | undefined): TalkRig | undefined {
  if (!url) return undefined;
  if (chiMuc) {
    for (const [ten, rig] of BO_NHEP_MOI_MVP) if (chiMuc(ten) === url) return rig;
    return undefined;
  }
  if (!theoUrl) {
    theoUrl = new Map();
    for (const [ten, rig] of BO_NHEP_MOI_MVP) {
      const u = anhTheoTen(ten);
      if (u) theoUrl.set(u, rig);
    }
  }
  return theoUrl.get(url);
}
