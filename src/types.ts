/**
 * Result of report(): which predicates passed and which failed.
 * - failed[].message: Optional; reserved for future use. MVP does not set this (only name is set).
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
 * Options for build(): control how the combined regex is built.
 * - global: when true, add the `g` flag to the returned RegExp (for global search/match).
 */
export interface BuildOptions {
  global?: boolean;
}

/**
 * A single predicate: name, test function, and optional pattern source for combined regex.
 * - test(input, options): run this predicate alone (for report() and for non-combinable predicates).
 *   Receives chain options (e.g. caseInsensitive) so report() and ok() stay consistent.
 * - patternSource(options): return regex pattern fragment for combinable predicates; if absent, not combined.
 */
export interface PredicateMeta {
  name: string;
  test: (input: string, options?: ChainOptions) => boolean;
  patternSource?: (options: ChainOptions) => string;
}
