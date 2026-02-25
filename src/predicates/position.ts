import type { ChainOptions, PredicateMeta } from "../types.js";
import { escapeForRegex } from "../utils/escape.js";

function buildPositionPredicate(
  name: string,
  testFn: (input: string) => boolean,
  patternFragment: string | null
): PredicateMeta {
  return {
    name,
    test: testFn,
    ...(patternFragment !== null && {
      patternSource: () => patternFragment,
    }),
  };
}

export function createStartsWith(needle: string | RegExp, options?: ChainOptions): PredicateMeta {
  return buildPositionPredicate(
    `startsWith(${needle instanceof RegExp ? needle.source : JSON.stringify(needle)})`,
    (input) => {
      if (typeof needle === "string" && needle === "") return true;
      const re =
        needle instanceof RegExp
          ? needle
          : new RegExp(`^${escapeForRegex(needle)}`, options?.i ? "i" : "");
      return re.test(input);
    },
    typeof needle === "string" ? (needle === "" ? "" : `^${escapeForRegex(needle)}`) : null
  );
}

export function createEndsWith(needle: string | RegExp, options?: ChainOptions): PredicateMeta {
  return buildPositionPredicate(
    `endsWith(${needle instanceof RegExp ? needle.source : JSON.stringify(needle)})`,
    (input) => {
      if (typeof needle === "string" && needle === "") return true;
      const re =
        needle instanceof RegExp
          ? needle
          : new RegExp(`${escapeForRegex(needle)}$`, options?.i ? "i" : "");
      return re.test(input);
    },
    typeof needle === "string" ? (needle === "" ? "" : `${escapeForRegex(needle)}$`) : null
  );
}

export function createIncludes(needle: string | RegExp, options?: ChainOptions): PredicateMeta {
  return buildPositionPredicate(
    `includes(${needle instanceof RegExp ? needle.source : JSON.stringify(needle)})`,
    (input) => {
      if (typeof needle === "string" && needle === "") return true;
      const re =
        needle instanceof RegExp
          ? needle
          : new RegExp(escapeForRegex(needle), options?.i ? "i" : "");
      return re.test(input);
    },
    typeof needle === "string" ? (needle === "" ? "" : escapeForRegex(needle)) : null
  );
}
