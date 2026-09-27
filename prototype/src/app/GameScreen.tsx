/**
 * Màn chơi: thanh trên + sân khấu + khung nhìn hiện tại của runtime. Mỗi loại khung nhìn
 * ánh xạ sang một component (thật hoặc stub với props đã chốt).
 */
import { useCallback, useState } from 'react';
import type { LinePick as LinePickContent } from '../debrief/types';
import { LinePick } from '../debrief/ui/LinePick';
import { Projector } from '../debrief/ui/Projector';
import { SqlRecall } from '../debrief/ui/SqlRecall';
import { DocumentReveal } from '../evidence/ui/DocumentReveal';
import { EvidenceNotebook } from '../evidence/ui/EvidenceNotebook';
import { PART_IDS, type PartId } from '../shared/ids';
import { gameContent, useGameStore } from '../shared/store';
import { getTelemetryEvents } from '../shared/telemetry/track';
import { DialogBox } from '../shared/ui/DialogBox';
import { MultipleChoice } from '../shared/ui/MultipleChoice';
import { Stage } from '../shared/ui/Stage';
import { TopBar } from '../shared/ui/TopBar';
import { ChallengeScreen } from '../sql-challenge/ui/ChallengeScreen';
import { ExploreScreen } from '../story/ui/ExploreScreen';
import { ObjectionEffect } from '../story/ui/ObjectionEffect';
import type { StoryView } from '../story/engine/state';
import type { Sequence } from '../story/types';
import { EndScreen } from './EndScreen';
import { FacilitatorPanel } from './FacilitatorPanel';
import { isFacilitatorMode } from './facilitator-mode';

/** Màn chọn dòng có id `pickId` trong chuỗi đang đứng (phản hồi chọn dòng luôn ở cùng chuỗi). */
function linePickInSequence(sequence: Sequence | null, pickId: string): LinePickContent | null {
  for (const node of sequence?.nodes ?? []) {
    if (node.type === 'line-pick' && node.pick.id === pickId) return node.pick;
  }
  return null;
}

export function GameScreen() {
  const progress = useGameStore((s) => s.progress);
  const evidence = useGameStore((s) => s.evidence);
  const survey = useGameStore((s) => s.survey);
  const dispatchStory = useGameStore((s) => s.dispatchStory);
  const getView = useGameStore((s) => s.getView);
  const resetGame = useGameStore((s) => s.resetGame);
  const skipSurvey = useGameStore((s) => s.skipSurvey);
  const submitPostSurvey = useGameStore((s) => s.submitPostSurvey);

  const [notebookOpen, setNotebookOpen] = useState(false);
  const [lastRejection, setLastRejection] = useState<string | null>(null);

  const act = useCallback(
    (action: Parameters<typeof dispatchStory>[0]) => {
      const rejected = dispatchStory(action);
      setLastRejection(rejected ?? null);
    },
    [dispatchStory],
  );
  const advance = useCallback(() => act({ type: 'advance' }), [act]);
  const complete = useCallback(() => act({ type: 'complete' }), [act]);

  // getView đọc từ progress + evidence (đã subscribe ở trên) nên luôn mới.
  const view: StoryView | null = progress ? getView() : null;
  if (!progress || !view) return null;

  const completedParts = PART_IDS.filter((p): p is PartId => progress.partCompletedAt[p] !== undefined);
  const scene = view.sequence?.scene ?? 'clb-room';
  const speakerLine = view.kind === 'line' ? view.node : view.kind === 'feedback' ? view.line : view.kind === 'question' ? view.node.question.asker : null;
  const accessRevoked = progress.flags.includes('access-revoked');
  // Khóa nhớ thứ tự lựa chọn của phiên chơi (QĐ-041/QĐ-066): chơi lại từ đầu → giá trị mới → xáo mới.
  const gameKey = progress.startedAt;
  const facilitator = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);

  return (
    <div className="game">
      <TopBar
        currentPart={progress.currentPart}
        completedParts={completedParts}
        task={progress.task}
        notebookCount={evidence.unlocked.length}
        notebookOpen={notebookOpen}
        onToggleNotebook={() => setNotebookOpen((o) => !o)}
        onReset={resetGame}
        isSample={gameContent.meta.isSample}
      />
      <Stage scene={scene} speaker={speakerLine?.speaker} expression={speakerLine?.expression}>
        {renderView(view)}
        {lastRejection ? (
          <p className="game__rejection" role="status">
            {lastRejection}
          </p>
        ) : null}
      </Stage>
      <EvidenceNotebook
        open={notebookOpen}
        onClose={() => setNotebookOpen(false)}
        content={gameContent}
        part={progress.currentPart}
        unlocked={evidence.unlocked}
        savedQueries={evidence.savedQueries}
        annotations={evidence.annotations}
      />
      {facilitator ? (
        <FacilitatorPanel
          part={progress.currentPart}
          sequenceId={progress.cursor.sequenceId}
          nodeIndex={progress.cursor.nodeIndex}
          viewKind={view.kind}
          eventCount={getTelemetryEvents().length}
          onReset={resetGame}
        />
      ) : null}
    </div>
  );

  function renderView(v: StoryView) {
    switch (v.kind) {
      case 'line':
        return <DialogBox line={v.node} display={v.node.display} onAdvance={advance} keyboardEnabled={!notebookOpen} />;
      case 'feedback': {
        // QĐ-061-Đ1: phản hồi của lần chọn dòng sai → câu SQL của Quân vẫn hiện (chỉ đọc) phía trên hộp thoại.
        const pick = v.origin === 'line-pick' ? linePickInSequence(v.sequence, v.sourceId) : null;
        return (
          <>
            {pick ? <SqlRecall lines={pick.lines} /> : null}
            <DialogBox line={v.line} hint={`Phản hồi ${v.index + 1}/${v.total}`} onAdvance={advance} keyboardEnabled={!notebookOpen} />
          </>
        );
      }
      case 'explore':
        return (
          <ExploreScreen
            hotspots={v.hotspots}
            gate={v.gate}
            content={gameContent}
            onInspect={(id) => act({ type: 'inspect', hotspotId: id })}
            onProceed={() => act({ type: 'proceed' })}
          />
        );
      case 'gate':
        return (
          <div className="gate">
            {v.gate.satisfied ? (
              <button type="button" className="btn btn--primary" onClick={() => act({ type: 'proceed' })} autoFocus>
                {v.gate.buttonLabel}
              </button>
            ) : (
              <p className="explore__missing">Hồ sơ còn thiếu {v.gate.missing.length} mục để đi tiếp.</p>
            )}
          </div>
        );
      case 'question':
        return (
          <MultipleChoice
            question={v.node.question}
            attempts={v.progress.attempts}
            gameKey={gameKey}
            onChoose={(id) => act({ type: 'choose', choiceId: id })}
          />
        );
      case 'line-pick':
        return <LinePick pick={v.node.pick} attempts={v.progress.attempts} onPick={(i) => act({ type: 'pick-line', lineIndex: i })} />;
      case 'show-document':
        return <DocumentReveal document={gameContent.evidence.documents[v.node.documentId]} onClose={complete} />;
      case 'challenge':
      case 'fix-query':
        return (
          <ChallengeScreen
            challengeId={v.node.challengeId}
            definition={gameContent.challenges[v.node.challengeId]}
            mode={v.kind}
            accessRevoked={accessRevoked}
            onComplete={complete}
          />
        );
      case 'effect':
        return <ObjectionEffect effectId={v.node.effectId} onDone={complete} />;
      case 'projector':
        return (
          <Projector
            spec={v.node.projector}
            evidence={v.node.projector.source.kind === 'evidence' ? evidence.savedQueries[v.node.projector.source.evidenceId] : undefined}
            onClose={complete}
          />
        );
      case 'end':
        return (
          <EndScreen
            onSubmitSurvey={submitPostSurvey}
            onSkipSurvey={() => skipSurvey('post')}
            onReplay={resetGame}
            surveyDone={survey.post !== null || survey.postSkipped}
          />
        );
      case 'error':
        return (
          <div className="game__error" role="alert">
            <p>Nội dung không nhất quán: {v.message}</p>
            <p>Chạy bộ kiểm toàn vẹn (npm test) để tìm lỗi; hoặc chọn "Chơi lại từ đầu".</p>
          </div>
        );
    }
  }
}
