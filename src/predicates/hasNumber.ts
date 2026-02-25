import type { PredicateMeta } from "../types.js";

export function createHasNumber(): PredicateMeta {
  return {
    name: "hasNumber",
    test: (input) => /\d/.test(input),
    patternSource: () => "\\d",
  };
}
