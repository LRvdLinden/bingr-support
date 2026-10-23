// Bingr Support: Mijn tickets (support.bingr.online/mijn/). Inloggen met het Bingr-account (zelfde accounts als bingr.online);
// zonder account staan tickets die op dit apparaat zijn aangemaakt of geopend eronder.
(function () {
  const { sb, $, t, pwToggles, busy, params } = window.Bingr;
  const S = window.BingrSupport;
  const tr = t({
    nl: { docTitle: "Mijn tickets · Bingr Support", signIn: "Inloggen", authIntro: "Log in met je Bingr-account om je supporttickets te bekijken.", email: "E-mailadres", password: "Wachtwoord",
      show: "Tonen", hide: "Verbergen", forgot: "Wachtwoord vergeten?", noAccount: "Geen account?", newTicketPlain: "Je kunt ook zonder account een ticket aanmaken.",
      myTickets: "Mijn tickets", signedInAs: "Ingelogd als", signOut: "Uitloggen", newTicket: "Nieuw ticket",
      onDevice: "Op dit apparaat", onDeviceText: "Tickets die je in deze browser hebt aangemaakt of geopend.",
      forgetLocal: "Vergeet tickets op dit apparaat", forgetConfirm: "De tickets van dit apparaat vergeten? De tickets zelf blijven bestaan; je opent ze weer met de link uit je e-mail.", forgotten: "Tickets op dit apparaat vergeten.",
      none: "Je hebt nog geen supporttickets.", count1: "1 ticket", countN: "%s tickets", newReply: "Nieuw antwoord",
      banned: "Je account is geblokkeerd. Je hebt een e-mail gekregen met de reden en tot wanneer. Vragen? Ga naar support.bingr.online.", badCreds: "Onjuist e-mailadres of wachtwoord.", notConfirmed: "Bevestig eerst je e-mailadres. Kijk in je inbox.", badEmail: "Vul een geldig e-mailadres in.",
      shortPw: "Vul je wachtwoord in.", generic: "Er ging iets mis. Probeer het opnieuw.", waiting: "Even geduld…",
      resetSent: "Bestaat er een account met dit adres, dan ontvang je een e-mail om je wachtwoord opnieuw in te stellen.", last: "laatste activiteit" },
    en: { docTitle: "My tickets · Bingr Support", signIn: "Sign In", authIntro: "Sign in with your Bingr account to see your support tickets.", email: "Email", password: "Password",
      show: "Show", hide: "Hide", forgot: "Forgot password?", noAccount: "No account?", newTicketPlain: "You can also create a ticket without one.",
      myTickets: "My tickets", signedInAs: "Signed in as", signOut: "Sign out", newTicket: "New ticket",
      onDevice: "On this device", onDeviceText: "Tickets you created or opened in this browser.",
      forgetLocal: "Forget tickets on this device", forgetConfirm: "Forget the tickets on this device? The tickets themselves are kept; open them again with the link from your email.", forgotten: "Tickets on this device forgotten.",
      none: "You don't have any support tickets yet.", count1: "1 ticket", countN: "%s tickets", newReply: "New reply",
      banned: "Your account has been blocked. You received an email with the reason and until when. Questions? Go to support.bingr.online.", badCreds: "Incorrect email or password.", notConfirmed: "Confirm your email address first. Check your inbox.", badEmail: "Enter a valid email address.",
      shortPw: "Enter your password.", generic: "Something went wrong. Please try again.", waiting: "One moment…",
      resetSent: "If an account exists, you'll receive an email to reset your password.", last: "last activity" },
  });
  pwToggles(tr);
  $("authBtn").textContent = tr("signIn");

  const row = (x) => `<a class="trow" href="${S.esc(S.ticketHref("../", x.number, x.token))}">
    <span class="n">#${S.esc(x.number)}</span><span class="s">${x.unread ? `<span class="dot" title="${S.esc(tr("newReply"))}"></span>` : ""}${S.esc(x.subject)}</span>
    <span class="b">${x.status ? S.badge(x.status) : ""}</span>
    <span class="m">${x.unread ? `<b class="new-reply">${S.esc(tr("newReply"))}</b> · ` : ""}${S.esc(x.last ? `${tr("last")} ${S.ago(x.last)}` : S.ago(x.at))}</span></a>`;

  // build 97: status van onthouden tickets ophalen met de actie get (n + geheime link), in kleine porties
  // (de functie support staat 60 per minuut per IP toe). Bestaat een ticket niet meer, dan gaat het uit de lijst.
  let statusRun = 0;
  async function localStatus(l) {
    const run = ++statusRun, todo = l.slice(0, 20);
    for (let i = 0; i < todo.length; i += 4) {
      await Promise.all(todo.slice(i, i + 4).map(async (x) => {
        try {
          const r = await S.api("get", { n: String(x.n), t: x.t }, false);
          const tk = r.ticket || {};
          S.patchLocal(x.n, { status: tk.status, subject: tk.subject || x.subject, last: tk.last_reply_at || null });
        } catch (e) {
          if (e.code === "not_found") S.patchLocal(x.n, null);
        }
      }));
      if (run !== statusRun) return;
      renderLocal();
    }
  }
  function renderLocal() {
    const l = S.local();
    $("local").classList.toggle("hidden", !l.length);
    $("localList").innerHTML = l.map((x) => row({ number: x.n, token: x.t, subject: x.subject || "", at: x.at, status: x.status, last: x.last })).join("");
    return l;
  }
  function showLocal() {
    const l = renderLocal();
    if (l.length) localStatus(l);
  }
  // build 97: knop "Vergeet tickets op dit apparaat"
  $("forgetLocal").textContent = tr("forgetLocal");
  $("forgetLocal").onclick = () => {
    if (!confirm(tr("forgetConfirm"))) return;
    statusRun++;
    S.forget();
    renderLocal();
    $("authErr").innerHTML = '<span class="ok">' + S.esc(tr("forgotten")) + "</span>";
  };
  async function refresh() {
    const s = await S.session();
    if (!s) { $("list").classList.add("hidden"); $("auth").classList.remove("hidden"); showLocal(); return; }
    // ?next=nieuw: na het inloggen terug naar het formulier
    if (params.get("next") === "nieuw") { location.replace("../nieuw/"); return; }
    $("auth").classList.add("hidden"); $("list").classList.remove("hidden");
    $("who").textContent = s.user.email;
    $("tickets").innerHTML = `<p class="empty">${S.esc(tr("waiting"))}</p>`;
    try {
      const r = await S.api("mine");
      const items = r.items || [];
      $("cnt").textContent = items.length === 1 ? tr("count1") : tr("countN").replace("%s", items.length);
      $("tickets").innerHTML = items.map((x) => row({ ...x, last: x.last_reply_at })).join("") || `<p class="empty">${S.esc(tr("none"))}</p>`;
    } catch (e) {
      // geblokkeerd account (401 user_banned): uitloggen en de melding bij het inloggen
      if (e.code === "user_banned") { await Bingr.hardSignOut(); await refresh(); $("authErr").textContent = tr("banned"); return; }
      if (e.status === 401) { await Bingr.hardSignOut(); return refresh(); }
      $("tickets").innerHTML = `<p class="empty">${S.esc(S.errText(e))}</p>`;
    }
  }
  function errText(e) {
    const c = (e && (e.code || e.error_code)) || "", m = ((e && e.message) || "").toLowerCase();
    if (c === "user_banned" || m.includes("banned")) return tr("banned");
    if ((e && e.status === 429) || c === "too_many_attempts" || /rate limit|too many/.test(m)) return Bingr.tooManyText(e); // build 141
    if (c === "invalid_credentials" || m.includes("invalid login")) return tr("badCreds");
    if (c === "email_not_confirmed" || m.includes("not confirmed")) return tr("notConfirmed");
    return tr("generic");
  }
  $("authForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = $("email").value.trim(), password = $("password").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) return ($("authErr").textContent = tr("badEmail"));
    // build 141: alleen inloggen hier; een ouder wachtwoord van minder dan 8 tekens werkt nog
    if (!password) return ($("authErr").textContent = tr("shortPw"));
    busy($("authBtn"), true, tr("waiting")); $("authErr").textContent = "";
    try { const { error } = await Bingr.passwordLogin(email, password, "web"); if (error) throw error; await refresh(); } // build 141: functie login
    catch (err) { $("authErr").textContent = errText(err); }
    finally { busy($("authBtn"), false, tr("signIn")); }
  };
  $("forgot").onclick = async () => {
    const email = $("email").value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { $("authErr").textContent = tr("badEmail"); $("email").focus(); return; }
    await sb.auth.resetPasswordForEmail(email, { redirectTo: "https://bingr.online/reset/" }).catch(() => {});
    $("authErr").innerHTML = '<span class="ok">' + S.esc(tr("resetSent")) + "</span>";
  };
  // build 97: uitloggen vergeet ook de tickets op dit apparaat
  $("signOut").onclick = async (e) => { e.preventDefault(); await S.signOut(); refresh(); };
  refresh();
})();
