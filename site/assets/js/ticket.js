// Bingr Support: één ticket bekijken en beantwoorden (support.bingr.online/ticket/?n=1001&t=<geheime link>).
// Zonder t lukt het alleen als je ingelogd bent met het account waaraan het ticket gekoppeld is (security H1: nooit op
// e-mailadres). Met t en ingelogd kun je een ticket zonder account aan je account koppelen (actie link); dan staat het in
// Mijn tickets.
(function () {
  const { $, t, busy, params } = window.Bingr;
  const S = window.BingrSupport;
  const tr = t({
    nl: { docTitle: "Ticket · Bingr Support", loading: "Ticket laden…", ticket: "Supportticket", allTickets: "Mijn tickets",
      nfTitle: "Ticket niet gevonden", nfText: "Deze link klopt niet (meer), of het ticket hoort bij een ander account. Gebruik de link uit je e-mail, of log in bij Mijn tickets.",
      myTickets: "Naar Mijn tickets", newTicket: "Nieuw ticket aanmaken", you: "Jij", support: "Bingr Support", statusTo: "Status:",
      created: "Aangemaakt", category: "Categorie", device: "Apparaat", version: "Versie",
      yourReply: "Jouw reactie", replyPh: "Typ je reactie…", send: "Reactie versturen", sending: "Versturen…", close: "Ticket sluiten",
      closeConfirm: "Dit ticket sluiten? Je kunt er daarna niet meer op reageren.", sent: "Je reactie is verstuurd.",
      closedTitle: "Dit ticket is gesloten.", closedText: "Heb je nog een vraag?",
      linkText: "Dit ticket hoort nog niet bij je account.", linkBtn: "Koppel aan mijn account", linked: "Het ticket staat nu in Mijn tickets.",
      linkedElsewhere: "Dit ticket hoort al bij een ander account." },
    en: { docTitle: "Ticket · Bingr Support", loading: "Loading ticket…", ticket: "Support ticket", allTickets: "My tickets",
      nfTitle: "Ticket not found", nfText: "This link is no longer valid, or the ticket belongs to a different account. Use the link from your email, or sign in at My tickets.",
      myTickets: "Go to My tickets", newTicket: "Create a new ticket", you: "You", support: "Bingr Support", statusTo: "Status:",
      created: "Created", category: "Category", device: "Device", version: "Version",
      yourReply: "Your reply", replyPh: "Type your reply…", send: "Send reply", sending: "Sending…", close: "Close ticket",
      closeConfirm: "Close this ticket? You won't be able to reply to it afterwards.", sent: "Your reply has been sent.",
      closedTitle: "This ticket is closed.", closedText: "Still have a question?",
      linkText: "This ticket isn't linked to your account yet.", linkBtn: "Link to my account", linked: "The ticket is now in My tickets.",
      linkedElsewhere: "This ticket already belongs to another account." },
  });
  let n = (params.get("n") || "").replace(/^#/, "");
  let tok = params.get("t") || "";
  // build 97: de geheime link niet in de adresbalk laten staan (geschiedenis, schermdelen, bladwijzers): n en t gaan naar
  // sessionStorage van dit tabblad (zo werkt herladen nog) en de URL wordt /ticket/ zonder parameters.
  if (params.has("n") || params.has("t")) {
    try { sessionStorage.setItem(S.OPEN_KEY, JSON.stringify({ n, t: tok })); } catch (e) { /* privévenster */ }
    try {
      const u = new URL(location.href);
      u.searchParams.delete("n"); u.searchParams.delete("t");
      history.replaceState(history.state, "", u.pathname + u.search + u.hash);
    } catch (e) { /* oude browser: dan blijft de link staan */ }
  } else {
    try {
      const o = JSON.parse(sessionStorage.getItem(S.OPEN_KEY) || "null");
      if (o && typeof o.n === "string") { n = o.n; tok = typeof o.t === "string" ? o.t : ""; }
    } catch (e) { /* niets onthouden */ }
  }
  const ref = () => ({ n, ...(tok ? { t: tok } : {}) });

  function msgHtml(m) {
    if (m.author === "event") return `<div class="msg event">${S.esc(tr("statusTo"))} <b>${S.esc(S.STATUS[m.body] || m.body)}</b> · ${S.esc(S.fmtDateTime(m.created_at))}</div>`;
    const who = m.author === "support" ? tr("support") : tr("you");
    return `<div class="msg ${S.esc(m.author)}"><div class="mh"><b>${S.esc(who)}</b><span>${S.esc(S.fmtDateTime(m.created_at))}</span></div><div class="mb">${S.linkify(S.esc(m.body))}</div></div>`;
  }
  async function load() {
    if (!/^\d{1,12}$/.test(n)) return notFound();
    let r;
    try { r = await S.api("get", ref()); } catch (e) { return e.code === "not_found" ? notFound() : fail(e); }
    const tk = r.ticket;
    if (tok) S.remember(tk.number, tok, tk.subject);
    document.title = `#${tk.number} ${tk.subject} · Bingr Support`;
    $("no").textContent = "#" + tk.number;
    $("badge").innerHTML = S.badge(tk.status);
    $("subj").textContent = tk.subject;
    $("meta").innerHTML = [
      [tr("created"), S.fmtDateTime(tk.created_at)], [tr("category"), S.CATEGORY[tk.category] || tk.category],
      [tr("device"), [tk.device_name, tk.platform ? (S.PLATFORM[tk.platform] || tk.platform) : ""].filter(Boolean).join(" · ")], [tr("version"), tk.app_version || ""],
    ].filter(([, v]) => v).map(([k, v]) => `<span>${S.esc(k)}: <b>${S.esc(v)}</b></span>`).join("");
    $("thread").innerHTML = (r.messages || []).map(msgHtml).join("");
    // alleen geopend met de geheime link en ingelogd, en het ticket hoort nog bij geen account
    $("linkbox").classList.toggle("hidden", !tk.can_link);
    $("rf").classList.toggle("hidden", !tk.can_reply);
    $("closed").classList.toggle("hidden", !!tk.can_reply);
    $("loading").classList.add("hidden"); $("tk").classList.remove("hidden");
  }
  function notFound() { $("loading").classList.add("hidden"); $("nf").classList.remove("hidden"); }
  function fail(e) { $("loading").textContent = S.errText(e); }

  $("rf").onsubmit = async (e) => {
    e.preventDefault();
    const message = $("msg").value.trim();
    $("rerr").textContent = "";
    if (!message) { $("rerr").textContent = S.errText({ code: "message_missing" }); $("msg").focus(); return; }
    busy($("rsend"), true, tr("sending"));
    try {
      await S.api("reply", { ...ref(), message });
      $("msg").value = "";
      await load();
      $("rerr").innerHTML = `<span class="ok">${S.esc(tr("sent"))}</span>`;
    } catch (err) { $("rerr").textContent = S.errText(err); if (err.code === "closed") load(); }
    finally { busy($("rsend"), false, tr("send")); }
  };
  $("linkBtn").onclick = async () => {
    $("linkBtn").disabled = true;
    try {
      await S.api("link", ref());
      await load();
      $("rerr").innerHTML = `<span class="ok">${S.esc(tr("linked"))}</span>`;
    } catch (err) { $("rerr").textContent = err.code === "linked_elsewhere" ? tr("linkedElsewhere") : S.errText(err); }
    finally { $("linkBtn").disabled = false; }
  };
  $("close").onclick = async () => {
    if (!confirm(tr("closeConfirm"))) return;
    $("close").disabled = true;
    try { await S.api("close", ref()); await load(); } catch (err) { $("rerr").textContent = S.errText(err); }
    finally { $("close").disabled = false; }
  };
  load();
})();
