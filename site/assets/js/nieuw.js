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
      signedInAs: "Ingelogd als", signOut: "Uitloggen", haveAccount: "Heb je een Bingr-account?", signInLink: "Log in, dan vind je je tickets terug bij Mijn tickets.",
      doneTitle: "Ticket aangemaakt", doneText: "Bedankt! We hebben je vraag ontvangen en sturen een bevestiging naar <b>%s</b>. Bewaar het ticketnummer; je antwoord komt ook per e-mail.",
      doneNoMail: "Bedankt! We hebben je vraag ontvangen. De bevestigingsmail kon niet worden verstuurd; bewaar daarom de link hieronder.",
      viewTicket: "Bekijk je ticket", backHome: "Terug naar support",
      platformKind: "Soort apparaat", devLogin: "Log in om je apparaat te kiezen", chooseDev: "Kies je apparaat (optioneel)", otherDev: "Ander apparaat…",
      lastUsed: "laatst gebruikt", dontKnow: "Weet ik niet", otherVer: "Andere versie…", versionOtherPh: "Bijv. 1.0.0 (74)" },
    en: { docTitle: "New ticket · Bingr Support", title: "New ticket", intro: "Describe your question or problem as precisely as possible. You'll get a ticket number and a confirmation by email right away; our reply arrives by email too.",
      name: "Name", email: "Email", category: "What is it about?", platform: "Device", version: "App version", optional: "(optional)", versionPh: "E.g. 1.0.0 (74), shown in My Bingr",
      subject: "Subject", subjectPh: "Short and clear, e.g. Apple TV hangs on startup", message: "Message", messagePh: "What happens, what did you expect, and what have you already tried?",
      chooseCat: "Choose a category", choosePlat: "Choose your device (optional)", send: "Send ticket", sending: "Sending…",
      privacy: 'We only use your details to answer your question. See the <a href="https://bingr.online/privacy.html">privacy policy</a>.',
      signedInAs: "Signed in as", signOut: "Sign out", haveAccount: "Have a Bingr account?", signInLink: "Sign in to find your tickets under My tickets.",
      doneTitle: "Ticket created", doneText: "Thanks! We've received your request and are sending a confirmation to <b>%s</b>. Keep the ticket number; our reply will arrive by email too.",
      doneNoMail: "Thanks! We've received your request. The confirmation email couldn't be sent, so keep the link below.",
      viewTicket: "View your ticket", backHome: "Back to support",
      platformKind: "Type of device", devLogin: "Sign in to choose your device", chooseDev: "Choose your device (optional)", otherDev: "Other device…",
      lastUsed: "last used", dontKnow: "Don't know", otherVer: "Other version…", versionOtherPh: "E.g. 1.0.0 (74)" },
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

  // ---- ingelogd: apparaten van het account (functie support, actie my_devices) ----
  // Apparaat: de eigen apparaten (laatst gebruikt eerst) + "Ander apparaat…" (dan de gewone lijst met platforms).
  // App-versie: de versies van die apparaten (nieuwste eerst), "Weet ik niet" en "Andere versie…" (dan vrije tekst);
  // bij het kiezen van een apparaat wordt de versie van dat apparaat voorgeselecteerd.
  const OTHER = "__other";
  let devices = [], devUser = null, devLoad = 0;
  const devText = (d) => [d.name, d.label && d.label.toLowerCase() !== String(d.name).toLowerCase() ? d.label : "", d.app_version ? "Bingr " + d.app_version : ""].filter(Boolean).join(" · ");
  const opt = (v, text) => `<option value="${S.esc(v)}">${S.esc(text)}</option>`;
  function genericMode(hint) {
    devices = [];
    $("device").classList.add("hidden"); $("device").innerHTML = "";
    $("platRow").classList.remove("hidden"); $("devLbl").htmlFor = "platform";
    $("versionSel").classList.add("hidden"); $("versionSel").innerHTML = "";
    $("version").classList.remove("hidden"); $("version").placeholder = versionPh; $("verLbl").htmlFor = "version";
    $("devInfo").classList.add("hidden");
    $("devHint").classList.toggle("hidden", !hint);
  }
  function deviceMode(list, versions) {
    devices = list;
    $("devHint").classList.add("hidden");
    $("device").innerHTML = opt("", tr("chooseDev")) + list.map((d) => opt(d.id, devText(d))).join("") + opt(OTHER, tr("otherDev"));
    $("device").classList.remove("hidden"); $("devLbl").htmlFor = "device";
    $("versionSel").innerHTML = opt("", tr("dontKnow")) + versions.map((v) => opt(v, v)).join("") + opt(OTHER, tr("otherVer"));
    $("versionSel").classList.remove("hidden"); $("verLbl").htmlFor = "versionSel";
    // vooraf ingevuld via ?platform= en ?version= (links vanuit de app): het laatst gebruikte apparaat van dat platform
    const typed = $("version").value.trim();
    const pre = list.find((d) => d.kind && d.kind === params.get("platform"));
    $("device").value = pre ? pre.id : "";
    onDevice();
    if (typed || !pre) setVersion(typed);
  }
  function setVersion(v) {
    const known = !v || [...$("versionSel").options].some((o) => o.value === v && v !== OTHER);
    $("versionSel").value = known ? (v || "") : OTHER;
    $("version").value = known ? "" : v;
    onVersion();
  }
  function onVersion() {
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
  async function loadDevices(user) {
    if (devUser === user.id) return;
    devUser = user.id;
    const n = ++devLoad;
    try {
      const r = await S.api("my_devices");
      if (n !== devLoad) return;
      if (r.devices && r.devices.length) deviceMode(r.devices, r.versions || []);
      else genericMode(false);
    } catch (e) { if (n === devLoad) { devUser = null; genericMode(false); } }
  }
  const count = () => { const n = $("message").value.length; $("count").textContent = `${n} / 5000`; $("count").classList.toggle("warn", n > 4800); };
  $("message").addEventListener("input", count); count();

  async function refresh() {
    const s = await S.session();
    const mail = s && s.user && s.user.email;
    $("who").classList.toggle("hidden", !mail); $("loginHint").classList.toggle("hidden", !!mail);
    if (mail) { $("whoMail").textContent = mail; $("email").value = mail; $("email").readOnly = true; loadDevices(s.user); }
    else { $("email").readOnly = false; devUser = null; devLoad++; genericMode(true); }
  }
  $("signOut").onclick = async (e) => { e.preventDefault(); await Bingr.hardSignOut(); $("email").value = ""; refresh(); };

  const FIELD = { name: "name", email: "email", category: "category", platform: "platform", subject: "subject", message: "message" };
  $("f").onsubmit = async (e) => {
    e.preventDefault();
    document.querySelectorAll(".invalid").forEach((x) => x.classList.remove("invalid"));
    $("err").textContent = "";
    const dev = devices.length ? $("device").value : "";
    const ver = devices.length && $("versionSel").value !== OTHER ? $("versionSel").value : $("version").value.trim();
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
  sb.auth.onAuthStateChange(() => refresh());
  refresh();
})();
