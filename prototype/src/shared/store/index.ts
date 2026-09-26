/** Store của ứng dụng, gắn với nội dung đang dùng. Component dùng `useGameStore`. */
import { activeContent } from '../../content';
import { createGameStore } from './store';

export const useGameStore = createGameStore({ content: activeContent });
export const gameContent = activeContent;

export type { ChallengeState, ChallengeStatus, GameActions, GameData, GameStore, SurveyState } from './store';
