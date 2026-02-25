/**
 * Escape special regex characters in a string so it can be used literally in a RegExp.
 * Used for startsWith/endsWith/includes when needle is a string.
 */
export function escapeForRegex(str: string): string {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
