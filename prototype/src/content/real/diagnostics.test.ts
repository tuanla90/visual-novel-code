/**
 * Phủ + thứ tự mã chẩn đoán trên NỘI DUNG THẬT (QĐ-040, QĐ-047).
 *
 * `pickDiagnostic` chọn lời theo THỨ TỰ KHÓA của `diagnosticLines` / `commonDiagnosticLines`; engine
 * sắp `GradeResult.diagnostics` theo CHALLENGE_DIAGNOSTIC_ORDER / COMMON_DIAGNOSTIC_ORDER. Hai nguồn
 * thứ tự này phải trùng nhau, và mọi mã phải ra một lời (giao diện không bao giờ in mã thô).
 */
import { describe, expect, it } from 'vitest';
import { BLOCKING_DIAGNOSTIC_CODES, CHALLENGE_IDS, DIAGNOSTIC_CODES, type DiagnosticCode } from '../../shared/ids';
import { CHALLENGE_DIAGNOSTIC_ORDER, COMMON_DIAGNOSTIC_ORDER } from '../../sql-challenge/data/challenges';
import { orderDiagnostics, pickDiagnostic } from '../../sql-challenge/engine/priority';
import { realContent } from '.';

const common = realContent.commonDiagnosticLines;
const isBlocking = (c: string): boolean => (BLOCKING_DIAGNOSTIC_CODES as readonly string[]).includes(c);

describe.each([...CHALLENGE_IDS])('thử thách %s', (id) => {
  const lines = realContent.challenges[id].content.diagnosticLines;

  // Mã PHẢI có lời riêng (không được rơi về `other`): mã của thẻ + mã "Nhận xét chung" + mã blocking —
  // lấy theo danh sách của engine (CHALLENGE_/COMMON_DIAGNOSTIC_ORDER, BLOCKING_DIAGNOSTIC_CODES),
  // KHÔNG theo khóa của dữ liệu, để xóa nhầm một lời thì test đỏ.
  const mustHaveLine = new Set<DiagnosticCode>([
    ...CHALLENGE_DIAGNOSTIC_ORDER[id],
    ...COMMON_DIAGNOSTIC_ORDER,
    ...BLOCKING_DIAGNOSTIC_CODES,
  ]);

  it('phủ: mọi mã trong DIAGNOSTIC_CODES qua pickDiagnostic đều ra một lời khác null', () => {
    for (const code of DIAGNOSTIC_CODES) {
      const picked = pickDiagnostic([code], lines, common);
      expect(picked, code).not.toBeNull();
      expect(picked?.response, code).not.toBeNull();
      // Mã của thẻ / chung / blocking hiện đúng lời của chính nó; mã khác (không gặp ở thử thách này) rơi về `other`.
      expect(picked?.code, code).toBe(mustHaveLine.has(code) ? code : 'other');
    }
  });

  it('mã có trong thẻ ra đúng lời của thẻ (kể cả khi "Nhận xét chung" cũng có mã đó)', () => {
    for (const code of CHALLENGE_DIAGNOSTIC_ORDER[id]) {
      expect(lines[code], code).toBeDefined();
      expect(pickDiagnostic([code], lines, common)?.response, code).toBe(lines[code]);
    }
  });

  it('thứ tự khóa diagnosticLines = CHALLENGE_DIAGNOSTIC_ORDER', () => {
    expect(Object.keys(lines)).toEqual([...CHALLENGE_DIAGNOSTIC_ORDER[id]]);
  });

  it('khi mọi mã cùng khớp: thứ tự lời hiện ra (pickDiagnostic) = thứ tự engine (orderDiagnostics)', () => {
    // Bỏ lần lượt mã vừa hiện, như người chơi sửa từng lỗi một.
    let remaining: DiagnosticCode[] = DIAGNOSTIC_CODES.filter((c) => !isBlocking(c));
    const shown: DiagnosticCode[] = [];
    for (;;) {
      const p = pickDiagnostic(remaining, lines, common);
      if (!p) throw new Error('pickDiagnostic trả null khi vẫn còn mã');
      shown.push(p.code);
      if (p.code === 'other') break;
      remaining = remaining.filter((c) => c !== p.code);
    }
    const all = DIAGNOSTIC_CODES.filter((c) => !isBlocking(c)).map((code) => ({ code, severity: 'error' as const }));
    const engine = orderDiagnostics(id, all)
      .map((d) => d.code)
      .filter((c) => c === 'other' || lines[c] !== undefined || common[c] !== undefined);
    expect(shown).toEqual(engine);
  });
});

describe('Nhận xét chung', () => {
  it('thứ tự khóa (bỏ blocking) = COMMON_DIAGNOSTIC_ORDER (bỏ blocking)', () => {
    expect(Object.keys(common).filter((c) => !isBlocking(c))).toEqual(COMMON_DIAGNOSTIC_ORDER.filter((c) => !isBlocking(c)));
  });

  it('mọi mã blocking (kể cả no-columns, no-value của gói 3) có lời chung, xếp đúng thứ tự engine (QĐ-052)', () => {
    for (const code of BLOCKING_DIAGNOSTIC_CODES) expect(common[code], code).toBeDefined();
    expect(Object.keys(common).filter(isBlocking)).toEqual([...BLOCKING_DIAGNOSTIC_CODES]);
  });

  it('wrong-value có lời chung; thẻ c2 vẫn giữ lời riêng (QĐ-047)', () => {
    const c2 = realContent.challenges.c2.content.diagnosticLines;
    expect(common['wrong-value']).toBeDefined();
    expect(pickDiagnostic(['wrong-value'], c2, common)?.response).toBe(c2['wrong-value']);
    expect(c2['wrong-value']).not.toEqual(common['wrong-value']);
    const c3 = realContent.challenges.c3.content.diagnosticLines;
    expect(pickDiagnostic(['wrong-value'], c3, common)?.response).toBe(common['wrong-value']);
  });

  it('ba lời mới (QĐ-047): giọng Hà Vy, ≤ 20 chữ, không dùng mã thô', () => {
    for (const code of ['no-columns', 'no-value', 'wrong-value'] as const) {
      const r = common[code];
      if (!r || !('line' in r)) throw new Error(`thiếu lời ${code}`);
      expect(r.line.speaker).toBe('ha-vy');
      expect(r.line.text.split(/\s+/).filter(Boolean).length, code).toBeLessThanOrEqual(20);
      expect(r.line.text).not.toMatch(/[a-z]+-[a-z]+/); // không lộ mã kiểu no-value
    }
  });
});
