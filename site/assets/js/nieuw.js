// Bingr Support: nieuw ticket (support.bingr.online/nieuw/).
(function () {
  const { sb, $, t, busy, params } = window.Bingr;
  const S = window.BingrSupport;
  const tr = t({
    nl: { docTitle: "Nieuw ticket · Bingr Support", title: "Nieuw ticket", intro: "Beschrijf je vraag of probleem zo precies mogelijk. Je krijgt meteen een ticketnummer en een bevestiging per e-mail; ons antwoord komt ook per e-mail.",
      name: "Naam", email: "E-mailadres", category: "Waar gaat het over?", platform: "Apparaat", version: "App-versie", optional: "(optioneel)", versionPh: "Bijv. 1.0.0 (74), staat in Mijn Bingr",
      subject: "Onderwerp", subjectPh: "Kort en duidelijk, bijv. Apple TV blijft hangen bij opstarten", message: "Bericht", messagePh: "Wat gebeurt er, wat had je verwacht, en wat heb je al geprobeerd?",
      chooseCat: "Kies een categorie", choosePlat: "Kies je apparaat (optioneel)", send: "Ticket versturen", sending: "Versturen…", checking: "Even controleren…",
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
      chooseCat: "Choose a category", choosePlat: "Choose your device (optional)", send: "Send ticket", sending: "Sending…", checking: "Checking…",
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

  // ---- build 95: captcha zonder derde partij (proof-of-work) ----
  // Bij het openen van het formulier een opgave ophalen (functie support, actie challenge) en die op de achtergrond oplossen:
  // een nonce zoeken waarbij SHA-256(salt + nonce) met `difficulty` nul-bits begint (gemiddeld 0,5–2 s op een telefoon).
  // In een Web Worker (inline, via een Blob), gecontroleerd met crypto.subtle; lukt dat niet (oude browser, CSP), dan in stukjes op de
  // hoofdthread. De opgave is 10 minuten geldig en maar één keer bruikbaar: na elke verzendpoging een nieuwe.
  const POW_MAX = 50000000, POW_BATCH = 200000, POW_TTL = 9 * 60 * 1000;
  // Deze functies draaien in de worker (via toString, geen eval: de CSP staat dat niet toe) en anders op de hoofdthread.
  // Zoeken met een eigen SHA-256 (WebCrypto per hash is te traag: ~20x), het gevonden getal controleren met crypto.subtle.
  function powZeroBits(b) {
    let n = 0;
    for (let i = 0; i < b.length; i++) { const x = b[i]; if (x === 0) { n += 8; continue; } return n + Math.clz32(x) - 24; }
    return n;
  }
  function powSha(salt, d, from, to) {
    // SHA-256 van salt + nonce (ASCII, < 56 bytes: één blok), zonder WebCrypto: veel sneller voor korte invoer
    const K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
    const W = new Int32Array(64), B = new Uint8Array(64);
    for (let n = from; n < to; n++) {
      const s = salt + n, L = s.length;
      if (L > 55) return null;
      B.fill(0);
      for (let i = 0; i < L; i++) B[i] = s.charCodeAt(i) & 0xff;
      B[L] = 0x80; B[62] = (L * 8) >>> 8; B[63] = (L * 8) & 0xff;
      for (let i = 0; i < 16; i++) W[i] = (B[i * 4] << 24) | (B[i * 4 + 1] << 16) | (B[i * 4 + 2] << 8) | B[i * 4 + 3];
      for (let i = 16; i < 64; i++) {
        const x = W[i - 15], y = W[i - 2];
        W[i] = (((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3)) + W[i - 7] + (((y >>> 17) | (y << 15)) ^ ((y >>> 19) | (y << 13)) ^ (y >>> 10)) + W[i - 16] | 0;
      }
      let a = 0x6a09e667, b = 0xbb67ae85 | 0, c = 0x3c6ef372, e = 0x510e527f, f = 0x9b05688c | 0, g = 0x1f83d9ab, h = 0x5be0cd19, dd = 0xa54ff53a | 0;
      for (let i = 0; i < 64; i++) {
        const t1 = h + (((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))) + ((e & f) ^ (~e & g)) + K[i] + W[i] | 0;
        const t2 = (((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))) + ((a & b) ^ (a & c) ^ (b & c)) | 0;
        h = g; g = f; f = e; e = dd + t1 | 0; dd = c; c = b; b = a; a = t1 + t2 | 0;
      }
      const h0 = (0x6a09e667 + a) >>> 0, h1 = (0xbb67ae85 + b) >>> 0;
      const z = h0 === 0 ? 32 + Math.clz32(h1) : Math.clz32(h0);
      if (z >= d) return String(n);
    }
    return null;
  }
  async function powCheck(salt, nonce, d) {
    if (typeof crypto === "undefined" || !crypto.subtle) return true;
    try { return powZeroBits(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + nonce)))) >= d; }
    catch (e) { return true; }
  }
  async function powSolve(salt, d, max, chunk, yieldFn) {
    for (let n = 0; n < max; n += chunk) {
      let from = n;
      for (;;) {
        const r = powSha(salt, d, from, n + chunk);
        if (r == null) break;
        if (await powCheck(salt, r, d)) return r;
        from = Number(r) + 1;
      }
      if (yieldFn) await yieldFn();
    }
    return null;
  }
  const POW_WORKER = [powZeroBits, powSha, powCheck, powSolve].map((f) => f.toString()).join("\n") + "\n" +
    "self.onmessage=function(e){var m=e.data;powSolve(m.salt,m.difficulty,m.max,m.batch,null)" +
    ".then(function(n){self.postMessage({nonce:n});},function(){self.postMessage({error:true});});};";
  // hoofdthread: in stukjes van 20.000 met een pauze ertussen, zodat de pagina blijft reageren
  const solveOnMain = (c) => powSolve(c.salt, c.difficulty, POW_MAX, 20000, () => new Promise((r) => setTimeout(r, 0)));
  function solveChallenge(c) {
    return new Promise((resolve, reject) => {
      let w = null, url = null, done = false;
      const stop = () => { try { if (w) w.terminate(); } catch (e) { /* al gestopt */ } try { if (url) URL.revokeObjectURL(url); } catch (e) { /* niets */ } };
      const fallback = () => { if (done) return; done = true; stop(); solveOnMain(c).then((n) => (n == null ? reject({ code: "generic" }) : resolve(n)), () => reject({ code: "generic" })); };
      try {
        if (!window.Worker || !window.Blob || !window.URL) throw new Error("geen worker");
        url = URL.createObjectURL(new Blob([POW_WORKER], { type: "text/javascript" }));
        w = new Worker(url);
        w.onmessage = (e) => {
          if (done) return;
          if (!e.data || e.data.error || e.data.nonce == null) return fallback();
          done = true; stop(); resolve(e.data.nonce);
        };
        w.onerror = (e) => { if (e && e.preventDefault) e.preventDefault(); fallback(); };
        w.postMessage({ salt: c.salt, difficulty: c.difficulty, max: POW_MAX, batch: POW_BATCH });
      } catch (e) { fallback(); }
    });
  }
  let powState = null;
  function startPow() {
    const st = { at: 0, ready: false, p: null };
    st.p = (async () => {
      const c = await S.api("challenge", {}, false);
      st.at = Date.now(); // eigen klok: een afwijkende klok op het apparaat maakt niet uit
      const nonce = await solveChallenge(c);
      st.ready = true;
      return { salt: c.salt, difficulty: c.difficulty, expires: c.expires, signature: c.signature, nonce };
    })();
    st.p.catch(() => {}); // fout: bij versturen opnieuw
    powState = st;
    return st;
  }
  const powStale = (st) => !st || (st.at && Date.now() - st.at > POW_TTL);
  async function getPow() {
    if (powStale(powState)) startPow();
    try { return await powState.p; } catch (e) { return await startPow().p; }
  }
  startPow();
  // verlopen terwijl het formulier openstaat: alvast een nieuwe, zodat versturen niet hoeft te wachten
  setInterval(() => { if (powStale(powState)) startPow(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && powStale(powState)) startPow(); });
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
      website: $("hp_fax").value, elapsed_ms: Date.now() - opened,
    };
    // snelle controle in de browser (de server controleert alles opnieuw)
    const pre = !data.name ? "name_missing" : !/^\S+@\S+\.\S+$/.test(data.email) ? "bad_email" : !data.category ? "bad_category"
      : data.subject.length < 3 ? "subject_missing" : data.message.length < 10 ? "message_too_short" : null;
    if (pre) {
      const f = { name_missing: "name", bad_email: "email", bad_category: "category", subject_missing: "subject", message_too_short: "message" }[pre];
      $("err").textContent = S.errText({ code: pre }); $(f).classList.add("invalid"); $(f).focus(); return;
    }
    // build 95: nog bezig met de captcha: "Even controleren…", daarna versturen
    busy($("send"), true, tr(powState && powState.ready && !powStale(powState) ? "sending" : "checking"));
    try {
      data.pow = await getPow();
      busy($("send"), true, tr("sending"));
      // de opgave is na deze poging gebruikt (ook bij een fout): meteen een nieuwe voor een volgende poging
      startPow();
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
