# Nanas Flowers website

The website for Nanas Flowers: arrangement sections with example prices, a full pricing menu, an event-planning form, an order request form, a contact page, and a newsletter sign-up.

Every file sits in this one folder, with no subfolders, so uploading to GitHub is a single drag and drop.

| File | What it is |
|---|---|
| `settings.js` | **Your contact details and form settings. Edit this one.** |
| `index.html` | The home page: arrangements, pricing, event planning, order form |
| `contact.html` | The contact page: email, phone, hours, message form |
| `thanks.html` | Shown after someone signs up for the newsletter through Kit |
| `style.css` | Colors, fonts and layout |
| `main.js` | The price menu (`const CATS`) and how the forms send |
| `.jpg` / `.mp4` files | Your photos and the gift-bag video |

## Quick edits

- **Email, phone, city, hours:** open `settings.js` and change the text between the quote marks.
- **Turn on form emails:** paste your Formspree form ID into `formspreeId` in `settings.js`.
- **Prices in the full menu:** in `main.js`, find `const CATS = [`. Each item reads `["Name","Short description","$Price"]`.
- **Prices in the big photo sections:** in `index.html`, search for `class="pr"` and `class="p"`.

On GitHub: click the file, click the pencil icon, make the change, then click **Commit changes**. The live site updates within about a minute.

The full step-by-step launch guide (GitHub, Cloudflare, your GoDaddy domain, forms and newsletter) is in the Nanas Flowers Launch Guide doc.
