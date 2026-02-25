import type { PredicateMeta } from "../types";

const MAX_SOURCE_DISPLAY = 30;

/** Sanitize and truncate RegExp source for display in report() name. */
function patternSnippet(source: string): string {
  const truncated = source.slice(0, MAX_SOURCE_DISPLAY);
  const sanitized = truncated.replace(/[\s\v\f\n\r\t]/g, " ").trim() || truncated.trim();
  return sanitized || "(?)";
}

/** Raw regex escape hatch; options (e.g. caseInsensitive) are not applied. */
export function createRaw(re: RegExp): PredicateMeta {
  const snippet = patternSnippet(re.source);
  return {
    name: `raw(/${snippet}/)`,
    test: (input) => re.test(input),
  };
}
