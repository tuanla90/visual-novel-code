# Kiến trúc prototype — CLB Thám Tử Dữ Liệu

> Gói 2/11 `nen-mong` để lại tài liệu này cho các gói sau (3 → 9). Nguồn sự thật về sản phẩm là
> `prototype-scope-down-v0.1.md`; ràng buộc là `lich-su-quyet-dinh.md` (QĐ-xxx); kịch bản là
> `docs/kich-ban-prototype.md`. Tài liệu này chỉ nói về **code**: hợp đồng kiểu, luồng dữ liệu,
> ai sở hữu thư mục nào, cách thêm nội dung, lệnh kiểm tra.

## 1. Cây thư mục

```
prototype/
├── index.html · vite.config.ts · tsconfig.json · eslint.config.js · package.json
├── docs/ARCHITECTURE.md              ← tài liệu này
└── src/
    ├── main.tsx                      nạp phông/CSS, nạp sớm sql.js, render <App/>
    ├── app/                          màn tiêu đề, màn chơi, màn kết (stub), bảng người quan sát (stub)
    ├── content/
    │   ├── types.ts                  GameContent — gói nội dung đầy đủ
    │   ├── index.ts                  activeContent (CHỖ DUY NHẤT gói noi-dung đổi sang nội dung thật)
    │   └── sample/                   nội dung MẪU "(MẪU)" — đủ mọi loại node để chạy thử
    ├── shared/
    │   ├── ids.ts                    ĐỊNH DANH QĐ-033 + mã chẩn đoán QĐ-040 (đóng băng)
    │   ├── display-names.ts          tên hiển thị có dự phòng (không lộ id thô)
    │   ├── store/                    zustand + persist sessionStorage (QĐ-004)
    │   ├── telemetry/                union sự kiện §9.3 + track() (hiện thực tạm trong bộ nhớ)
    │   └── ui/                       TopBar, Stage, Portrait, DialogBox, MultipleChoice, ConfirmDialog, shuffle
    ├── story/                        (QĐ-003 phần 1)
    │   ├── types.ts                  DialogueLine, 16 loại node, Sequence, StoryContent
    │   ├── engine/                   runtime thuần (state, runtime, validate) — KHÔNG import React
    │   └── ui/                       ExploreScreen (thật), ObjectionEffect (stub gói 7)
    ├── evidence/                     (phần 2)
    │   ├── types.ts · notebook.ts · labels.ts
    │   └── ui/                       EvidenceNotebook (tạm, chức năng), DocumentReveal (stub gói 7)
    ├── sql-challenge/                (phần 3)
    │   ├── schema.ts                 TableName, cột theo bảng, mô tả cột
    │   ├── types.ts                  QueryModel, RunResult, GradeResult, ChallengeSpec, ChallengeContent
    │   ├── engine/sqljs.ts           loader sql.js DUY NHẤT (trình duyệt + Vitest)
    │   ├── engine/index.ts           runQuery / gradeChallenge / modelToSql / sqlToModel — STUB ném lỗi
    │   └── ui/ChallengeScreen.tsx    STUB gói 4 (và màn sửa truy vấn của gói 6 dùng cùng props)
    ├── debrief/                      (phần 4)
    │   ├── types.ts                  LinePick, ProjectorSpec
    │   └── ui/                       LinePick, Projector — STUB gói 6
    ├── styles/                       fonts.css (@fontsource), tokens.css (token thiết kế), base.css, app.css,
    │                                 contrast.test.ts (đo WCAG AA mọi cặp token)
    └── test/setup.ts                 jest-dom cho Vitest
```

## 2. Hợp đồng kiểu chính (trích)

### 2.1 Định danh — `src/shared/ids.ts`

Mọi id của QĐ-033 là hằng `as const` + kiểu literal; mọi kiểu khác import từ đây.

```ts
PART_IDS = ['intro','investigation','analysis','debrief','ending']      → PartId
SCENE_IDS = ['clb-room','corridor-b','debrief-room']                     → SceneId
CHARACTER_EXPRESSIONS = { 'minh-anh': [...], 'ha-vy': [...], quan, hoai, 'bac-tu' }
  → CharacterId, ExpressionOf<C>, SpeakerId = CharacterId | 'player' | 'narrator'
CLUE_IDS · DOCUMENT_IDS · QUERY_EVIDENCE_IDS → EvidenceId (hợp của ba)
CHALLENGE_IDS = ['c1','c2','c3','debrief-fix'] · EFFECT_IDS = ['co-so-lieu-day']
FLAG_IDS = ['access-revoked'] · STANDARD_HINT_IDS (3 câu §5.2)
DIAGNOSTIC_CODES (QĐ-040, có 'connector-unset'); BLOCKING_DIAGNOSTIC_CODES = 4 mã "không chạy được"
```

Tra cứu tên hiển thị (`display-names.ts`, `evidence/labels.ts`) luôn có nhánh dự phòng
("Nhân vật", "Phần", "Mục hồ sơ"…) và có test: **không bao giờ** in id thô ra màn hình.

### 2.2 Story — `src/story/types.ts`

```ts
type DialogueLine = CharacterLine | SpecialLine
// CharacterLine: { speaker: 'ha-vy', expression: 'thinking' | 'neutral' | 'smile', text }  (ràng theo nhân vật)
// SpecialLine:   { speaker: 'player' | 'narrator', text }                                  (không biểu cảm)

type StoryNode =
  | LineNode          { type:'line', ...DialogueLine, display?: 'dialog'|'card' }   // card = thẻ chữ lớn (end-04)
  | TaskNode          { type:'task', text }                 // > NHIỆM VỤ
  | NoteNode          { type:'note', text }                 // [DÀN DỰNG] — không hiển thị
  | GotoNode          { type:'goto', to }                   // [ĐI TỚI]
  | ExploreNode       { type:'explore', hotspots: Hotspot[] }   // nhóm [ĐIỂM XEM XÉT]
  | GateNode          { type:'gate', requires: EvidenceId[], to, buttonLabel? }   // [ĐIỀU KIỆN QUA]
  | ShowDocumentNode  { type:'show-document', documentId }  // [HIỆN TÀI LIỆU]
  | QuestionNode      { type:'question', question: MultipleChoiceQuestion }   // [HỎI]
  | ChallengeNode     { type:'challenge', challengeId }     // [THỬ THÁCH]
  | FixQueryNode      { type:'fix-query', challengeId }     // [SỬA TRUY VẤN]
  | EffectNode        { type:'effect', effectId }           // [HIỆU ỨNG]
  | LinePickNode      { type:'line-pick', pick: LinePick }  // [CHỌN DÒNG] + bảng
  | ProjectorNode     { type:'projector', projector: ProjectorSpec }   // màn chiếu chạy SQL thật (deb-01/03)
  | SetFlagNode       { type:'set-flag', flag }             // hết quyền truy cập (end-03)
  | AnnotateEvidenceNode { type:'annotate-evidence', evidenceId, note, redact }   // chú thích + làm mờ
  | EndNode           { type:'end' }                        // [KẾT THÚC]

Hotspot = { id, label, unlocksClue?: ClueId, runSequence }   // chuỗi con chạy xong tự quay về cảnh
MultipleChoiceQuestion = { id, asker: DialogueLine, choices: { id, text, correct, feedback: DialogueLine[] }[] }
Sequence = { id, part: PartId, scene: SceneId, title, nodes: StoryNode[] }
StoryContent = { startSequenceId, sequences: Sequence[] }
```

Quy ước runtime: chuỗi chạy từ trên xuống; node **tự động** (`task`, `note`, `goto`, `set-flag`,
`annotate-evidence`) không dừng; chuỗi con của điểm xem xét **không** được có `goto`/`gate`/`end`
(tự quay về `explore`); chuỗi chính phải kết thúc bằng `goto`/`gate`/`end`.

### 2.3 Evidence — `src/evidence/types.ts`

```ts
ClueCard     = { id: ClueId, title, source, content, builderValue?: BuilderValue, openQuestion, caveat }
DocumentCard = { id: DocumentId, title, source, body: string | string[], extra?, openQuestion?, caveat }
BuilderValue = { label, column: ColumnName, suggestedOp: ConditionOp, value: string | string[] }   // "Từ manh mối" (QĐ-017), không hiện trên thẻ
SavedQueryEvidence = { id: QueryEvidenceId, challengeId, sql, columns, rows, rowCount, savedAt, before?: { sql, rowCount } }
EvidenceAnnotation = { evidenceId, note, redact, at }
cardNoteForPart(card, part) → "Câu hỏi còn mở" (Phần 1–4) | "Lưu ý" (từ Phần 5)   // QĐ-037
```

### 2.4 SQL challenge — `src/sql-challenge/{schema,types}.ts`

```ts
TABLE_COLUMNS = { sinh_vien: [ma_sv, ho_dem, ten, ma_lop, clb], lop_sinh_hoat: [ma_lop, nganh, khoa_hoc, toa_nha] }
QueryModel = { table: TableName | null, columns: ColumnName[] | '*', conditions: QueryCondition[], connector: 'AND' | 'OR' | null }  // null = chưa chọn (QĐ-039)
QueryCondition = { id, column, op: 'eq'|'startsWith'|'endsWith'|'contains'|'in', value: string | string[], source: {kind:'manual'} | {kind:'clue', clueId} | {kind:'evidence', evidenceId} }
RunResult   = { ok:true, columns, rows, rowCount } | { ok:false, kind: 'not_select'|'syntax'|'no_table'|'no_column'|'other', message }
GradeResult = { status: 'correct'|'incorrect'|'error', diagnostics: {code: DiagnosticCode, severity: 'blocking'|'error'|'tip'}[], primaryCode, extraColumns, hidden: {ran, passed}, run: RunResult }
ChallengeSpec    = { id, table, referenceSql, requiredColumns, encouragedColumns, runHiddenDataset, initialModel?, expectedRowCount }   // phía engine
ChallengeContent = { id, title, prompt, relatedClues, learningGoal, steps: GuideStep[], hints: [L,L,L], diagnosticLines, onCorrect, readQuestion | null, evidence: {id,title,description} }   // phía nội dung
GuideStep = { step, highlight: 'from'|'select'|'where'|'run'|'preview', line }
DiagnosticResponse = { line } | { useStandardHint: StandardHintId }
```

Hàm engine (`engine/index.ts`) — chữ ký cố định, gói 3 hiện thực:

```ts
runQuery(sql, dataset: 'main'|'hidden' = 'main'): Promise<RunResult>
gradeChallenge(spec, sql, model | null): Promise<GradeResult>
modelToSql(model): string
sqlToModel(sql): QueryModel | null
```

### 2.5 Debrief — `src/debrief/types.ts`

```ts
LinePick = { id, lines: { index, sql, correct, feedback: DialogueLine[] }[] }
ProjectorSpec = { id, source: {kind:'sql', sql} | {kind:'evidence', evidenceId}, run: boolean, expectedRowCount?, caption? }
```

### 2.6 Telemetry — `src/shared/telemetry/events.ts`

Union `TelemetryEventBody` (§9.3, QĐ-029): `game_start`, `part_start`, `part_complete`, `scene_enter`,
`hotspot_inspected`, `evidence_unlocked`, `notebook_opened`, `challenge_start`, `query_run` (mode,
attempt, rowCount, status, primaryCode, errorClass, connector, msSinceStart), `first_run`, `hint_used`,
`challenge_complete`, `question_answered` (choiceId, attempt, isFirstChoice), `line_picked`,
`effect_shown`, `game_complete`, `survey_submitted`, `survey_skipped`, `game_reset`.
API: `track(event)`; `configureTelemetry({ sink, clock })` là điểm cắm để gói 8 thay nơi lưu.
Khảo sát chỉ có lựa chọn đóng — không trường chữ tự do.

### 2.7 Store — `src/shared/store/store.ts`

`createGameStore({ content })` → zustand + `persist` (sessionStorage, `version: 1`, `migrate`).
Slice: `progress: StoryProgress | null` · `evidence { unlocked, savedQueries, annotations }` ·
`challenges[id]: ChallengeState { model, sql, mode, lastRun, status, runs, hintLevel, hintsUsed, startedAt, firstRunAt, completedAt, guideStep }` ·
`survey`. Hành động: `startGame`, `dispatchStory(action)`, `getView()`, `unlockEvidence`,
`saveQueryEvidence`, `annotateEvidence`, `openChallenge`, `updateChallenge`, `recordRun`, `useHint`,
`completeChallenge`, `submitSurvey`/`submitPostSurvey`/`skipSurvey`, `resetGame`.
Không lưu bảng kết quả lớn: chỉ `SavedQueryEvidence` (≤ vài chục dòng) và `RunSummary`.

## 3. Luồng dữ liệu

```
nội dung (GameContent) ──► runtime story (thuần) ──► StoryView ──► GameScreen → component theo view.kind
        ▲                        │ effects
        │                        ▼
        │              store áp effects: unlock-evidence / annotate-evidence / set-flag / telemetry
        │
 validateContent(content) — chạy trong test; gói 5 chạy trên kịch bản thật
```

- **Kể chuyện.** `startStory(content, ctx)` → `progress`; mỗi hành động của người chơi
  (`advance`, `choose`, `pick-line`, `inspect`, `proceed`, `complete`) đi qua
  `stepStory(content, progress, ctx, action)` → `{ progress, effects, rejected? }`.
  `ctx = { now, hasEvidence(id) }` do store cung cấp. `getStoryView` cho khung nhìn hiện tại;
  `validActions(view)` cho giao diện biết bật nút nào. Runtime tự phát `part_start` /
  `part_complete` khi chuỗi đích thuộc phần khác, và `game_complete` ở `[KẾT THÚC]`.
- **Thử thách.** Màn thử thách (gói 4) nhận `challengeId` + `definition`; tự gọi store
  (`openChallenge` → `updateChallenge` khi sửa model/SQL → `recordRun` sau mỗi lần chạy →
  `useHint` → `completeChallenge(id, SavedQueryEvidence)` khi bấm "Lưu vào hồ sơ") rồi gọi
  `onComplete()` để runtime đi tiếp. Chạy/chấm: `gradeChallenge(spec, sql, model)` của gói 3.
  Kết quả đúng → `SavedQueryEvidence` vào hồ sơ; câu đọc kết quả (`readQuestion`) dùng chung
  component `MultipleChoice` nhưng do màn thử thách điều khiển (không qua runtime story).
- **Màn chiếu.** `ProjectorNode.source` là SQL viết cứng (truy vấn `OR` của Quân) hoặc vật chứng
  đã lưu (`ev-quan-fixed`, tức câu người chơi đã sửa); `run: true` → gói 6 gọi `runQuery`.
- **Hết quyền truy cập (end-03).** `set-flag access-revoked` (lưu trong `progress.flags`) +
  `annotate-evidence ev-c3-shortlist redact` → thẻ bị làm mờ, trình dựng khóa (`accessRevoked`).

## 4. Bản đồ sở hữu thư mục (gói 3 → 9)

| Gói | Sở hữu (được tạo/sửa tự do) | Dùng, không sửa |
|---|---|---|
| 3 `sql-engine` | `src/sql-challenge/engine/**` (trừ `sqljs.ts` — chỉ mở rộng, không đổi chữ ký), `src/sql-challenge/data/**` (dataset chính + ẩn, mới) | `schema.ts`, `types.ts` |
| 4 `trinh-dung-ui` | `src/sql-challenge/ui/**` | `types.ts`, store, `MultipleChoice`, `DialogBox` |
| 5 `noi-dung` | `src/content/real/**` (mới), `src/content/index.ts` (đổi `activeContent`) | mọi `types.ts`; `validate.ts` (chạy, không sửa) |
| 6 `giai-trinh-ui` | `src/debrief/ui/**`; màn sửa truy vấn có thể tái dùng `ChallengeScreen` với `mode: 'fix-query'` | `debrief/types.ts`, engine gói 3 |
| 7 `hinh-giao-dien` | `src/shared/ui/visuals/**` (mới: SVG chân dung, cảnh, vật chứng), `Portrait.tsx`, `Stage.tsx`, `story/ui/ObjectionEffect.tsx`, `evidence/ui/DocumentReveal.tsx`, `evidence/ui/EvidenceNotebook.tsx`, `styles/app.css`, **giá trị** trong `styles/tokens.css` | **tên** token; props của các component trên |
| 8 `telemetry` | `src/shared/telemetry/**` (sink localStorage + xuất JSON; giữ `events.ts` union và `track()`), `src/app/EndScreen.tsx`, `src/app/FacilitatorPanel.tsx`, `src/app/PreSurvey.tsx` (mới, cắm vào `TitleScreen.preSurveySlot`) | store (chỉ gọi) |
| 9 `tich-hop` | mọi nơi, để sửa lệch hợp đồng — phải ghi lại từng chỗ đổi | — |

**Tệp đóng băng** (muốn đổi phải báo người giao, kèm lý do): `src/shared/ids.ts`,
`src/story/types.ts`, `src/evidence/types.ts`, `src/sql-challenge/schema.ts`,
`src/sql-challenge/types.ts`, `src/debrief/types.ts`, `src/shared/telemetry/events.ts`,
`src/content/types.ts`, `src/story/engine/state.ts` (kiểu `StoryView`/`StoryAction`),
chữ ký hàm trong `src/sql-challenge/engine/index.ts`, chữ ký `GameActions` trong store,
`package.json` (không cài thêm phụ thuộc nếu không hỏi).

Thêm mã chẩn đoán mới (gói 3): thêm vào `DIAGNOSTIC_CODES` trong `ids.ts` **và** báo lại;
mã không phát hiện được rơi về `other`.

## 5. Cách thêm / đổi nội dung (gói 5)

1. Tạo `src/content/real/{story,evidence,challenges}.ts` theo kiểu trong §2; đọc
   `src/content/sample/*` để thấy cách viết từng loại node (mỗi cấu trúc của kịch bản có một node).
2. Ánh xạ kịch bản → node: xem bảng đầu `src/story/types.ts`. Chú ý:
   - `[ĐIỂM XEM XÉT]` nhiều điểm trong một cảnh → **một** `explore` node; `[ĐIỀU KIỆN QUA]` ngay sau
     nó là `gate` node (giao diện hiện nút "Nhiệm vụ tiếp theo →" ngay trên màn xem xét).
   - Hiệu ứng phụ trong `[DÀN DỰNG]` cần thành node tường minh: màn chiếu (`projector`, deb-01 với
     SQL của Quân `run: true, expectedRowCount: 24`; deb-03 với `source: {kind:'evidence', evidenceId:'ev-quan-fixed'}`),
     hết quyền (`set-flag` + `annotate-evidence`, end-03), thẻ chữ lớn (`display: 'card'`, end-04).
   - `[GỢI Ý CHUẨN]` → `standardHints`; "Nhận xét chung" → `commonDiagnosticLines`;
     `[KHI: mã] dùng hint-x` → `{ useStandardHint: 'hint-x' }`.
3. Đổi `activeContent` trong `src/content/index.ts`.
4. Chạy `npm test`: viết một test `validateContent(realContent).errors` phải rỗng; các test bất biến
   số liệu (10/2/2/24 dòng — QĐ-012) thuộc gói 3.

## 6. Lệnh kiểm tra

```
npm run typecheck   # tsc --noEmit, không incremental
npm test            # vitest run (jsdom; sql.js nạp wasm từ node_modules)
npm run lint        # eslint . — 0 lỗi, 0 cảnh báo
npm run build       # typecheck rồi vite build (dist/assets/*.wasm là asset)
npm run preview     # kiểm: curl -sI /assets/<file>.wasm → Content-Type: application/wasm
```

Chạy bằng Git Bash (QĐ-002; PowerShell đang Constrained Language Mode). Tự kiểm công cụ trước khi
tin số 0: thêm tạm `const __canary: number = 'a';` vào một tệp src → typecheck phải báo TS2322.
Test tương phản (`src/styles/contrast.test.ts`) đo mọi cặp chữ/nền trong `tokens.css`; đổi token
thì thêm cặp mới vào `PAIRS`.

## 7. Quy ước commit

- Nhánh `claude/<slug>` trong worktree riêng; mỗi nhóm việc một commit; không push, không merge.
- Thông điệp tiếng Việt: dòng đầu là kết quả (không phải "sửa lỗi"), thân liệt kê theo thư mục;
  kết thúc bằng `Co-Authored-By: Claude <noreply@anthropic.com>`.
- Trước mỗi commit: `npm run typecheck && npm test && npm run lint` xanh; commit có UI thì
  `npm run build` cũng phải qua.
- Không sửa file ở gốc repo (`*.md`, `.gitignore`, `.gitattributes`) và `docs/kich-ban-prototype.md`;
  cần gì thì ghi vào báo cáo.
