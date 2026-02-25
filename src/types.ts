/**
 * Result of report(): which predicates passed and which failed.
 */
export interface Report {
  ok: boolean;
  failed: Array<{ name: string; message?: string }>;
  passed: string[];
}

/**
 * Options applied when building patterns (e.g. case-insensitive).
 */
export interface ChainOptions {
  i?: boolean;
}

/**
 * A single predicate: name, test function, and optional pattern source for combined regex.
 * - test(input): run this predicate alone (for report() and for non-combinable predicates).
 * - patternSource(options): return regex pattern fragment for combinable predicates; if absent, not combined.
 */
export interface PredicateMeta {
  name: string;
  test: (input: string) => boolean;
  patternSource?: (options: ChainOptions) => string;
}
