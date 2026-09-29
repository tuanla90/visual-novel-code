import { useCallback, useEffect, useRef, useState } from 'react';
import type { LinePick as LinePickContent } from '../debrief/types';
import { LinePick } from '../debrief/ui/LinePick';
import { Projector } from '../debrief/ui/Projector';
import { SqlRecall } from '../debrief/ui/SqlRecall';
import { DocumentReveal } from '../evidence/ui/DocumentReveal';
import { EvidenceNotebook } from '../evidence/ui/EvidenceNotebook';
import { isCharacterId, PART_IDS, type CharacterId, type PartId } from '../shared/ids';
import { gameContent, useGameStore } from '../shared/store';
import { getTelemetryEvents, track } from '../shared/telemetry/track';
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
import { useAudioStore } from '../shared/audio/audio-store';
import { soundEngine } from '../shared/audio/sound-engine';
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
  const challenges = useGameStore((s) => s.challenges);
  const survey = useGameStore((s) => s.survey);
  const dispatchStory = useGameStore((s) => s.dispatchStory);
  const getView = useGameStore((s) => s.getView);
  const resetGame = useGameStore((s) => s.resetGame);
  const skipSurvey = useGameStore((s) => s.skipSurvey);
  const submitPostSurvey = useGameStore((s) => s.submitPostSurvey);

  const [notebookOpen, setNotebookOpen] = useState(false);
  const [lastRejection, setLastRejection] = useState<string | null>(null);

  // VN Systems Modals State
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [saveLoadMode, setSaveLoadMode] = useState<'save' | 'load' | null>(null);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const hideUi = useVnStore((s) => s.hideUi);
  const toggleHideUi = useVnStore((s) => s.toggleHideUi);
  const setSkipMode = useVnStore((s) => s.setSkipMode);
  const resetVnSession = useVnStore((s) => s.resetSession);
  const bgmEnabled = useAudioStore((s) => s.bgmEnabled);

  /** Chơi lại từ đầu = phiên telemetry mới: xóa luôn lịch sử thoại, thoại đã đọc và ô lưu của phiên cũ. */
  const resetAll = useCallback(() => {
    resetVnSession();
    resetGame();
  }, [resetVnSession, resetGame]);

  const currentPart = progress?.currentPart ?? null;
  // Nút "Hồ sơ" trong hộp thoại cũng phải ghi notebook_opened như nút trên thanh trên (chỉ số §10).
  const openNotebook = useCallback(() => {
    setNotebookOpen(true);
    track({ type: 'notebook_opened', part: currentPart });
  }, [currentPart]);
  const openBacklog = useCallback(() => {
    setBacklogOpen(true);
    track({ type: 'backlog_opened', part: currentPart });
  }, [currentPart]);

  const anyModalOpen = notebookOpen || backlogOpen || saveLoadMode !== null || audioModalOpen || mapOpen;

  // Phím H ẩn/hiện giao diện — nghe ở cấp màn chơi (không phải trong hộp thoại) để khi giao diện
  // đã ẩn (hộp thoại không còn) vẫn bấm H hoặc Esc để hiện lại được.
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const t = e.target;
      if (t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (e.key === 'h' || e.key === 'H') {
        if (anyModalOpen) return;
        e.preventDefault();
        toggleHideUi();
      } else if (e.key === 'Escape' && hideUi) {
        e.preventDefault();
        toggleHideUi();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [anyModalOpen, hideUi, toggleHideUi]);

  // Nhạc nền: trình duyệt chỉ cho phát âm thanh sau thao tác đầu tiên của người chơi.
  useEffect(() => {
    if (!bgmEnabled) {
      soundEngine.stopBgm();
      return;
    }
    const start = (): void => soundEngine.startBgm();
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [bgmEnabled]);
  useEffect(() => () => soundEngine.stopBgm(), []);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 2800);
  }, []);

  // Hiệu ứng mở khóa manh mối mới (Clue Unlock Toast & Chime)
  const prevClueCount = useRef(evidence.unlocked.length);
  useEffect(() => {
    if (evidence.unlocked.length > prevClueCount.current) {
      soundEngine.playSfx('clue_unlock');
      showToast('✦ PHÁT HIỆN MANH MỐI MỚI! Đã thêm vào Hồ sơ.');
    }
    prevClueCount.current = evidence.unlocked.length;
  }, [evidence.unlocked.length, showToast]);

  const clearBacklog = useVnStore((s) => s.clearBacklog);
  const handleRestoreSlot = useCallback(
    (slot: SaveSlot) => {
      // Khôi phục đủ các slice liên quan (kể cả thử thách SQL) — chỉ đổi progress/evidence thì thử thách
      // đã giải ở "tương lai" vẫn hiện là đã xong, hoặc thử thách đã giải lại mất trạng thái.
      const { progress: p, evidence: ev, challenges: ch } = structuredClone(slot);
      useGameStore.setState({ progress: p, evidence: ev, challenges: ch });
      track({ type: 'progress_loaded', slot: slot.slotIndex, part: p.currentPart ?? null });
      clearBacklog();
      setSkipMode(false);
      setLastRejection(null);
      setNotebookOpen(false);
    },
    [clearBacklog, setSkipMode],
  );

  const act = useCallback(
    (action: Parameters<typeof dispatchStory>[0]) => {
      const rejected = dispatchStory(action);
      setLastRejection(rejected ?? null);
    },
    [dispatchStory],
  );
  const advance = useCallback(() => act({ type: 'advance' }), [act]);
  const complete = useCallback(() => act({ type: 'complete' }), [act]);

  // Nhân vật đã giới thiệu lưu trong phiên (vn-store, sessionStorage) để F5 không giới thiệu lại.
  const seenDebuts = useVnStore((s) => s.seenDebuts);
  const markDebutSeen = useVnStore((s) => s.markDebutSeen);

  // getView đọc từ progress + evidence (đã subscribe ở trên) nên luôn mới.
  const view: StoryView | null = progress ? getView() : null;
  const viewKind = view?.kind;
  // Skip dừng ở mọi chỗ cần người chơi quyết định (câu hỏi, thử thách, xem xét…), như các VN thông thường.
  useEffect(() => {
    if (viewKind !== 'line' && viewKind !== 'feedback') setSkipMode(false);
  }, [viewKind, setSkipMode]);

  const speakerExp = (view?.kind === 'line' ? view.node : view?.kind === 'feedback' ? view.line : view?.kind === 'question' ? view.node.question.asker : null)?.expression;
  // Hiệu ứng âm thanh khi nhân vật kinh ngạc / chấn động
  useEffect(() => {
    if (speakerExp === 'stunned') {
      soundEngine.playSfx('shake');
    }
  }, [speakerExp]);

  if (!progress || !view) return null;

  const completedParts = PART_IDS.filter((p): p is PartId => progress.partCompletedAt[p] !== undefined);
  const scene = view.sequence?.scene ?? 'clb-room';
  const speakerLine = view.kind === 'line' ? view.node : view.kind === 'feedback' ? view.line : view.kind === 'question' ? view.node.question.asker : null;
  const accessRevoked = progress.flags.includes('access-revoked');
  // Khóa nhớ thứ tự lựa chọn của phiên chơi (QĐ-041/QĐ-066): chơi lại từ đầu → giá trị mới → xáo mới.
  const gameKey = progress.startedAt;
  const facilitator = typeof window !== 'undefined' && isFacilitatorMode(window.location.search);

  // Kích hoạt Character Debut Splash khi nhân vật lần đầu xuất hiện trong hội thoại thông thường
  const spk = speakerLine?.speaker;
  const activeDebut: CharacterId | null =
    view.kind === 'line' && spk && isCharacterId(spk) && !seenDebuts.includes(spk) ? spk : null;

  const isShaking = view.kind === 'effect' || speakerLine?.expression === 'stunned';
  const viewportMode = useVnStore((s) => s.viewportMode);
  const isSimulatedMobile = viewportMode === 'mobile' && typeof window !== 'undefined' && window.innerWidth > 768;
  const isPortrait = viewportMode === 'mobile';

  const gameNode = (
    <div className={`game${isPortrait ? ' game--portrait' : ''}${activeDebut ? ' game--debut' : ''}${hideUi ? ' game--hide-ui' : ''}`}>
      {/* Thông báo Toast VN */}
      {toastMsg ? <div className="vn-toast" role="status">{toastMsg}</div> : null}

      {/* Lớp phủ khi Ẩn UI để xem cảnh toàn màn hình */}
      {hideUi ? (
        <div className="vn-hide-ui-overlay" onClick={toggleHideUi} title="Bấm để hiện lại giao diện">
          <div className="vn-hide-ui-hint">Giao diện đang ẩn · Bấm chuột hoặc phím H để hiện lại</div>
        </div>
      ) : null}

      {activeDebut ? (
        <CharacterDebutSplash key={activeDebut} characterId={activeDebut} onDismiss={markDebutSeen} />
      ) : null}

      {!hideUi ? (
        <TopBar
          currentPart={progress.currentPart}
          completedParts={completedParts}
          task={progress.task}
          notebookCount={evidence.unlocked.length}
          notebookOpen={notebookOpen}
          onToggleNotebook={() => setNotebookOpen((o) => !o)}
          onReset={resetAll}
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
        shaking={isShaking}
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
        snapshot={{ progress, evidence, challenges }}
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
          onReset={resetAll}
        />
      ) : null}
    </div>
  );

  if (isSimulatedMobile) {
    return (
      <div className="game-simulator-backdrop">
        <div className="game-simulator-bezel">
          <div className="game-simulator-island">
            <div className="game-simulator-island-camera" />
          </div>
          {gameNode}
          <div className="game-simulator-home-bar" />
        </div>
      </div>
    );
  }

  return gameNode;

  function renderView(v: StoryView) {
    switch (v.kind) {
      case 'line':
        return (
          <DialogBox
            line={v.node}
            display={v.node.display}
            onAdvance={advance}
            keyboardEnabled={!anyModalOpen && !activeDebut}
            onOpenNotebook={openNotebook}
            notebookCount={evidence.unlocked.length}
            onOpenBacklog={openBacklog}
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
              keyboardEnabled={!anyModalOpen && !activeDebut}
              onOpenNotebook={openNotebook}
              notebookCount={evidence.unlocked.length}
              onOpenBacklog={openBacklog}
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
            onReplay={resetAll}
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
