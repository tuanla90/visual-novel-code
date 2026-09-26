/**
 * Nội dung đang dùng của ứng dụng: nội dung THẬT (src/content/real, chép nguyên văn
 * docs/kich-ban-prototype.md — gói 5 `noi-dung`). Nội dung mẫu (src/content/sample) vẫn giữ cho
 * test của các gói khác, import trực tiếp từ './sample'.
 */
import { realContent } from './real';
import type { GameContent } from './types';

export const activeContent: GameContent = realContent;
export type { GameContent } from './types';
