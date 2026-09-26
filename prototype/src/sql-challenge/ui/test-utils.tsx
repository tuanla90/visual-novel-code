/**
 * Tiện ích test cho màn thử thách: đặt lại store thật (nội dung thật) + telemetry trong bộ nhớ,
 * render màn với định nghĩa thật của thử thách.
 */
import { render } from '@testing-library/react';
import { gameContent, useGameStore } from '../../shared/store';
import { initialGameData } from '../../shared/store/store';
import { clearTelemetry } from '../../shared/telemetry/track';
import type { ChallengeId, EvidenceId } from '../../shared/ids';
import type { SavedQueryEvidence } from '../../evidence/types';
import { ChallengeScreen } from './ChallengeScreen';

export function resetGame(unlocked: EvidenceId[] = []): void {
  useGameStore.setState({ ...initialGameData() });
  for (const id of unlocked) useGameStore.getState().unlockEvidence(id);
  clearTelemetry();
}

export function saveEvidence(ev: SavedQueryEvidence): void {
  useGameStore.getState().saveQueryEvidence(ev);
}

export function renderChallenge(
  challengeId: ChallengeId,
  options: { mode?: 'challenge' | 'fix-query'; accessRevoked?: boolean; onComplete?: () => void } = {},
) {
  return render(
    <ChallengeScreen
      challengeId={challengeId}
      definition={gameContent.challenges[challengeId]}
      mode={options.mode ?? 'challenge'}
      accessRevoked={options.accessRevoked ?? false}
      onComplete={options.onComplete ?? (() => {})}
    />,
  );
}

export function challengeState(id: ChallengeId) {
  return useGameStore.getState().challenges[id];
}
