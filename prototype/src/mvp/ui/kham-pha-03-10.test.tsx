/**
 * Góp ý user 03/10/2026: phòng CLB dùng ảnh thành viên ngồi (vùng bấm đúng chỗ ngồi, không còn ảnh đứng), màn Hà Vy soi không
 * mồi kính lúp, không còn dòng đếm "Còn N chỗ chưa xem".
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { NutMvp } from '../../content/mvp/types';
import { diemDangHien } from '../engine/may';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { KhamPhaMvp } from './KhamPhaMvp';

const nut = (id: string): Extract<NutMvp, { type: 'explore' }> => {
  for (const c of kb.chuoi) for (const n of c.nodes) if (n.type === 'explore' && n.id === id) return n;
  throw new Error(`thiếu ${id}`);
};

describe('khám phá (03/10)', () => {
  it('phòng CLB ngày 2: bốn thành viên là vùng ngồi (.mvp-ngoi), nền là ảnh ngồi, không còn ảnh đứng', () => {
    const n = nut('kp-phong-n2');
    render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-clb" diem={diemDangHien(n, [])} onXem={() => {}} />);
    expect(document.querySelectorAll('.mvp-ngoi')).toHaveLength(4);
    expect(document.querySelectorAll('.mvp-diem.is-nguoi')).toHaveLength(0);
    expect(document.querySelector('.mvp-canh__khung.is-ngoi .mvp-canh__nen')?.getAttribute('src')).toMatch(/phong-clb-ngoi-duy-ha-vy-minh-anh-tung/);
    expect(screen.queryByText(/chỗ chưa xem/)).toBeNull();
  });

  it('phòng CLB Vụ 4 (Duy + khách Nam, Quân): Duy ngồi, khách vẫn đứng', () => {
    const n = nut('kp-phong-v4');
    render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-clb" diem={diemDangHien(n, [])} onXem={() => {}} />);
    expect(document.querySelectorAll('.mvp-ngoi')).toHaveLength(1);
    expect(document.querySelectorAll('.mvp-diem.is-nguoi')).toHaveLength(2);
  });

  it('Hà Vy soi: điểm soi mang lớp ẩn (kính chỉ hiện khi rê tới), không đếm số chi tiết còn lại', () => {
    const n = nut('kp-soi-quan');
    render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-ctsv" diem={diemDangHien(n, [])} onXem={() => {}} kieu="quan-sat" nhanVat="quan" haVySoi />);
    const soi = document.querySelectorAll('.mvp-soi');
    expect(soi.length).toBeGreaterThan(0);
    soi.forEach((b) => expect(b).toHaveClass('mvp-soi--an'));
    expect(screen.queryByText(/Còn \d+ chi tiết/)).toBeNull();
  });
});

describe('chi tiết ẩn không phát sáng (gói B12, 05/10)', () => {
  const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'mvp.css'), 'utf8');
  /** Các khối luật có bộ chọn chứa `chon`. */
  const khoi = (chon: string): string[] => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => (m[1] ?? '').includes(chon)).map((m) => `${m[1]}{${m[2]}}`);

  it('chi tiết ẩn trên cảnh và điểm soi ẩn: không có hoạt cảnh nháy khi để lâu, không vòng sáng sẵn', () => {
    expect(css).not.toMatch(/mvp-an-nhay|mvp-soi-an-nhay/);
    for (const k of khoi('.mvp-an__goi-y')) {
      // Chỉ vùng có dấu "!" / "?" mới có vòng hiện sẵn theo nhịp; chi tiết ẩn chỉ sáng khi người chơi rê / Tab tới.
      if (/animation:(?!\s*none)/.test(k)) expect(k).toContain('.is-co-dau');
      if (/opacity:\s*0\.[1-9]/.test(k)) expect(k).toMatch(/is-co-dau|:hover|:focus-visible/);
    }
    for (const k of khoi('.mvp-soi--an')) expect(k).not.toMatch(/animation:(?!\s*none)/);
  });

  it('dấu "!" / "?" của điểm bấm thường vẫn còn', () => {
    const n = nut('kp-phong-n2');
    render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-clb" diem={diemDangHien(n, [])} onXem={() => {}} />);
    expect(document.querySelectorAll('.mvp-dau').length).toBeGreaterThan(0);
  });
});
