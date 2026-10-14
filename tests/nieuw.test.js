// node --test tests/*.test.js   (pure logica van het formulier Nieuw ticket, zonder DOM of netwerk)
const test = require("node:test");
const assert = require("node:assert/strict");
const L = require("../site/assets/js/nieuw-logic.js");

const LOG = [
  { build: 81, version: "1.0.0", items: [{ platforms: ["web"] }] },
  { build: 80, version: "1.0.0", items: [{ platforms: ["server"] }] },
  { build: 78, version: "1.0.0", items: [{ platforms: ["ios", "ipados", "tvos"] }, { platforms: ["macos"] }] },
  { build: 75, version: "1.0.0", items: [{ platforms: ["android", "androidtv", "tizen"] }, { platforms: ["ios"] }] },
  { build: "x", items: [] }, null,
];
const LABEL = { ios: "iPhone / iPad", tvos: "Apple TV", macos: "Mac", android: "Android", androidtv: "Android TV / Google TV / Fire TV", tizen: "Samsung TV", web: "Browser" };

test("nieuwste build per platform uit de changelog", () => {
  assert.deepEqual(L.knownFromChangelog(LOG), [
    { version: "1.0.0 (81)", build: 81, platforms: ["web"] },
    { version: "1.0.0 (78)", build: 78, platforms: ["ios", "tvos", "macos"] },
    { version: "1.0.0 (75)", build: 75, platforms: ["android", "androidtv", "tizen"] },
  ]);
  assert.deepEqual(L.knownFromChangelog({}), []);
});

test("versies: eerst die van de eigen apparaten (nieuwste eerst, met namen)", () => {
  const devs = [
    { id: "a", name: "Woonkamer", app_version: "1.0.0 (75)" }, { id: "b", name: "Zolder", app_version: "1.0.0 (78)" },
    { id: "c", name: "Keuken", app_version: "1.0.0 (75)" }, { id: "d", name: "Oud", app_version: null },
  ];
  const c = L.versionChoices(devs, L.knownFromChangelog(LOG), (k) => LABEL[k]);
  assert.equal(c.source, "devices");
  assert.deepEqual(c.items.map((x) => [x.value, x.text]), [["1.0.0 (78)", "1.0.0 (78) · Zolder"], ["1.0.0 (75)", "1.0.0 (75) · Woonkamer, Keuken"]]);
});

test("versies: geen versies op de apparaten -> nieuwste build per platform", () => {
  const c = L.versionChoices([{ id: "a", name: "TV", app_version: "" }], L.knownFromChangelog(LOG), (k) => LABEL[k]);
  assert.equal(c.source, "known");
  assert.deepEqual(c.items.map((x) => x.text), ["1.0.0 (81) · Browser", "1.0.0 (78) · iPhone / iPad, Apple TV, Mac", "1.0.0 (75) · Android, Android TV / Google TV / Fire TV, Samsung TV"]);
  assert.deepEqual(L.versionChoices([], [], null), { source: "none", items: [] });
});

test("apparaattekst: soort niet dubbel", () => {
  assert.equal(L.deviceText({ name: "Apple TV - Woonkamer", label: "Apple TV", app_version: "1.0.0 (75)" }), "Apple TV - Woonkamer · Bingr 1.0.0 (75)");
  assert.equal(L.deviceText({ name: "Woonkamer", label: "Samsung TV", app_version: null }), "Woonkamer · Samsung TV");
  assert.equal(L.deviceText({ name: "Browser", label: "Browser" }), "Browser");
});
