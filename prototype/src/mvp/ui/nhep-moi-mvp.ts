/**
 * Bộ nhép môi + chớp mắt cho ảnh chân dung RIÊNG của MVP (biểu cảm / dáng đứng ngoài danh sách prototype, người chơi):
 * cùng cơ chế `shared/ui/visuals/talk-rigs.ts` (miếng MIỆNG MỞ và MẮT NHẮM đặt chồng lên ảnh, tọa độ theo điểm ảnh của
 * chính tệp 768×1360), nhưng tra theo TÊN TỆP ảnh của `anh-mvp.ts` thay vì ô ảnh đóng băng của prototype.
 *
 * Nguồn (01/10/2026): Topview GPT Image 2.5 image-edit từ chính ảnh ("chỉ đổi miệng" / "chỉ nhắm mắt", nền xám), miếng cắt
 * bằng art/nguon/cat-mieng-mat.py — tọa độ dưới đây chép từ art/nguon/nhep-moi-2026-10-01/toa-do.json. Ảnh Tùng vui /
 * gãi đầu / chỉ tay miệng gốc đã mở nên nhép môi chỉ đổi độ mở; ảnh mới thêm thì chạy lại công cụ và dán thêm một dòng.
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
import haVyDayKinhMouth from './nhep/char-ha-vy-day-kinh/mouth.webp';
import haVyDayKinhEyes from './nhep/char-ha-vy-day-kinh/eyes.webp';
import minhAnhKhoanhTayMouth from './nhep/char-minh-anh-khoanh-tay/mouth.webp';
import minhAnhKhoanhTayEyes from './nhep/char-minh-anh-khoanh-tay/eyes.webp';
import minhAnhSeriousMouth from './nhep/char-minh-anh-serious/mouth.webp';
import minhAnhSeriousEyes from './nhep/char-minh-anh-serious/eyes.webp';
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
  bo('char-tung-happy', tungHappyMouth, [273, 336, 221, 190], tungHappyEyes, [212, 146, 344, 190]),
  bo('char-tung-worried', tungWorriedMouth, [299, 339, 229, 197], tungWorriedEyes, [235, 147, 358, 190]),
  bo('char-tung-surprised', tungSurprisedMouth, [269, 334, 203, 180], tungSurprisedEyes, [212, 146, 324, 190]),
  bo('char-tung-thinking', tungThinkingMouth, [355, 329, 182, 157], tungThinkingEyes, [307, 146, 279, 190]),
  bo('char-tung-gai-dau', tungGaiDauMouth, [277, 345, 246, 211], tungGaiDauEyes, [207, 150, 387, 189]),
  bo('char-tung-chi-tay', tungChiTayMouth, [268, 337, 207, 179], tungChiTayEyes, [211, 150, 322, 189]),
  bo('char-ha-vy-day-kinh', haVyDayKinhMouth, [275, 375, 229, 197], haVyDayKinhEyes, [211, 189, 358, 184]),
  bo('char-minh-anh-khoanh-tay', minhAnhKhoanhTayMouth, [215, 336, 246, 211], minhAnhKhoanhTayEyes, [146, 140, 385, 191]),
  bo('char-minh-anh-serious', minhAnhSeriousMouth, [332, 329, 162, 128], minhAnhSeriousEyes, [290, 135, 246, 192]),
  bo('char-quan-chi-man', quanChiManMouth, [262, 340, 219, 188], quanChiManEyes, [202, 185, 340, 155]),
  bo('char-nguoi-choi', nguoiChoiMouth, [253, 337, 228, 197], nguoiChoiEyes, [189, 145, 357, 190]),
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
