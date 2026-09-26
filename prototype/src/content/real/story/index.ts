/** Chuỗi kể chuyện thật, đúng thứ tự xuất hiện trong docs/kich-ban-prototype.md. */
import type { StoryContent } from '../../../story/types';
import { introSequences } from './intro';
import { investigationSequences } from './investigation';

export const realStory: StoryContent = {
  startSequenceId: 'intro-01',
  sequences: [...introSequences, ...investigationSequences],
};
