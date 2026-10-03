import { useState } from 'react';
import { gameContent, useGameStore } from '../shared/store';
import { EMPTY_PRE_DRAFT, resolvePreSurvey, type PreSurveyDraft } from '../shared/telemetry/survey';
import { getTelemetryEvents } from '../shared/telemetry/track';
import { FacilitatorPanel } from './FacilitatorPanel';
import { GameScreen } from './GameScreen';
import { PreSurvey } from './PreSurvey';
import { TitleScreen } from './TitleScreen';
import { isFacilitatorMode } from './facilitator-mode';
import { useVnStore } from '../shared/vn/vn-store';
import { ManChoiMvp } from '../mvp/ui/ManChoiMvp';
import { useKhoMvp } from '../mvp/store/kho-mvp';
import { TieuDeMvp } from '../mvp/ui/TieuDeMvp';

/**
 * Game chính là MVP. Prototype cũ vẫn có thể mở để đối chiếu qua `?prototype=1`.
 */
const CHI_MVP =
  import.meta.env.VITE_CHI_MVP !== '0' && import.meta.env.VITE_PROTOTYPE !== '1' &&
  !(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('prototype') === '1');

export default function App() {
  const progress = useGameStore((s) => s.progress);
  const survey = useGameStore((s) => s.survey);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const submitSurvey = useGameStore((s) => s.submitSurvey);
  const skipSurvey = useGameStore((s) => s.skipSurvey);
  // Màn tiêu đề hiện khi mở ứng dụng, kể cả khi có tiến độ đã lưu (để chọn "Chơi tiếp").
  const [titleDismissed, setTitleDismissed] = useState(false);
  const [preDraft, setPreDraft] = useState<PreSurveyDraft>(EMPTY_PRE_DRAFT);
  // Bản MVP (gói kien-truc-mvp): màn riêng, kho riêng; vào từ nút "Chơi bản MVP", ra bằng menu "Về màn tiêu đề".
  const [mvpMode, setMvpMode] = useState(CHI_MVP);
  // Bản MVP chính: mở app ra màn mở màn (TieuDeMvp) trước, bấm Chơi mới / Chơi tiếp / Nạp mới vào ván.
  const [daVaoMvp, setDaVaoMvp] = useState(false);
  const hasMvpProgress =useKhoMvp((k) => k.trangThai !== null);
  const showTitle = !titleDismissed || progress === null;

  if (mvpMode) {
    if (CHI_MVP && !daVaoMvp) {
      return (
        <TieuDeMvp
          onVao={(moi) => {
            if (moi) {
              useVnStore.getState().clearBacklog();
              useKhoMvp.getState().xoa();
              useKhoMvp.getState().batDau();
            }
            setDaVaoMvp(true);
          }}
        />
      );
    }
    return <ManChoiMvp onVeTieuDe={CHI_MVP ? () => setDaVaoMvp(false) : () => setMvpMode(false)} />;
  }

  /** Ghi khảo sát đầu game vào phiên hiện tại (một lần mỗi phiên): gửi nếu trả lời đủ, không thì bỏ qua. */
  const commitPreSurvey = () => {
    const current = useGameStore.getState().survey;
    if (current.pre !== null || current.preSkipped) return;
    const r = resolvePreSurvey(preDraft);
    if (r.kind === 'submit') submitSurvey('pre', r.answers);
    else skipSurvey('pre');
    setPreDraft(EMPTY_PRE_DRAFT);
  };

  if (showTitle) {
    const preDone = survey.pre !== null || survey.preSkipped;
    const facilitator = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);
    return (
      <>
        <TitleScreen
          title={gameContent.meta.title}
          isSample={gameContent.meta.isSample}
          hasSavedProgress={progress !== null}
          onStart={() => {
            // "Bắt đầu lại" (TitleScreen đã hỏi xác nhận): phiên mới; khảo sát ghi SAU khi đổi phiên.
            const previous = useGameStore.getState().survey;
            if (progress) {
              useVnStore.getState().resetSession();
              resetGame();
            }
            if (progress && (previous.pre !== null || previous.preSkipped)) {
              // Khảo sát đầu đã trả lời/bỏ qua ở phiên cũ (form không hiện nữa) → mang nguyên sang phiên
              // mới thay vì ghi `survey_skipped` giả từ bản nháp rỗng (QĐ-066).
              if (previous.pre !== null) submitSurvey('pre', previous.pre);
              else skipSurvey('pre');
              setPreDraft(EMPTY_PRE_DRAFT);
            } else {
              commitPreSurvey();
            }
            startGame();
            setTitleDismissed(true);
          }}
          onContinue={() => {
            commitPreSurvey();
            setTitleDismissed(true);
          }}
          onStartMvp={CHI_MVP ? undefined : () => setMvpMode(true)}
          hasMvpProgress={hasMvpProgress}
          preSurveySlot={
            preDone && progress !== null ? (
              <p className="survey__note">
                {survey.pre !== null ? 'Bạn đã trả lời khảo sát đầu game. Cảm ơn bạn!' : 'Bạn đã bỏ qua khảo sát đầu game.'}
              </p>
            ) : (
              <PreSurvey value={preDraft} onChange={setPreDraft} />
            )
          }
        />
        {facilitator ? (
          <FacilitatorPanel
            part={progress?.currentPart ?? null}
            sequenceId={progress?.cursor.sequenceId ?? null}
            nodeIndex={progress?.cursor.nodeIndex ?? null}
            viewKind="title"
            eventCount={getTelemetryEvents().length}
            onReset={() => {
              useVnStore.getState().resetSession();
              resetGame();
            }}
          />
        ) : null}
      </>
    );
  }
  return <GameScreen />;
}
