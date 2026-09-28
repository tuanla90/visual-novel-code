// @vitest-environment node
/**
 * "File sinh khớp nội dung" (cách A, QĐ-079/QĐ-088): sinh lại dữ liệu từ prototype/noi-dung/ TRONG BỘ NHỚ
 * và so với các tệp `*.gen.ts` đã commit. Sửa .md mà quên `npm run noi-dung:sinh`, hoặc sửa tay .gen.ts,
 * đều làm test này đỏ.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NHAN_NUT_MAC_DINH } from '../../../tools/noi-dung/chuyen.ts';
import { sinhVanBan, tepLechTrenDia, THU_MUC_SINH } from '../../../tools/noi-dung/sinh.ts';
import { DEFAULT_GATE_LABEL } from '../../story/engine/runtime';

describe('file sinh khớp nội dung', () => {
  const kq = sinhVanBan();

  it('nội dung đọc và chuyển được, không lỗi', () => {
    expect(kq.loi).toEqual([]);
  });

  it('mọi tệp .gen.ts đã commit bằng đúng bản sinh lại (nếu đỏ: chạy `npm run noi-dung:sinh` rồi commit)', () => {
    expect(Object.keys(kq.tep).length).toBeGreaterThan(0);
    expect(tepLechTrenDia(kq.tep)).toEqual([]);
  });

  it('không có tệp .gen.ts thừa (bộ sinh không còn tạo)', () => {
    const trenDia = readdirSync(THU_MUC_SINH).filter((t) => t.endsWith('.gen.ts')).sort();
    expect(trenDia).toEqual(Object.keys(kq.tep).sort());
  });

  it('nhãn nút mặc định của [ĐIỀU KIỆN QUA] trong bộ chuyển = DEFAULT_GATE_LABEL của runtime', () => {
    expect(NHAN_NUT_MAC_DINH).toBe(DEFAULT_GATE_LABEL);
  });
});
