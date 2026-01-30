import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: {
    name?: string;
    email?: string;
    message?: string;
    pageUrl?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload." },
      { status: 400 }
    );
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const pageUrl = String(payload.pageUrl ?? "").trim();

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim();

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Name is too short." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email format is invalid." },
      { status: 400 }
    );
  }

  if (message.length < 3) {
    return NextResponse.json(
      { ok: false, error: "Message is too short." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT);
  if (!Number.isFinite(port)) {
    return NextResponse.json(
      { ok: false, error: "Server is not configured." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const timestamp = new Date().toISOString();
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message: ${message}`,
      `Timestamp: ${timestamp}`,
    ];
    if (pageUrl) {
      lines.push(`Page URL: ${pageUrl}`);
    }

    await transporter.sendMail({
      from: "contact@studiovena.com",
      to: "contact@studiovena.com",
      replyTo: email,
      subject: "New inquiry — Studio Vena",
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Mail delivery failed." },
      { status: 500 }
    );
  }
}
