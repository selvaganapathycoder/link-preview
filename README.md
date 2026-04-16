# Link Preview
See exactly how your link looks before sharing it — across every major platform.
No signup. No install. Just paste and preview.

---

## Live Demo
https://link-preview-weld-phi.vercel.app/

---

## Features
- **6 platform previews** — X (Twitter), Facebook, LinkedIn, WhatsApp, Slack, Discord
- **OG Score** — 0–100 quality score based on present meta tags
- **OG Tag Inspector** — view all raw Open Graph & Twitter Card meta tags
- **OG Tag Editor** — live-edit title, description, and image URL to test changes before shipping
- **Compare mode** — paste two URLs side by side for direct comparison
- **Bulk mode** — check multiple URLs at once, one per line
- **History** — last 10 lookups saved locally, one click to re-open
- **Shareable links** — every preview generates a `?url=` link you can share
- **Character limit warnings** — per-platform alerts when title or description is too long
- **⌘K shortcut** — instantly focus the URL input from anywhere
- **Light / Dark mode** — toggle at any time
- Fully responsive (mobile-friendly)
- Full keyboard accessibility
- No authentication
- No ads
- No watermarks

---

## Platforms
| Platform | Card Style |
|---|---|
| X (Twitter) | Summary large image — domain, title, description |
| Facebook | Image on top, uppercase domain label |
| LinkedIn | Image with title and domain below |
| WhatsApp | Green accent bar, inline thumbnail |
| Slack | Purple accent bar, site name highlight |
| Discord | Indigo accent bar, blue link title |

---

## OG Score Breakdown
| Tag | Points |
|---|---|
| `og:title` | 25 |
| `og:description` | 25 |
| `og:image` | 30 |
| `og:url` | 10 |
| `og:site_name` | 10 |
| **Total** | **100** |

---

## Tech Stack
- React 18 (Vite)
- CSS custom properties (Apple-inspired dark UI, no framework)
- Microlink API (client-side metadata fetching)
- Vercel (static deploy)

---

## How It Works
1. Paste any URL into the input (or press **⌘K** to focus)
2. Click **Preview** — metadata is fetched via Microlink
3. Switch between platforms to see how the card renders
4. Check the **OG Score** to spot missing tags
5. Use the **Edit** tab to tweak title / description / image and preview the result
6. Copy the page URL to share your preview with anyone

> All processing happens client-side. Microlink fetches metadata on the fly — nothing is stored on any server.

---

## Modes
**Single** — default mode, one URL, full feature set

**Compare** — two URL inputs rendered side by side with scores and platform cards

**Bulk** — paste multiple URLs (one per line), get a score and tag summary for each

---

## Privacy
All processing happens **locally in your browser** via the public Microlink API.
No data is stored, logged, or sent to any server controlled by this app.
Your URLs never leave your device beyond the Microlink metadata request.

---

## Installation
```bash
# Clone the repo
git clone https://github.com/berkinyilmaz/link-preview.git

# Install dependencies
cd link-preview
npm install

# Run locally
npm run dev
```
