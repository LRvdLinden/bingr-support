# Bingr Support

De supportsite van **Bingr** op **https://support.bingr.online**: veelgestelde vragen, een supportticket aanmaken, je ticket bekijken en beantwoorden, en *Mijn tickets* voor wie inlogt met een Bingr-account. De site ziet er precies zo uit als bingr.online (zelfde stijl, navigatie, footer en NL/EN-keuze) en is er in het Nederlands en het Engels.

- `site/` — de site zelf (statische HTML/CSS/JS, geen build-stap)
  - `index.html` — startpagina (nieuw ticket, mijn tickets, FAQ op bingr.online, populaire onderwerpen)
  - `nieuw/` — nieuw ticket (met een Bingr-account ingelogd: gekoppeld aan je account)
  - `ticket/?n=1001&t=…` — één ticket met het gesprek, reageren en sluiten (geheime link uit de e-mail; niet geïndexeerd)
  - `mijn/` — inloggen met je Bingr-account en al je tickets
  - `assets/css/site.css`, `assets/js/site.js`, `consent.js`, `userbtn.js`, `account.js`, `assets/config.js` — **kopieën** uit bingr-website (de huisstijl); `support.css` en `support.js`, `nieuw.js`, `ticket.js`, `mijn.js` horen bij deze site
- `.github/workflows/deploy.yml` — workflow *Supportsite*: FTPS-upload van `site/` naar support.bingr.online, daarna een controle

Waar de rest staat:
- **Functie en database** (`support`, tabellen `support_tickets` en `support_messages`, de e-mails): [LRvdLinden/iptv-ios-appletv](https://github.com/LRvdLinden/iptv-ios-appletv), map `supabase/`, workflow *Backend*.
- **Beantwoorden, statussen en notities**: het beheer op https://beheer.bingr.online (tab *Support*, repo LRvdLinden/bingr-beheer).

## Hoe het werkt

1. Een klant maakt een ticket aan en krijgt een nummer (`#1001`, `#1002`, …), een gebrande bevestigingsmail met een geheime link naar het ticket, en support@bingr.online krijgt een melding met een link naar het beheer.
2. In het beheer beantwoord je het ticket; de klant krijgt een gebrande mail vanaf support@bingr.online met `#nummer` in het onderwerp.
3. De klant reageert via de link (niet door de mail te beantwoorden; die komt niet in het ticket) en support@bingr.online krijgt weer een melding.
4. Statussen: Nieuw, In behandeling, Wacht op klant, Opgelost, Gesloten. Bij Opgelost en Gesloten krijgt de klant een mail.

Limieten tegen spam: 3 nieuwe tickets per e-mailadres en 5 per IP per uur, een verborgen lokveld en een minimale invultijd.

## GitHub-secrets (workflow *Supportsite*)

*Settings → Secrets and variables → Actions → New repository secret*. Ontbreekt er een, dan geeft de workflow een waarschuwing (geen fout).

| Secret | Wat |
| --- | --- |
| `FTP_SERVER` | FTP-server; een hostnaam die in het FTPS-certificaat staat (bij gedeelde hosting vaak die van de hoster). Alleen FTPS met een geverifieerd certificaat; er is geen terugval naar gewone FTP of andere servers |
| `FTP_USERNAME` | gebruikersnaam van een **eigen FTP-account voor support.bingr.online** (komt direct uit in de map van het subdomein) |
| `FTP_PASSWORD` | het wachtwoord daarvan |
| `FTP_DIR` | optioneel; alleen nodig als de FTP-login niet direct in de map van support.bingr.online uitkomt |
| `FTP_USERNAME_ALT` | optioneel: tweede gebruikersnaam om te proberen |

De workflow weigert te uploaden naar de webmap van bingr.online of de map van beheer.bingr.online. Elke nacht haalt hij `changelog.json` van bingr.online op (voor het buildnummer in de footer) en uploadt hij alleen dat bestand als het veranderd is.

## Subdomein support.bingr.online instellen (eenmalig, bij de hoster)

1. Maak in het hostingpaneel het subdomein **support.bingr.online** aan met een **eigen map** (niet de webmap van bingr.online).
2. Maak een **FTP-account** dat in die map uitkomt (zoals bij beheer.bingr.online) en zet de gegevens in de secrets hierboven.
3. Staat de DNS niet bij de hoster: een A-record (of CNAME naar bingr.online) voor `support`.
4. Vraag een **SSL-certificaat** (Let's Encrypt) aan voor support.bingr.online en zet *HTTPS forceren* aan.
5. Zorg dat het mailadres **support@bingr.online** bestaat, en dat het SMTP-account van Bingr (`BINGR_SMTP_*`) als dat adres mag versturen. Mag dat niet, dan gaan de mails met de gewone afzender (`BINGR_SMTP_FROM`) en support@bingr.online als antwoordadres.
6. Start *Actions → Supportsite → Run workflow*, en zet daarna in het beheer (tab *Status*) de monitor *Supportsite* aan.

## Lokaal testen

`python3 -m http.server 8080 -d site` en open http://localhost:8080. De functie `support` staat `http://localhost` toe.
