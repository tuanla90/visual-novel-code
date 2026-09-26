import { describe, expect, it } from 'vitest';
import {
  EMPTY_POST_DRAFT,
  EMPTY_PRE_DRAFT,
  isClosedPostAnswers,
  isClosedPreAnswers,
  resolvePostSurvey,
  resolvePreSurvey,
  toggleMemorable,
} from './survey';

describe('khảo sát: hàm thuần', () => {
  it('khảo sát đầu: đủ hai câu → gửi; bỏ qua hoặc thiếu → bỏ qua', () => {
    expect(resolvePreSurvey({ excelLevel: 'basic', sqlBefore: 'some', skipped: false })).toEqual({
      kind: 'submit',
      answers: { excelLevel: 'basic', sqlBefore: 'some' },
    });
    expect(resolvePreSurvey({ excelLevel: 'basic', sqlBefore: 'some', skipped: true })).toEqual({ kind: 'skip' });
    expect(resolvePreSurvey({ ...EMPTY_PRE_DRAFT, excelLevel: 'none' })).toEqual({ kind: 'skip' });
    expect(resolvePreSurvey(EMPTY_PRE_DRAFT)).toEqual({ kind: 'skip' });
  });

  it('tối đa 2 phần đáng nhớ; bấm lại để bỏ chọn', () => {
    let m = toggleMemorable([], 'clues');
    m = toggleMemorable(m, 'rebut-quan');
    expect(toggleMemorable(m, 'story-characters')).toEqual(['clues', 'rebut-quan']);
    expect(toggleMemorable(m, 'clues')).toEqual(['rebut-quan']);
  });

  it('khảo sát cuối: cần câu "chơi tiếp" để gửi', () => {
    expect(resolvePostSurvey(EMPTY_POST_DRAFT)).toBeNull();
    expect(resolvePostSurvey({ ...EMPTY_POST_DRAFT, playNext: 'yes' })).toEqual({ memorable: [], annoying: null, playNext: 'yes' });
  });

  it('kiểm "chỉ lựa chọn đóng" bắt được chữ tự do và trường lạ', () => {
    expect(isClosedPreAnswers({ excelLevel: 'basic', sqlBefore: 'no' })).toBe(true);
    expect(isClosedPreAnswers({ excelLevel: 'Tôi dùng Excel ở công ty X', sqlBefore: 'no' })).toBe(false);
    expect(isClosedPreAnswers({ excelLevel: 'basic', sqlBefore: 'no', comment: 'tên bạn tôi' })).toBe(false);
    expect(isClosedPostAnswers({ memorable: ['clues'], annoying: null, playNext: 'no' })).toBe(true);
    expect(isClosedPostAnswers({ memorable: ['clues'], annoying: 'đoạn thầy A', playNext: 'no' })).toBe(false);
    expect(isClosedPostAnswers({ memorable: ['clues', 'build-query', 'rebut-quan'], annoying: null, playNext: 'no' })).toBe(false);
    expect(isClosedPostAnswers({ memorable: [], annoying: null, playNext: 'no', note: 'x' })).toBe(false);
  });
});
