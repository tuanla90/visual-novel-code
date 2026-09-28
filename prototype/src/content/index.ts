/**
 * Nội dung đang dùng của ứng dụng: nội dung THẬT (src/content/real — ghép dữ liệu SINH từ
 * prototype/noi-dung/*.md, xem src/content/generated/, gói 12a-2). Nội dung mẫu (src/content/sample) vẫn giữ
 * cho test của các gói khác, import trực tiếp từ './sample'.
 */
import { realContent } from './real';
import type { GameContent } from './types';

export const activeContent: GameContent = realContent;
export type { GameContent } from './types';
