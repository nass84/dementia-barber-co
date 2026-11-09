# The Dementia Barber Co. — website

One-page site for Chris Floyd's mobile, dementia-safe barbering service covering
roughly 50 miles around Birmingham. No build step, no framework, no dependencies —
plain HTML, one stylesheet and one small script, ready to serve from GitHub Pages.

Built from the "The Dementia Barber Co - Home" design (dark charcoal, gold
accents, Playfair Display + Inter).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole site: hero, story, services, the kit, testimonial, booking form, footer |
| `styles.css` | Colours (CSS custom properties on `:root`), type and layout |
| `app.js` | Mobile menu and the enquiry form |
| `images/` | Logo, hero photo, favicon |
| `fonts/` | Self-hosted Inter and Playfair Display (latin subset), so no Google Fonts call |

## The enquiry form

The form opens the visitor's own email app with a ready-written message to
`dementiabarberco@outlook.com` (change `ENQUIRY_EMAIL` in `app.js`). Nothing to set
up, but it relies on the visitor having a mail app. If that turns out to lose
enquiries, swap in a form service such as Formspree and POST to it instead.

## Before this goes live

- **Testimonial** — check the care home manager is happy for the quote to be published.
- **Photographs** — do not publish any photograph of a resident without written
  permission from the resident or the person authorised to give it on their behalf.
- **Claims** — the site says *dementia-safe*, never "dementia trained" or "certified".
  Keep it that way unless a formal qualification is in place.

## Running it locally

```bash
python3 -m http.server 8731
```

Then open <http://localhost:8731>.

## Deploying to GitHub Pages

```bash
gh repo create nass84/dementia-barber-co --public --source=. --remote=origin --push
gh api -X POST repos/nass84/dementia-barber-co/pages -f 'source[branch]=master' -f 'source[path]=/'
```

`.nojekyll` is present so GitHub serves the files as-is.

## Accessibility notes

Built for an audience that skews older and is often reading under stress:

- 18–20px body text, 1.6 line height, light-on-dark contrast throughout
- Skip link, visible gold focus rings, 48px minimum tap targets
- Enquiry type is a set of large radio pills rather than a dropdown
- Works with JavaScript off: anchors scroll natively, the nav stays visible, the
  form falls back to a plain `mailto:` submit
- Motion respects `prefers-reduced-motion`; print stylesheet included
