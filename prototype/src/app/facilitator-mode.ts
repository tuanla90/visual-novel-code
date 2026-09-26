/** Bảng người quan sát mở bằng `?facilitator=1` (QĐ-030); người chơi không thấy. */
export function isFacilitatorMode(search: string): boolean {
  return new URLSearchParams(search).get('facilitator') === '1';
}
