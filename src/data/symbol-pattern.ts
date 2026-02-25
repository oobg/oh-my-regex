import { KO_PATTERN } from "./lang-pattern";

/** At least one character not in whitespace, digit, A–Z, a–z, or Hangul. Use with RegExp `u` flag. */
export const SYMBOL_PATTERN = `[^\\s\\dA-Za-z${KO_PATTERN}]`;
