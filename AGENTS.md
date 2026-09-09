# AGENTS.md — brfstationenhasselby.se

Website of **Brf Stationen 1 i Hässelby Strand**, a Swedish housing cooperative (org.nr 769623-8257).
Live site: `https://brfstationenhasselby.se` (currently the old one.com site; this repo replaces it).

The people asking you to edit this site are **board members, not developers**. They will write to you
in Swedish. Reply in Swedish, keep explanations short, and never assume they know git or HTML.

## What this site is

Plain HTML, CSS and JavaScript. **No build step, no framework, no dependencies.** What is in the
repo is exactly what the web server serves.

```
index.html          Startsida – välkomst, siffror, snabblänkar, nyheter från styrelsen
for-boende.html     För boende – dokument, praktiskt, ordningsregler
gastlagenhet.html   Gästlägenhet – information och manuellt uppdaterad bokningskalender
felanmalan.html     Felanmälan – City Förvaltning, SBC, övriga servicekontakter
garage.html         Garage – priser, hyra plats
kontakt.html        Kontakta styrelsen – e-post, styrelsen, karta
404.html            Sidan hittades inte
css/site.css        THE ONLY stylesheet. Colours and fonts are variables at the top.
js/site.js          Shared header + footer (menu, address, e-mail). Edit the menu here.
img/                Photos, logo (logo.png, logo-vit.png), favicon.svg
dokument/           PDF/Word files linked from the pages
.htaccess           HTTPS redirect + 301s from the old page names (used on one.com only)
sitemap.xml, robots.txt
onboarding/         Template for the board-member onboarding file (no secrets)
legacy site/        Old one.com export. Git-ignored, reference only, will be deleted.
```

Every page has the same skeleton: `<site-header>`, a `<main>` with sections, `<site-footer>`.
The header and footer are rendered by `js/site.js` so the menu and address live in one place.

## Editing rules

- **Language:** all site content is Swedish. Keep the existing tone: friendly, plain, "du"-form.
- **Never invent facts.** Dates, prices, names, phone numbers and rules come from the person asking
  or from the existing pages. If something is missing or unclear, ask before writing.
- **Small, targeted edits.** Change the text the person asked about and nothing else. Do not
  restyle, rename or reorganise pages unless explicitly asked.
- **Reuse existing patterns.** Copy an existing block (a news item, a document link, a card, a
  board member) rather than inventing new markup. Each page has an HTML comment showing how.
- **Styling stays in `css/site.css`.** No inline styles beyond the few that already exist, no
  new stylesheets, no `<style>` blocks in pages.
- **No third-party embeds.** No Google Fonts, analytics, cookie banners, iframes or external
  scripts. The site must not send visitor data anywhere (GDPR). External links are fine.
- **Keep URLs stable.** Do not rename or delete pages. The five page names are indexed by Google
  and redirected from the old site.
- **Images:** JPEG for photos, max ~1600 px wide, put in `img/`. Always set `alt` text.
- **Documents:** put files in `dokument/` with short lowercase names, no spaces or åäö
  (e.g. `arsredovisning-2025.pdf`). Link them from `for-boende.html` in the document list.
- **Never commit** `KOM-IGANG.md` (the onboarding file with tokens) or anything from `legacy site/`.

## Common tasks

**Uppdatera gästlägenhetens bokningar:** redigera JSON i `booking-data` på
`gastlagenhet.html`. Ange `arrival` och `departure` som `ÅÅÅÅ-MM-DD`; ankomstdagen
är en bokad natt, avresedagen ingår inte. Fråga om år eller datumgränser är oklara.
Kontrollera överlapp och högst sju nätter för nya bokningar. Den redan bekräftade
bokningen 19–27 september 2026 ska bevaras trots sin längd. Uppdatera `updated`.
Publicera inga namn, lägenhetsnummer eller kontaktuppgifter i kalendern.
Kalendern fungerar lokalt utan backend via `js/gastlagenhet.js`.

**Add a news item** (`index.html`, list `ul.news`): copy the first `<li class="news-item">` block,
put the new one at the top, set the `kicker` (date or short label), heading and text. Remove
items that are no longer relevant when asked.

**Add or replace a document:** save the file in `dokument/`, then add or update the `<li>` in the
`ul.doc-list` on `for-boende.html`. When replacing (e.g. a new årsredovisning), keep the old file
unless told otherwise and update the link and label.

Dokument har nu lässidor: `stadgar.html`, `trivselregler.html`,
`att-bo-i-bostadsratt.html` (läsguide), `andrahandsuthyrning.html` (information om
blanketten), `bygga-och-renovera.html`, `pantsattningar.html`, `nyinflyttad.html`
och `maklarinformation.html`. Länka till lässidan i första hand, med nedladdning
av PDF på lässidan. Årsredovisningen länkas direkt som original-PDF.
Vid uppdateringar ska lässidan och dess PDF hållas i synk. PDF:erna
`nyinflyttad-infoblad.pdf` och `maklarinfo-2024.pdf` är utskrifter av webbtexten;
de äldre Word-originalen är bevarade. Använd sidans utskriftslayout när dessa
PDF:er genereras på nytt. Uppgifter som motsäger varandra ska stämmas av med
styrelsen; äldre dokument får inte tyst presenteras som aktuella regler.

**Update the board** (`kontakt.html`, list `ul.people`): one `<li>` per person with name and role.
Done after every årsstämma.

**Change prices, phone numbers, addresses:** find the text on the relevant page and change it.
The postal address and the styrelsen e-mail also live in `js/site.js` (footer).

**Change the menu:** the `NAV` array in `js/site.js`. Adding a page means creating a new HTML
file from an existing one and adding it to `NAV`.

## Checking your work

There is no build and no server. Open the page straight from disk:

```
open index.html            # macOS
start index.html           # Windows
xdg-open index.html        # Linux
```

The browser renders the page from the file, including the shared header and footer, images and
links between pages. Reload after each change (no hot reload, and none needed).

To look at the result yourself, take a screenshot with headless Chrome if it is installed:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --window-size=1280,2000 --screenshot=/tmp/sida.png "file://$PWD/index.html"
```

then view `/tmp/sida.png`. Check that the page renders, links work, and the Swedish reads well.
Confirm every tag you added is closed.

## Publishing

The `main` branch is the live site.

- **Demo / current setup:** GitHub Pages publishes `main` automatically about a minute after a push.
- **Later:** the same files are uploaded to one.com's webspace root (via a GitHub Action over SFTP
  or by hand). `.htaccess` only matters there.

To publish: `git add -A && git commit -m "<what changed, in Swedish>" && git push`.
Tell the person the change is live in about a minute and where to look.

To undo the latest change: `git revert HEAD && git push`.

If a push is rejected because someone else pushed first: `git pull --rebase && git push`.

## Onboarding new board members

`onboarding/kom-igang.template.md` is the template. The filled-in copy (with the BRF's GitHub
token and AI API key) is called `KOM-IGANG.md`, is git-ignored, and is handed out by e-mail or the
board's shared drive. A member pastes its contents into their terminal AI agent, which clones this
repo and sets everything up. Claude Code reads this file via `CLAUDE.md`, Gemini CLI via
`GEMINI.md`, Codex and others read `AGENTS.md` directly.

## Background: the old site and hosting

- The old site was made with **one.com Website Builder**. Its export is in `legacy site/`
  (git-ignored). It depended on one.com's runtime and cannot be reused; all its content has been
  moved into the pages here. Old URLs: `about.html` → `for-boende.html`, `services.html` →
  `felanmalan.html`, `join-us.html` → `garage.html`, `contact.html` → `kontakt.html`.
- one.com hosts the domain and the e-mail (`styrelsen@`, `garage@`, `valberedning@`). When the
  site moves off one.com, only the web DNS records change; MX records stay.
- The old contact forms used one.com's form mailer, which is not available outside the builder.
  The new site uses `mailto:` links instead.
- Two Shutterstock photos from the old site were dropped because their licence was tied to the
  builder. The remaining photos are the BRF's own or Unsplash.

## Key facts

- Name: **Brf Stationen 1 i Hässelby Strand**, formed 2011. 68 apartments (1–3 rooms) in 4
  stairwells. 36 parking spaces (24 indoor, 12 outdoor).
- Address: Fyrspannsgatan 183, 165 62 Hässelby, Stockholm.
- E-mail: `styrelsen@`, `garage@`, `valberedning@brfstationenhasselby.se`.
- Technical management and felanmälan: City Förvaltning (since 2024-01-01), 08 20 75 80.
- Economic management: SBC (since 2021-01-01), 0771-722 722.
- Board roster: see `kontakt.html`.
