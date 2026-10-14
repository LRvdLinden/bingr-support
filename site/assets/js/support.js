// Bingr Support: gedeelde hulpjes voor de pagina's nieuw/, ticket/ en mijn/ (na account.js, dat window.Bingr klaarzet).
// Praat met de Edge Function `support` (staat in LRvdLinden/iptv-ios-appletv). Inloggen = dezelfde Bingr-accounts als bingr.online.
(function () {
  const { sb, lang, cfg } = window.Bingr;
  const nl = lang === "nl";
  const FN = cfg.url + "/functions/v1/support";

  const STATUS = nl
    ? { new: "Nieuw", open: "In behandeling", pending: "Wacht op jouw reactie", resolved: "Opgelost", closed: "Gesloten" }
    : { new: "New", open: "In progress", pending: "Awaiting your reply", resolved: "Resolved", closed: "Closed" };
  const CATEGORY = nl
    ? { account: "Account en inloggen", afspelen: "Afspelen en streams", apps: "Apps en installeren", website: "Website en webspeler", overig: "Overig" }
    : { account: "Account and sign-in", afspelen: "Playback and streams", apps: "Apps and installing", website: "Website and web player", overig: "Other" };
  const PLATFORM = { ios: "iPhone / iPad", tvos: "Apple TV", macos: "Mac", android: "Android", androidtv: "Android TV / Google TV / Fire TV", tizen: "Samsung TV", web: "Browser" };
  const ERRORS = nl ? {
    name_missing: "Vul je naam in.", bad_email: "Vul een geldig e-mailadres in.", bad_category: "Kies een categorie.", bad_platform: "Kies een geldig apparaat.",
    subject_missing: "Vul een onderwerp in (minstens 3 tekens).", subject_too_long: "Het onderwerp is te lang (max. 120 tekens).",
    message_too_short: "Beschrijf je vraag iets uitgebreider (minstens 10 tekens).", message_too_long: "Je bericht is te lang (max. 5000 tekens).",
    message_missing: "Typ eerst een bericht.", too_many_links: "Je bericht bevat te veel links.", spam: "Je bericht kon niet worden verstuurd. Probeer het over een paar seconden opnieuw.",
    rate_limited: "Je hebt net al een paar tickets verstuurd. Probeer het over een uur opnieuw, of reageer op je bestaande ticket.",
    closed: "Dit ticket is gesloten.", not_found: "Ticket niet gevonden.", network: "Geen verbinding. Controleer je internet en probeer het opnieuw.",
    generic: "Er ging iets mis. Probeer het opnieuw.",
  } : {
    name_missing: "Enter your name.", bad_email: "Enter a valid email address.", bad_category: "Choose a category.", bad_platform: "Choose a valid device.",
    subject_missing: "Enter a subject (at least 3 characters).", subject_too_long: "The subject is too long (max. 120 characters).",
    message_too_short: "Please describe your question in a bit more detail (at least 10 characters).", message_too_long: "Your message is too long (max. 5000 characters).",
    message_missing: "Type a message first.", too_many_links: "Your message contains too many links.", spam: "Your message couldn't be sent. Please try again in a few seconds.",
    rate_limited: "You've just sent a few tickets. Please try again in an hour, or reply to your existing ticket.",
    closed: "This ticket is closed.", not_found: "Ticket not found.", network: "No connection. Check your internet and try again.",
    generic: "Something went wrong. Please try again.",
  };
  const errText = (e) => ERRORS[(e && e.code) || ""] || ERRORS.generic;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const linkify = (s) => s.replace(/https:\/\/[^\s<"']+[^\s<"'.,;:!?)]/g, (u) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`);
  const loc = nl ? "nl-NL" : "en-GB";
  const fmtDateTime = (v) => (v ? new Date(v).toLocaleString(loc, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "");
  function ago(v) {
    if (!v) return "";
    const m = Math.round((Date.now() - Date.parse(v)) / 60000);
    if (m < 2) return nl ? "zojuist" : "just now";
    if (m < 60) return nl ? `${m} min geleden` : `${m} min ago`;
    const h = Math.round(m / 60);
    if (h < 24) return nl ? `${h} uur geleden` : `${h} hour${h === 1 ? "" : "s"} ago`;
    const d = Math.round(h / 24);
    if (d === 1) return nl ? "gisteren" : "yesterday";
    if (d < 30) return nl ? `${d} dagen geleden` : `${d} days ago`;
    return new Date(v).toLocaleDateString(loc, { day: "numeric", month: "short", year: "numeric" });
  }
  const badge = (st) => `<span class="sbadge ${esc(st)}">${esc(STATUS[st] || st)}</span>`;

  async function session() {
    try { const { data } = await sb.auth.getSession(); return data.session; } catch (e) { return null; }
  }
  /** Roept de functie support aan; met inloggen als er een sessie is. Fout: throw {code, status}. */
  async function api(action, data = {}, withAuth = true) {
    const headers = { "Content-Type": "application/json", apikey: cfg.anonKey };
    const s = withAuth ? await session() : null;
    if (s) headers.Authorization = "Bearer " + s.access_token;
    let r;
    try { r = await fetch(FN, { method: "POST", headers, body: JSON.stringify({ action, lang, ...data }) }); }
    catch (e) { throw { code: "network" }; }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw { code: j.error || "generic", status: r.status, field: j.field };
    return j;
  }

  // tickets op dit apparaat (zonder account): nummer + geheime link, alleen in deze browser
  const KEY = "bingr.support.tickets";
  function local() { try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter((x) => x && x.n && x.t); } catch (e) { return []; } }
  function remember(n, t, subject) {
    try { const l = local().filter((x) => x.n !== n); l.unshift({ n, t, subject, at: new Date().toISOString() }); localStorage.setItem(KEY, JSON.stringify(l.slice(0, 20))); } catch (e) { /* privévenster */ }
  }
  const ticketHref = (base, n, t) => `${base}ticket/?n=${encodeURIComponent(n)}&t=${encodeURIComponent(t)}`;

  window.BingrSupport = { api, session, errText, esc, linkify, fmtDateTime, ago, badge, STATUS, CATEGORY, PLATFORM, local, remember, ticketHref, nl };
})();
