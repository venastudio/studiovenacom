"use client";

import React from "react";
import { ArrowUp, Instagram } from "lucide-react";

type FooterProps = {
  note: string;
  backToTop: string;
  privacyLabel: string;
  privacyText: string;
};

const Footer: React.FC<FooterProps> = ({
  note,
  backToTop,
  privacyLabel,
  privacyText,
}) => {
  const [showPrivacy, setShowPrivacy] = React.useState(false);

  return (
    <footer className="bg-ink text-white px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6 text-[10px] tracking-[0.3em] uppercase text-white/60">
        <span>{note}</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          {backToTop}
          <ArrowUp size={12} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between text-[11px] text-white/60">
        <span>Vena Studio</span>
        <a
          href="https://www.instagram.com/_venastudio/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Instagram size={14} />
          <span>Instagram</span>
        </a>
      </div>

      <div className="max-w-6xl mx-auto mt-4 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowPrivacy((prev) => !prev)}
          className="text-[9px] uppercase tracking-[0.35em] text-white/50 hover:text-white transition-colors"
        >
          {privacyLabel}
        </button>
        {showPrivacy ? (
          <p className="mt-3 max-w-3xl text-center text-[10px] text-white/60 leading-relaxed">
            {privacyText}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
