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
      viewTicket: "Bekijk je ticket", backHome: "Terug naar support" },
    en: { docTitle: "New ticket · Bingr Support", title: "New ticket", intro: "Describe your question or problem as precisely as possible. You'll get a ticket number and a confirmation by email right away; our reply arrives by email too.",
      name: "Name", email: "Email", category: "What is it about?", platform: "Device", version: "App version", optional: "(optional)", versionPh: "E.g. 1.0.0 (74), shown in My Bingr",
      subject: "Subject", subjectPh: "Short and clear, e.g. Apple TV hangs on startup", message: "Message", messagePh: "What happens, what did you expect, and what have you already tried?",
      chooseCat: "Choose a category", choosePlat: "Choose your device (optional)", send: "Send ticket", sending: "Sending…",
      privacy: 'We only use your details to answer your question. See the <a href="https://bingr.online/privacy.html">privacy policy</a>.',
      signedInAs: "Signed in as", signOut: "Sign out", haveAccount: "Have a Bingr account?", signInLink: "Sign in to find your tickets under My tickets.",
      doneTitle: "Ticket created", doneText: "Thanks! We've received your request and are sending a confirmation to <b>%s</b>. Keep the ticket number; our reply will arrive by email too.",
      doneNoMail: "Thanks! We've received your request. The confirmation email couldn't be sent, so keep the link below.",
      viewTicket: "View your ticket", backHome: "Back to support" },
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
  const count = () => { const n = $("message").value.length; $("count").textContent = `${n} / 5000`; $("count").classList.toggle("warn", n > 4800); };
  $("message").addEventListener("input", count); count();

  async function refresh() {
    const s = await S.session();
    const mail = s && s.user && s.user.email;
    $("who").classList.toggle("hidden", !mail); $("loginHint").classList.toggle("hidden", !!mail);
    if (mail) { $("whoMail").textContent = mail; $("email").value = mail; $("email").readOnly = true; }
    else { $("email").readOnly = false; }
  }
  $("signOut").onclick = async (e) => { e.preventDefault(); await sb.auth.signOut({ scope: "local" }).catch(() => {}); $("email").value = ""; refresh(); };

  const FIELD = { name: "name", email: "email", category: "category", platform: "platform", subject: "subject", message: "message" };
  $("f").onsubmit = async (e) => {
    e.preventDefault();
    document.querySelectorAll(".invalid").forEach((x) => x.classList.remove("invalid"));
    $("err").textContent = "";
    const data = {
      name: $("name").value.trim(), email: $("email").value.trim(), category: $("category").value, platform: $("platform").value,
      app_version: $("version").value.trim(), subject: $("subject").value.trim(), message: $("message").value.trim(),
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
