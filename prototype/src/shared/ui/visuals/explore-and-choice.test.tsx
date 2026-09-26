/**
 * QĐ-053: dòng nhắc màn xem xét chỉ nêu SỐ điểm còn lại, không nêu tên manh mối/tài liệu còn thiếu.
 * Yêu cầu tồn gói 4: MultipleChoice hiển thị chữ trong dấu ` qua CodeText.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { realContent } from '../../../content/real';
import { evidenceTitle } from '../../../evidence/labels';
import type { GateStatus, HotspotView } from '../../../story/engine/state';
import { ExploreScreen } from '../../../story/ui/ExploreScreen';
import type { MultipleChoiceQuestion } from '../../../story/types';
import { CLUE_IDS, DOCUMENT_IDS } from '../../ids';
import { MultipleChoice } from '../MultipleChoice';

const HOTSPOTS: HotspotView[] = [
  { id: 'hs-bac-tu', label: 'Bác Tư', unlocksClue: 'clue-box-building-b', runSequence: 'inv-bac-tu', visited: true },
  { id: 'hs-box', label: 'Hộp góp ý', unlocksClue: 'clue-bookmark-baochi', runSequence: 'inv-box', visited: false },
];

const GATE: GateStatus = { satisfied: false, missing: ['clue-bookmark-baochi'], to: 'ana-01', buttonLabel: 'Nhiệm vụ tiếp theo →' };

describe('ExploreScreen (QĐ-053)', () => {
  it('chưa đủ điều kiện: "Còn 1 điểm chưa xem xét." — không nêu tên manh mối/tài liệu nào', () => {
    const { container } = render(<ExploreScreen hotspots={HOTSPOTS} gate={GATE} content={realContent} onInspect={() => {}} onProceed={() => {}} />);
    expect(screen.getByRole('status')).toHaveTextContent('Còn 1 điểm chưa xem xét.');
    const shown = container.textContent ?? '';
    for (const id of [...CLUE_IDS, ...DOCUMENT_IDS]) {
      expect(shown, id).not.toContain(evidenceTitle(realContent, id));
      expect(shown).not.toContain(id);
    }
    expect(shown.toLowerCase()).not.toContain('bookmark');
    expect(shown).not.toContain('Báo chí');
  });

  it('đã xem hết điểm mà Hồ sơ còn thiếu: vẫn chỉ nêu số lượng', () => {
    const allVisited = HOTSPOTS.map((h) => ({ ...h, visited: true }));
    render(<ExploreScreen hotspots={allVisited} gate={GATE} content={realContent} onInspect={() => {}} onProceed={() => {}} />);
    expect(screen.getByRole('status')).toHaveTextContent('Hồ sơ còn thiếu 1 mục để đi tiếp.');
  });

  it('đủ điều kiện: hiện nút đi tiếp, không có dòng nhắc; điểm xem xét có nhãn + tooltip', () => {
    render(<ExploreScreen hotspots={HOTSPOTS} gate={{ ...GATE, satisfied: true, missing: [] }} content={realContent} onInspect={() => {}} onProceed={() => {}} />);
    expect(screen.getByRole('button', { name: 'Nhiệm vụ tiếp theo →' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
    const box = screen.getByRole('button', { name: 'Xem xét: Hộp góp ý' });
    expect(box).toHaveAttribute('title', 'Xem xét: Hộp góp ý');
  });
});

describe('MultipleChoice hiển thị chữ mã (QĐ-051)', () => {
  it('câu hỏi và lựa chọn: đoạn trong dấu ` thành chữ mã, không lộ dấu `', () => {
    const question: MultipleChoiceQuestion = {
      id: 'q-code',
      asker: { speaker: 'ha-vy', expression: 'thinking', text: 'Chữ H nằm ở cột `ten` hay `ho_dem`?' },
      choices: [
        { id: 'a', text: 'Cột `ten`', correct: true, feedback: [] },
        { id: 'b', text: 'Cột `ho_dem`', correct: false, feedback: [] },
      ],
    };
    const { container } = render(<MultipleChoice question={question} attempts={0} onChoose={() => {}} random={() => 0} />);
    expect(container.textContent).not.toContain('`');
    const codes = Array.from(container.querySelectorAll('code.code-text')).map((c) => c.textContent);
    expect(codes.sort()).toEqual(['ho_dem', 'ho_dem', 'ten', 'ten']);
    // (Tên truy cập do jsdom tính bỏ khoảng trắng giữa các span; trình duyệt thật đọc "Cột ten".)
    expect(screen.getAllByRole('button').map((b) => b.textContent).sort()).toEqual(['Cột ho_dem', 'Cột ten']);
  });
});
