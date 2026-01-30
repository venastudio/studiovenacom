"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Locale } from "../content/siteContent";

type HeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  labels: {
    studio: string;
    realizacje: string;
    portfolio: string;
    services: string;
    process: string;
    events: string;
    contact: string;
  };
};

const Header: React.FC<HeaderProps> = ({ locale, onLocaleChange, labels }) => {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);


  const navItems = [
    { href: "/#about", label: labels.studio },
    { href: "/portfolio", label: labels.portfolio },
    { href: "/events", label: labels.events },
    { href: "/#contact", label: labels.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 bg-bone/90 backdrop-blur border-b border-black/10 transition-all duration-300 ${
          compact ? "py-3 md:py-4" : "py-5 md:py-6"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span
              className="inline-flex origin-left transition-transform duration-300"
              style={{ transform: `scale(${compact ? 0.75 : 1})` }}
            >
              <img
                src="/assets/icons/VenaLogo.png"
                alt="Vena Studio"
                className="h-6 w-auto origin-left scale-[2.07] md:scale-[1.8]"
              />
            </span>
            <span className="hidden md:block text-[11px] tracking-[0.35em] uppercase font-medium text-ink/70">
              STUDIO
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-ink/70">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-opacity hover:opacity-50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onLocaleChange(locale === "pl" ? "en" : "pl")}
              className="text-[10px] tracking-[0.3em] uppercase text-ink/70 hover:text-ink transition-colors"
            >
              {locale === "pl" ? "EN" : "PL"}
            </button>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden text-ink p-2 -mr-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black/10"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-0 right-0 h-full w-[75vw] max-w-sm bg-white border-l border-black/10 shadow-lg overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative z-10 flex flex-col h-full p-6 pt-8">
              <div className="flex items-start justify-between">
                <div className="flex-1 flex justify-center">
                  <img
                    src="/assets/icons/VenaLogo.png"
                    alt="Vena Studio"
                    className="h-20 w-auto opacity-90"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-ink"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-5 text-[11px] tracking-[0.3em] uppercase text-ink/80">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => onLocaleChange(locale === "pl" ? "en" : "pl")}
                  className="text-[10px] tracking-[0.3em] uppercase text-ink/60 hover:text-ink transition-colors"
                >
                  {locale === "pl" ? "PL / EN" : "EN / PL"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Header;
