# Kiến trúc prototype — CLB Thám Tử Dữ Liệu

> Tài liệu kỹ thuật về **code hiện có** (sau gói 9b `tich-hop-b`, trước vòng thử nghiệm 1). Nguồn sự
> thật về sản phẩm là `docs/prototype/prototype-scope-down-v0.1.md`; ràng buộc là `docs/lich-su-quyet-dinh.md`
> (QĐ-xxx); kịch bản là `prototype/noi-dung/` (từ gói 12a-1; trước đó `docs/prototype/kich-ban-prototype.md`) (các đường dẫn này tính từ **gốc repo**, không phải
> `prototype/docs/`; bản đồ toàn repo ở `README.md` gốc).
> Ở đây chỉ nói về code: cây thư mục, hợp đồng kiểu, luồng dữ liệu, các hệ con (ô ảnh, telemetry,
> bảng người quan sát, che dữ liệu), cách kiểm tra. Hướng dẫn chạy cho nhóm thử nghiệm: `README.md`.

## 1. Cây thư mục

```
prototype/
├── index.html · vite.config.ts · tsconfig.json · eslint.config.js · package.json
├── README.md                          hướng dẫn chạy / thử nghiệm (tiếng Việt)
├── noi-dung/                          NGUỒN CHỮ DUY NHẤT của game hiện tại (kịch bản, thẻ thử thách, lời chung, hồ sơ) — xem noi-dung/README.md
├── noi-dung-mvp/                      kịch bản MVP (mở đầu + Vụ 1 theo ngày × khung giờ; gói 12m, đặc tả §18) — CHƯA có runtime; xem noi-dung-mvp/README.md
├── tools/noi-dung/                    bộ đọc (doc, bien, nap-san, thu-muc) · chuyen.ts (kết quả đọc → dữ liệu game) ·
│                                      kiem.ts (`npm run kiem-noi-dung`) · sinh.ts (`npm run noi-dung:sinh`) — không import src/ trừ nguồn tên
│                                      bộ MVP: dieu-kien.ts (điều kiện/hậu quả/mốc) · doc-mvp.ts (đọc lich, nhan-vat, canh, dia-diem, kich-ban, so-tay,
│                                      chung; dùng lại doc.ts cho thẻ thử thách/hồ sơ) · luat-mvp.ts (kiểm chéo §18.9) · chuyen-mvp.ts · thu-muc-mvp.ts ·
│                                      kiem-mvp.ts (`kiem-noi-dung:mvp`) · sinh-mvp.ts (`noi-dung:sinh:mvp`) — không import src/
├── docs/ARCHITECTURE.md               ← tài liệu này
├── docs/nhat-ky-thay-doi-2026-09-27.md  nhật ký gói VN của commit fa5ffd3 (Antigravity viết; lỗi đã sửa ở QĐ-076)
└── src/
    ├── main.tsx                       nạp phông/CSS, bật telemetry bền, nạp sớm sql.js (wasm), render <App/>
    ├── app/
    │   ├── App.tsx                    màn tiêu đề (+ khảo sát đầu, "Chơi tiếp" khi có tiến độ) → GameScreen
    │   ├── GameScreen.tsx             thanh trên + sân khấu + khung nhìn runtime → component; ngăn kéo Hồ sơ; bảng người quan sát
    │   ├── TitleScreen.tsx · PreSurvey.tsx · EndScreen.tsx (màn kết + khảo sát cuối)
    │   ├── FacilitatorPanel.tsx       bảng người quan sát (`?facilitator=1`): vị trí, dữ liệu, nhảy phần, tóm tắt
    │   └── facilitator-mode.ts        isFacilitatorMode, nhãn, câu trạng thái lưu, jumpToPartStart (tự chơi tới đầu phần)
    ├── content/
    │   ├── types.ts                   GameContent (đóng băng) · index.ts: activeContent = realContent
    │   ├── generated/                 *.gen.ts SINH từ noi-dung/ (ĐỪNG SỬA TAY, được commit): cot-truyen (mạch chính, tên game),
    │   │                              ho-so (manh mối, tài liệu), thu-thach (thẻ, SQL của thẻ, gợi ý chuẩn, nhận xét chung) · generated.test.ts
    │   │   └── mvp/                   kich-ban.gen.ts SINH từ noi-dung-mvp/ (`satisfies KichBanMvp`) · mvp.gen.test.ts — game chưa import
    │   ├── mvp/types.ts               KichBanMvp: lịch, địa điểm × dữ kiện, chuỗi (NutMvp), thẻ, hồ sơ, sổ tay, soDongKhai (cho đợt 14)
    │   ├── real/                      index.ts: realContent = dữ liệu sinh + CHALLENGE_SPECS; test nội dung; testing/ (nguồn tên tạm
    │   │                              cho biến {{nv.…}}, chuỗi hiển thị, test bộ đọc — chỉ test/công cụ)
    │   └── sample/                    nội dung MẪU "(MẪU)" — đủ mọi loại node; còn dùng trong vài test
    ├── shared/
    │   ├── ids.ts                     ĐỊNH DANH QĐ-033 + mã chẩn đoán QĐ-040 (đóng băng)
    │   ├── display-names.ts           tên hiển thị có dự phòng (không lộ id thô)
    │   ├── store/                     zustand + persist sessionStorage (QĐ-004): slice story/evidence/challenges/survey
    │   ├── telemetry/                 events (union, đóng băng) · track · local-sink (localStorage) · session-meta · setup ·
    │   │                              export · export-file · summary (chỉ số §10) · survey · use-telemetry
    │   └── ui/                        TopBar, Stage, Portrait, DialogBox, MultipleChoice, ConfirmDialog, CodeText, shuffle
    │       └── visuals/               ô ảnh (art-slots), tách nền (bg-cutout, portrait-cutout), dàn nhân vật (cast),
    │                                  hình vẽ tạm SVG (scene-art, PortraitArt + portrait-faces, DocumentArt), SceneBackdrop,
    │                                  khung màn chiếu theo ảnh nền (scene-geometry, use-projector-insets), effect-timing
    ├── story/                         (Phần kể chuyện)
    │   ├── types.ts                   DialogueLine, 16 loại node, Sequence, StoryContent (đóng băng)
    │   ├── engine/                    runtime thuần: state.ts (StoryProgress/StoryView/StoryAction — đóng băng), runtime.ts, validate.ts
    │   └── ui/                        ExploreScreen (điểm xem xét), ObjectionEffect ("Có số liệu đây!")
    ├── evidence/                      types.ts (đóng băng) · notebook.ts (QĐ-037) · labels.ts · ui/EvidenceNotebook (ngăn kéo Hồ sơ, che thẻ đã hủy) · ui/DocumentReveal
    ├── sql-challenge/
    │   ├── schema.ts · types.ts       (đóng băng) bảng/cột, QueryModel, RunResult, GradeResult, ChallengeSpec/Content
    │   ├── data/                      CHALLENGE_SPECS (SQL lấy từ dữ liệu sinh), QUAN_OR_QUERY, QUAN_QUERY_MODEL, thứ tự mã chẩn đoán, dataset chính + ẩn
    │   ├── engine/                    sqljs (loader DUY NHẤT) · database · run · grade · compare · diagnose · priority · reference ·
    │   │                              sql-text · helpers · model-sql · index (chữ ký công khai, đóng băng)
    │   └── ui/                        ChallengeScreen (+ chế độ fix-query), QueryBuilder, WhereRow, SqlPane, SqlCode (có chú thích OR/AND/LIKE/IN),
    │                                  sql-tokens, SchemaPanel, ResultTable, SuccessPanel (câu đọc kết quả), HaVyPanel, guide, lines,
    │                                  labels, model-edit (điều kiện chưa chọn cột, QĐ-056/058), value-options, use-distinct-values, icons
    ├── debrief/                       types.ts (đóng băng) · ui/LinePick (chọn dòng), Projector (chạy SQL thật), SqlRecall (SQL chỉ đọc khi
    │                                  đọc phản hồi — QĐ-061-Đ1), SqlText + sql-highlight (tô màu ĐỒNG ĐỀU), tried-lines, projector-text, debrief.css
    ├── styles/                        fonts.css (@fontsource) · tokens.css (token thiết kế) · base.css · app.css · contrast.test.ts
    ├── assets/                        ô ảnh: thả ảnh thật vào BẤT KỲ thư mục con nào (xem `assets/art/README.md`)
    └── test/setup.ts                  jest-dom cho Vitest
```

Test nằm cạnh mã (`*.test.ts(x)`), Vitest môi trường jsdom, sql.js thật (wasm từ `node_modules`).

## 2. Hợp đồng kiểu chính (trích)

### 2.1 Định danh — `src/shared/ids.ts`

Mọi id của QĐ-033 là hằng `as const` + kiểu literal; mọi kiểu khác import từ đây.

```ts
PART_IDS = ['intro','investigation','analysis','debrief','ending']      → PartId
SCENE_IDS = ['clb-room','corridor-b','debrief-room']                     → SceneId
CHARACTER_EXPRESSIONS = { 'minh-anh': [neutral,worried,happy], 'ha-vy': [neutral,thinking,smile],
  quan: [neutral,smug,stunned], hoai: [nervous,downcast,relieved], 'bac-tu': [neutral] }
  → CharacterId, ExpressionOf<C>, SpeakerId = CharacterId | 'player' | 'narrator'
CLUE_IDS (3) · DOCUMENT_IDS (3) · QUERY_EVIDENCE_IDS (4) → EvidenceId (hợp của ba; 10 mục Hồ sơ)
CHALLENGE_IDS = ['c1','c2','c3','debrief-fix'] · EFFECT_IDS = ['co-so-lieu-day']
FLAG_IDS = ['access-revoked'] · STANDARD_HINT_IDS (3 câu §5.2)
DIAGNOSTIC_CODES (QĐ-040, 18 mã); BLOCKING_DIAGNOSTIC_CODES = 6 mã "không chạy được"
  (not-select, syntax-error, no-table, no-columns, no-value, connector-unset — hai mã `no-columns`, `no-value` do gói 3 thêm, QĐ-047)
```

Tra cứu tên hiển thị (`display-names.ts`, `evidence/labels.ts`) luôn có nhánh dự phòng
("Nhân vật", "Phần", "Mục hồ sơ"…) và có test: **không bao giờ** in id thô ra màn hình — kể cả tên ô ảnh
(chỉ nằm trong `data-art-*`).

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
  | AnnotateEvidenceNode { type:'annotate-evidence', evidenceId, note, redact }   // chú thích + hủy dữ liệu (3 thẻ ở end-03)
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
EvidenceAnnotation = { evidenceId, note, redact, at }      // redact: Hồ sơ KHÔNG render tên/mã (QĐ-050)
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
ChallengeDefinition = { spec, content }   // GameContent.challenges[id]
GuideStep = { step, highlight: 'from'|'select'|'where'|'run'|'preview', line }
DiagnosticResponse = { line } | { useStandardHint: StandardHintId }
RunSummary = { at, mode, sql, status, rowCount, primaryCode, connector }   // store chỉ giữ tóm tắt lần chạy gần nhất
```

**Điều kiện chưa chọn cột (QĐ-056/QĐ-058).** `QueryCondition.column` không cho rỗng (tệp đóng băng),
nên "chưa chọn cột" mã hóa bằng **tiền tố id** `new-N` (`ui/model-edit.ts`: `PENDING_ID_PREFIX`,
`isPendingCondition`, `withoutPending`); cột giữ chỗ không hiện, không vào SQL, nút Chạy khóa với lời
`no-value`. Chọn cột xong id đổi thành `cond-N`. Gói 9b rà lại: mọi chỗ đọc/ghi id đều qua các helper
này, chưa tìm ra ca hỏng thật → giữ cách A của QĐ-058.

Hàm engine (`engine/index.ts`) — chữ ký cố định:

```ts
runQuery(sql, dataset: 'main'|'hidden' = 'main'): Promise<RunResult>   // chỉ SELECT/WITH…SELECT, PRAGMA query_only
gradeChallenge(spec, sql, model | null): Promise<GradeResult>          // chạy dataset chính (+ ẩn nếu spec yêu cầu), sắp mã theo priority.ts
modelToSql(model): string
sqlToModel(sql): QueryModel | null
validateModel(model) / isModelRunnable(model)   // mã blocking khi model chưa chạy được
pickDiagnostic(codes, challengeLines, commonLines) → { code, response } | null   // mã HIỂN THỊ theo thứ tự khóa của nội dung
orderDiagnostics(challengeId, diagnostics)      // thứ tự mặc định của engine (CHALLENGE_/COMMON_DIAGNOSTIC_ORDER)
distinctValues(table, column) · previewRows(table, limit = 5)
```

Dữ liệu (`src/sql-challenge/data/`): `CHALLENGE_SPECS` (spec 4 thử thách — nguồn DUY NHẤT của cột bắt buộc, số dòng,
dataset ẩn; SQL chuẩn và model nạp sẵn lấy từ `content/generated/thu-thach.gen.ts` › `SQL_THU_THACH`, tức dòng "SQL chuẩn",
"Truy vấn nạp sẵn", "Nguồn điều kiện nạp sẵn" của thẻ trong `noi-dung/thu-thach/`), `QUAN_OR_QUERY`,
`QUAN_QUERY_MODEL`, `CHALLENGE_DIAGNOSTIC_ORDER`, `COMMON_DIAGNOSTIC_ORDER` (đủ 6 mã blocking + mã chung + `other`),
`MAIN_DATASET` (40 sinh viên / 8 lớp), `HIDDEN_DATASET` (bắt truy vấn "đi từ đáp án", QĐ-015).
Thứ tự khóa `diagnosticLines`/`commonDiagnosticLines` trong nội dung PHẢI trùng hai mảng thứ tự (QĐ-047,
test `content/real/diagnostics.test.ts`).

### 2.5 Debrief — `src/debrief/types.ts`

```ts
PickableLine = { index, sql, correct, feedback: DialogueLine[] }
LinePick = { id: 'q-quan-lines', lines: PickableLine[] }
ProjectorSpec = { id, source: {kind:'sql', sql} | {kind:'evidence', evidenceId}, run: boolean, expectedRowCount?, caption? }
```

### 2.6 Telemetry — `src/shared/telemetry/events.ts`

Union `TelemetryEventBody` (§9.3, QĐ-029): `game_start`, `part_start`, `part_complete` (durationMs),
`scene_enter`, `hotspot_inspected`, `evidence_unlocked`, `notebook_opened` (QĐ-044, TopBar phát),
`challenge_start`, `query_run` (mode, attempt, rowCount, status, primaryCode = mã ĐÃ HIỆN, errorClass
syntax/logic, connector, msSinceStart), `first_run`, `hint_used` (level, count), `challenge_complete`
(durationMs, runs, hintsUsed), `question_answered` (questionId, choiceId, attempt, correct, isFirstChoice),
`line_picked`, `effect_shown`, `game_complete` (durationMs), `survey_submitted` (pre/post),
`survey_skipped`, `game_reset`. `TelemetryEvent = body + { at, sessionId }`.
Khảo sát chỉ có lựa chọn đóng (QĐ-042): `PreSurveyAnswers { excelLevel, sqlBefore }`,
`PostSurveyAnswers { memorable[≤2], annoying | null, playNext }`.

### 2.7 Store — `src/shared/store/store.ts`

`createGameStore({ content, now?, storageKey?, persist? })` → zustand + `persist` (sessionStorage, khóa
`clb-tham-tu-du-lieu`, `version: 1`, `migrate` = bắt đầu lại khi lệch phiên bản).
Slice: `progress: StoryProgress | null` · `evidence { unlocked, savedQueries, annotations }` ·
`challenges[id]: ChallengeState { model, sql, mode, lastRun, status, runs, hintLevel, hintsUsed, startedAt, firstRunAt, completedAt, guideStep }` ·
`survey { pre, post, preSkipped, postSkipped }`. Hành động (`GameActions`, đóng băng): `startGame`,
`dispatchStory(action)`, `getView()`, `hasEvidence`, `unlockEvidence`, `saveQueryEvidence`, `annotateEvidence`,
`openChallenge`, `updateChallenge`, `recordRun`, `useHint`, `completeChallenge`, `submitSurvey`/`submitPostSurvey`/`skipSurvey`,
`resetGame` (ghi `game_reset` rồi mở phiên telemetry mới). Store là nơi phát phần lớn sự kiện của thử thách
(`challenge_start`, `first_run`, `query_run`, `hint_used`, `challenge_complete`) — màn thử thách KHÔNG ghi thêm.
Không lưu bảng kết quả lớn: chỉ `SavedQueryEvidence` (≤ vài chục dòng) và `RunSummary`.

## 3. Luồng dữ liệu

```
noi-dung/*.md ──(npm run noi-dung:sinh)──► content/generated/*.gen.ts ──► GameContent (activeContent = realContent)
noi-dung-mvp/**/*.md ──(noi-dung:sinh:mvp: doc-mvp → luat-mvp → chuyen-mvp)──► content/generated/mvp/kich-ban.gen.ts ──► (chưa ai đọc; runtime MVP là gói sau)
   │
   ▼                       effects: unlock-evidence / annotate-evidence / set-flag / telemetry
runtime story (thuần) ──► store áp effects ──► track() ──► sink localStorage ──► summary ──► FacilitatorPanel / xuất JSON
   │ getStoryView
   ▼
StoryView ──► GameScreen → component theo view.kind (DialogBox, ExploreScreen, MultipleChoice, LinePick,
              SqlRecall + DialogBox, DocumentReveal, ChallengeScreen, ObjectionEffect, Projector, EndScreen)
```

- **Kể chuyện.** `startStory(content, ctx)` → `progress`; mỗi hành động (`advance`, `choose`, `pick-line`,
  `inspect`, `proceed`, `complete`) đi qua `stepStory(content, progress, ctx, action)` → `{ progress, effects, rejected? }`.
  `ctx = { now, hasEvidence(id) }` do store cung cấp. Runtime tự phát `part_start`/`part_complete` khi chuỗi
  đích thuộc phần khác, `game_complete` ở `[KẾT THÚC]`, và ghi lựa chọn ĐẦU của mỗi câu hỏi/màn chọn dòng
  (`progress.choices[id].firstChoiceId`, sự kiện có `isFirstChoice`). `validateContent(content)` chạy trong
  test (`content/real/integrity.test.ts`).
- **Điểm xem xét.** `ExploreScreen` chỉ nói "Còn N điểm chưa xem xét", không nêu tên manh mối (QĐ-053);
  nút "Nhiệm vụ tiếp theo →" hiện khi `gate.satisfied`.
- **Thử thách** (`ChallengeScreen`, cả `mode: 'fix-query'`): `openChallenge` → `updateChallenge` khi sửa model/SQL
  → mỗi lần bấm Chạy: `gradeChallenge(spec, sql, model | null)` → chọn lời Hà Vy bằng `pickDiagnostic`
  (lời của thẻ → lời chung → gợi ý chuẩn → lời dự phòng; không bao giờ in mã thô) → `recordRun` với
  `primaryCode` = mã ĐÃ HIỆN → đúng thì `SuccessPanel` hiện bảng + câu đọc kết quả (`readQuestion`; màn này
  TỰ `track('question_answered')` vì không qua runtime — QĐ-043) → "Lưu vào hồ sơ" → `completeChallenge(id,
  SavedQueryEvidence)` (fix-query kèm `before` = lần chạy thật truy vấn OR của Quân) → `onComplete()`.
  Phép nối chưa chọn khi có ≥ 2 điều kiện → nút Chạy khóa kèm lời (QĐ-039). Lựa chọn của câu hỏi xáo MỘT lần
  mỗi lần hiện (QĐ-041, `MultipleChoice`).
- **Giải trình.** `Projector` chạy SQL thật (`runQuery`) — deb-01: `QUAN_OR_QUERY` → 24 dòng; deb-03: vật chứng
  `ev-quan-fixed` → 2 dòng + dải "Trước 24 (OR) → Sau 2 (AND)". `LinePick`: 5 dòng là 5 nút, tô màu ĐỒNG ĐỀU
  (`sql-highlight.ts` — không lớp riêng cho `OR`); dấu "đã thử" nhớ ở `tried-lines.ts`. Chọn sai → runtime hiện
  phản hồi; `GameScreen` thấy `view.origin === 'line-pick'` thì đặt `SqlRecall` (5 dòng chỉ đọc, cùng bộ tô) phía
  trên hộp thoại (QĐ-061-Đ1). Hiệu ứng "Có số liệu đây!" bỏ qua cú bấm lặp trong ~400 ms đầu (QĐ-061-Đ2).
- **Hết quyền truy cập (end-03).** `set-flag access-revoked` (trong `progress.flags`, trình dựng khóa nếu mở lại)
  + `annotate-evidence … redact: true` cho **ba** thẻ có dữ liệu cá nhân `ev-c1-names-h`, `ev-c3-shortlist`,
  `ev-quan-fixed` (QĐ-062); `ev-c2-classes-b` (chỉ mã lớp) giữ nguyên. Hồ sơ KHÔNG render tên/mã của thẻ đã
  hủy — bảng lẫn mô tả thay bằng vạch che + dòng lý do, không dùng `blur` (QĐ-050); chú thích không nêu mã
  sinh viên. Test: `content/real/redaction.test.tsx`, `app/full-playthrough.test.ts`.
- **Màn tiêu đề / khảo sát.** `App` giữ bản nháp khảo sát đầu; ghi `survey_submitted`/`survey_skipped` khi bấm
  "Bắt đầu"/"Chơi tiếp" để câu trả lời rơi vào đúng phiên (kể cả khi "Bắt đầu lại" mở phiên mới). Khảo sát cuối ở
  `EndScreen` qua store.

## 4. Bản đồ mã nguồn hiện tại

| Vùng | Mã chính | Test canh giữ |
|---|---|---|
| Kể chuyện | `story/engine/{runtime,state,validate}.ts`, `story/ui/*` | `runtime.test.ts`, `validate.test.ts`, `visuals/explore-and-choice.test.tsx`, `objection-effect.test.tsx` |
| Kịch bản MVP (chưa có runtime) | `noi-dung-mvp/**`, `tools/noi-dung/*-mvp.ts`, `dieu-kien.ts`, `content/mvp/types.ts`, `content/generated/mvp/**` | `generated/mvp/mvp.gen.test.ts` (đọc sạch, file sinh khớp, hình dạng lịch/kết), `testing/bo-doc-mvp.test.ts` (lỗi `<tệp>:<dòng>`: chi phí khung, Xuất hiện từ, true end, chuỗi lẻ, tên cấm, trừ uy tín, TẠO NHÂN VẬT; cú pháp điều kiện/hậu quả/mốc) |
| Nội dung thật | `noi-dung/**`, `tools/noi-dung/**`, `content/generated/**`, `content/real/**` | `generated.test.ts` (file sinh khớp nội dung — quên sinh lại / sửa tay .gen.ts là đỏ), `noi-dung.test.ts` (bộ đọc không bỏ sót dòng, `CHALLENGE_SPECS` ↔ thẻ, biểu cảm người hỏi, không tên riêng viết trần), `testing/bo-doc.test.ts` (lỗi `<tệp>:<dòng>`, cú pháp, biến tên), `display-hygiene.test.ts` (không id thô/ghi chú người viết trong chữ hiển thị), `integrity.test.ts`, `diagnostics.test.ts` (thứ tự mã), `numbers.test.ts` (10/2/2/24 — QĐ-012), `redaction.test.tsx` |
| Engine SQL + dữ liệu | `sql-challenge/engine/**`, `sql-challenge/data/**` | `engine/*.test.ts` (kể cả `sqljs.dev.test.ts`: canary Vite dev nạp sql.js như trình duyệt), `data/*.test.ts` |
| Trình dựng | `sql-challenge/ui/**` | `ChallengeScreen/Guide/Run/SqlMode/Success/Telemetry/ValueEditors/Fix.test.tsx`, `CodeText.test.tsx`, `contrast-ui.test.ts` |
| Giải trình | `debrief/ui/**` | `LinePick.test.tsx`, `Projector.test.tsx`, `SqlRecall.test.tsx`, `contrast-debrief.test.ts` |
| Hồ sơ | `evidence/**` | `notebook.test.ts`, `labels.test.ts`, `visuals/notebook-ui.test.tsx`, `document-reveal.test.tsx` |
| Hình + ô ảnh | `shared/ui/visuals/**`, `Portrait.tsx`, `Stage.tsx`, `styles/*.css` | `art-slots.test.ts` (bảng ô ↔ tệp), `bg-cutout.test.ts`, `portrait-cutout.test.tsx`, `portraits.test.tsx`, `SceneBackdrop.test.tsx`, `projector-fit.test.tsx`, `styles/contrast.test.ts` |
| Store | `shared/store/store.ts` | `store.test.ts` |
| Telemetry + người quan sát | `shared/telemetry/**`, `app/FacilitatorPanel.tsx`, `app/facilitator-mode.ts`, `app/PreSurvey.tsx`, `app/EndScreen.tsx` | `track/local-sink/export/summary/survey.test.ts`, `FacilitatorPanel.test.tsx`, `PreSurvey.test.tsx`, `EndScreen.test.tsx`, `facilitator-jump.test.ts`, `notebook-and-jump-ui.test.tsx` |
| Tích hợp | `app/GameScreen.tsx`, `app/App.tsx` | `app/full-playthrough.test.ts` (chơi trọn luồng intro-01 → [KẾT THÚC] bằng store/runtime/engine thật, kèm biến thể chọn sai trước) |

**Tệp đóng băng** (muốn đổi kiểu/chữ ký phải báo người giao, kèm lý do): `src/shared/ids.ts`,
`src/story/types.ts`, `src/evidence/types.ts`, `src/sql-challenge/schema.ts`, `src/sql-challenge/types.ts`,
`src/debrief/types.ts`, `src/shared/telemetry/events.ts`, `src/content/types.ts`, `src/story/engine/state.ts`
(kiểu `StoryView`/`StoryAction`), chữ ký hàm trong `src/sql-challenge/engine/index.ts`, chữ ký `GameActions`
trong store, `package.json` (không cài thêm phụ thuộc nếu không hỏi). Thêm mã chẩn đoán mới: thêm vào
`DIAGNOSTIC_CODES` trong `ids.ts` **và** báo lại; mã không phát hiện được rơi về `other`.

## 5. Ô ảnh, ảnh thật của user, tách nền (QĐ-060, QĐ-063)

- Mọi hình đang là **hình vẽ tạm bằng code** (SVG/CSS trong `visuals/scene-art.tsx`, `PortraitArt.tsx`,
  `DocumentArt.tsx`). Mỗi hình có một **ô** tên cố định (`visuals/art-slots.ts`: `BACKGROUND_SLOTS`, chân dung
  `<nhân vật>-<biểu cảm>`, tài liệu `doc-*`).
- `import.meta.glob('/src/assets/**/*.{webp,png,jpg,jpeg}')` quét MỌI thư mục con của `src/assets/`
  lúc build/dev; tệp đúng tên ô → dùng ảnh, không thì hình vẽ tạm. Nhận song song hai quy ước tên: tên ô
  (`minh-anh-worried`, `bg-prototype-hallway`) và **quy ước của user** (`art/prompts/prompts-characters-prototype-flow-v0.1.md`):
  `char-<nhân vật>-<biểu cảm>`, `char-<nhân vật>-anchor` = biểu cảm ĐẦU của nhân vật (Hoài = `nervous`).
  Thiếu biểu cảm → mượn ảnh biểu cảm đầu (`data-art-borrowed-from`).
- **Tách nền** (`visuals/bg-cutout.ts` thuật toán thuần trên `ImageData`; `portrait-cutout.ts` lớp canvas +
  bộ đệm theo URL + hook `usePortraitCutout`): ảnh chân dung nền xám phẳng của user được tách khi hiển thị
  (loang từ mép, xóa đảo nhỏ, xóa khoảng kẹt phẳng, mềm biên 1 px), ra WebP không mất dữ liệu trong blob URL.
  Ảnh đã trong suốt / nền không phẳng → để nguyên (`kept`). Chạy trên luồng chính, 50–300 ms lần đầu mỗi ảnh
  (QĐ-064: để nguyên cho vòng 1). Không sửa/xóa tệp của user.
- Phần tử hình mang `data-art-slot`, `data-art-source="image" | "placeholder"`, `data-art-cutout=
  cut | kept | pending | failed | unsupported`; tên ô không bao giờ hiện ra màn hình hay alt/aria.
- Phòng giải trình: khung màn chiếu trong ảnh nền khai báo ở `visuals/scene-geometry.ts`
  (`HEARING_ROOM_SCREEN`, phần của ảnh 0–1); `useProjectorInsets` quy ra 4 biến `--projector-*` theo kích
  thước sân khấu thật và cách phủ `cover`; `debrief.css` đặt màn chiếu/màn chọn dòng/SqlRecall vào khung đó.
- Hướng dẫn thả ảnh, kích thước, vùng an toàn, cách kiểm: `src/assets/art/README.md`
  (`npx vitest run src/shared/ui/visuals/art-slots.test.ts --reporter=verbose` in bảng ô ↔ tệp, báo tệp nghi
  gõ sai tên).

## 6. Telemetry, bảng người quan sát, nhảy phần (QĐ-029, QĐ-030)

- `track(event)` (`track.ts`) gắn `at` + `sessionId` rồi ghi vào sink; mặc định sink trong bộ nhớ (test);
  `installPersistentTelemetry()` (`setup.ts`, gọi ở `main.tsx`) cắm `local-sink.ts`: localStorage, mỗi phiên
  một khóa `clb-tham-tu-du-lieu:telemetry:v1:session:<id>`, mã phiên giữ trong sessionStorage (F5 giữ phiên),
  ghi chú phiên (`session-meta.ts`, khóa `…:meta`). Giới hạn an toàn: ~1,5 triệu ký tự tổng, 5 000 sự kiện/phiên;
  vượt → ngừng ghi bền, `status()` báo lý do (`unavailable` / `quota` / `budget` / `write-failed`), bảng người
  quan sát in câu theo lý do thật. Telemetry hỏng không bao giờ làm game hỏng (mọi lỗi nuốt).
- Chỉ lưu cục bộ, không gửi mạng; không tên thật, không ngày sinh, không chữ tự do; SQL chỉ nằm trong `query_run`
  của thử thách.
- `summary.ts` → `SessionSummary` cho từng phiên: thời gian 5 phần, mỗi thử thách (số lần chạy, gợi ý, lỗi
  cú pháp/logic, thời gian tới lần chạy đầu, thời gian hoàn thành), **lựa chọn ĐẦU** ở `q-two-rows` và
  `q-verify` (`MEASURED_QUESTIONS`; nhiều bản ghi → lấy bản SỚM NHẤT), lần chọn dòng đầu, số lần mở Hồ sơ,
  hoàn thành/thời lượng/trong 35 phút, khảo sát đầu/cuối, "màn phản bác trong 2 phần đáng nhớ".
- `FacilitatorPanel` (`?facilitator=1`, cả ở màn tiêu đề): thanh thu gọn là dải riêng ở đáy màn hình (lớp
  `facilitator-on` trên `<html>` thu game lại đúng bằng dải, nên không che nút nào); mở rộng: vị trí hiện tại
  (phần, chuỗi, node, loại màn), số sự kiện, trạng thái lưu, **Xuất dữ liệu thử nghiệm (JSON)** (`export-file.ts`:
  mọi phiên + ghi chú + tóm tắt), **Xóa dữ liệu**, **Đặt lại phiên** (có hộp xác nhận), **Nhảy tới đầu phần**, tóm tắt
  từng phiên.
- **Nhảy phần** (`facilitator-mode.ts › jumpToPartStart`): chỉ dùng API công khai của store/runtime — game tự
  chơi (qua lời, chọn đúng, xem đủ điểm, đóng tài liệu/hiệu ứng/màn chiếu) và tự điền vật chứng bằng SQL chuẩn
  (`CHALLENGE_SPECS.referenceSql` chạy qua engine) tới khi phần đích bắt đầu; đích ở trước/đúng phần hiện tại
  → "Chơi lại" (phiên mới) rồi tự chơi. Phiên được đánh dấu `jumps[]` (`session-meta`) với khoảng chỉ số sự kiện
  tự động; tóm tắt loại các sự kiện đó khỏi số liệu, ghi "có nhảy phần", không so "trong 35 phút".
  Test: `app/facilitator-jump.test.ts`.

## 7. Cách thêm / đổi nội dung

1. Nội dung (`prototype/noi-dung/`, xem `noi-dung/README.md`) là nguồn DUY NHẤT (gói 12a-2 đã bỏ bản chép tay):
   sửa `.md` → `npm run kiem-noi-dung` (lỗi dạng `<tệp>:<dòng>`, không ghi gì) → `npm run noi-dung:sinh` (ghi
   `src/content/generated/*.gen.ts`, có lỗi thì không ghi) → commit **cả** `.md` lẫn `.gen.ts`. `predev`/`prebuild` tự
   sinh lại; `generated.test.ts` đỏ nếu tệp sinh đã commit khác bản sinh lại. Tên nhân vật/tên trường viết bằng biến
   `{{nv.<mã>[.ten|.ho-ten|.trong-cau]}}`, `{{truong.ten-day-du|ten-ngan|ten-khong-tien-to}}` (nguồn tạm:
   `content/real/testing/nguon-ten.ts`; gói 12b chuyển sang `noi-dung/nhan-vat.yaml`).
   **Bộ MVP** (`prototype/noi-dung-mvp/`, xem README ở đó và đặc tả §18): `npm run kiem-noi-dung:mvp` → `npm run noi-dung:sinh:mvp`
   → commit `.md` + `src/content/generated/mvp/kich-ban.gen.ts`. Bảng tên cho `{{nv.…}}` lấy từ `noi-dung-mvp/nhan-vat.md`
   (không qua `src/`); `{{nv.nguoi-choi}}` được giữ nguyên trong dữ liệu sinh (tùy chọn `giuCho` của `bien.ts`), runtime MVP
   sẽ thay bằng tên người chơi. Lệnh không đuôi `:mvp` chạy cả hai bộ.
2. Ánh xạ kịch bản → node: luật nằm ở `tools/noi-dung/chuyen.ts` (bảng loại node ở đầu `src/story/types.ts`). Chú ý: `[ĐIỂM XEM XÉT]` nhiều điểm trong một cảnh
   → **một** `explore` node + `gate` ngay sau; màn chiếu `[MÀN CHIẾU]` → `projector`, hết quyền `[ĐẶT CỜ access-revoked]`
   → `set-flag`, `[CHÚ THÍCH HỒ SƠ ev-… · làm mờ]` → `annotate-evidence`, `[THẺ CHỮ]` → `display: 'card'`;
   `[GỢI Ý CHUẨN]` → `standardHints`; "Nhận xét chung" → `commonDiagnosticLines`; `[KHI: mã] dùng hint-x` →
   `{ useStandardHint: 'hint-x' }`.
3. Thêm mã chẩn đoán / thay đổi thứ tự: sửa `CHALLENGE_/COMMON_DIAGNOSTIC_ORDER` **và** thứ tự khóa trong nội
   dung; `diagnostics.test.ts` khẳng định hai bên trùng nhau và mọi mã có lời.
4. `npm test`: `integrity.test.ts` (`validateContent(realContent).errors` rỗng), `display-hygiene.test.ts`
   (chuỗi hiển thị không chứa id thô, cụm chỉ dẫn), `numbers.test.ts` (10/2/2/24), `full-playthrough.test.ts`
   (đi hết game).

## 8. Lệnh kiểm tra

```
npm run typecheck   # tsc --noEmit
npm test            # vitest run --maxWorkers=2 (máy yếu bộ nhớ; jsdom; sql.js nạp wasm từ node_modules)
npm run lint        # eslint . — 0 lỗi, 0 cảnh báo
npm run build       # typecheck rồi vite build (dist/assets/*.wasm là asset; dist/ phải phục vụ qua HTTP)
npm run preview     # vite preview — kiểm: curl -sI /assets/<file>.wasm → Content-Type: application/wasm
```

Chạy bằng Git Bash (QĐ-002; PowerShell đang Constrained Language Mode). Tự kiểm công cụ trước khi tin số 0:
thêm tạm `const __canary: number = 'a';` vào một tệp src → typecheck phải báo TS2322. Các test tương phản
(`styles/contrast.test.ts`, `sql-challenge/ui/contrast-ui.test.ts`, `debrief/ui/contrast-debrief.test.ts`) tự
chứng minh bắt được #111 trên #dc2626 trước khi đo; đổi token thì thêm cặp mới vào `PAIRS`.
Bẻ phanh mẫu cho các test tích hợp: bỏ bước giải `debrief-fix` trong `full-playthrough.test.ts` → đỏ vì thiếu
`ev-quan-fixed`; cho `SqlRecall` dùng `SqlCode` → `SqlRecall.test.tsx` đỏ; cho tóm tắt lấy lựa chọn CUỐI →
`summary.test.ts` và biến thể "chọn sai trước" đỏ.

## 9. Quy ước commit

- Nhánh `claude/<slug>` trong worktree riêng; mỗi nhóm việc một commit; không push, không merge.
- Thông điệp tiếng Việt: dòng đầu là kết quả (không phải "sửa lỗi"), thân liệt kê theo thư mục;
  kết thúc bằng `Co-Authored-By: Claude <noreply@anthropic.com>`.
- Trước mỗi commit: `npm run typecheck && npm test && npm run lint` xanh; commit có UI thì
  `npm run build` cũng phải qua.
- Không sửa tài liệu ngoài `prototype/` (`docs/`, `art/`, `README.md`, `.gitignore`, `.gitattributes`) và lời thoại trong
  `prototype/noi-dung/` (chỉ chỉ dẫn máy đọc / chú thích dàn dựng khi được giao); cần gì thì ghi vào báo cáo.
