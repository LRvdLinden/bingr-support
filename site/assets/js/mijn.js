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
      none: "Je hebt nog geen supporttickets.", count1: "1 ticket", countN: "%s tickets", newReply: "Nieuw antwoord",
      badCreds: "Onjuist e-mailadres of wachtwoord.", notConfirmed: "Bevestig eerst je e-mailadres. Kijk in je inbox.", badEmail: "Vul een geldig e-mailadres in.",
      shortPw: "Je wachtwoord moet minstens 6 tekens hebben.", generic: "Er ging iets mis. Probeer het opnieuw.", waiting: "Even geduld…",
      resetSent: "Bestaat er een account met dit adres, dan ontvang je een e-mail om je wachtwoord opnieuw in te stellen.", last: "laatste activiteit" },
    en: { docTitle: "My tickets · Bingr Support", signIn: "Sign In", authIntro: "Sign in with your Bingr account to see your support tickets.", email: "Email", password: "Password",
      show: "Show", hide: "Hide", forgot: "Forgot password?", noAccount: "No account?", newTicketPlain: "You can also create a ticket without one.",
      myTickets: "My tickets", signedInAs: "Signed in as", signOut: "Sign out", newTicket: "New ticket",
      onDevice: "On this device", onDeviceText: "Tickets you created or opened in this browser.",
      none: "You don't have any support tickets yet.", count1: "1 ticket", countN: "%s tickets", newReply: "New reply",
      badCreds: "Incorrect email or password.", notConfirmed: "Confirm your email address first. Check your inbox.", badEmail: "Enter a valid email address.",
      shortPw: "Password must be at least 6 characters.", generic: "Something went wrong. Please try again.", waiting: "One moment…",
      resetSent: "If an account exists, you'll receive an email to reset your password.", last: "last activity" },
  });
  pwToggles(tr);
  $("authBtn").textContent = tr("signIn");

  const row = (x) => `<a class="trow" href="${S.esc(S.ticketHref("../", x.number, x.token))}">
    <span class="n">#${S.esc(x.number)}</span><span class="s">${x.unread ? `<span class="dot" title="${S.esc(tr("newReply"))}"></span>` : ""}${S.esc(x.subject)}</span>
    <span class="b">${x.status ? S.badge(x.status) : ""}</span>
    <span class="m">${x.unread ? `<b style="color:#ff8a8f">${S.esc(tr("newReply"))}</b> · ` : ""}${S.esc(x.last ? `${tr("last")} ${S.ago(x.last)}` : S.ago(x.at))}</span></a>`;

  function showLocal() {
    const l = S.local();
    $("local").classList.toggle("hidden", !l.length);
    $("localList").innerHTML = l.map((x) => row({ number: x.n, token: x.t, subject: x.subject || "", at: x.at })).join("");
  }
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
      if (e.status === 401) { await sb.auth.signOut({ scope: "local" }).catch(() => {}); return refresh(); }
      $("tickets").innerHTML = `<p class="empty">${S.esc(S.errText(e))}</p>`;
    }
  }
  function errText(e) {
    const c = (e && (e.code || e.error_code)) || "", m = ((e && e.message) || "").toLowerCase();
    if (c === "invalid_credentials" || m.includes("invalid login")) return tr("badCreds");
    if (c === "email_not_confirmed" || m.includes("not confirmed")) return tr("notConfirmed");
    return tr("generic");
  }
  $("authForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = $("email").value.trim(), password = $("password").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) return ($("authErr").textContent = tr("badEmail"));
    if (password.length < 6) return ($("authErr").textContent = tr("shortPw"));
    busy($("authBtn"), true, tr("waiting")); $("authErr").textContent = "";
    try { const { error } = await sb.auth.signInWithPassword({ email, password }); if (error) throw error; await refresh(); }
    catch (err) { $("authErr").textContent = errText(err); }
    finally { busy($("authBtn"), false, tr("signIn")); }
  };
  $("forgot").onclick = async () => {
    const email = $("email").value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { $("authErr").textContent = tr("badEmail"); $("email").focus(); return; }
    await sb.auth.resetPasswordForEmail(email, { redirectTo: "https://bingr.online/reset/" }).catch(() => {});
    $("authErr").innerHTML = '<span class="ok">' + S.esc(tr("resetSent")) + "</span>";
  };
  $("signOut").onclick = async (e) => { e.preventDefault(); await sb.auth.signOut({ scope: "local" }).catch(() => {}); refresh(); };
  refresh();
})();
