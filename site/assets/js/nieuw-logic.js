// Bingr Support: pure hulpjes voor het formulier Nieuw ticket (nieuw.js). Getest met `node --test tests/` (geen DOM, geen netwerk).
(function (root) {
  // platforms in de changelog -> platform van een ticket (ipados telt als ios; server telt niet)
  const CHANGELOG_KIND = { ios: "ios", ipados: "ios", tvos: "tvos", macos: "macos", android: "android", androidtv: "androidtv", tizen: "tizen", web: "web" };
  const ORDER = ["ios", "tvos", "macos", "android", "androidtv", "tizen", "web"];
  const parts = (v) => (String(v).match(/\d+/g) || []).map(Number);
  function compareDesc(a, b) {
    const x = parts(a), y = parts(b);
    for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (y[i] ?? -1) - (x[i] ?? -1); if (d) return d; }
    return String(a).localeCompare(String(b));
  }
  /** Nieuwste build per platform uit changelog.json: [{version:"1.0.0 (81)", build, platforms:[…]}], nieuwste eerst. */
  function knownFromChangelog(log) {
    const latest = {};
    for (const b of Array.isArray(log) ? log : []) {
      const n = Number(b && b.build);
      if (!Number.isInteger(n) || n <= 0 || !Array.isArray(b.items)) continue;
      const ver = String(b.version || "1.0.0").trim().slice(0, 20) || "1.0.0";
      for (const it of b.items) for (const p of (it && Array.isArray(it.platforms) ? it.platforms : [])) {
        const k = CHANGELOG_KIND[p];
        if (k && (!latest[k] || latest[k].build < n)) latest[k] = { build: n, version: ver };
      }
    }
    const by = new Map();
    for (const k of ORDER) {
      const l = latest[k]; if (!l) continue;
      const v = `${l.version} (${l.build})`;
      if (!by.has(v)) by.set(v, { version: v, build: l.build, platforms: [] });
      by.get(v).platforms.push(k);
    }
    return [...by.values()].sort((a, b) => compareDesc(a.version, b.version));
  }
  /**
   * Keuzes voor App-versie. Heeft het account apparaten met een versie: die versies (nieuwste eerst, "· Woonkamer, Zolder").
   * Anders de nieuwste build per platform ("1.0.0 (81) · Browser"). source = "devices" | "known" | "none".
   */
  function versionChoices(devices, known, platformLabel) {
    const label = platformLabel || ((k) => k);
    const byVer = new Map();
    for (const d of Array.isArray(devices) ? devices : []) {
      const v = d && typeof d.app_version === "string" ? d.app_version.trim() : "";
      if (!v) continue;
      if (!byVer.has(v)) byVer.set(v, []);
      if (d.name && !byVer.get(v).includes(d.name)) byVer.get(v).push(d.name);
    }
    if (byVer.size) {
      const items = [...byVer.keys()].sort(compareDesc).map((v) => {
        const names = byVer.get(v); const more = names.length > 2 ? ` +${names.length - 2}` : "";
        return { value: v, text: names.length ? `${v} · ${names.slice(0, 2).join(", ")}${more}` : v };
      });
      return { source: "devices", items };
    }
    const k = (Array.isArray(known) ? known : []).filter((x) => x && x.version);
    if (k.length) return { source: "known", items: k.map((x) => ({ value: x.version, text: `${x.version} · ${(x.platforms || []).map(label).join(", ")}`, platforms: x.platforms || [] })) };
    return { source: "none", items: [] };
  }
  /** Tekst van een apparaat in de keuzelijst: "Woonkamer · Apple TV · Bingr 1.0.0 (75)". */
  function deviceText(d) {
    const name = String((d && d.name) || "?");
    return [name, d.label && d.label.toLowerCase() !== name.toLowerCase() && !name.toLowerCase().startsWith(d.label.toLowerCase()) ? d.label : "",
      d.app_version ? "Bingr " + d.app_version : ""].filter(Boolean).join(" · ");
  }
  const api = { knownFromChangelog, versionChoices, deviceText, compareDesc };
  if (typeof module === "object" && module.exports) module.exports = api; else root.BingrNieuw = api;
})(typeof window !== "undefined" ? window : globalThis);
