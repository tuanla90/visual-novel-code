/**
 * STUB — gói `trinh-dung-ui` (gói 4) thay bằng màn thử thách thật (trình dựng + SQL song song +
 * bảng kết quả + gợi ý + câu đọc kết quả + "Lưu vào hồ sơ"). Props đã chốt.
 *
 * Hợp đồng: màn này tự gọi store (openChallenge/updateChallenge/recordRun/useHint/completeChallenge)
 * qua `challengeId`, rồi gọi `onComplete()` sau khi vật chứng đã lưu để runtime đi tiếp.
 */
import { useEffect } from 'react';
import type { ChallengeId } from '../../shared/ids';
import { useGameStore } from '../../shared/store';
import type { ChallengeDefinition } from '../types';

export interface ChallengeScreenProps {
  challengeId: ChallengeId;
  definition: ChallengeDefinition | undefined;
  /** `fix-query`: trình dựng nạp sẵn truy vấn của Quân (debrief-fix). */
  mode: 'challenge' | 'fix-query';
  /** Đã hết quyền xem dữ liệu (end-03) — trình dựng bị khóa. */
  accessRevoked: boolean;
  onComplete: () => void;
}

export function ChallengeScreen({ challengeId, definition, mode, accessRevoked, onComplete }: ChallengeScreenProps) {
  const openChallenge = useGameStore((s) => s.openChallenge);
  const completeChallenge = useGameStore((s) => s.completeChallenge);
  const state = useGameStore((s) => s.challenges[challengeId]);

  useEffect(() => {
    openChallenge(challengeId);
  }, [challengeId, openChallenge]);

  const finish = (): void => {
    if (!definition) return;
    // Stub: lưu vật chứng giữ chỗ (không có dữ liệu thật — gói sql-engine/trinh-dung-ui thay).
    completeChallenge(challengeId, {
      id: definition.content.evidence.id,
      challengeId,
      sql: definition.spec.referenceSql,
      columns: [],
      rows: [],
      rowCount: 0,
      savedAt: Date.now(),
      ...(mode === 'fix-query' ? { before: { sql: state?.sql ?? '', rowCount: 0 } } : {}),
    });
    onComplete();
  };

  return (
    <div className="stub stub--challenge" role="region" aria-labelledby="challenge-title">
      <p className="stub__tag">{mode === 'fix-query' ? 'Màn sửa truy vấn (stub — gói giai-trinh-ui)' : 'Màn thử thách (stub — gói trinh-dung-ui)'}</p>
      <h2 id="challenge-title" className="stub__title">
        {definition?.content.title ?? 'Thử thách chưa có nội dung'}
      </h2>
      {definition ? <p>{definition.content.prompt}</p> : <p>Thẻ thử thách này chưa được viết trong nội dung.</p>}
      {accessRevoked ? <p className="stub__warn">Quyền xem dữ liệu đã hết; trình dựng bị khóa.</p> : null}
      {state ? (
        <p className="stub__meta">
          Chế độ: {state.mode === 'builder' ? 'trình dựng' : 'gõ SQL'} · lần chạy: {state.runs} · gợi ý đã mở: {state.hintLevel}/3 · phép nối:{' '}
          {state.model.connector ?? 'chưa chọn'}
        </p>
      ) : null}
      <button type="button" className="btn btn--primary" onClick={finish} disabled={!definition || accessRevoked} autoFocus>
        Tiếp tục (stub)
      </button>
    </div>
  );
}
