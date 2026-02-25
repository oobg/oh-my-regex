import type { PredicateMeta } from "../types.js";

/** At least one character that is not whitespace, digit, A–Z, a–z, or 가–힣 */
const SYMBOL_PATTERN = "[^\\s\\dA-Za-z가-힣]";

export function createHasSymbol(): PredicateMeta {
  return {
    name: "hasSymbol",
    test: (input) => new RegExp(SYMBOL_PATTERN).test(input),
    patternSource: () => SYMBOL_PATTERN,
  };
}
