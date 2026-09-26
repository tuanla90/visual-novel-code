/**
 * Nội dung đang dùng của ứng dụng. Gói `noi-dung` (gói 5) đổi `activeContent` sang nội dung
 * thật (src/content/real/…) — đây là chỗ DUY NHẤT cần đổi.
 */
import { sampleContent } from './sample';
import type { GameContent } from './types';

export const activeContent: GameContent = sampleContent;
export type { GameContent } from './types';
