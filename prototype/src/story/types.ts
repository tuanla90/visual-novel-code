/**
 * Hợp đồng kiểu phần `story`: phần, cảnh, chuỗi, node và lời thoại.
 *
 * Mỗi cấu trúc trong docs/prototype/kich-ban-prototype.md có một loại node tương ứng:
 *   - `- **speaker** (expr): …`      → LineNode
 *   - `> NHIỆM VỤ: …`                → TaskNode
 *   - `[DÀN DỰNG]`                   → NoteNode (không hiển thị)
 *   - `[ĐI TỚI seq]`                 → GotoNode
 *   - `[ĐIỂM XEM XÉT …]` (một nhóm)  → ExploreNode (nhiều hotspot, chọn thứ tự tùy ý)
 *   - `[ĐIỀU KIỆN QUA] cần: …`       → GateNode
 *   - `[HIỆN TÀI LIỆU doc]`          → ShowDocumentNode
 *   - `[HỎI q] …`                    → QuestionNode
 *   - `[THỬ THÁCH c]`                → ChallengeNode
 *   - `[SỬA TRUY VẤN c]`             → FixQueryNode
 *   - `[HIỆU ỨNG e]`                 → EffectNode
 *   - `[CHỌN DÒNG q]` + bảng         → LinePickNode
 *   - màn chiếu chạy SQL thật (deb-01, deb-03, nằm trong [DÀN DỰNG]) → ProjectorNode
 *   - hết quyền truy cập (end-03)    → SetFlagNode + AnnotateEvidenceNode
 *   - thẻ chữ lớn của narrator (end-04) → LineNode với display: 'card'
 *   - `[KẾT THÚC]`                   → EndNode
 */
import type {
  CharacterId,
  ChallengeId,
  ClueId,
  DocumentId,
  EffectId,
  EvidenceId,
  ExpressionOf,
  FlagId,
  PartId,
  SceneId,
  SpecialSpeakerId,
} from '../shared/ids';
import type { LinePick, ProjectorSpec } from '../debrief/types';

/** Định danh chuỗi (`intro-01`, `inv-letter`, …) do nội dung đặt. */
export type SequenceId = string;

/** Lời của một nhân vật: biểu cảm phải thuộc bộ biểu cảm của đúng nhân vật đó (QĐ-033). */
export type CharacterLine = {
  [C in CharacterId]: { speaker: C; expression: ExpressionOf<C>; text: string };
}[CharacterId];

/** Lời của `player` (nhãn "Bạn") hoặc `narrator` (không nhãn): không có biểu cảm (QĐ-022). */
export interface SpecialLine {
  speaker: SpecialSpeakerId;
  expression?: undefined;
  text: string;
}

export type DialogueLine = CharacterLine | SpecialLine;

// ---------- Câu hỏi nhiều lựa chọn (dùng chung cho [HỎI] trong chuỗi và câu đọc kết quả của thử thách) ----------

export interface QuestionChoice {
  /** Id lựa chọn (QĐ-035): telemetry ghi id này, không ghi chữ cái A/B/C. Duy nhất trong câu hỏi. */
  id: string;
  text: string;
  correct: boolean;
  /** Phản hồi hiển thị sau khi chọn (0..n lời, chạy nối tiếp). */
  feedback: DialogueLine[];
}

export interface MultipleChoiceQuestion {
  /** `q-sig-h`, `q-two-rows`, … Duy nhất trong toàn bộ nội dung. */
  id: string;
  /** Người đặt câu hỏi (hiện chân dung + lời dẫn). */
  asker: DialogueLine;
  choices: QuestionChoice[];
}

// ---------- Node ----------

export type LineNode = DialogueLine & {
  type: 'line';
  /** `card`: hiện dạng thẻ chữ lớn giữa màn hình (thông điệp kết end-04). Mặc định `dialog`. */
  display?: 'dialog' | 'card';
};

/** Đổi dòng "Nhiệm vụ hiện tại" tại đúng vị trí trong chuỗi. */
export interface TaskNode {
  type: 'task';
  text: string;
}

/** Chỉ dẫn dàn dựng, không hiển thị. Giữ trong dữ liệu để gói hình/giao diện đọc. */
export interface NoteNode {
  type: 'note';
  text: string;
}

export interface GotoNode {
  type: 'goto';
  to: SequenceId;
}

export interface Hotspot {
  /** `hs-letter`, `hs-bac-tu`, … Duy nhất trong toàn bộ nội dung. */
  id: string;
  /** Nhãn hiển thị trên nút điểm xem xét (≥ 44×44px). */
  label: string;
  /** Manh mối được thêm vào Hồ sơ khi chuỗi con chạy xong. */
  unlocksClue?: ClueId;
  /** Chuỗi con: chạy xong thì quay về cảnh đang đứng. */
  runSequence: SequenceId;
}

/** Nhóm điểm xem xét của một cảnh; người chơi chọn theo thứ tự tùy ý. */
export interface ExploreNode {
  type: 'explore';
  hotspots: Hotspot[];
}

/** Khi Hồ sơ có đủ `requires` thì hiện nút "Nhiệm vụ tiếp theo →" sang `to`. */
export interface GateNode {
  type: 'gate';
  requires: EvidenceId[];
  to: SequenceId;
  /** Mặc định "Nhiệm vụ tiếp theo →". */
  buttonLabel?: string;
}

/** Hiện tài liệu (hình + chữ) rồi thêm vào Hồ sơ khi đóng. */
export interface ShowDocumentNode {
  type: 'show-document';
  documentId: DocumentId;
}

export interface QuestionNode {
  type: 'question';
  question: MultipleChoiceQuestion;
}

/** Mở màn thử thách; hoàn thành khi người chơi lưu vật chứng. */
export interface ChallengeNode {
  type: 'challenge';
  challengeId: ChallengeId;
}

/** Màn sửa truy vấn nạp sẵn (debrief-fix); hoàn thành khi lưu vật chứng. */
export interface FixQueryNode {
  type: 'fix-query';
  challengeId: ChallengeId;
}

/** Hiệu ứng toàn màn hình (QĐ-025), bấm để bỏ qua. */
export interface EffectNode {
  type: 'effect';
  effectId: EffectId;
}

/** Chọn dòng lỗi trên màn chiếu (bước 2 của QĐ-024). */
export interface LinePickNode {
  type: 'line-pick';
  pick: LinePick;
}

/** Màn chiếu hiện một câu SQL, có thể chạy thật trên dataset chính. */
export interface ProjectorNode {
  type: 'projector';
  projector: ProjectorSpec;
}

export interface SetFlagNode {
  type: 'set-flag';
  flag: FlagId;
}

/**
 * Gắn chú thích sau vào một thẻ hồ sơ. Ở end-03 (hết quyền truy cập) kịch bản gắn cho CẢ BA thẻ kết quả
 * truy vấn có dữ liệu cá nhân — ev-c1-names-h, ev-c3-shortlist, ev-quan-fixed (QĐ-062); ev-c2-classes-b
 * chỉ có mã lớp nên không. `redact`: giao diện KHÔNG render tên/mã của thẻ nữa (QĐ-050, không chỉ làm mờ).
 */
export interface AnnotateEvidenceNode {
  type: 'annotate-evidence';
  evidenceId: EvidenceId;
  note: string;
  redact: boolean;
}

export interface EndNode {
  type: 'end';
}

export type StoryNode =
  | LineNode
  | TaskNode
  | NoteNode
  | GotoNode
  | ExploreNode
  | GateNode
  | ShowDocumentNode
  | QuestionNode
  | ChallengeNode
  | FixQueryNode
  | EffectNode
  | LinePickNode
  | ProjectorNode
  | SetFlagNode
  | AnnotateEvidenceNode
  | EndNode;

export type StoryNodeType = StoryNode['type'];

/** Node runtime xử lý tự động, không dừng lại chờ người chơi. */
export const AUTO_NODE_TYPES = ['task', 'note', 'goto', 'set-flag', 'annotate-evidence'] as const satisfies readonly StoryNodeType[];

/** Node tương tác hoàn thành bằng hành động `complete` (màn riêng đóng lại). */
export const COMPLETABLE_NODE_TYPES = [
  'show-document',
  'challenge',
  'fix-query',
  'effect',
  'projector',
] as const satisfies readonly StoryNodeType[];

// ---------- Chuỗi ----------

export interface Sequence {
  id: SequenceId;
  part: PartId;
  scene: SceneId;
  /** Mô tả ngắn để gỡ lỗi / bảng người quan sát; không hiện cho người chơi. */
  title: string;
  /** Chạy từ trên xuống; mặc định qua node kế. */
  nodes: StoryNode[];
}

export interface StoryContent {
  startSequenceId: SequenceId;
  sequences: Sequence[];
}
