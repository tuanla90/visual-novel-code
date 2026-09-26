/**
 * Tên hiển thị của mục Hồ sơ từ nội dung; thiếu → nhãn dự phòng, không lộ id thô.
 */
import type { GameContent } from '../content/types';
import { isClueId, isDocumentId, isQueryEvidenceId } from '../shared/ids';
import type { EvidenceGroup } from './types';

export const EVIDENCE_FALLBACK_TITLE = 'Mục hồ sơ';

export const EVIDENCE_GROUP_LABELS: Record<EvidenceGroup, string> = {
  clue: 'Manh mối',
  document: 'Tài liệu',
  query: 'Kết quả truy vấn',
};

export function evidenceGroup(id: string): EvidenceGroup | null {
  if (isClueId(id)) return 'clue';
  if (isDocumentId(id)) return 'document';
  if (isQueryEvidenceId(id)) return 'query';
  return null;
}

export function evidenceTitle(content: GameContent, id: string): string {
  if (isClueId(id)) return content.evidence.clues[id]?.title ?? EVIDENCE_FALLBACK_TITLE;
  if (isDocumentId(id)) return content.evidence.documents[id]?.title ?? EVIDENCE_FALLBACK_TITLE;
  if (isQueryEvidenceId(id)) {
    for (const def of Object.values(content.challenges)) {
      if (def.content.evidence.id === id) return def.content.evidence.title;
    }
  }
  return EVIDENCE_FALLBACK_TITLE;
}
