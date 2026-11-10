# Prop3rty: export voor GitHub / Vercel / Netlify

Statische site, geen build nodig. `index.html` is de homepage.

## Pagina's
- `index.html`: homepage
- `diensten.html`, `platform.html`, `tarieven.html`, `over-ons.html`, `contact.html`
- `portaal.html`: eigenarenportaal
- `404.html`: foutpagina
- `landing-alt.html`: oudere landingspagina (optioneel, nergens gelinkt)

## Assets (verplicht mee-uploaden)
- `assets/dc-runtime.js`: runtime, gedeeld door alle pagina's (wordt één keer gecachet)
- `assets/fonts/`: Satoshi-lettertypen
- `assets/img/`: foto's
- `assets/logo.svg`, `assets/favicon.svg`, `assets/logo-mark.svg`, `assets/cta-laptop.png`

## Naar GitHub
1. Verwijder in de repo de oude bestanden (vooral de oude map `assets/img/`), zodat er geen verouderde foto's blijven staan.
2. Upload de VOLLEDIGE inhoud van deze map (incl. `assets/`) naar de root, of via git:
   ```
   git add -A
   git commit -m "Prop3rty update"
   git push
   ```

## Hosten
- **Vercel** (aanbevolen): importeer de repo, framework "Other", deploy. `vercel.json` zet nette URL's aan (`/diensten` i.p.v. `diensten.html`) en geeft `prop3rty.vercel.app` een noindex-header. Koppel daarna het domein `prop3rty.nl`.
- `robots.txt` en `sitemap.xml` staan in de root. Meta description, OG-tags en JSON-LD (organisatie + FAQ) staan per pagina in de `<head>`.
- `assets/p3.js`: tabs, AI-chat, meldingenstroom, route, rekentool. Tarieven voor de rekentool invullen in het object `TARIEF` bovenin dit bestand.
- Interne links zijn absolute nette paden (`/contact`). Lokaal openen via een webserver, niet via dubbelklik.
