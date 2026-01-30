# Vena Studio

Minimalistyczna strona portfolio (PL/EN) dla Vena Studio, zbudowana w Next.js.

## Local Dev

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`

## Assets

- Logo: `public/assets/icons`
- Zdjęcia: `public/assets/image`
- Wideo: `public/assets/video`

## Email setup

Set SMTP env variables locally (and on Vercel) to enable the contact form:

```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@studiovena.com
SMTP_PASS=HASLO_DO_MAILA
```

Vercel: Project Settings → Environment Variables → add the same keys.
