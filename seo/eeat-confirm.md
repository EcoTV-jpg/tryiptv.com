# [CONFIRM] questions for the owner (trust / E-E-A-T)

Answer each question in `src/lib/site-data/company.ts` or `src/lib/site-data/authors.ts`. The field to edit is given after each question.

**How the answers go live**
- **Production:** a fact appears only after you confirm it. Until then nothing is shown in its place: no placeholder, no guess.
- **Vercel Preview:** each question shows as an amber [CONFIRM] marker, so you can review everything on your phone.
- **Gated pages:** `/content-licensing`, `/how-we-test` and `/authors/*` return 404 and stay out of the sitemap until at least one line on them is confirmed.

**Ground rules**
- Only give facts you can back up.
- If you'd rather not publish something, say so. It simply stays off the site.
- An invented address, author or licence is rated "Lowest" by Google's rater guidelines (§4.5.3). It is worse than leaving the fact out.

## Company and About page (`COMPANY` in company.ts)
1. **Legal name** of the company or person that operates TryIPTV. → `legalName`
2. **Registration number** and the registry it is filed with, if registered. → `registrationNumber`
3. **VAT or tax ID**, if you want it published. Google lists vatID as a trust signal. → `vatOrTaxId`
4. **Registered or postal address**, if it should be published. It must be real; never a virtual or invented address. → `address`
5. **Location** to state in prose, for example "Toronto, Canada". → `location`
6. **Year TryIPTV started operating.** → `foundingYear`
7. **Company story**: how and why it started, in 2–4 sentences, in your own words. → `story`
8. **Team members** who agree to be named, with name, role and a short bio. Real people only. → `team`

## Contact and support (`COMPANY.support`)
9. **Support hours**, with time zone, for WhatsApp and email. → `support.hours`
10. **Typical response time** for WhatsApp and for email. It should be measured, not hoped for. → `support.responseTime`
11. **Support languages.** → `support.languages`
12. **Contact form email delivery.** The form sends through Resend from `onboarding@resend.dev`, Resend's test sender. Resend generally only delivers mail from that address to the Resend account owner's own inbox. Should it send from a verified `@tryiptv.com` address instead? That needs DNS records in Resend and Cloudflare. *Not changed.*
13. **Does `dmca@tryiptv.com` exist and get read?** Both the DMCA page and the About page publish it.
14. **Is the WhatsApp number +1 (520) 564-8298 the permanent support line?** It is now shown as text on the contact page and in the Organization schema `contactPoint` URL.

## Content licensing (`LICENSING`; the page stays hidden until a line is confirmed)
15. **Do you hold distribution agreements or licences** for the channels and films you stream? If yes, with whom (rights holders, aggregators or distributors), and for which territories?
16. **Which licensors or distribution partners** can be named publicly?
17. **In which countries** is the service licensed to be offered?
18. **If you cannot document licences, tell us.** We will then publish an accurate description of what TryIPTV provides, plus the DMCA process, instead of a licensing claim. An unprovable claim is a deception signal for Google raters and for AI engines.
19. **What is your actual takedown time** after a valid copyright notice? This replaces the vague "promptly" on the DMCA page.

## Catalogue claims (`PRODUCT_TRUTHS` in src/lib/site-config.ts)
20. **How are the 25,000+ channels and 120,000+ movies and TV shows counted, and as of what date?** Can you publish the method or a category breakdown?
    - These counts appear on the homepage, pricing, FAQ, schema and llms files.
    - If you can't substantiate them, they can be softened in one edit. For example: "thousands of live channels and a large on-demand library".
21. **4K:** which channels or titles are actually 4K? The site now says "HD and 4K streams where available". Confirm that this is accurate.

## Policies
22. **Terms:** which legal entity enters the agreement, and its registered address? → `legalName`, `address`
23. **Terms:** which country's or state's law governs the terms, and where are disputes resolved? → `governingLaw`
24. **Privacy:** who is the data controller (legal name and address)?
25. **Privacy:** how long do you keep support messages, order records and trial requests before deleting them?
26. **Privacy:** are the processors listed correct and complete? Listed: Vercel, Cloudflare (CDN and Turnstile), Resend, WhatsApp, Google Analytics and Sentry. Do you also use a CRM, a billing panel or an email provider for credentials?
27. **DMCA:** name and postal address of your designated agent, and is that agent registered with the U.S. Copyright Office? Safe-harbour protection under 17 U.S.C. 512 requires registration. → `dmcaAgent`
28. **Refund:** how long does an approved refund take to reach the customer, and is it paid back to the original payment method?
29. **Payment methods:** the registry says "cryptocurrency, PayPal and Stripe" (recorded 2026-10-09). Is that still current? → `paymentMethods` (currently filled in)

## Authors (`AUTHORS` and `GUIDE_AUTHORS` in authors.ts)
30. **Which real people write or review the guides?** For each person:
    - name and role
    - a 2–4 sentence bio of their real experience with IPTV, devices or support
    - areas they cover
    - the year they started
    - a real photo (optional)
    - public profiles for `sameAs` (LinkedIn, X, YouTube)
31. **Which guides does each person own or review?** Map paths to people in `GUIDE_AUTHORS`.
    - Until this is filled in, guides show "By the TryIPTV team", which is honest.
    - On Preview, each guide shows a [CONFIRM] marker naming the path.

## How we test (`TESTING`; the page stays hidden until a line is confirmed)
32. Which **exact devices** (model and OS version) are the setup guides tested on?
33. Which **player app versions** are tested, and how often are guides re-checked?
34. Do you **measure stream bitrates or speeds**? With which tool, on what connection, and on what dates?
35. Do you run **uptime monitoring**? Which tool, at what interval, and can a figure or status page be published?
36. Can you measure and publish **support response times**, for example from WhatsApp or email logs?

## First-hand proof (screenshots)
37. **Real setup screenshots** for the Samsung, LG, Android TV, Apple TV, iPhone/iPad, Windows, Mac, MAG and Roku guides. Firestick and TiviMate already have real ones.
    - Take them on your own devices with the real TryIPTV login, with credentials blurred.
    - Send them as PNG or JPEG files, one per setup step.
38. **Support screenshots:** the five WhatsApp chats on the homepage are blurred. Do you have the customers' permission to show them, and are they recent? They are presented as support examples, not as reviews.

## Off-site, highest impact (no code)
39. Do you have a **Trustpilot** (or BBB) profile? If yes, which URL? It can be added to `sameAs` once it has genuine reviews. Never buy or incentivise reviews without disclosure.
40. Are the social profiles in `sameAs` (x.com/tryiptv, instagram.com/tryiptvofficial, facebook.com/tryiptv) active and owned by you?
