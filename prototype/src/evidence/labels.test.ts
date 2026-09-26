import { describe, expect, it } from 'vitest';
import { sampleContent } from '../content/sample';
import { CLUE_IDS, DOCUMENT_IDS, QUERY_EVIDENCE_IDS } from '../shared/ids';
import { EVIDENCE_FALLBACK_TITLE, evidenceGroup, evidenceTitle } from './labels';

describe('evidence labels: không lộ id thô', () => {
  it('mọi định danh QĐ-033 có tiêu đề từ nội dung mẫu', () => {
    for (const id of [...CLUE_IDS, ...DOCUMENT_IDS, ...QUERY_EVIDENCE_IDS]) {
      const t = evidenceTitle(sampleContent, id);
      expect(t).not.toBe(id);
      expect(t.length).toBeGreaterThan(0);
    }
  });

  it('id lạ hoặc thiếu thẻ → nhãn dự phòng', () => {
    expect(evidenceTitle(sampleContent, 'clue-la')).toBe(EVIDENCE_FALLBACK_TITLE);
    const missing = structuredClone(sampleContent);
    delete (missing.evidence.clues as Partial<typeof missing.evidence.clues>)['clue-signature-h'];
    expect(evidenceTitle(missing, 'clue-signature-h')).toBe(EVIDENCE_FALLBACK_TITLE);
    expect(evidenceGroup('doc-letter')).toBe('document');
    expect(evidenceGroup('x')).toBeNull();
  });
});
