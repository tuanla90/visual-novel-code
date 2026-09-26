/**
 * Bảng người quan sát (QĐ-030) — chỉ hiện khi URL có `?facilitator=1`; người chơi không thấy.
 * Vị trí hiện tại, số sự kiện, trạng thái lưu, xuất/xóa dữ liệu thử nghiệm (JSON), đặt lại phiên.
 * Props đã chốt; phần telemetry đọc thẳng từ `shared/telemetry`.
 */
import { useState } from 'react';
import { partName } from '../shared/display-names';
import type { PartId } from '../shared/ids';
import { gameContent } from '../shared/store';
import { exportAllTelemetry } from '../shared/telemetry/export-file';
import { clearSessionMeta, getSessionMeta } from '../shared/telemetry/session-meta';
import { EXCEL_OPTIONS, MEMORABLE_OPTIONS, PLAY_NEXT_OPTIONS, SQL_OPTIONS, optionLabel } from '../shared/telemetry/survey';
import { MEASURED_QUESTIONS, formatDuration, summarizeSessions, type SessionSummary } from '../shared/telemetry/summary';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import { getTelemetryStorageStatus, useTelemetryVersion } from '../shared/telemetry/use-telemetry';
import { ConfirmDialog } from '../shared/ui/ConfirmDialog';
import { challengeTitle, choiceText, formatClock, pickedLineText, storageMessage, viewLabel } from './facilitator-mode';

export interface FacilitatorPanelProps {
  part: PartId | null;
  sequenceId: string | null;
  nodeIndex: number | null;
  viewKind: string | null;
  eventCount: number;
  onReset: () => void;
}

export function FacilitatorPanel({ part, sequenceId, nodeIndex, viewKind, eventCount, onReset }: FacilitatorPanelProps) {
  useTelemetryVersion(); // vẽ lại khi có sự kiện mới / xóa / đổi phiên
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<'clear' | 'reset' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const events = getTelemetryEvents();
  const sessionId = getSessionId();
  const sessionIds = [...new Set(events.map((e) => e.sessionId))];
  const currentCount = events.filter((e) => e.sessionId === sessionId).length;
  const status = getTelemetryStorageStatus();
  const storage = storageMessage(status);
  const hasUnreadable = (status?.unreadableSessions ?? 0) > 0;
  const partText = part ? `${partName(part)} (${part})` : 'Chưa bắt đầu';
  const viewText = viewKind ? `${viewLabel(viewKind)} (${viewKind})` : '—';
  const summaries = open ? summarizeSessions(events, getSessionMeta()) : [];

  const exportNow = () => {
    const name = exportAllTelemetry();
    setNotice(name ? `Đã tạo tệp ${name}.` : 'Trình duyệt không cho tải tệp về. Thử trình duyệt khác.');
  };

  return (
    <aside className={`facilitator${open ? ' facilitator--open' : ''}`} aria-label="Bảng người quan sát">
      <div className="facilitator__bar">
        <p className="facilitator__brief">
          <strong>Người quan sát</strong> · {part ? partName(part) : 'Chưa bắt đầu'} · {viewKind ? viewLabel(viewKind) : '—'} · {currentCount} sự kiện
        </p>
        <button
          type="button"
          className="btn facilitator__toggle"
          aria-expanded={open}
          aria-controls="facilitator-body"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Thu gọn bảng' : 'Mở bảng'}
        </button>
      </div>

      {open ? (
        <div id="facilitator-body" className="facilitator__body">
          <section aria-labelledby="fac-pos">
            <h2 id="fac-pos" className="facilitator__h">
              Vị trí hiện tại
            </h2>
            <dl className="facilitator__grid">
              <dt>Phần</dt>
              <dd>{partText}</dd>
              <dt>Chuỗi</dt>
              <dd className="mono">{sequenceId ?? '—'}</dd>
              <dt>Node</dt>
              <dd className="mono">{nodeIndex ?? '—'}</dd>
              <dt>Màn</dt>
              <dd>{viewText}</dd>
              <dt>Phiên</dt>
              <dd>
                <span className="mono">{sessionId.slice(0, 8)}</span> · {currentCount} sự kiện
              </dd>
              <dt>Tất cả</dt>
              <dd>
                {sessionIds.length} phiên · {Math.max(eventCount, events.length)} sự kiện
              </dd>
            </dl>
            <p className={`facilitator__storage facilitator__storage--${storage.tone}`} role={storage.tone === 'error' ? 'alert' : undefined}>
              {storage.text}
              {status && status.unreadableSessions > 0 ? ` Có ${status.unreadableSessions} phiên hỏng không đọc được (bỏ qua).` : ''}
            </p>
          </section>

          <section aria-labelledby="fac-data" className="facilitator__section">
            <h2 id="fac-data" className="facilitator__h">
              Dữ liệu thử nghiệm
            </h2>
            <div className="facilitator__actions">
              <button type="button" className="btn btn--primary" onClick={exportNow} disabled={events.length === 0}>
                Xuất dữ liệu thử nghiệm (JSON)
              </button>
              <button type="button" className="btn" onClick={() => setConfirm('clear')} disabled={events.length === 0 && !hasUnreadable}>
                Xóa dữ liệu thử nghiệm
              </button>
              <button type="button" className="btn" onClick={() => setConfirm('reset')}>
                Đặt lại phiên
              </button>
            </div>
            {events.length === 0 ? <p className="facilitator__muted">Chưa có phiên nào trong trình duyệt này.</p> : null}
            {notice ? (
              <p className="facilitator__muted" role="status">
                {notice}
              </p>
            ) : null}
          </section>

          {summaries.length > 0 ? (
            <section aria-labelledby="fac-sum" className="facilitator__section">
              <h2 id="fac-sum" className="facilitator__h">
                Tóm tắt chỉ số §10 theo phiên ({summaries.length})
              </h2>
              {[...summaries].reverse().map((sum) => (
                <SessionCard key={sum.sessionId} summary={sum} current={sum.sessionId === sessionId} />
              ))}
            </section>
          ) : null}
        </div>
      ) : null}

      <ConfirmDialog
        open={confirm === 'clear'}
        title="Xóa dữ liệu thử nghiệm?"
        message={`Xóa ${events.length} sự kiện của ${sessionIds.length} phiên khỏi trình duyệt này. Hãy xuất JSON trước. Không thể hoàn tác.`}
        confirmLabel="Xóa dữ liệu"
        onConfirm={() => {
          setConfirm(null);
          clearTelemetry();
          clearSessionMeta();
          setNotice('Đã xóa dữ liệu thử nghiệm trong trình duyệt này.');
        }}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        open={confirm === 'reset'}
        title="Đặt lại phiên?"
        message="Xóa tiến độ chơi hiện tại và quay về màn tiêu đề với một phiên mới. Dữ liệu thử nghiệm đã ghi vẫn giữ nguyên."
        confirmLabel="Đặt lại phiên"
        onConfirm={() => {
          setConfirm(null);
          setNotice(null);
          onReset();
        }}
        onCancel={() => setConfirm(null)}
      />
    </aside>
  );
}

function yesNo(v: boolean | null): string {
  return v === null ? '—' : v ? 'Có' : 'Không';
}

function preText(s: SessionSummary): string {
  if (s.pre.status === 'skipped') return 'Bỏ qua';
  if (s.pre.status === 'none') return 'Chưa có';
  return `Excel: ${optionLabel(EXCEL_OPTIONS, s.pre.excelLevel)} · SQL: ${optionLabel(SQL_OPTIONS, s.pre.sqlBefore)}`;
}

function postText(s: SessionSummary): string {
  if (s.post.status === 'skipped') return 'Bỏ qua';
  if (s.post.status === 'none') return 'Chưa có';
  const memorable = s.post.memorable.map((m) => optionLabel(MEMORABLE_OPTIONS, m)).join(', ') || '(không chọn)';
  const annoying = s.post.annoying ? optionLabel(MEMORABLE_OPTIONS, s.post.annoying) : 'không có / không chọn';
  return `Chơi tiếp: ${optionLabel(PLAY_NEXT_OPTIONS, s.post.playNext)} · Đáng nhớ: ${memorable} · Phản bác trong 2 phần đáng nhớ: ${yesNo(
    s.post.rebutInTop2,
  )} · Khó chịu: ${annoying}`;
}

function SessionCard({ summary: s, current }: { summary: SessionSummary; current: boolean }) {
  const status = s.completed ? `Hoàn thành · ${formatDuration(s.gameDurationMs)}` : s.reset ? 'Đã đặt lại, chưa hoàn thành' : 'Chưa hoàn thành';
  const challenges = s.challenges.filter((c) => c.started || c.runs > 0 || c.skippedByJump);
  const picks = Object.entries(s.firstLinePicks);
  return (
    <details className={`facilitator__session${s.jumped ? ' facilitator__session--jumped' : ''}`} open={current}>
      <summary>
        <span className="mono">{s.sessionId.slice(0, 8)}</span> · {formatClock(s.firstAt)} · {status}
        {current ? ' · phiên hiện tại' : ''}
        {s.jumped ? <strong className="facilitator__flag"> · CÓ NHẢY PHẦN</strong> : null}
      </summary>
      {s.jumped ? (
        <p className="facilitator__note">
          Có nhảy phần (tới {s.jumpTargets.map((p) => partName(p)).join(', ')}): {s.autoEventCount} sự kiện do game tự chơi đã bị loại khỏi số liệu.
          Không dùng phiên này cho tỷ lệ §10.
        </p>
      ) : null}
      <dl className="facilitator__grid">
        <dt>Hoàn thành game</dt>
        <dd>
          {yesNo(s.completed)}
          {s.within35Min !== null ? ` · trong 35 phút: ${yesNo(s.within35Min)}` : ''}
        </dd>
        <dt>Khảo sát đầu</dt>
        <dd>{preText(s)}</dd>
        <dt>Khảo sát cuối</dt>
        <dd>{postText(s)}</dd>
        {MEASURED_QUESTIONS.map((q) => {
          const c = s.firstChoices[q];
          return [
            <dt key={`${q}-t`}>
              Lựa chọn đầu <span className="mono">{q}</span>
            </dt>,
            <dd key={`${q}-d`}>
              {c ? (
                <>
                  <strong>{c.correct ? 'Đúng' : 'Sai'}</strong> · <span className="mono">{c.choiceId}</span> — {choiceText(gameContent, q, c.choiceId)}
                </>
              ) : (
                'Chưa trả lời'
              )}
            </dd>,
          ];
        })}
        {picks.map(([pickId, p]) => [
          <dt key={`${pickId}-t`}>
            Chọn dòng đầu <span className="mono">{pickId}</span>
          </dt>,
          <dd key={`${pickId}-d`}>
            {p ? (
              <>
                <strong>{p.correct ? 'Đúng' : 'Sai'}</strong> · dòng {p.lineIndex}: <span className="mono">{pickedLineText(gameContent, pickId, p.lineIndex)}</span>
              </>
            ) : (
              'Không tính (game tự chọn khi nhảy phần)'
            )}
          </dd>,
        ])}
        <dt>Mở Hồ sơ</dt>
        <dd>{s.notebookOpens} lần</dd>
      </dl>
      <table className="facilitator__table">
        <caption>Thời gian từng phần</caption>
        <thead>
          <tr>
            <th scope="col">Phần</th>
            <th scope="col">Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {s.parts.map((p) => (
            <tr key={p.part}>
              <th scope="row">{partName(p.part)}</th>
              <td>{p.skippedByJump ? 'Nhảy qua' : p.durationMs !== null ? formatDuration(p.durationMs) : p.started ? 'Đang chơi' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {challenges.length > 0 ? (
        <table className="facilitator__table">
          <caption>Thử thách (lỗi CP/LG = cú pháp/logic)</caption>
          <thead>
            <tr>
              <th scope="col">Thử thách</th>
              <th scope="col">Chạy</th>
              <th scope="col">Lỗi CP/LG</th>
              <th scope="col">Gợi ý</th>
              <th scope="col">Đến lần chạy đầu</th>
              <th scope="col">Hoàn thành</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => (
              <tr key={c.challengeId}>
                <th scope="row">
                  {challengeTitle(gameContent, c.challengeId)} <span className="mono">({c.challengeId})</span>
                </th>
                <td>{c.runs}</td>
                <td>
                  {c.syntaxErrors}/{c.logicErrors}
                </td>
                <td>{c.hints}</td>
                <td>{formatDuration(c.msToFirstRun)}</td>
                <td>{c.skippedByJump ? 'Nhảy qua' : c.completed ? formatDuration(c.durationMs) : 'Chưa'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="facilitator__muted">Chưa mở thử thách nào.</p>
      )}
    </details>
  );
}
