# The Dementia Barber Co. — website

Static brochure site for a mobile, dementia-specialist barbering service covering
roughly 50 miles around Birmingham. No build step, no framework, no dependencies —
plain HTML, one stylesheet and one small script, ready to serve from GitHub Pages.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home — the pitch, the approach, the memory kit, the story |
| `services.html` | Everything offered, how a visit runs, how it adapts, the events (`#events`) |
| `care-homes.html` | The care home pitch — value, compliance, how booking works |
| `families.html` | Home visits — reassurance-led, for relatives |
| `about.html` | Chris's story, background, and what he won't compromise on |
| `contact.html` | Enquiry form with three routes, plus direct contact details |
| `styles.css` | The whole design system — colours, type, components |
| `app.js` | Mobile nav, scroll reveals, enquiry form submission |
| `images/favicon.svg` | Barber-pole favicon |

Navigation and footer markup is repeated on each page. That is the usual trade-off
for a no-build static site: six copies to keep in step, but nothing to install and
nothing that can break a deploy. **If you edit the nav or footer, edit all six.**

## Before this goes live

### 1. Connect the enquiry form — required

The form currently does nothing. `app.js` detects this and shows a message pointing
visitors at the phone number instead, so nothing is silently lost — but it needs
wiring up.

1. Create a free form at [formspree.io](https://formspree.io) using
   `dementiabarberco@outlook.com`.
2. Copy the endpoint it gives you (looks like `https://formspree.io/f/abcdwxyz`).
3. In `contact.html`, replace the placeholder in:

   ```html
   <form ... data-endpoint="https://formspree.io/f/REPLACE_ME" ...>
   ```

4. Send a test enquiry and check it arrives.

### 2. Drop in the real logo

The brand mark is currently a CSS barber pole (`.pole` in `styles.css`). When
Chris's logo arrives, put it in `images/` and swap the `<span class="pole">` in the
nav and footer of all six pages for an `<img>`. Keep it around 34px tall.

### 3. Photographs

`images/` is empty. Photos will lift this a lot, particularly on the home page hero
and the families page.

**Consent first.** Do not publish any photograph of a resident without written
permission from the resident or the person authorised to give it on their behalf.
Same for the video Chris mentioned.

### 4. Testimonials

There are none on the site, because there were none to use. Real quotes from home
managers and families — with permission — are the single biggest thing that would
strengthen this. A `.card` in a `.grid` will hold them.

One line currently appears in the home page story section, attributed only to
"a care home manager". **Check Chris is happy to publish it** before going live.

## Content decisions worth knowing

Some answers on the intake form were deliberately kept off the public site:

- **Care home names** — Chris asked for rough areas rather than named homes, so the
  site says "Birmingham and the West Midlands" throughout.
- **Referee email addresses** — four were supplied. Publishing them would be a
  privacy problem for those people. The site says references are available on request.
- **Pricing** — Chris chose "contact for more information". `services.html` explains
  the shape of it (half day / full day, per visit not per head) without the figures,
  so a manager knows what they're asking about.
- **DBS** — the site says "Enhanced DBS checked", which is accurate. It does not
  claim update-service registration, because that was unconfirmed.
- **Qualifications** — Chris has no formal dementia qualification and said so. The
  site never claims "dementia trained" or "certified". It uses *dementia-experienced*,
  *dementia-aware* and *dementia-safe*, and `about.html` states the position plainly.
  Please keep it that way: the business name makes the claim easy to over-reach.
- **Names in stories** — the gentlemen in the about and families pages are
  unidentified, and locations are kept vague.

## Running it locally

```bash
python3 -m http.server 8731
```

Then open <http://localhost:8731>.

## Deploying to GitHub Pages

```bash
gh repo create dementia-barber-co --public --source=. --remote=origin --push
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `master` / root**.

`.nojekyll` is already present so GitHub serves the files as-is.

## Accessibility notes

Built for an audience that skews older and is often reading under stress:

- 17px base font, 1.65 line height, generous contrast throughout
- Skip link, visible focus rings, `aria-current` on the active nav item
- Motion respects `prefers-reduced-motion`; the site is fully usable with JS off
- Print stylesheet included — care homes do still print things
