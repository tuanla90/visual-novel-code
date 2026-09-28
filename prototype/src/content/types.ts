/**
 * Gói nội dung đầy đủ của game: mọi thứ runtime, màn hình và bộ kiểm toàn vẹn cần.
 * Nội dung thật: sinh từ prototype/noi-dung/*.md (`npm run noi-dung:sinh` → src/content/generated/,
 * ghép ở src/content/real/index.ts); nội dung MẪU cho test: src/content/sample.
 */
import type { ChallengeId } from '../shared/ids';
import type { EvidenceContent } from '../evidence/types';
import type { ChallengeDefinition, CommonDiagnosticLines, StandardHints } from '../sql-challenge/types';
import type { StoryContent } from '../story/types';

export interface GameContent {
  meta: {
    title: string;
    /** `true` với nội dung mẫu — giao diện hiện nhãn "NỘI DUNG MẪU". */
    isSample: boolean;
    version: string;
  };
  story: StoryContent;
  evidence: EvidenceContent;
  challenges: Record<ChallengeId, ChallengeDefinition>;
  standardHints: StandardHints;
  commonDiagnosticLines: CommonDiagnosticLines;
}
