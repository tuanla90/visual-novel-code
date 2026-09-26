/**
 * Vùng màn chiếu (biến `--projector-*` của gói 6) khớp khung màn chiếu trống trong nền phòng giải
 * trình, theo cách ảnh phủ `cover` + neo giữa; nới ra khi khung quá nhỏ để đọc.
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SceneArt } from './scene-art';
import { HEARING_ROOM_SCREEN, PROJECTOR_MIN, projectorInsets } from './scene-geometry';

describe('projectorInsets', () => {
  it('1366×768 (sân khấu 1366×708): ảnh cắt trên/dưới, khung đè đúng màn chiếu', () => {
    const s = HEARING_ROOM_SCREEN;
    const i = projectorInsets(1366, 708);
    const artH = 1366 * (900 / 1600);
    const offY = (708 - artH) / 2;
    expect(i.left).toBeCloseTo(s.x0 * 1366, 1);
    expect(i.right).toBeCloseTo(1366 - s.x1 * 1366, 1);
    expect(i.top).toBeCloseTo(Math.max(offY + s.y0 * artH, PROJECTOR_MIN.top), 1);
    expect(i.bottom).toBeCloseTo(708 - (offY + s.y1 * artH), 1);
    // Đủ rộng để cột SQL (5/12 bề ngang) chứa dòng dài nhất của màn chiếu không phải cuộn ngang.
    expect(1366 - i.left - i.right).toBeGreaterThanOrEqual(1080);
    // Chừa nhãn cảnh ở góc trên trái (đến ~150 px ngang, ~42 px dọc).
    expect(i.left > 150 || i.top > 42).toBe(true);
  });

  it('1024×768 (sân khấu 1024×679): ảnh cắt trái/phải, bề ngang đè đúng; cao đủ cho bố cục 1 cột (600)', () => {
    const i = projectorInsets(1024, 679);
    const artW = 679 * (1600 / 900);
    const offX = (1024 - artW) / 2;
    expect(i.left).toBeCloseTo(Math.max(offX + HEARING_ROOM_SCREEN.x0 * artW, PROJECTOR_MIN.margin), 1);
    expect(1024 - i.left - i.right).toBeGreaterThanOrEqual(PROJECTOR_MIN.width);
    expect(679 - i.top - i.bottom).toBeGreaterThanOrEqual(PROJECTOR_MIN.narrowHeight - 0.01);
    expect(i.top).toBeGreaterThanOrEqual(PROJECTOR_MIN.top);
  });

  it('màn chiếu trong ảnh quá nhỏ → nới đều quanh tâm, không vượt sân khấu (chừa lề, chừa nhãn cảnh)', () => {
    const i = projectorInsets(1366, 708, { x0: 0.45, x1: 0.55, y0: 0.9, y1: 0.98 });
    expect(1366 - i.left - i.right).toBeCloseTo(PROJECTOR_MIN.width, 1);
    expect(708 - i.top - i.bottom).toBeCloseTo(PROJECTOR_MIN.height, 1);
    expect(i.bottom).toBeGreaterThanOrEqual(PROJECTOR_MIN.margin - 0.01);
    expect(i.left).toBeCloseTo(i.right, 1);
    const high = projectorInsets(1366, 708, { x0: 0.45, x1: 0.55, y0: 0, y1: 0.05 });
    expect(high.top).toBeGreaterThanOrEqual(PROJECTOR_MIN.top);
  });

  it('SVG nền tạm vẽ màn chiếu đúng khung HEARING_ROOM_SCREEN', () => {
    const { container } = render(<SceneArt scene="debrief-room" />);
    const screen = Array.from(container.querySelectorAll('rect')).find((r) => r.getAttribute('fill') === '#f3f5f7');
    expect(Number(screen?.getAttribute('x'))).toBeCloseTo(HEARING_ROOM_SCREEN.x0 * 1600, 3);
    expect(Number(screen?.getAttribute('y'))).toBeCloseTo(HEARING_ROOM_SCREEN.y0 * 900, 3);
    expect(Number(screen?.getAttribute('width'))).toBeCloseTo((HEARING_ROOM_SCREEN.x1 - HEARING_ROOM_SCREEN.x0) * 1600, 3);
    expect(Number(screen?.getAttribute('height'))).toBeCloseTo((HEARING_ROOM_SCREEN.y1 - HEARING_ROOM_SCREEN.y0) * 900, 3);
  });
});
