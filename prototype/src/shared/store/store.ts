/**
 * Store zustand duy nhất, chia slice: story · evidence · challenges · survey.
 * Lưu tiến độ vào sessionStorage (QĐ-004) qua middleware persist, có version + migrate.
 *
 * Không lưu bảng kết quả lớn: chỉ vật chứng đã lưu (vài dòng) và tóm tắt lần chạy gần nhất.
 * Runtime kể chuyện (src/story/engine) là reducer thuần; store áp `effects` của nó.
 */
import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { GameContent } from '../../content/types';
import type { EvidenceAnnotation, SavedQueryEvidence } from '../../evidence/types';
import { getStoryView, startStory, stepStory } from '../../story/engine/runtime';
import type { StoryAction, StoryEffect, StoryProgress, StoryView } from '../../story/engine/state';
import type { BuilderMode, QueryModel, RunSummary } from '../../sql-challenge/types';
import { emptyQueryModel } from '../../sql-challenge/types';
import type { ChallengeId, EvidenceId, QueryEvidenceId } from '../ids';
import type { PostSurveyAnswers, PreSurveyAnswers, SurveyStage } from '../telemetry/events';
import { newTelemetrySession, track } from '../telemetry/track';

export const STORE_VERSION = 1;
export const STORE_KEY = 'clb-tham-tu-du-lieu';

// ---------- Kiểu trạng thái ----------

export type ChallengeStatus = 'idle' | 'in-progress' | 'correct' | 'completed';

export interface ChallengeState {
  model: QueryModel;
  /** SQL gõ tay (chế độ `sql`); ở chế độ builder là SQL sinh từ model (gói sql-engine điền). */
  sql: string;
  mode: BuilderMode;
  lastRun: RunSummary | null;
  status: ChallengeStatus;
  runs: number;
  /** Mức gợi ý cao nhất đã mở (0–3). */
  hintLevel: 0 | 1 | 2 | 3;
  /** Tổng số lần bấm "Hỏi Hà Vy". */
  hintsUsed: number;
  startedAt: number | null;
  firstRunAt: number | null;
  completedAt: number | null;
  /** Bước hướng dẫn hiện tại (1-based; 0 = không có bước). */
  guideStep: number;
}

export interface SurveyState {
  pre: PreSurveyAnswers | null;
  post: PostSurveyAnswers | null;
  preSkipped: boolean;
  postSkipped: boolean;
}

export interface GameData {
  progress: StoryProgress | null;
  evidence: {
    unlocked: EvidenceId[];
    savedQueries: Partial<Record<QueryEvidenceId, SavedQueryEvidence>>;
    annotations: EvidenceAnnotation[];
  };
  challenges: Partial<Record<ChallengeId, ChallengeState>>;
  survey: SurveyState;
}

export interface GameActions {
  // story
  startGame: () => void;
  /** Trả về lý do từ chối nếu hành động không hợp lệ ở khung nhìn hiện tại. */
  dispatchStory: (action: StoryAction) => string | undefined;
  getView: () => StoryView | null;
  // evidence
  hasEvidence: (id: EvidenceId) => boolean;
  unlockEvidence: (id: EvidenceId) => void;
  saveQueryEvidence: (ev: SavedQueryEvidence) => void;
  annotateEvidence: (a: Omit<EvidenceAnnotation, 'at'>) => void;
  // challenges
  openChallenge: (id: ChallengeId) => void;
  updateChallenge: (id: ChallengeId, patch: Partial<Pick<ChallengeState, 'model' | 'sql' | 'mode' | 'guideStep'>>) => void;
  recordRun: (id: ChallengeId, summary: Omit<RunSummary, 'at'>) => void;
  useHint: (id: ChallengeId) => 1 | 2 | 3;
  completeChallenge: (id: ChallengeId, evidence: SavedQueryEvidence) => void;
  // survey
  submitSurvey: (stage: 'pre', answers: PreSurveyAnswers) => void;
  submitPostSurvey: (answers: PostSurveyAnswers) => void;
  skipSurvey: (stage: SurveyStage) => void;
  // reset
  resetGame: () => void;
}

export type GameStore = GameData & GameActions;

export function initialGameData(): GameData {
  return {
    progress: null,
    evidence: { unlocked: [], savedQueries: {}, annotations: [] },
    challenges: {},
    survey: { pre: null, post: null, preSkipped: false, postSkipped: false },
  };
}

export function initialChallengeState(model: QueryModel | undefined, now: number): ChallengeState {
  return {
    model: model ? structuredClone(model) : emptyQueryModel(),
    sql: '',
    mode: 'builder',
    lastRun: null,
    status: 'in-progress',
    runs: 0,
    hintLevel: 0,
    hintsUsed: 0,
    startedAt: now,
    firstRunAt: null,
    completedAt: null,
    guideStep: 0,
  };
}

// ---------- Lưu trữ ----------

function sessionStorageOrMemory(): Storage {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.getItem('__probe__');
      return sessionStorage;
    }
  } catch {
    /* sessionStorage bị chặn (chế độ riêng tư nghiêm ngặt) → dùng bộ nhớ */
  }
  const mem = new Map<string, string>();
  return {
    get length() {
      return mem.size;
    },
    clear: () => mem.clear(),
    getItem: (k) => mem.get(k) ?? null,
    key: (i) => [...mem.keys()][i] ?? null,
    removeItem: (k) => {
      mem.delete(k);
    },
    setItem: (k, v) => {
      mem.set(k, v);
    },
  };
}

/** Chỉ giữ dữ liệu (không giữ hàm) khi ghi sessionStorage. */
function partialize(state: GameStore): GameData {
  return { progress: state.progress, evidence: state.evidence, challenges: state.challenges, survey: state.survey };
}

/** Phiên bản cũ hoặc dữ liệu hỏng → bắt đầu lại (đơn giản, an toàn cho prototype). */
export function migrate(persisted: unknown, version: number): GameData {
  if (version === STORE_VERSION && isGameData(persisted)) return persisted;
  return initialGameData();
}

function isGameData(x: unknown): x is GameData {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return 'progress' in o && typeof o.evidence === 'object' && typeof o.challenges === 'object' && typeof o.survey === 'object';
}

// ---------- Tạo store ----------

export interface CreateStoreOptions {
  content: GameContent;
  now?: () => number;
  /** Tên khóa lưu; test dùng khóa riêng. */
  storageKey?: string;
  /** Tắt persist (test thuần). */
  persist?: boolean;
}

export function createGameStore(options: CreateStoreOptions): UseBoundStore<StoreApi<GameStore>> {
  const { content } = options;
  const now = options.now ?? (() => Date.now());

  const initializer = (
    set: (partial: Partial<GameStore> | ((s: GameStore) => Partial<GameStore>)) => void,
    get: () => GameStore,
  ): GameStore => {
    const applyEffects = (effects: StoryEffect[]): void => {
      for (const e of effects) {
        switch (e.type) {
          case 'unlock-evidence':
            get().unlockEvidence(e.evidenceId);
            break;
          case 'annotate-evidence':
            get().annotateEvidence({ evidenceId: e.evidenceId, note: e.note, redact: e.redact });
            break;
          case 'set-flag':
            // Cờ đã nằm trong progress.flags; không cần lưu thêm.
            break;
          case 'telemetry':
            track(e.event);
            break;
        }
      }
    };
    const ctx = () => ({ now: now(), hasEvidence: (id: EvidenceId) => get().hasEvidence(id) });

    return {
      ...initialGameData(),

      startGame: () => {
        const r = startStory(content.story, ctx());
        set({ progress: r.progress });
        applyEffects(r.effects);
      },

      dispatchStory: (action) => {
        const progress = get().progress;
        if (!progress) return 'Game chưa bắt đầu.';
        const r = stepStory(content.story, progress, ctx(), action);
        if (r.rejected) return r.rejected;
        set({ progress: r.progress });
        applyEffects(r.effects);
        return undefined;
      },

      getView: () => {
        const progress = get().progress;
        return progress ? getStoryView(content.story, progress, ctx()) : null;
      },

      hasEvidence: (id) => get().evidence.unlocked.includes(id),

      unlockEvidence: (id) => {
        if (get().evidence.unlocked.includes(id)) return;
        set((s) => ({ evidence: { ...s.evidence, unlocked: [...s.evidence.unlocked, id] } }));
        track({ type: 'evidence_unlocked', evidenceId: id });
      },

      saveQueryEvidence: (ev) => {
        set((s) => ({ evidence: { ...s.evidence, savedQueries: { ...s.evidence.savedQueries, [ev.id]: ev } } }));
        get().unlockEvidence(ev.id);
      },

      annotateEvidence: (a) => {
        set((s) => ({ evidence: { ...s.evidence, annotations: [...s.evidence.annotations, { ...a, at: now() }] } }));
      },

      openChallenge: (id) => {
        if (get().challenges[id]) return;
        const def = content.challenges[id];
        const state = initialChallengeState(def?.spec.initialModel, now());
        if (def && def.content.steps.length > 0) state.guideStep = 1;
        set((s) => ({ challenges: { ...s.challenges, [id]: state } }));
        track({ type: 'challenge_start', challengeId: id });
      },

      updateChallenge: (id, patch) => {
        const cur = get().challenges[id];
        if (!cur) return;
        set((s) => ({ challenges: { ...s.challenges, [id]: { ...cur, ...patch } } }));
      },

      recordRun: (id, summary) => {
        const cur = get().challenges[id];
        if (!cur) return;
        const at = now();
        const runs = cur.runs + 1;
        const firstRunAt = cur.firstRunAt ?? at;
        const status: ChallengeStatus = summary.status === 'correct' ? 'correct' : cur.status === 'completed' ? 'completed' : 'in-progress';
        set((s) => ({ challenges: { ...s.challenges, [id]: { ...cur, runs, firstRunAt, status, lastRun: { ...summary, at } } } }));
        const msSinceStart = at - (cur.startedAt ?? at);
        if (cur.firstRunAt === null) track({ type: 'first_run', challengeId: id, msSinceStart });
        track({
          type: 'query_run',
          challengeId: id,
          mode: summary.mode,
          attempt: runs,
          rowCount: summary.rowCount,
          status: summary.status,
          primaryCode: summary.primaryCode,
          errorClass: summary.status === 'error' ? 'syntax' : summary.status === 'incorrect' ? 'logic' : null,
          connector: summary.connector,
          msSinceStart,
        });
      },

      useHint: (id) => {
        const cur = get().challenges[id];
        const level = (cur ? Math.min(3, cur.hintLevel + 1) : 1) as 1 | 2 | 3;
        if (cur) {
          const hintsUsed = cur.hintsUsed + 1;
          set((s) => ({ challenges: { ...s.challenges, [id]: { ...cur, hintLevel: level, hintsUsed } } }));
          track({ type: 'hint_used', challengeId: id, level, count: hintsUsed });
        }
        return level;
      },

      completeChallenge: (id, evidence) => {
        const cur = get().challenges[id];
        const at = now();
        if (cur) {
          set((s) => ({ challenges: { ...s.challenges, [id]: { ...cur, status: 'completed', completedAt: at } } }));
          track({ type: 'challenge_complete', challengeId: id, durationMs: at - (cur.startedAt ?? at), runs: cur.runs, hintsUsed: cur.hintsUsed });
        }
        get().saveQueryEvidence(evidence);
      },

      submitSurvey: (_stage, answers) => {
        set((s) => ({ survey: { ...s.survey, pre: answers } }));
        track({ type: 'survey_submitted', stage: 'pre', answers });
      },

      submitPostSurvey: (answers) => {
        set((s) => ({ survey: { ...s.survey, post: answers } }));
        track({ type: 'survey_submitted', stage: 'post', answers });
      },

      skipSurvey: (stage) => {
        set((s) => ({ survey: { ...s.survey, ...(stage === 'pre' ? { preSkipped: true } : { postSkipped: true }) } }));
        track({ type: 'survey_skipped', stage });
      },

      resetGame: () => {
        track({ type: 'game_reset' });
        newTelemetrySession();
        set(initialGameData());
      },
    };
  };

  if (options.persist === false) {
    return create<GameStore>()(initializer);
  }
  return create<GameStore>()(
    persist(initializer, {
      name: options.storageKey ?? STORE_KEY,
      version: STORE_VERSION,
      storage: createJSONStorage(() => sessionStorageOrMemory()),
      partialize,
      migrate,
    }),
  );
}
