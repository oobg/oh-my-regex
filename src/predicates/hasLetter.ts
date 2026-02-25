import type { PredicateMeta } from "../types.js";

export function createHasLetter(): PredicateMeta {
  return {
    name: "hasLetter",
    test: (input) => /[A-Za-z]/.test(input),
    patternSource: (opts) => (opts?.i ? "[a-z]" : "[A-Za-z]"),
  };
}
