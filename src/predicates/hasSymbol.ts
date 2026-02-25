import type { PredicateMeta } from "../types";
import { SYMBOL_PATTERN } from "../data/symbol-pattern";

/** At least one character not in whitespace, digit, A–Z, a–z, 가–힣. Non-ASCII scripts count as symbols in MVP. */
export function createHasSymbol(): PredicateMeta {
  return {
    name: "hasSymbol",
    test: (input) => new RegExp(SYMBOL_PATTERN, "u").test(input),
    patternSource: () => SYMBOL_PATTERN,
  };
}
