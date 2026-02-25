import type { PredicateMeta } from "../types.js";

export function createHasLowercase(): PredicateMeta {
  return {
    name: "hasLowercase",
    test: (input, opts) => (opts?.i ? /[A-Za-z]/.test(input) : /[a-z]/.test(input)),
    patternSource: () => "[a-z]",
  };
}
