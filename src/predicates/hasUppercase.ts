import type { PredicateMeta } from "../types.js";

export function createHasUppercase(): PredicateMeta {
  return {
    name: "hasUppercase",
    test: (input) => /[A-Z]/.test(input),
    patternSource: () => "[A-Z]",
  };
}
