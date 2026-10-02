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
import duyMouth from './nhep/char-duy/mouth.webp';
import duyEyes from './nhep/char-duy/eyes.webp';
import duySmileMouth from './nhep/char-duy-smile/mouth.webp';
import duySmileEyes from './nhep/char-duy-smile/eyes.webp';
import duySeriousMouth from './nhep/char-duy-serious/mouth.webp';
import duySeriousEyes from './nhep/char-duy-serious/eyes.webp';
import namMouth from './nhep/char-nam/mouth.webp';
import namEyes from './nhep/char-nam/eyes.webp';
import khanhMouth from './nhep/char-khanh/mouth.webp';
import khanhEyes from './nhep/char-khanh/eyes.webp';
import thaoMouth from './nhep/char-thao/mouth.webp';
import thaoEyes from './nhep/char-thao/eyes.webp';
import bachMouth from './nhep/char-bach/mouth.webp';
import bachEyes from './nhep/char-bach/eyes.webp';
import coHanhMouth from './nhep/char-co-hanh/mouth.webp';
import coHanhEyes from './nhep/char-co-hanh/eyes.webp';
import coHanhSmileMouth from './nhep/char-co-hanh-smile/mouth.webp';
import coHanhSmileEyes from './nhep/char-co-hanh-smile/eyes.webp';
import coLanMouth from './nhep/char-co-lan/mouth.webp';
import coLanEyes from './nhep/char-co-lan/eyes.webp';
import coLanSmileMouth from './nhep/char-co-lan-smile/mouth.webp';
import coLanSmileEyes from './nhep/char-co-lan-smile/eyes.webp';

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
  bo('char-tung-happy', tungHappyMouth, [396, 227, 51, 75], tungHappyEyes, [343, 163, 122, 90]),
  bo('char-tung-worried', tungWorriedMouth, [361, 320, 132, 121], tungWorriedEyes, [327, 146, 206, 190]),
  bo('char-tung-surprised', tungSurprisedMouth, [296, 330, 192, 166], tungSurprisedEyes, [244, 145, 297, 190]),
  bo('char-tung-thinking', tungThinkingMouth, [289, 329, 192, 165], tungThinkingEyes, [238, 144, 295, 190]),
  bo('char-tung-gai-dau', tungGaiDauMouth, [254, 338, 232, 199], tungGaiDauEyes, [189, 145, 363, 190]),
  bo('char-tung-chi-tay', tungChiTayMouth, [299, 334, 219, 188], tungChiTayEyes, [239, 144, 340, 190]),
  bo('char-tung-ao-xanh', tungAoXanhMouth, [355, 320, 144, 127], tungAoXanhEyes, [319, 145, 217, 190]),
  bo('char-tung-ao-xanh-happy', tungAoXanhHappyMouth, [296, 325, 197, 170], tungAoXanhHappyEyes, [243, 138, 304, 191]),
  bo('char-tung-ao-xanh-worried', tungAoXanhWorriedMouth, [298, 328, 192, 166], tungAoXanhWorriedEyes, [246, 142, 297, 191]),
  bo('char-tung-ao-xanh-gai-dau', tungAoXanhGaiDauMouth, [254, 334, 223, 192], tungAoXanhGaiDauEyes, [192, 142, 348, 191]),
  bo('char-tung-ao-xanh-chi-tay', tungAoXanhChiTayMouth, [300, 324, 184, 160], tungAoXanhChiTayEyes, [251, 140, 283, 191]),
  bo('char-tung-ao-xanh-surprised', tungAoXanhSurprisedMouth, [299, 329, 213, 183], tungAoXanhSurprisedEyes, [240, 139, 331, 191]),
  bo('char-tung-ao-xanh-thinking', tungAoXanhThinkingMouth, [297, 325, 195, 169], tungAoXanhThinkingEyes, [244, 139, 302, 191]),
  bo('char-tung-ao-xanh-doi-mu', tungAoXanhDoiMuMouth, [236, 360, 238, 204], tungAoXanhDoiMuEyes, [169, 168, 373, 188]),
  bo('char-ha-vy-day-kinh', haVyDayKinhMouth, [279, 361, 213, 183], haVyDayKinhEyes, [220, 178, 331, 184]),
  bo('char-minh-anh-serious', minhAnhSeriousMouth, [226, 327, 251, 215], minhAnhSeriousEyes, [155, 128, 394, 193]),
  bo('char-minh-anh-khoanh-tay', minhAnhKhoanhTayMouth, [336, 311, 168, 147], minhAnhKhoanhTayEyes, [292, 128, 257, 193]),
  bo('char-quan-chi-man', quanChiManMouth, [247, 334, 188, 174], quanChiManEyes, [192, 156, 312, 181]),
  bo('char-nguoi-choi', nguoiChoiMouth, [265, 323, 222, 191], nguoiChoiEyes, [203, 130, 347, 192]),
  bo('char-duy', duyMouth, [275, 353, 198, 170], duyEyes, [222, 170, 305, 187]),
  bo('char-duy-smile', duySmileMouth, [274, 353, 199, 172], duySmileEyes, [220, 170, 308, 187]),
  bo('char-duy-serious', duySeriousMouth, [273, 353, 200, 173], duySeriousEyes, [219, 170, 309, 187]),
  bo('char-nam', namMouth, [279, 284, 177, 148], namEyes, [233, 166, 270, 121]),
  bo('char-khanh', khanhMouth, [288, 333, 183, 158], khanhEyes, [240, 151, 280, 189]),
  bo('char-thao', thaoMouth, [266, 328, 189, 163], thaoEyes, [216, 144, 290, 190]),
  bo('char-bach', bachMouth, [292, 352, 177, 153], bachEyes, [245, 174, 271, 186]),
  bo('char-co-hanh', coHanhMouth, [278, 346, 186, 161], coHanhEyes, [228, 165, 286, 187]),
  bo('char-co-hanh-smile', coHanhSmileMouth, [249, 345, 207, 178], coHanhSmileEyes, [193, 159, 320, 188]),
  bo('char-co-lan', coLanMouth, [278, 338, 192, 166], coLanEyes, [226, 154, 297, 189]),
  bo('char-co-lan-smile', coLanSmileMouth, [280, 331, 192, 165], coLanSmileEyes, [229, 146, 295, 190]),
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
