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
SMTP_HOST=your.smtp.host
SMTP_PORT=465
SMTP_USER=your_email@example.com
SMTP_PASS=your_smtp_password
```

Vercel: Project Settings → Environment Variables → add the same keys.
