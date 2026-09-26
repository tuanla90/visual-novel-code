/** Storage giả cho test (Map), có thể cài lỗi để giả lập localStorage đầy/bị chặn. */
export class FakeStorage implements Storage {
  private map = new Map<string, string>();
  /** Đặt để `setItem` ném lỗi này. */
  failWith: Error | null = null;
  /** Đặt để mọi truy cập đọc ném lỗi (bộ nhớ bị chặn). */
  blockReads = false;

  get length(): number {
    return this.map.size;
  }
  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    if (this.blockReads) throw new Error('SecurityError');
    return this.map.get(key) ?? null;
  }
  key(index: number): string | null {
    if (this.blockReads) throw new Error('SecurityError');
    return [...this.map.keys()][index] ?? null;
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  setItem(key: string, value: string): void {
    if (this.failWith) throw this.failWith;
    this.map.set(key, String(value));
  }
  keys(): string[] {
    return [...this.map.keys()];
  }
}

export function quotaError(): Error {
  const e = new Error('The quota has been exceeded.');
  e.name = 'QuotaExceededError';
  return e;
}
