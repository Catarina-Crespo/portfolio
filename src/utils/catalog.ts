/** e.g. catalogCode('INT', 1) -> "INT_01" — mimics camera/memory-card file naming. */
export function catalogCode(prefix: string, index: number, pad = 2): string {
  return `${prefix}_${String(index).padStart(pad, '0')}`;
}
