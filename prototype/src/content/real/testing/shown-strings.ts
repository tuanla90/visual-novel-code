/**
 * Mọi chuỗi NGƯỜI CHƠI ĐỌC ĐƯỢC trong một GameContent, kèm vị trí — CHỈ dùng trong test.
 *
 * Đi theo cấu trúc kiểu (không đoán theo tên trường): lời thoại, câu hỏi + lựa chọn + phản hồi,
 * nhiệm vụ, nhãn điểm xem xét, nút qua cảnh, SQL màn chiếu / chọn dòng, chú thích gắn sau, thẻ thử
 * thách (tiêu đề, đề bài, mục tiêu học, bước, gợi ý, nhận xét, lời khi đúng, câu đọc kết quả, thẻ vật
 * chứng, giá trị nạp sẵn), thẻ hồ sơ (kể cả nhãn "Từ manh mối"), gợi ý chuẩn, nhận xét chung, tên game.
 * KHÔNG gồm: `note` ([DÀN DỰNG] — không hiển thị), tiêu đề chuỗi (chỉ để gỡ lỗi), mọi id, SQL chuẩn.
 */
import type { GameContent } from '../../types';
import type { DialogueLine, MultipleChoiceQuestion } from '../../../story/types';

export interface ShownString {
  /** Vị trí để báo lỗi: `seq:deb-01#7/line:1/feedback#0`, `doc:doc-letter/body#2`, … */
  where: string;
  text: string;
}

export function shownStrings(content: GameContent): ShownString[] {
  const out: ShownString[] = [];
  const add = (where: string, text: string | undefined): void => {
    if (text !== undefined) out.push({ where, text });
  };
  const line = (where: string, l: DialogueLine): void => add(where, l.text);
  const question = (where: string, q: MultipleChoiceQuestion): void => {
    line(`${where}/asker`, q.asker);
    for (const c of q.choices) {
      add(`${where}/choice:${c.id}`, c.text);
      c.feedback.forEach((f, i) => line(`${where}/choice:${c.id}/feedback#${i}`, f));
    }
  };

  add('meta/title', content.meta.title);

  for (const seq of content.story.sequences) {
    seq.nodes.forEach((n, i) => {
      const w = `seq:${seq.id}#${i}`;
      switch (n.type) {
        case 'line':
          line(w, n);
          break;
        case 'task':
          add(w, n.text);
          break;
        case 'explore':
          for (const h of n.hotspots) add(`${w}/hotspot:${h.id}`, h.label);
          break;
        case 'gate':
          add(`${w}/button`, n.buttonLabel);
          break;
        case 'question':
          question(w, n.question);
          break;
        case 'line-pick':
          for (const l of n.pick.lines) {
            add(`${w}/line:${l.index}`, l.sql);
            l.feedback.forEach((f, k) => line(`${w}/line:${l.index}/feedback#${k}`, f));
          }
          break;
        case 'projector':
          if (n.projector.source.kind === 'sql') add(`${w}/sql`, n.projector.source.sql);
          add(`${w}/caption`, n.projector.caption);
          break;
        case 'annotate-evidence':
          add(w, n.note);
          break;
        // Không có chữ hiển thị riêng (note là chỉ dẫn dàn dựng; tài liệu/thử thách lấy chữ từ thẻ).
        case 'note':
        case 'goto':
        case 'show-document':
        case 'challenge':
        case 'fix-query':
        case 'effect':
        case 'set-flag':
        case 'end':
          break;
      }
    });
  }

  for (const [id, c] of Object.entries(content.evidence.clues)) {
    const w = `clue:${id}`;
    add(`${w}/title`, c.title);
    add(`${w}/source`, c.source);
    add(`${w}/content`, c.content);
    add(`${w}/builderValue`, c.builderValue?.label);
    add(`${w}/openQuestion`, c.openQuestion);
    add(`${w}/caveat`, c.caveat);
  }
  for (const [id, d] of Object.entries(content.evidence.documents)) {
    const w = `doc:${id}`;
    add(`${w}/title`, d.title);
    add(`${w}/source`, d.source);
    if (Array.isArray(d.body)) d.body.forEach((p, i) => add(`${w}/body#${i}`, p));
    else add(`${w}/body`, d.body);
    add(`${w}/extra`, d.extra);
    add(`${w}/openQuestion`, d.openQuestion);
    add(`${w}/caveat`, d.caveat);
  }

  for (const [id, def] of Object.entries(content.challenges)) {
    const w = `challenge:${id}`;
    const c = def.content;
    add(`${w}/title`, c.title);
    add(`${w}/prompt`, c.prompt);
    add(`${w}/learningGoal`, c.learningGoal);
    for (const s of c.steps) line(`${w}/step#${s.step}`, s.line);
    c.hints.forEach((h, i) => line(`${w}/hint#${i + 1}`, h));
    for (const [code, r] of Object.entries(c.diagnosticLines)) if (r && 'line' in r) line(`${w}/diag:${code}`, r.line);
    line(`${w}/onCorrect`, c.onCorrect);
    if (c.readQuestion) question(`${w}/readQuestion`, c.readQuestion);
    add(`${w}/evidence/title`, c.evidence.title);
    add(`${w}/evidence/description`, c.evidence.description);
    // Giá trị nạp sẵn hiện trong ô điều kiện của trình dựng (debrief-fix).
    for (const cond of def.spec.initialModel?.conditions ?? []) {
      for (const v of Array.isArray(cond.value) ? cond.value : [cond.value]) add(`${w}/initialModel/${cond.column}`, v);
    }
  }

  for (const [id, h] of Object.entries(content.standardHints)) line(`hint:${id}`, h);
  for (const [code, r] of Object.entries(content.commonDiagnosticLines)) if (r && 'line' in r) line(`common-diag:${code}`, r.line);

  return out;
}
