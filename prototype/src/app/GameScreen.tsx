import { useCallback, useState } from 'react';
import type { LinePick as LinePickContent } from '../debrief/types';
import { LinePick } from '../debrief/ui/LinePick';
import { Projector } from '../debrief/ui/Projector';
import { SqlRecall } from '../debrief/ui/SqlRecall';
import { DocumentReveal } from '../evidence/ui/DocumentReveal';
import { EvidenceNotebook } from '../evidence/ui/EvidenceNotebook';
import { isCharacterId, PART_IDS, type CharacterId, type PartId } from '../shared/ids';
import { gameContent, useGameStore } from '../shared/store';
import { getTelemetryEvents } from '../shared/telemetry/track';
import { DialogBox } from '../shared/ui/DialogBox';
import { MultipleChoice } from '../shared/ui/MultipleChoice';
import { Stage } from '../shared/ui/Stage';
import { TopBar } from '../shared/ui/TopBar';
import { ChallengeScreen } from '../sql-challenge/ui/ChallengeScreen';
import { CharacterDebutSplash } from '../story/ui/CharacterDebutSplash';
import { ExploreScreen } from '../story/ui/ExploreScreen';
import { ObjectionEffect } from '../story/ui/ObjectionEffect';
import type { StoryView } from '../story/engine/state';
import type { Sequence } from '../story/types';
import { EndScreen } from './EndScreen';
import { FacilitatorPanel } from './FacilitatorPanel';
import { isFacilitatorMode } from './facilitator-mode';

import { useVnStore, type SaveSlot } from '../shared/vn/vn-store';
import { BacklogModal } from '../shared/vn/BacklogModal';
import { SaveLoadModal } from '../shared/vn/SaveLoadModal';
import { AudioSettingsModal } from '../shared/audio/AudioSettingsModal';
import { CampusMapModal } from '../story/ui/map/CampusMapModal';

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
  const [seenDebuts, setSeenDebuts] = useState<Set<CharacterId>>(() => new Set());

  // VN Systems Modals State
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load' | null>(null);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const hideUi = useVnStore((s) => s.hideUi);
  const toggleHideUi = useVnStore((s) => s.toggleHideUi);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 2800);
  }, []);

  const handleRestoreSlot = useCallback((slot: SaveSlot) => {
    useGameStore.setState({
      progress: slot.progress,
      evidence: slot.evidence,
    });
  }, []);

  const act = useCallback(
    (action: Parameters<typeof dispatchStory>[0]) => {
      const rejected = dispatchStory(action);
      setLastRejection(rejected ?? null);
    },
    [dispatchStory],
  );
  const advance = useCallback(() => act({ type: 'advance' }), [act]);
  const complete = useCallback(() => act({ type: 'complete' }), [act]);

  const dismissDebut = useCallback((id: CharacterId) => {
    setSeenDebuts((prev) => new Set([...prev, id]));
  }, []);

  // getView đọc từ progress + evidence (đã subscribe ở trên) nên luôn mới.
  const view: StoryView | null = progress ? getView() : null;
  if (!progress || !view) return null;

  const completedParts = PART_IDS.filter((p): p is PartId => progress.partCompletedAt[p] !== undefined);
  const scene = view.sequence?.scene ?? 'clb-room';
  const speakerLine = view.kind === 'line' ? view.node : view.kind === 'feedback' ? view.line : view.kind === 'question' ? view.node.question.asker : null;
  const accessRevoked = progress.flags.includes('access-revoked');
  const facilitator = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);

  // Kích hoạt Character Debut Splash khi nhân vật lần đầu xuất hiện trong hội thoại thông thường
  const spk = speakerLine?.speaker;
  const activeDebut: CharacterId | null =
    view.kind === 'line' && spk && isCharacterId(spk) && !seenDebuts.has(spk) ? spk : null;

  return (
    <div className={`game${activeDebut ? ' game--debut' : ''}${hideUi ? ' game--hide-ui' : ''}`}>
      {/* Thông báo Toast VN */}
      {toastMsg ? <div className="vn-toast" role="status">{toastMsg}</div> : null}

      {/* Lớp phủ khi Ẩn UI để xem cảnh toàn màn hình */}
      {hideUi ? (
        <div className="vn-hide-ui-overlay" onClick={toggleHideUi} title="Bấm để hiện lại giao diện">
          <div className="vn-hide-ui-hint">Giao diện đang ẩn · Bấm chuột hoặc phím H để hiện lại</div>
        </div>
      ) : null}

      {activeDebut ? (
        <CharacterDebutSplash characterId={activeDebut} onDismiss={() => dismissDebut(activeDebut)} />
      ) : null}

      {!hideUi ? (
        <TopBar
          currentPart={progress.currentPart}
          completedParts={completedParts}
          task={progress.task}
          notebookCount={evidence.unlocked.length}
          notebookOpen={notebookOpen}
          onToggleNotebook={() => setNotebookOpen((o) => !o)}
          onReset={resetGame}
          isSample={gameContent.meta.isSample}
          onOpenMap={() => setMapOpen(true)}
          onOpenAudio={() => setAudioModalOpen(true)}
          onOpenSave={() => setSaveLoadMode('save')}
          onOpenLoad={() => setSaveLoadMode('load')}
        />
      ) : null}

      <Stage
        scene={scene}
        part={progress.currentPart}
        sequenceId={progress.cursor.sequenceId}
        speaker={speakerLine?.speaker}
        expression={speakerLine?.expression}
      >
        {!hideUi ? renderView(view) : null}
        {lastRejection && !hideUi ? (
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

      {/* Các Modals Visual Novel */}
      <BacklogModal open={backlogOpen} onClose={() => setBacklogOpen(false)} />

      <SaveLoadModal
        open={saveLoadMode !== null}
        mode={saveLoadMode ?? 'save'}
        onClose={() => setSaveLoadMode(null)}
        progress={progress}
        evidence={evidence}
        scene={scene}
        onRestore={handleRestoreSlot}
        onToast={showToast}
      />

      <CampusMapModal open={mapOpen} onClose={() => setMapOpen(false)} currentScene={scene} />

      <AudioSettingsModal open={audioModalOpen} onClose={() => setAudioModalOpen(false)} />

      {facilitator && !hideUi ? (
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
        return (
          <DialogBox
            line={v.node}
            display={v.node.display}
            onAdvance={advance}
            keyboardEnabled={!notebookOpen && !backlogOpen && saveLoadMode === null && !audioModalOpen && !mapOpen}
            onOpenNotebook={() => setNotebookOpen(true)}
            notebookCount={evidence.unlocked.length}
            onOpenBacklog={() => setBacklogOpen(true)}
            onOpenSave={() => setSaveLoadMode('save')}
            onOpenLoad={() => setSaveLoadMode('load')}
            onOpenAudio={() => setAudioModalOpen(true)}
          />
        );
      case 'feedback': {
        const pick = v.origin === 'line-pick' ? linePickInSequence(v.sequence, v.sourceId) : null;
        return (
          <>
            {pick ? <SqlRecall lines={pick.lines} /> : null}
            <DialogBox
              line={v.line}
              hint={`Phản hồi ${v.index + 1}/${v.total}`}
              onAdvance={advance}
              keyboardEnabled={!notebookOpen && !backlogOpen && saveLoadMode === null && !audioModalOpen && !mapOpen}
              onOpenNotebook={() => setNotebookOpen(true)}
              notebookCount={evidence.unlocked.length}
              onOpenBacklog={() => setBacklogOpen(true)}
              onOpenSave={() => setSaveLoadMode('save')}
              onOpenLoad={() => setSaveLoadMode('load')}
              onOpenAudio={() => setAudioModalOpen(true)}
            />
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
        return <MultipleChoice question={v.node.question} attempts={v.progress.attempts} onChoose={(id) => act({ type: 'choose', choiceId: id })} />;
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
