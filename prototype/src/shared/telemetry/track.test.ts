import { beforeEach, describe, expect, it } from 'vitest';
import { clearTelemetry, configureTelemetry, getSessionId, getTelemetryEvents, newTelemetrySession, track } from './track';

describe('telemetry (hiện thực tạm trong bộ nhớ)', () => {
  beforeEach(() => {
    clearTelemetry();
    configureTelemetry({ clock: () => 1000 });
  });

  it('track() gắn mốc thời gian và mã phiên, đọc lại được', () => {
    const e = track({ type: 'part_start', part: 'intro' });
    expect(e.at).toBe(1000);
    expect(e.sessionId).toBe(getSessionId());
    expect(getTelemetryEvents()).toEqual([e]);
  });

  it('phiên mới đổi mã phiên; clear xóa sạch', () => {
    const before = getSessionId();
    const after = newTelemetrySession();
    expect(after).not.toBe(before);
    track({ type: 'game_start' });
    clearTelemetry();
    expect(getTelemetryEvents()).toEqual([]);
  });
});
