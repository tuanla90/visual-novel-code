/**
 * NỘI DUNG THẬT — chuyển nguyên văn từ docs/kich-ban-prototype.md (gói 5 `noi-dung`).
 * Kịch bản là nguồn duy nhất: muốn đổi chữ thì sửa kịch bản trước, rồi chép lại; test trung thành
 * (faithfulness.test.ts) so hai chiều từng ký tự.
 */
import type { GameContent } from '../types';
import { realChallenges, realCommonDiagnosticLines, realStandardHints } from './challenges';
import { realEvidence } from './evidence';
import { realStory } from './story';

export const realContent: GameContent = {
  // Tên game: phần trước " — " của tiêu đề kịch bản ("# CLB Thám Tử Dữ Liệu — Kịch bản prototype v0.1").
  meta: { title: 'CLB Thám Tử Dữ Liệu', isSample: false, version: 'kich-ban-prototype-v0.1' },
  story: realStory,
  evidence: realEvidence,
  challenges: realChallenges,
  standardHints: realStandardHints,
  commonDiagnosticLines: realCommonDiagnosticLines,
};
