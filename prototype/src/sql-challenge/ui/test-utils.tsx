/**
 * Tiện ích test cho màn thử thách: đặt lại store thật (nội dung thật) + telemetry trong bộ nhớ,
 * render màn với định nghĩa thật của thử thách.
 */
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { gameContent, useGameStore } from '../../shared/store';
import { initialGameData } from '../../shared/store/store';
import { clearTelemetry, getTelemetryEvents } from '../../shared/telemetry/track';
import type { TelemetryEvent } from '../../shared/telemetry/events';
import type { ChallengeId, EvidenceId } from '../../shared/ids';
import type { SavedQueryEvidence } from '../../evidence/types';
import { modelToSql } from '../engine';
import type { QueryModel } from '../types';
import { ChallengeScreen } from './ChallengeScreen';

// Test tích hợp chạy engine thật (sql.js) + store thật: chạy riêng mất < 1 giây mỗi test, nhưng khi cả bộ
// test chạy song song trên máy yếu có thể vượt mức mặc định 5 giây → nới cho mọi tệp dùng tiện ích này.
vi.setConfig({ testTimeout: 20_000 });

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

/** Mở thử thách trong store rồi đặt sẵn model (như người chơi đã dựng) trước khi render. */
export function presetModel(id: ChallengeId, model: QueryModel): void {
  const s = useGameStore.getState();
  s.openChallenge(id);
  s.updateChallenge(id, { model, sql: modelToSql(model) });
}

export const C1_CORRECT: QueryModel = {
  table: 'sinh_vien',
  columns: ['ma_sv', 'ho_dem', 'ten'],
  conditions: [{ id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } }],
  connector: null,
};

export function c3Model(connector: 'AND' | 'OR' | null): QueryModel {
  return {
    table: 'sinh_vien',
    columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
    conditions: [
      { id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } },
      { id: 'cond-2', column: 'ma_lop', op: 'in', value: ['KT24A', 'QT24B'], source: { kind: 'evidence', evidenceId: 'ev-c2-classes-b' } },
      { id: 'cond-3', column: 'clb', op: 'eq', value: 'Báo chí', source: { kind: 'clue', clueId: 'clue-bookmark-baochi' } },
    ],
    connector,
  };
}

export function eventsOf<T extends TelemetryEvent['type']>(type: T): Extract<TelemetryEvent, { type: T }>[] {
  return getTelemetryEvents().filter((e): e is Extract<TelemetryEvent, { type: T }> => e.type === type);
}
