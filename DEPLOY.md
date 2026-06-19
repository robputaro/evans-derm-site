# Deploying this site (and reusing it for future clinics)

This is a static site — just HTML, CSS, and one JS file. No server, no database, no build step. That makes it nearly free to host and fast to duplicate for new clients.

This guide has three parts:
1. One-time setup (accounts you only create once, ever)
2. Deploying Evans Dermatology specifically
3. The repeatable workflow for every clinic after this one
4. What to send the clinic so their domain points at the new site

---

## Part 1 — One-time setup (do this once, period)

### Create a GitHub account
GitHub is where the site's code lives. Think of it as a folder that Vercel watches — whenever you update the folder, the live site updates automatically.

1. Go to github.com and sign up (free).
2. You don't need to learn git commands. GitHub's website lets you upload files by dragging them into a browser window.

### Create a Vercel account
Vercel is the host — the thing that actually serves the website to visitors.

1. Go to vercel.com and click "Sign Up."
2. Choose "Continue with GitHub." This links the two accounts so Vercel can see your repos.
3. You're done. No credit card required for the free tier, which easily covers a marketing site like this (or several).

---

## Part 2 — Deploy Evans Dermatology

### Step A: Create the GitHub repo
1. On github.com, click the "+" in the top right → "New repository."
2. Name it something like `evans-derm-site`.
3. Leave it Public or Private (Private is fine on the free plan, and probably more appropriate for a client site).
4. Click "Create repository." Don't add a README or .gitignore here — you already have one.
5. On the next page, look for "uploading an existing file" (a small link in the instructions). Click it.
6. Drag all the files from this folder (`index.html`, `styles.css`, `app.js`, all the other `.html` files, `vercel.json`, `.gitignore`) into the upload box.
7. Scroll down, click "Commit changes."

That's it — your code now lives on GitHub.

### Step B: Connect it to Vercel
1. In Vercel, click "Add New" → "Project."
2. You'll see a list of your GitHub repos. Find `evans-derm-site` and click "Import."
3. Vercel will auto-detect it as a static site. You don't need to change any settings — just click "Deploy."
4. Wait about 30–60 seconds. Vercel gives you a live URL like `evans-derm-site.vercel.app`.
5. Click it. The site is now live on the internet, for free.

At this point you can share that `.vercel.app` link with the clinic for review before they've touched their domain at all — useful for sign-off.

### Step C: Point the real domain at it
This is covered in Part 4 below, since it involves the clinic, not just you.

---

## Part 3 — The repeatable workflow for clinic #2, #3, #10...

Once you've done Part 2 once, every future clinic follows the same shape, just faster:

1. **Duplicate, don't restart.** Take this Evans repo as your template. For a new clinic, copy the folder, swap out the clinic-specific content (text, images, phone numbers, colors if you're customizing per client), but keep the same file structure (`index.html`, `styles.css`, `app.js`, `vercel.json`).
2. **New GitHub repo per clinic.** Create a new repo (Step A above) named for that clinic, upload the customized folder.
3. **New Vercel project per clinic.** Import the new repo (Step B above). Each clinic gets its own free Vercel project — there's no limit on the free tier that would stop you from doing this for many clients.
4. **Send the clinic their DNS instructions** (Part 4).

Realistic time once you've done it twice: 10–15 minutes per new clinic, almost all of it spent customizing content rather than fighting hosting.

If you eventually want this to be even faster (one click instead of repo-per-client), the next step up is turning this into a real template you "use" on GitHub (GitHub has a "Use this template" button you can enable on a repo) — that's worth doing once you've shipped a handful of these manually and know what actually varies between clients.

---

## Part 4 — What to send the clinic

The clinic keeps full ownership and control of their domain. You're never asking for their registrar login — only asking them to add one DNS record, which takes about 5 minutes on their end.

Send them something like this:

> To point your domain at the new site, log into wherever you manage your domain's DNS (GoDaddy, Namecheap, Google Domains, etc.) and add the following:
>
> **If you want the new site at your main domain (e.g. evansderm.net):**
> - Add an A record: Host `@`, Value `76.76.21.21`
> - Add a CNAME record: Host `www`, Value `cname.vercel-dns.com`
>
> **If you'd rather preview it at a subdomain first (e.g. new.evansderm.net):**
> - Add a CNAME record: Host `new`, Value `cname.vercel-dns.com`
>
> DNS changes can take anywhere from a few minutes to a few hours to fully take effect.

Then, on your end in Vercel: go to the project → Settings → Domains → add the domain they're using. Vercel will confirm once it detects the DNS record and automatically issues a free SSL certificate (the padlock/https) — no extra steps, no extra cost.

---

## Cost summary

- GitHub: free
- Vercel: free for this use case (static sites, low-to-moderate traffic) — you'd only hit a paid tier if a site got unusually high traffic or you needed team collaboration features
- Domain: clinic already owns it, no cost to you
- SSL certificate: free, automatic via Vercel

Total ongoing cost per clinic, at this stage: $0.
