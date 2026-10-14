// Bingr Support: nieuw ticket (support.bingr.online/nieuw/).
(function () {
  const { sb, $, t, busy, params } = window.Bingr;
  const S = window.BingrSupport;
  const tr = t({
    nl: { docTitle: "Nieuw ticket · Bingr Support", title: "Nieuw ticket", intro: "Beschrijf je vraag of probleem zo precies mogelijk. Je krijgt meteen een ticketnummer en een bevestiging per e-mail; ons antwoord komt ook per e-mail.",
      name: "Naam", email: "E-mailadres", category: "Waar gaat het over?", platform: "Apparaat", version: "App-versie", optional: "(optioneel)", versionPh: "Bijv. 1.0.0 (74), staat in Mijn Bingr",
      subject: "Onderwerp", subjectPh: "Kort en duidelijk, bijv. Apple TV blijft hangen bij opstarten", message: "Bericht", messagePh: "Wat gebeurt er, wat had je verwacht, en wat heb je al geprobeerd?",
      chooseCat: "Kies een categorie", choosePlat: "Kies je apparaat (optioneel)", send: "Ticket versturen", sending: "Versturen…",
      privacy: 'We gebruiken je gegevens alleen om je vraag te beantwoorden. Zie de <a href="https://bingr.online/privacy.html">privacyverklaring</a>.',
      signedInAs: "Ingelogd als", signOut: "Uitloggen",
      doneTitle: "Ticket aangemaakt", doneText: "Bedankt! We hebben je vraag ontvangen en sturen een bevestiging naar <b>%s</b>. Bewaar het ticketnummer; je antwoord komt ook per e-mail.",
      doneNoMail: "Bedankt! We hebben je vraag ontvangen. De bevestigingsmail kon niet worden verstuurd; bewaar daarom de link hieronder.",
      viewTicket: "Bekijk je ticket", backHome: "Terug naar support",
      platformKind: "Soort apparaat", chooseDev: "Kies je apparaat (optioneel)", otherDev: "Ander apparaat…",
      lastUsed: "laatst gebruikt", dontKnow: "Weet ik niet", otherVer: "Andere versie…", versionOtherPh: "Bijv. 1.0.0 (74)",
      latestBuilds: "Nieuwste versie per apparaat", yourVersions: "Op je apparaten", devLoading: "Je apparaten laden…",
      noDevices: "Er is nog geen apparaat met dit account ingelogd. Kies hieronder het soort apparaat.",
      devError: "Je apparaten konden niet worden geladen", retry: "Opnieuw proberen",
      lbTitle: "Log in voor je eigen apparaten", lbText: "Dan kies je hieronder het apparaat en de app-versie die je gebruikt, en vind je je tickets terug bij Mijn tickets. Support heeft een eigen login: ook als je op bingr.online bent ingelogd, log je hier één keer in.",
      lbExpired: "Je sessie is verlopen. Log opnieuw in om je apparaten te kiezen.", lbSkip: "Zonder inloggen verder", haveAccount: "Heb je een Bingr-account?", lbOpenLink: "Log in om je apparaat te kiezen",
      lbEmailPh: "E-mailadres", lbPassword: "Wachtwoord", lbSignIn: "Inloggen", lbWaiting: "Even geduld…", lbForgot: "Wachtwoord vergeten?", lbNoAcc: "Nog geen account?", lbSignUp: "Maak er een",
      lbBanned: "Je account is geblokkeerd. Je hebt een e-mail gekregen met de reden en tot wanneer. Vragen? Stuur hieronder een bericht, zonder in te loggen.", lbBadCreds: "Onjuist e-mailadres of wachtwoord.", lbNotConfirmed: "Bevestig eerst je e-mailadres. Kijk in je inbox.", lbBadEmail: "Vul een geldig e-mailadres in.", lbNoPw: "Vul je wachtwoord in.",
      lbResetSent: "Bestaat er een account met dit adres, dan ontvang je een e-mail om je wachtwoord opnieuw in te stellen." },
    en: { docTitle: "New ticket · Bingr Support", title: "New ticket", intro: "Describe your question or problem as precisely as possible. You'll get a ticket number and a confirmation by email right away; our reply arrives by email too.",
      name: "Name", email: "Email", category: "What is it about?", platform: "Device", version: "App version", optional: "(optional)", versionPh: "E.g. 1.0.0 (74), shown in My Bingr",
      subject: "Subject", subjectPh: "Short and clear, e.g. Apple TV hangs on startup", message: "Message", messagePh: "What happens, what did you expect, and what have you already tried?",
      chooseCat: "Choose a category", choosePlat: "Choose your device (optional)", send: "Send ticket", sending: "Sending…",
      privacy: 'We only use your details to answer your question. See the <a href="https://bingr.online/privacy.html">privacy policy</a>.',
      signedInAs: "Signed in as", signOut: "Sign out",
      doneTitle: "Ticket created", doneText: "Thanks! We've received your request and are sending a confirmation to <b>%s</b>. Keep the ticket number; our reply will arrive by email too.",
      doneNoMail: "Thanks! We've received your request. The confirmation email couldn't be sent, so keep the link below.",
      viewTicket: "View your ticket", backHome: "Back to support",
      platformKind: "Type of device", chooseDev: "Choose your device (optional)", otherDev: "Other device…",
      lastUsed: "last used", dontKnow: "Don't know", otherVer: "Other version…", versionOtherPh: "E.g. 1.0.0 (74)",
      latestBuilds: "Latest version per device", yourVersions: "On your devices", devLoading: "Loading your devices…",
      noDevices: "No device has signed in with this account yet. Choose the type of device below.",
      devError: "Your devices couldn't be loaded", retry: "Try again",
      lbTitle: "Sign in for your own devices", lbText: "Then you can pick the device and app version you use below, and find your tickets under My tickets. Support has its own sign-in: even if you're signed in on bingr.online, sign in here once.",
      lbExpired: "Your session has expired. Sign in again to choose your devices.", lbSkip: "Continue without signing in", haveAccount: "Have a Bingr account?", lbOpenLink: "Sign in to choose your device",
      lbEmailPh: "Email", lbPassword: "Password", lbSignIn: "Sign in", lbWaiting: "One moment…", lbForgot: "Forgot password?", lbNoAcc: "No account yet?", lbSignUp: "Create one",
      lbBanned: "Your account has been blocked. You received an email with the reason and until when. Questions? Send a message below, without signing in.", lbBadCreds: "Incorrect email or password.", lbNotConfirmed: "Confirm your email address first. Check your inbox.", lbBadEmail: "Enter a valid email address.", lbNoPw: "Enter your password.",
      lbResetSent: "If an account exists, you'll receive an email to reset your password." },
  });
  const opened = Date.now();
  $("category").innerHTML = `<option value="" disabled selected>${S.esc(tr("chooseCat"))}</option>` +
    Object.entries(S.CATEGORY).map(([k, v]) => `<option value="${k}">${S.esc(v)}</option>`).join("");
  $("platform").innerHTML = `<option value="">${S.esc(tr("choosePlat"))}</option>` +
    Object.entries(S.PLATFORM).map(([k, v]) => `<option value="${k}">${S.esc(v)}</option>`).join("");
  // ?category=…&platform=… (links vanuit de app of de FAQ)
  if (S.CATEGORY[params.get("category")]) $("category").value = params.get("category");
  if (S.PLATFORM[params.get("platform")]) $("platform").value = params.get("platform");
  if (params.get("version")) $("version").value = params.get("version").slice(0, 40);
  const versionPh = $("version").placeholder;

  // ---- apparaat en app-versie ----
  // Ingelogd (functie support, actie my_devices): Apparaat = de eigen apparaten (laatst gebruikt eerst) + "Ander apparaat…"
  // (dan de gewone lijst met platforms). App-versie = de versies van die apparaten; heeft het account geen versies (of is
  // niemand ingelogd), dan de nieuwste build per platform (support/versions, anders assets/changelog.json van deze site).
  // Niet ingelogd: inlogvak bovenaan het formulier (support.bingr.online heeft een eigen login, los van bingr.online).
  // ?debug=1 toont de sessie en het ruwe antwoord van my_devices onder het formulier.
  const L = window.BingrNieuw;
  const OTHER = "__other";
  const DEBUG = params.get("debug") === "1";
  let devices = [], devUser = null, devLoad = 0, known = null, choices = { source: "none", items: [] };
  const opt = (v, text) => `<option value="${S.esc(v)}">${S.esc(text)}</option>`;
  const platLabel = (k) => S.PLATFORM[k] || k;
  function dbg(label, v) {
    if (!DEBUG) return;
    const el = $("dbg"); el.classList.remove("hidden");
    el.textContent += `[${new Date().toISOString().slice(11, 19)}] ${label}: ${typeof v === "string" ? v : JSON.stringify(v, null, 2)}\n`;
  }
  function note(html, kind) {
    $("devNote").innerHTML = html || "";
    $("devNote").className = "fhint" + (kind ? " " + kind : "") + (html ? "" : " hidden");
  }
  // nieuwste build per platform: eerst de functie (vers), anders de changelog op deze site (wordt elke nacht bijgewerkt)
  async function loadKnown() {
    if (known) return known;
    try { const r = await S.api("versions", {}, false); if (Array.isArray(r.known) && r.known.length) { known = r.known; dbg("versions", r); return known; } } catch (e) { dbg("versions fout", e); }
    try { const r = await fetch("../assets/changelog.json", { cache: "no-cache" }); known = L.knownFromChangelog(await r.json()); dbg("changelog.json", known); }
    catch (e) { known = []; dbg("changelog.json fout", String(e)); }
    return known;
  }
  function fillVersions(list, kn) {
    choices = L.versionChoices(list, kn, platLabel);
    const typed = $("versionSel").classList.contains("hidden") ? $("version").value.trim() : ($("versionSel").value === OTHER ? $("version").value.trim() : $("versionSel").value);
    if (!choices.items.length) {
      $("versionSel").classList.add("hidden"); $("versionSel").innerHTML = "";
      $("version").classList.remove("hidden"); $("version").placeholder = versionPh; $("verLbl").htmlFor = "version";
      return;
    }
    const head = choices.source === "known" ? `<optgroup label="${S.esc(tr("latestBuilds"))}">` : `<optgroup label="${S.esc(tr("yourVersions"))}">`;
    $("versionSel").innerHTML = opt("", tr("dontKnow")) + head + choices.items.map((x) => opt(x.value, x.text)).join("") + "</optgroup>" + opt(OTHER, tr("otherVer"));
    $("versionSel").classList.remove("hidden"); $("verLbl").htmlFor = "versionSel";
    setVersion(typed);
  }
  function genericMode() {
    devices = [];
    $("device").classList.add("hidden"); $("device").innerHTML = ""; $("device").disabled = false;
    $("platRow").classList.remove("hidden"); $("devLbl").htmlFor = "platform";
    $("devInfo").classList.add("hidden");
  }
  function loadingMode() {
    genericMode();
    $("device").innerHTML = opt("", tr("devLoading")); $("device").disabled = true;
    $("device").classList.remove("hidden"); $("platRow").classList.add("hidden"); $("devLbl").htmlFor = "device";
    note("");
  }
  function deviceMode(list) {
    devices = list;
    note("");
    $("device").disabled = false;
    $("device").innerHTML = opt("", tr("chooseDev")) + list.map((d) => opt(d.id, L.deviceText(d))).join("") + opt(OTHER, tr("otherDev"));
    $("device").classList.remove("hidden"); $("devLbl").htmlFor = "device";
    // vooraf ingevuld via ?platform= en ?version= (links vanuit de app): het laatst gebruikte apparaat van dat platform
    const typed = params.get("version") ? params.get("version").slice(0, 40) : "";
    const pre = list.find((d) => d.kind && d.kind === params.get("platform"));
    $("device").value = pre ? pre.id : "";
    onDevice();
    if (typed || !pre) setVersion(typed);
  }
  function setVersion(v) {
    if ($("versionSel").classList.contains("hidden")) { $("version").value = v || ""; return; }
    const known_ = !v || [...$("versionSel").options].some((o) => o.value === v && v !== OTHER);
    $("versionSel").value = known_ ? (v || "") : OTHER;
    $("version").value = known_ ? "" : v;
    onVersion();
  }
  function onVersion() {
    if ($("versionSel").classList.contains("hidden")) return;
    const other = $("versionSel").value === OTHER;
    $("version").classList.toggle("hidden", !other);
    $("version").placeholder = tr("versionOtherPh");
    if (other && document.activeElement === $("versionSel")) $("version").focus();
  }
  function onDevice() {
    const v = $("device").value;
    const d = devices.find((x) => x.id === v);
    $("platRow").classList.toggle("hidden", v !== OTHER);
    if (v !== OTHER) $("platform").value = d && d.kind ? d.kind : "";
    if (d) setVersion(d.app_version || "");
    else if (v === OTHER && document.activeElement === $("device")) $("platform").focus();
    const info = d ? [d.os_version, d.last_seen_at ? `${tr("lastUsed")} ${S.ago(d.last_seen_at)}` : ""].filter(Boolean).join(" · ") : "";
    $("devInfo").textContent = info;
    $("devInfo").classList.toggle("hidden", !info);
  }
  $("device").onchange = onDevice;
  $("versionSel").onchange = onVersion;
  async function loadDevices(user, force) {
    if (devUser === user.id && !force) return;
    devUser = user.id;
    const n = ++devLoad;
    loadingMode();
    try {
      const r = await S.api("my_devices");
      if (n !== devLoad) return;
      dbg("my_devices", r);
      const list = Array.isArray(r.devices) ? r.devices : [];
      if (Array.isArray(r.known) && r.known.length) known = r.known;
      const kn = known && known.length ? known : await loadKnown();
      if (n !== devLoad) return;
      fillVersions(list, kn);
      if (list.length) deviceMode(list);
      else { genericMode(); note(S.esc(tr("noDevices"))); }
    } catch (e) {
      if (n !== devLoad) return;
      dbg("my_devices fout", e);
      devUser = null; genericMode();
      fillVersions([], await loadKnown());
      if (e && e.code === "user_banned") {
        // geblokkeerd account: uitloggen, melding in het inlogvak; een vraag sturen kan wel als gast
        await Bingr.hardSignOut();
        await refresh(); showLogin(true); $("lbErr").textContent = tr("lbBanned");
        return;
      }
      if (e && e.status === 401) {
        // sessie verlopen of ingetrokken: lokaal uitloggen en het inlogvak tonen
        await Bingr.hardSignOut();
        expiredHint = true; refresh();
        return;
      }
      note(`${S.esc(tr("devError"))} (${S.esc(e && e.code || "?")}${e && e.status ? " " + e.status : ""}) <a href="#" id="devRetry" role="button">${S.esc(tr("retry"))}</a>`, "bad");
      $("devRetry").onclick = () => loadDevices(user, true);
    }
  }

  // ---- inloggen op het formulier ----
  let expiredHint = false, lbSkipped = false;
  function lbErr(e) {
    const c = (e && (e.code || e.error_code)) || "", m = ((e && e.message) || "").toLowerCase();
    if (c === "user_banned" || m.includes("banned")) return tr("lbBanned");
    if (c === "invalid_credentials" || m.includes("invalid login")) return tr("lbBadCreds");
    if (c === "email_not_confirmed" || m.includes("not confirmed")) return tr("lbNotConfirmed");
    if (m.includes("fetch") || m.includes("network")) return S.errText({ code: "network" });
    return S.errText({});
  }
  async function signIn() {
    const email = $("lbEmail").value.trim(), password = $("lbPassword").value;
    $("lbErr").textContent = "";
    if (!/^\S+@\S+\.\S+$/.test(email)) { $("lbErr").textContent = tr("lbBadEmail"); $("lbEmail").focus(); return; }
    if (!password) { $("lbErr").textContent = tr("lbNoPw"); $("lbPassword").focus(); return; }
    busy($("lbBtn"), true, tr("lbWaiting"));
    try {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      $("lbPassword").value = ""; expiredHint = false;
      await refresh();
    } catch (err) { dbg("inloggen fout", { code: err && err.code, message: err && err.message }); $("lbErr").textContent = lbErr(err); }
    finally { busy($("lbBtn"), false, tr("lbSignIn")); }
  }
  $("lbBtn").onclick = signIn;
  // Enter in het inlogvak = inloggen (niet het ticket versturen)
  ["lbEmail", "lbPassword"].forEach((id) => $(id).addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); signIn(); } }));
  $("lbForgot").onclick = async () => {
    const email = $("lbEmail").value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { $("lbErr").textContent = tr("lbBadEmail"); $("lbEmail").focus(); return; }
    await sb.auth.resetPasswordForEmail(email, { redirectTo: "https://bingr.online/reset/" }).catch(() => {});
    $("lbErr").innerHTML = '<span class="ok">' + S.esc(tr("lbResetSent")) + "</span>";
  };
  $("lbSkip").onclick = () => { lbSkipped = true; showLogin(false); };
  $("lbOpen").onclick = () => { lbSkipped = false; showLogin(true); $("lbEmail").focus(); };
  function showLogin(on) {
    $("loginBox").classList.toggle("hidden", !on);
    $("lbCollapsed").classList.toggle("hidden", on);
    $("lbText").textContent = tr(expiredHint ? "lbExpired" : "lbText");
  }
  const count = () => { const n = $("message").value.length; $("count").textContent = `${n} / 5000`; $("count").classList.toggle("warn", n > 4800); };
  $("message").addEventListener("input", count); count();

  async function refresh() {
    const s = await S.session();
    const mail = s && s.user && s.user.email;
    dbg("sessie", s ? { email: mail, user_id: s.user && s.user.id, expires_at: s.expires_at ? new Date(s.expires_at * 1000).toISOString() : null } : "niet ingelogd op support.bingr.online");
    $("who").classList.toggle("hidden", !mail);
    if (mail) {
      $("loginBox").classList.add("hidden"); $("lbCollapsed").classList.add("hidden");
      $("whoMail").textContent = mail; $("email").value = mail; $("email").readOnly = true; loadDevices(s.user);
    } else {
      if ($("email").readOnly) $("email").value = "";
      $("email").readOnly = false; devUser = null; devLoad++; genericMode(); note("");
      showLogin(!lbSkipped);
      fillVersions([], await loadKnown());
    }
  }
  $("signOut").onclick = async (e) => { e.preventDefault(); await Bingr.hardSignOut(); $("email").value = ""; refresh(); };

  const FIELD = { name: "name", email: "email", category: "category", platform: "platform", subject: "subject", message: "message" };
  $("f").onsubmit = async (e) => {
    e.preventDefault();
    document.querySelectorAll(".invalid").forEach((x) => x.classList.remove("invalid"));
    $("err").textContent = "";
    const dev = devices.length ? $("device").value : "";
    const sel = !$("versionSel").classList.contains("hidden");
    const ver = sel && $("versionSel").value !== OTHER ? $("versionSel").value : $("version").value.trim();
    const data = {
      name: $("name").value.trim(), email: $("email").value.trim(), category: $("category").value, platform: $("platform").value,
      device_id: dev && dev !== OTHER ? dev : "", app_version: ver, subject: $("subject").value.trim(), message: $("message").value.trim(),
      website: $("website").value, elapsed_ms: Date.now() - opened,
    };
    // snelle controle in de browser (de server controleert alles opnieuw)
    const pre = !data.name ? "name_missing" : !/^\S+@\S+\.\S+$/.test(data.email) ? "bad_email" : !data.category ? "bad_category"
      : data.subject.length < 3 ? "subject_missing" : data.message.length < 10 ? "message_too_short" : null;
    if (pre) {
      const f = { name_missing: "name", bad_email: "email", bad_category: "category", subject_missing: "subject", message_too_short: "message" }[pre];
      $("err").textContent = S.errText({ code: pre }); $(f).classList.add("invalid"); $(f).focus(); return;
    }
    busy($("send"), true, tr("sending"));
    try {
      const r = await S.api("create", data);
      S.remember(r.number, r.token, data.subject);
      $("doneNo").textContent = "#" + r.number;
      $("doneText").innerHTML = r.email_sent ? tr("doneText").replace("%s", S.esc(data.email)) : S.esc(tr("doneNoMail"));
      $("doneLink").href = S.ticketHref("../", r.number, r.token);
      $("formWrap").classList.add("hidden"); $("head").classList.add("hidden"); $("done").classList.remove("hidden");
      scrollTo(0, 0);
    } catch (err) {
      $("err").textContent = S.errText(err);
      if (err.field && FIELD[err.field]) { $(FIELD[err.field]).classList.add("invalid"); $(FIELD[err.field]).focus(); }
    } finally { busy($("send"), false, tr("send")); }
  };
  // Nooit refresh() zelf als callback teruggeven: supabase-js wacht op de callback terwijl het de sessie-lock vasthoudt
  // (INITIAL_SESSION), en refresh() vraagt via getSession() diezelfde lock: dan blijft de pagina hangen alsof je niet
  // bent ingelogd (oorzaak build 77–81: wel ingelogd, toch de hele lijst en geen versies). Daarom pas na de callback.
  sb.auth.onAuthStateChange((ev) => { if (ev === "SIGNED_IN" || ev === "SIGNED_OUT") setTimeout(refresh, 0); });
  refresh();
})();
