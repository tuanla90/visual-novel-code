/** Chuỗi kể chuyện thật, đúng thứ tự xuất hiện trong docs/kich-ban-prototype.md. */
import type { StoryContent } from '../../../story/types';
import { analysisSequences } from './analysis';
import { debriefSequences } from './debrief';
import { endingSequences } from './ending';
import { introSequences } from './intro';
import { investigationSequences } from './investigation';

export const realStory: StoryContent = {
  startSequenceId: 'intro-00',
  sequences: [
    ...introSequences,
    ...investigationSequences,
    ...analysisSequences,
    ...debriefSequences,
    ...endingSequences,
  ],
};
