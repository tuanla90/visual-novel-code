/**
 * Màn thử thách (gói 4 `trinh-dung-ui`) — và màn sửa truy vấn của Quân (`mode: 'fix-query'`), cùng props.
 *
 * Hợp đồng: màn này tự gọi store (openChallenge/updateChallenge/recordRun/useHint/completeChallenge)
 * qua `challengeId`, rồi gọi `onComplete()` sau khi vật chứng đã lưu để runtime đi tiếp.
 */
import './challenge.css';
import { useCallback, useEffect } from 'react';
import type { ChallengeId } from '../../shared/ids';
import { useGameStore } from '../../shared/store';
import { modelToSql } from '../engine';
import type { TableName } from '../schema';
import type { ChallengeDefinition, QueryModel } from '../types';
import { QueryBuilder } from './QueryBuilder';
import { SqlCode } from './SqlCode';

export interface ChallengeScreenProps {
  challengeId: ChallengeId;
  definition: ChallengeDefinition | undefined;
  /** `fix-query`: trình dựng nạp sẵn truy vấn của Quân (debrief-fix). */
  mode: 'challenge' | 'fix-query';
  /** Đã hết quyền xem dữ liệu (end-03) — trình dựng bị khóa. */
  accessRevoked: boolean;
  onComplete: () => void;
}

export function ChallengeScreen({ challengeId, definition, mode, accessRevoked, onComplete: _onComplete }: ChallengeScreenProps) {
  const openChallenge = useGameStore((s) => s.openChallenge);
  const updateChallenge = useGameStore((s) => s.updateChallenge);
  const state = useGameStore((s) => s.challenges[challengeId]);

  useEffect(() => {
    openChallenge(challengeId);
  }, [challengeId, openChallenge]);

  const setModel = useCallback(
    (model: QueryModel) => updateChallenge(challengeId, { model, sql: modelToSql(model) }),
    [challengeId, updateChallenge],
  );

  const onPreview = useCallback((_table: TableName) => {
    // Nhóm sau: hiện 5 dòng đầu trong khung kết quả.
  }, []);

  if (!definition) {
    return (
      <div className="chal" role="region" aria-label="Thử thách">
        <div className="chal__left">
          <div className="chal-card chal-head">
            <h2 className="chal-head__title">Thử thách chưa có nội dung</h2>
            <p className="chal-head__prompt">Thẻ thử thách này chưa được viết trong nội dung.</p>
          </div>
        </div>
      </div>
    );
  }
  const { content } = definition;
  if (!state) return null;

  const model = state.model;
  const sql = modelToSql(model);
  const locked = accessRevoked;

  return (
    <div className="chal" role="region" aria-labelledby="chal-title">
      <div className="chal__left">
        <header className="chal-card chal-head">
          <h2 id="chal-title" className="chal-head__title">
            {mode === 'fix-query' ? <span className="chal-head__tag">Sửa truy vấn</span> : null}
            {content.title}
          </h2>
          <p className="chal-head__prompt">{content.prompt}</p>
        </header>

        {locked ? (
          <p className="chal-locked" role="status">
            Quyền xem dữ liệu của CLB đã kết thúc, nên trình dựng bị khóa: không chọn, không chạy được truy vấn nữa.
          </p>
        ) : null}

        <section className="chal-card chal-builder" aria-label="Trình dựng truy vấn">
          <QueryBuilder
            model={model}
            onChange={setModel}
            guided={null}
            disabled={locked}
            onPreview={onPreview}
            whereRow={<p className="qb-empty">Chưa có điều kiện lọc — lúc này truy vấn lấy mọi dòng của bảng.</p>}
          />
        </section>

        <section className="chal-card chal-result" aria-label="Kết quả">
          <p className="qb-empty">Chưa chạy truy vấn nào.</p>
        </section>
      </div>

      <aside className="chal__right" aria-label="Câu SQL và trợ giúp">
        <section className="chal-sql" aria-labelledby="chal-sql-title">
          <div className="chal-sql__head">
            <h3 id="chal-sql-title" className="chal-sql__title">
              Câu SQL tương ứng
            </h3>
          </div>
          <SqlCode sql={sql} label="Câu SQL sinh từ trình dựng" />
        </section>
      </aside>
    </div>
  );
}
