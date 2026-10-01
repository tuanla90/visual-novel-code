import { describe, expect, it } from 'vitest';
import { anhTheoTen } from './anh-mvp';
import { BO_NHEP_MOI_MVP, boNhepMoiTheoUrl } from './nhep-moi-mvp';

describe('bộ nhép môi MVP', () => {
  it('mọi tên trong bảng đều có ảnh chân dung thật trong src/assets', () => {
    for (const ten of BO_NHEP_MOI_MVP.keys()) expect(anhTheoTen(ten), ten).toBeDefined();
  });

  it('miếng nằm trong khung ảnh, mắt ở trên miệng', () => {
    for (const [ten, rig] of BO_NHEP_MOI_MVP) {
      for (const p of [rig.mouth, rig.eyes]) {
        expect(p.x, ten).toBeGreaterThanOrEqual(0);
        expect(p.y, ten).toBeGreaterThanOrEqual(0);
        expect(p.x + p.w, ten).toBeLessThanOrEqual(rig.width);
        expect(p.y + p.h, ten).toBeLessThanOrEqual(rig.height);
        expect(p.src, ten).toBeTruthy();
      }
      expect(rig.eyes.y, ten).toBeLessThan(rig.mouth.y);
    }
  });

  it('tra theo URL ảnh đang hiện; ảnh không có bộ → undefined', () => {
    const url = anhTheoTen('char-tung-gai-dau');
    expect(boNhepMoiTheoUrl(url)?.mouth.w).toBe(246);
    expect(boNhepMoiTheoUrl(anhTheoTen('char-duy'))).toBeUndefined();
    expect(boNhepMoiTheoUrl(undefined)).toBeUndefined();
    // Chỉ mục tùy ý (test không phụ thuộc import.meta.glob).
    expect(boNhepMoiTheoUrl('x', (t) => (t === 'char-quan-chi-man' ? 'x' : undefined))?.eyes.h).toBe(155);
  });
});
