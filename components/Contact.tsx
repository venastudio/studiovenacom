"use client";

import React, { useState } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

type ContactProps = {
  label: string;
  emailLabel: string;
  email: string;
  instagramLabel: string;
  location: string;
  availability: string;
  form: {
    label: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
};

const Contact: React.FC<ContactProps> = ({
  label,
  emailLabel,
  email,
  instagramLabel,
  location,
  availability,
  form,
}) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message || !emailValid) {
      setStatus("error");
      setStatusMessage(form.errorMessage);
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          pageUrl: window.location.href,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        const message = typeof data?.error === "string" ? data.error : form.errorMessage;
        setStatus("error");
        setStatusMessage(message);
        return;
      }

      setStatus("success");
      setStatusMessage(form.successMessage);
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setStatusMessage(form.errorMessage);
    }
  };

  return (
    <section id="contact" className="relative py-10 md:py-16 px-6 md:px-12 bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[60%] w-[60%] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_65%)]" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <div className="lg:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">
            {label}
          </span>
          <div className="mt-4 md:mt-6 relative flex justify-center lg:justify-start">
            <img
              src="/assets/icons/VenaLogo.png"
              alt="Vena Studio"
              className="h-28 md:h-44 w-auto invert opacity-20"
            />
          </div>
          <div className="mt-5 mb-8 lg:mb-0 flex flex-col gap-3 items-center lg:items-start">
            <a
              href={`mailto:${email}`}
              className="inline-flex w-full max-w-[320px] items-center justify-center rounded-full bg-white px-5 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-ink hover:bg-white/90 transition-colors"
            >
              {email}
            </a>
            <a
              href="https://www.instagram.com/_venastudio/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full max-w-[320px] items-center justify-center gap-3 rounded-full border border-white/30 px-5 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/80 hover:border-white hover:text-white transition-colors"
            >
              <Instagram size={18} />
              {instagramLabel || "Instagram"}
            </a>
            <a
              href="tel:+48698472284"
              className="inline-flex w-full max-w-[320px] items-center justify-center rounded-full bg-white px-5 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-ink hover:bg-white/90 transition-colors"
            >
              +48 698 472 284
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                  {form.label}
                </p>
              </div>

              <label className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                {form.nameLabel}
                <input
                  name="name"
                  type="text"
                  required
                  value={values.name}
                  onChange={handleChange}
                  placeholder={form.namePlaceholder}
                  className="mt-3 w-full rounded-lg bg-white/85 border border-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-white/90 focus:bg-white focus:outline-none transition-colors"
                />
              </label>

              <label className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                {form.emailLabel}
                <input
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  placeholder={form.emailPlaceholder}
                  className="mt-3 w-full rounded-lg bg-white/85 border border-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-white/90 focus:bg-white focus:outline-none transition-colors"
                />
              </label>

              <label className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                {form.messageLabel}
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  placeholder={form.messagePlaceholder}
                  className="mt-3 w-full rounded-lg bg-white/85 border border-white/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-white/90 focus:bg-white focus:outline-none transition-colors resize-none"
                />
              </label>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-[10px] uppercase tracking-[0.35em] text-white/80 hover:border-white hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-3">
                      {form.sendingLabel}
                      <span
                        aria-hidden="true"
                        className="h-[2px] w-6 rounded-full bg-white/60 animate-pulse"
                      />
                    </span>
                  ) : (
                    form.submitLabel
                  )}
                </button>
                {status !== "idle" && statusMessage ? (
                  <p
                    aria-live="polite"
                    className={`text-xs ${
                      status === "success" ? "text-white/70" : "text-white/50"
                    }`}
                  >
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </form>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
