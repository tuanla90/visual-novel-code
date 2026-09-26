/** NỘI DUNG MẪU — gom thành một GameContent để chạy thử trọn luồng. */
import type { GameContent } from '../types';
import { sampleChallenges, sampleCommonDiagnosticLines, sampleStandardHints } from './challenges.sample';
import { sampleEvidence } from './evidence.sample';
import { sampleStory } from './story.sample';

export const sampleContent: GameContent = {
  meta: { title: 'CLB Thám Tử Dữ Liệu', isSample: true, version: 'sample-0.1' },
  story: sampleStory,
  evidence: sampleEvidence,
  challenges: sampleChallenges,
  standardHints: sampleStandardHints,
  commonDiagnosticLines: sampleCommonDiagnosticLines,
};
