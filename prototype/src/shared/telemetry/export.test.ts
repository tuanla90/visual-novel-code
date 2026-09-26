import { describe, expect, it, vi } from 'vitest';
import type { TelemetryEvent } from './events';
import { TELEMETRY_EXPORT_FORMAT, buildTelemetryExport, downloadJson, exportFileName } from './export';

const ev = (sessionId: string, at: number, body: Record<string, unknown>): TelemetryEvent =>
  ({ ...body, at, sessionId }) as TelemetryEvent;

describe('xuất JSON', () => {
  const events = [
    ev('s-aaaaaaaa', 100, { type: 'game_start' }),
    ev('s-aaaaaaaa', 200, { type: 'game_reset' }),
    ev('s-bbbbbbbb', 300, { type: 'game_start' }),
  ];

  it('cấu trúc: định dạng, phiên bản khóa, thời điểm xuất, mọi phiên theo thứ tự', () => {
    const now = Date.UTC(2026, 8, 27, 3, 4, 5);
    const out = buildTelemetryExport(events, now, { summaries: [] });
    expect(out).toMatchObject({
      format: TELEMETRY_EXPORT_FORMAT,
      storageVersion: 1,
      exportedAt: '2026-09-27T03:04:05.000Z',
      exportedAtMs: now,
      sessionCount: 2,
      eventCount: 3,
      summaries: [],
    });
    expect(out.sessions.map((s) => [s.sessionId, s.eventCount, s.firstAt, s.lastAt])).toEqual([
      ['s-aaaaaaaa', 2, 100, 200],
      ['s-bbbbbbbb', 1, 300, 300],
    ]);
    expect(out.sessions[0]?.events).toEqual(events.slice(0, 2));
    // Đi qua JSON không mất gì.
    expect(JSON.parse(JSON.stringify(out))).toEqual(out);
  });

  it('không có phiên nào: vẫn xuất được tệp rỗng hợp lệ', () => {
    expect(buildTelemetryExport([], 0)).toMatchObject({ sessionCount: 0, eventCount: 0, sessions: [] });
  });

  it('tên tệp telemetry-<yyyy-mm-dd>-<số phiên>-phien.json theo giờ máy', () => {
    const local = new Date(2026, 0, 5, 23, 59).getTime();
    expect(exportFileName(local, 3)).toBe('telemetry-2026-01-05-3-phien.json');
    expect(exportFileName(local, 0)).toBe('telemetry-2026-01-05-0-phien.json');
  });

  it('downloadJson tạo liên kết tải với đúng tên tệp và nội dung JSON', async () => {
    const created: Blob[] = [];
    const origCreate = URL.createObjectURL;
    const origRevoke = URL.revokeObjectURL;
    URL.createObjectURL = vi.fn((b: Blob) => {
      created.push(b);
      return 'blob:thu';
    }) as typeof URL.createObjectURL;
    URL.revokeObjectURL = vi.fn();
    const clicked: string[] = [];
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push(this.download);
    });
    try {
      expect(downloadJson('telemetry-2026-01-05-1-phien.json', { a: 1 })).toBe(true);
      expect(clicked).toEqual(['telemetry-2026-01-05-1-phien.json']);
      expect(JSON.parse(await created[0]!.text())).toEqual({ a: 1 });
      expect(document.querySelector('a[download]')).toBeNull();
    } finally {
      click.mockRestore();
      URL.createObjectURL = origCreate;
      URL.revokeObjectURL = origRevoke;
    }
  });
});
