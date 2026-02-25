import type { PredicateMeta } from "../types.js";

export function createHasLowercase(): PredicateMeta {
  return {
    name: "hasLowercase",
    test: (input) => /[a-z]/.test(input),
    patternSource: () => "[a-z]",
  };
}
