// Bingr Support, build 97: paginascripts die eerder inline in de HTML stonden (Content-Security-Policy script-src 'self').
// Eigen bestand van de supportsite (geen kopie uit bingr-website). Na site.js laden; instellingen als data-attributen:
//   data-title-en="…"     Engelse paginatitel (hulpartikelen)
//   data-anchors-en       Engelse ankers heten <id>-en: met Engels en een #anker daarheen scrollen (ook binnen de pagina)
//   data-legacy="hulp/"   oude links naar bingr.online/support.html#anker naar het juiste hulpartikel (voorvoegsel = pad)
// Daarnaast op elke pagina: de link Cookie-instellingen in de footer (gelijk aan bingr.online, met een onclick die de CSP
// nu tegenhoudt) opent het cookievenster via deze klik-handler.
(function () {
  "use strict";
  var me = document.currentScript, d = (me && me.dataset) || {};
  var lang = function () { return (window.BingrSite && window.BingrSite.lang) || "nl"; };
  if (d.legacy != null) {
    var m = { account: "inloggen/", sync: "inloggen/#sync", server: "afspeellijst/", profielen: "profielen/", profiles: "profielen/",
      trakt: "profielen/#trakt", installeren: "installeren/", android: "installeren/#android", androidtv: "installeren/#androidtv",
      updaten: "installeren/#updaten", samsung: "samsung/", browser: "browser/" };
    var h = "";
    try { h = decodeURIComponent(location.hash.slice(1)).replace(/-en$/, ""); } catch (e) { /* ongeldig anker */ }
    if (Object.prototype.hasOwnProperty.call(m, h)) location.replace(d.legacy + m[h]);
  }
  if (d.titleEn && lang() === "en") document.title = d.titleEn;
  if (d.anchorsEn != null) {
    var go = function () {
      if (lang() !== "en" || !location.hash) return;
      var t = null;
      try { t = document.getElementById(decodeURIComponent(location.hash.slice(1)) + "-en"); } catch (e) { /* ongeldig anker */ }
      if (t) setTimeout(function () { t.scrollIntoView(); }, 0);
    };
    go();
    addEventListener("hashchange", go);
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-consent-link]") : null;
    if (!a) return;
    e.preventDefault();
    if (window.BingrConsent) window.BingrConsent.open();
  });
})();
