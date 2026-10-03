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
 * vui mắt đã híp sẵn nên miếng mắt là 1×1 trong suốt (không chớp). Ảnh mới thêm: dán một dòng hộp tạm rồi chạy cat-bo-moi.py
 * (xem README trong thư mục đó).
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
import bacTuNeutralMouth from './nhep/char-bac-tu-neutral/mouth.webp';
import bacTuNeutralEyes from './nhep/char-bac-tu-neutral/eyes.webp';
import bacTuSmileMouth from './nhep/char-bac-tu-smile/mouth.webp';
import bacTuSmileEyes from './nhep/char-bac-tu-smile/eyes.webp';
import hoaiAnchorMouth from './nhep/char-hoai-anchor/mouth.webp';
import hoaiAnchorEyes from './nhep/char-hoai-anchor/eyes.webp';
import hoaiDowncastMouth from './nhep/char-hoai-downcast/mouth.webp';
import hoaiDowncastEyes from './nhep/char-hoai-downcast/eyes.webp';
import hoaiRelievedMouth from './nhep/char-hoai-relieved/mouth.webp';
import hoaiRelievedEyes from './nhep/char-hoai-relieved/eyes.webp';
import hoaiNervousMouth from './nhep/char-hoai-nervous/mouth.webp';
import hoaiNervousEyes from './nhep/char-hoai-nervous/eyes.webp';
import hoaiNeutralMouth from './nhep/char-hoai-neutral/mouth.webp';
import hoaiNeutralEyes from './nhep/char-hoai-neutral/eyes.webp';
import thayQuangAnchorMouth from './nhep/char-thay-quang-anchor/mouth.webp';
import thayQuangAnchorEyes from './nhep/char-thay-quang-anchor/eyes.webp';
import thayQuangSmileMouth from './nhep/char-thay-quang-smile/mouth.webp';
import thayQuangSmileEyes from './nhep/char-thay-quang-smile/eyes.webp';
import thayQuangSternMouth from './nhep/char-thay-quang-stern/mouth.webp';
import thayQuangSternEyes from './nhep/char-thay-quang-stern/eyes.webp';
import chuCuongMouth from './nhep/char-chu-cuong/mouth.webp';
import chuCuongEyes from './nhep/char-chu-cuong/eyes.webp';
import chuCuongSmileMouth from './nhep/char-chu-cuong-smile/mouth.webp';
import chuCuongSmileEyes from './nhep/char-chu-cuong-smile/eyes.webp';
import datMouth from './nhep/char-dat/mouth.webp';
import datEyes from './nhep/char-dat/eyes.webp';
import hieuMouth from './nhep/char-hieu/mouth.webp';
import hieuEyes from './nhep/char-hieu/eyes.webp';
import hieuAnnoyedMouth from './nhep/char-hieu-annoyed/mouth.webp';
import hieuAnnoyedEyes from './nhep/char-hieu-annoyed/eyes.webp';
import hieuSurprisedMouth from './nhep/char-hieu-surprised/mouth.webp';
import hieuSurprisedEyes from './nhep/char-hieu-surprised/eyes.webp';

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
  bo('char-duy', duyMouth, [343, 326, 83, 38], duyEyes, [302, 225, 181, 58]),
  bo('char-duy-smile', duySmileMouth, [336, 318, 92, 41], duySmileEyes, [299, 223, 181, 57]),
  bo('char-duy-serious', duySeriousMouth, [350, 327, 70, 38], duySeriousEyes, [297, 226, 185, 57]),
  bo('char-nam', namMouth, [368, 298, 61, 33], namEyes, [331, 203, 153, 53]),
  bo('char-khanh', khanhMouth, [379, 291, 69, 37], khanhEyes, [345, 199, 148, 45]),
  bo('char-thao', thaoMouth, [363, 293, 59, 43], thaoEyes, [308, 196, 178, 68]),
  bo('char-bach', bachMouth, [378, 292, 67, 43], bachEyes, [341, 199, 148, 42]),
  bo('char-co-hanh', coHanhMouth, [360, 324, 72, 46], coHanhEyes, [310, 226, 182, 55]),
  bo('char-co-hanh-smile', coHanhSmileMouth, [356, 313, 81, 47], coHanhSmileEyes, [310, 221, 181, 51]),
  bo('char-co-lan', coLanMouth, [364, 310, 66, 46], coLanEyes, [307, 212, 186, 57]),
  bo('char-co-lan-smile', coLanSmileMouth, [362, 298, 71, 42], coLanSmileEyes, [313, 204, 182, 56]),
  bo('char-bac-tu-neutral', bacTuNeutralMouth, [360, 305, 107, 44], bacTuNeutralEyes, [349, 205, 160, 47]),
  bo('char-bac-tu-smile', bacTuSmileMouth, [350, 292, 126, 51], bacTuSmileEyes, [352, 198, 160, 49]),
  bo('char-hoai-anchor', hoaiAnchorMouth, [384, 400, 61, 41], hoaiAnchorEyes, [323, 299, 196, 57]),
  bo('char-hoai-downcast', hoaiDowncastMouth, [385, 405, 57, 30], hoaiDowncastEyes, [331, 306, 184, 58]),
  bo('char-hoai-relieved', hoaiRelievedMouth, [375, 391, 73, 41], hoaiRelievedEyes, [325, 293, 191, 60]),
  bo('char-hoai-nervous', hoaiNervousMouth, [390, 395, 57, 43], hoaiNervousEyes, [325, 297, 195, 56]),
  bo('char-hoai-neutral', hoaiNeutralMouth, [383, 393, 61, 39], hoaiNeutralEyes, [321, 285, 199, 61]),
  bo('char-thay-quang-anchor', thayQuangAnchorMouth, [383, 342, 89, 56], thayQuangAnchorEyes, [354, 234, 165, 47]),
  bo('char-thay-quang-smile', thayQuangSmileMouth, [379, 333, 97, 54], thayQuangSmileEyes, [352, 226, 169, 51]),
  bo('char-thay-quang-stern', thayQuangSternMouth, [387, 333, 85, 54], thayQuangSternEyes, [356, 228, 163, 44]),
  bo('char-chu-cuong', chuCuongMouth, [370, 292, 91, 48], chuCuongEyes, [357, 200, 140, 43]),
  bo('char-chu-cuong-smile', chuCuongSmileMouth, [362, 271, 109, 48], chuCuongSmileEyes, [379, 192, 116, 41]),
  bo('char-dat', datMouth, [377, 315, 65, 38], datEyes, [330, 221, 168, 53]),
  bo('char-hieu', hieuMouth, [379, 278, 65, 35], hieuEyes, [348, 188, 145, 63]),
  bo('char-hieu-annoyed', hieuAnnoyedMouth, [394, 274, 54, 44], hieuAnnoyedEyes, [349, 184, 144, 59]),
  bo('char-hieu-surprised', hieuSurprisedMouth, [391, 270, 52, 39], hieuSurprisedEyes, [347, 170, 146, 72]),
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
