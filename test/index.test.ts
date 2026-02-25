import { describe, it, expect } from "vitest";
import { regexly } from "../src/index";

describe("regexly entry point", () => {
  it("returns chain that can call ok(), report(), explain(), build()", () => {
    const chain = regexly("");
    expect(chain.ok()).toBe(true);
    expect(chain.report().ok).toBe(true);
    expect(typeof chain.explain()).toBe("string");
    expect(chain.build()).toBe(null);
  });

  it("test() is alias of ok()", () => {
    const chain = regexly("a1").hasNumber().hasLetter();
    expect(chain.ok()).toBe(chain.test());
  });

  it("ok() and report().ok match", () => {
    const chain = regexly("ab").hasNumber().hasUppercase();
    expect(chain.ok()).toBe(false);
    expect(chain.report().ok).toBe(false);
    expect(chain.ok()).toBe(chain.report().ok);
  });

  it("report() returns passed and failed names", () => {
    const r = regexly("aB1").hasNumber().hasLetter().hasUppercase().report();
    expect(r.ok).toBe(true);
    expect(r.passed).toContain("hasNumber");
    expect(r.passed).toContain("hasLetter");
    expect(r.passed).toContain("hasUppercase");
    expect(r.failed).toHaveLength(0);
  });

  it("explain() reflects report", () => {
    const chain = regexly("a").hasNumber().hasLetter();
    const r = chain.report();
    expect(r.ok).toBe(false);
    const expl = chain.explain();
    expect(expl).toContain("Failed");
    expect(expl).toContain("hasNumber");
  });

  it("throws on non-string input", () => {
    expect(() => (regexly as (x: unknown) => unknown)(null)).toThrow(TypeError);
    expect(() => (regexly as (x: unknown) => unknown)(undefined)).toThrow(TypeError);
    expect(() => (regexly as (x: unknown) => unknown)(123)).toThrow(TypeError);
  });
});

describe("build()", () => {
  it("returns RegExp when chain has combinable predicates", () => {
    const re = regexly("a1").hasNumber().hasLetter().build();
    expect(re).toBeInstanceOf(RegExp);
    expect(re?.test("a1")).toBe(true);
    expect(re?.test("abc")).toBe(false);
  });

  it("returns null when there are no combinable predicates", () => {
    expect(regexly("x").build()).toBe(null);
    expect(regexly("abc").minLength(2).build()).toBe(null);
    expect(regexly("123").raw(/\d{3}/).build()).toBe(null);
  });

  it("build() without options does not include g flag", () => {
    const re = regexly("a1").hasNumber().hasLetter().build();
    expect(re).not.toBe(null);
    expect(re!.flags.includes("g")).toBe(false);
  });

  it("build({ global: true }) adds g flag", () => {
    const re = regexly("a1").hasNumber().hasLetter().build({ global: true });
    expect(re).not.toBe(null);
    expect(re!.flags.includes("g")).toBe(true);
  });

  it("build() with caseInsensitive chain reflects i flag", () => {
    const re = regexly("x").caseInsensitive().hasLetter().build();
    expect(re).not.toBe(null);
    expect(re!.flags.includes("i")).toBe(true);
    expect(re!.test("A")).toBe(true);
  });
});
