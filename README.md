# Nanas Flowers website

A one-page website for Nanas Flowers: photo sections for each kind of arrangement, a full pricing menu, an event-planning form, and an order request form. Requests are emailed to you through Formspree, a free form service, with a subject line that says whether it is an order or an event.

The site is plain HTML, CSS and JavaScript. There is nothing to install or build. It is hosted for free on GitHub Pages.

```
nanas-flowers/
├── index.html        the page itself (headings, section text, feature prices)
├── css/style.css     colors, fonts, layout
├── js/main.js        settings, full price menu, form sending
├── img/              your photos and the gift-bag video
└── .nojekyll         tells GitHub Pages to serve the files as they are
```

---

## Setup guide

Total time: about 30 minutes. You need a computer with a web browser and an email address.

### Step 1. Unzip the files

1. Download `nanas-flowers.zip`.
2. Double-click it to unzip. You get a folder called `nanas-flowers`.
3. Open the folder and check that you see `index.html`, `README.md`, and the folders `css`, `js` and `img`.

To preview the site on your own computer, double-click `index.html`. It opens in your browser. The forms will not send anything yet; that comes in Step 3.

### Step 2. Put in your own details

Open the files in a plain text editor: **TextEdit** on Mac (choose Format → Make Plain Text), **Notepad** on Windows, or the free editor **VS Code**. You can also skip this step and make these edits on GitHub later (Step 7).

**Your email and phone number.** Open `js/main.js`. The settings are at the very top:

```js
const SHOP = { name:"Nanas Flowers", email:"orders@nanasflowers.com", phone:"(801) 555-0142" };
const FORMSPREE_ID = "";
```

Replace the email and phone with yours. Keep the quote marks. Leave `FORMSPREE_ID` empty for now.

**Your prices.** Prices live in two places, so change both:

- **Full pricing menu:** in `js/main.js`, look for `const CATS = [`. Each line looks like `["Classic wrap","15–18 stems","$55"]`, meaning name, short description, price. Edit the text inside the quotes. To remove an item, delete its whole `[...]` entry and the comma after it.
- **Feature sections** (the big photo sections): in `index.html`, search for `class="mini"`. Each price row looks like `<span class="pr">$55</span>`. The small floating cards on the photos have prices too; search for `class="p"`.

**Your city and studio hours.** In `index.html`, search for `Salt Lake City` and `Tue–Sat`.

Save each file after editing.

### Step 3. Set up Formspree so requests reach your email

1. Go to **formspree.io** and sign up for a free account with the email where you want requests to arrive.
2. Verify your email when Formspree sends you a confirmation.
3. Click **+ New Form**. Name it `Nanas Flowers requests` and set it to send to your email.
4. Formspree shows an endpoint like `https://formspree.io/f/xyzabcde`. Copy only the last part, `xyzabcde`. That is your form ID.
5. Open `js/main.js` again and paste the ID between the quotes:

   ```js
   const FORMSPREE_ID = "xyzabcde";
   ```
6. Save the file.

The free plan handles **50 requests a month** and keeps them in your Formspree dashboard for 30 days. Every request also arrives in your email, which is your permanent copy. If you outgrow 50 a month, Formspree has paid plans.

If you leave `FORMSPREE_ID` empty, the site still works: customers get a ready-made message to copy and send to your email or phone instead.

### Step 4. Create a GitHub account and repository

1. Go to **github.com** and sign up for a free account. Your username becomes part of your web address (for example `nanasflowers.github.io`).
2. Click the **+** in the top-right corner, then **New repository**.
3. Fill it in:
   - **Repository name:** `nanas-flowers`
   - **Public** (free GitHub Pages hosting needs a public repository)
   - Leave "Add a README file" **unchecked**.
4. Click **Create repository**.

### Step 5. Upload the website files

1. On the new, empty repository page, click the link **uploading an existing file**.
2. Open your `nanas-flowers` folder on your computer and select **everything inside it**: `index.html`, `README.md`, `.nojekyll`, and the `css`, `js` and `img` folders. Drag them all into the upload box in your browser.
   - Drag the **contents** of the folder, not the folder itself. Otherwise everything ends up one level too deep and the site will not load.
   - `.nojekyll` is a hidden file. On Mac, press **Cmd + Shift + .** in Finder to show it. On Windows, choose View → Show → Hidden items. If it does not upload, the site still works without it.
3. Wait for every file to finish uploading. The video is about 1 MB.
4. Scroll down and click **Commit changes**.

Your repository should now list `index.html` at the top level, next to the `css`, `img` and `js` folders.

### Step 6. Turn on GitHub Pages

1. In your repository, click **Settings** (top menu, gear icon).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
5. Wait 1 to 3 minutes and refresh the page. A box appears saying **Your site is live at** `https://YOUR-USERNAME.github.io/nanas-flowers/`.

Open that link. Your site is on the internet.

### Step 7. Test a request

1. On your live site, scroll to **Request an arrangement**, fill in the form with test details, and click **Send request**.
2. You should see "Request sent. Thank you!" with a reference number like `ORD-1108-K3P`.
3. Check your email. The subject line looks like:

   ```
   [ORDER · Wraps] Nov 14, 2026 · Test Person · ORD-1108-K3P
   ```

   Event inquiries start with `[EVENT · Weddings]`, `[EVENT · Funerals]`, and so on.
4. Try the **Plan an event** form the same way.

If no email arrives within a few minutes, check your spam folder, then check the Formspree dashboard. The first submission sometimes needs you to confirm the form in an email from Formspree.

### Step 8. Sort requests automatically in your email

This keeps orders and event inquiries in separate folders so they are easy to manage. In **Gmail**:

1. In the search bar, type `subject:"[EVENT"`, then click the **filter** icon at the right end of the search bar.
2. Click **Create filter**, check **Apply the label**, choose **New label**, and name it `Flowers / Events`. Also check **Also apply filter to matching conversations**. Click **Create filter**.
3. Do the same with `subject:"[ORDER"` and a label called `Flowers / Orders`.

Every new request now lands under the right label. The date in the subject is the date the flowers are needed, so you can see what's coming up at a glance. To track progress, star a request once you've quoted it and archive it once it's fulfilled.

Outlook and Apple Mail have the same feature, called **Rules**.

### Step 9. Making changes later

You don't need to re-upload everything to make a change.

1. In your GitHub repository, click the file you want to change (for example `js/main.js`).
2. Click the **pencil icon** (Edit this file) at the top right of the file.
3. Make your change, then click **Commit changes**.
4. The live site updates within 1 to 2 minutes. Refresh the page; you may need to hold **Shift** while refreshing.

**Replacing or adding photos.** Upload the new photo into the `img` folder (open `img`, then **Add file → Upload files**). Then update the file name in `index.html` where the old photo was used. Search for `img/` to find them. For best results, use portrait photos cropped to 4:5 (for example 960 × 1200 pixels) and under 300 KB.

### Step 10 (optional). Use your own domain name

To use an address like `nanasflowers.com` instead of `username.github.io/nanas-flowers`:

1. Buy the domain from a registrar such as Cloudflare, Porkbun, Namecheap or Squarespace (about $10–20 a year).
2. In GitHub: **Settings → Pages → Custom domain**, type `www.nanasflowers.com` and click **Save**.
3. In your registrar's **DNS settings**, add these records:

   | Type  | Name / Host | Value |
   |-------|-------------|-------|
   | CNAME | `www`       | `YOUR-USERNAME.github.io` |
   | A     | `@`         | `185.199.108.153` |
   | A     | `@`         | `185.199.109.153` |
   | A     | `@`         | `185.199.110.153` |
   | A     | `@`         | `185.199.111.153` |

4. DNS changes can take up to a day to spread. When GitHub shows the domain as working, check **Enforce HTTPS** on the Pages settings screen.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| The site shows a 404 page | Wait a few minutes after turning on Pages. Then check that `index.html` is at the **top level** of the repository, not inside a `nanas-flowers` folder. |
| The page has no colors or fonts | The `css` folder didn't upload, or it's nested inside another folder. It must sit next to `index.html`. |
| Photos are missing | Check that the `img` folder uploaded with all 8 files. File names are case-sensitive: `Bouquet.jpg` and `bouquet.jpg` are different. |
| Forms say "One last step: send it to us" instead of "Request sent" | `FORMSPREE_ID` is empty or has a typo. Copy only the ID, with no `https://formspree.io/f/` in front. |
| No email after a request | Check spam, then your Formspree dashboard. Free accounts stop emailing after 50 requests in a month. Later requests wait in an "Over Limit" folder until the month resets. |
| A change doesn't show up | Wait 2 minutes, then refresh while holding Shift. |
