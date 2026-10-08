// 依存なしのテスト: node --test scripts/test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { splitTcy } from "../src/shinbun.js";

const tcyOf = (s) => splitTcy(s).filter((p) => p.tcy).map((p) => p.text);

test("2桁の数字だけを縦中横にする", () => {
  assert.deepEqual(tcyOf("12億円"), ["12"]);
  assert.deepEqual(tcyOf("80人を超える"), ["80"]);
});

test("1桁・3桁以上の数字は対象外", () => {
  assert.deepEqual(tcyOf("3万冊"), []);
  assert.deepEqual(tcyOf("第12345号"), []);
  assert.deepEqual(tcyOf("2026年"), []);
});

test("日付のように2桁が別々に現れる場合は、それぞれ対象にする", () => {
  assert.deepEqual(tcyOf("2026年10月18日"), ["10", "18"]);
});

test("小数点・桁区切りでつながる数字は対象外", () => {
  assert.deepEqual(tcyOf("3.14"), []);
  assert.deepEqual(tcyOf("1,234"), []);
  assert.deepEqual(tcyOf("56.7"), []);
});

test("元の文字列を壊さずに分割できる", () => {
  for (const s of ["12億円", "a12b", "10月18日と3日", "", "数字なし"]) {
    assert.equal(splitTcy(s).map((p) => p.text).join(""), s);
  }
});
