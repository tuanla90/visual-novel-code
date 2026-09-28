/**
 * Chân dung vẽ tạm (QĐ-026, QĐ-033) + dàn nhân vật trên sân khấu: đủ biểu cảm, mỗi biểu cảm một
 * hình khác nhau, nhãn tiếng Việt không định danh thô, người đang nói nổi bật.
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CHARACTER_EXPRESSIONS, CHARACTER_IDS, SCENE_IDS } from '../../ids';
import { characterName, expressionName } from '../../display-names';
import { Portrait } from '../Portrait';
import { Stage } from '../Stage';
import { castPosition, nextCast } from './cast';
import { FACES } from './portrait-faces';

const RAW_ID = /minh-anh|ha-vy|quan\b|hoai|bac-tu|neutral|worried|happy|thinking|smile|smug|stunned|nervous|downcast|relieved/;

describe('chân dung vẽ tạm', () => {
  it.each(CHARACTER_IDS)('%s: mỗi biểu cảm có mặt riêng (mày/mắt/miệng/dấu phụ khác nhau)', (character) => {
    const expressions = CHARACTER_EXPRESSIONS[character] as readonly string[];
    const faces = FACES[character] as Record<string, unknown>;
    expect(Object.keys(faces).sort()).toEqual([...expressions].sort());
    const signatures = expressions.map((e) => JSON.stringify(faces[e]));
    expect(new Set(signatures).size).toBe(expressions.length);
    const markups = expressions.map((e) => render(<Portrait character={character} expression={e} />).container.innerHTML);
    expect(new Set(markups).size).toBe(expressions.length);
  });

  it('nhãn cho trình đọc màn hình = tên + biểu cảm tiếng Việt, không định danh thô, không chữ hiện ra', () => {
    for (const character of CHARACTER_IDS) {
      for (const expression of CHARACTER_EXPRESSIONS[character]) {
        const { container, unmount } = render(<Portrait character={character} expression={expression} />);
        const figure = container.querySelector('figure');
        const label = figure?.getAttribute('aria-label') ?? '';
        expect(label).toBe(`${characterName(character)}, ${expressionName(expression)}`);
        expect(label).not.toMatch(RAW_ID);
        expect(figure?.getAttribute('role')).toBe('img');
        expect((figure?.textContent ?? '').trim()).toBe('');
        for (const img of Array.from(container.querySelectorAll('img'))) expect(img.getAttribute('alt')).toBe('');
        unmount();
      }
    }
  });
});

describe('dàn nhân vật trên sân khấu', () => {
  it('nhân vật đã nói ở lại khi người khác nói; người đang nói nổi bật; người dẫn truyện không thêm ai', () => {
    const { container, rerender } = render(<Stage scene="clb-room" speaker="minh-anh" expression="worried" />);
    rerender(<Stage scene="clb-room" speaker="ha-vy" expression="thinking" />);
    const members = () => Array.from(container.querySelectorAll('.cast-member'));
    expect(members()).toHaveLength(2);
    const speaking = container.querySelector('.cast-member[data-speaking="true"] figure');
    expect(speaking?.getAttribute('aria-label')).toBe('Hà Vy, đang nghĩ');
    expect(container.querySelector('.cast-member--idle figure')?.getAttribute('aria-label')).toBe('Minh Anh, lo lắng');

    rerender(<Stage scene="clb-room" speaker="narrator" />);
    expect(members()).toHaveLength(2);
    expect(container.querySelector('.cast-member--speaking')).toBeNull();

    rerender(<Stage scene="corridor-b" speaker="bac-tu" expression="neutral" />);
    expect(members()).toHaveLength(1);
    expect(container.querySelector('.cast-member--speaking figure')?.getAttribute('aria-label')).toBe('Bác Tư, bình thường');
    // Bác Tư cùng cỡ với nhân vật khác (user 28/09: "bác bảo vệ đang bé hơn 2 bạn còn lại").
    expect(container.querySelector('.cast-member--small')).toBeNull();
    expect(container.querySelector('.portrait--small')).toBeNull();
  });

  it('nextCast trả lại chính trạng thái cũ khi không có gì đổi; lời không ghi biểu cảm giữ biểu cảm cũ', () => {
    const a = nextCast(null, 'debrief-room', 'hoai', undefined);
    expect(a.members).toEqual([{ character: 'hoai', expression: 'nervous' }]);
    expect(nextCast(a, 'debrief-room', 'hoai', undefined)).toBe(a);
    expect(nextCast(a, 'debrief-room', 'player', undefined)).toBe(a);
    const b = nextCast(a, 'debrief-room', 'hoai', 'relieved');
    expect(b.members).toEqual([{ character: 'hoai', expression: 'relieved' }]);
  });

  it('vị trí đứng nằm trong sân khấu; phòng giải trình: CLB bên trái, Quân và nhân chứng bên phải', () => {
    for (const scene of SCENE_IDS) {
      for (const character of CHARACTER_IDS) {
        const x = castPosition(scene, character);
        expect(x).toBeGreaterThan(0.05);
        expect(x).toBeLessThan(0.95);
      }
    }
    expect(castPosition('debrief-room', 'minh-anh')).toBeLessThan(0.5);
    expect(castPosition('debrief-room', 'ha-vy')).toBeLessThan(0.5);
    expect(castPosition('debrief-room', 'quan')).toBeGreaterThan(0.5);
    expect(castPosition('debrief-room', 'hoai')).toBeGreaterThan(0.5);
  });
});
