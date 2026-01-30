"use client";

import React from "react";
import { motion } from "framer-motion";

type HeroProps = {
  title: string;
  tagline: string;
  subline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  location: string;
};

const Hero: React.FC<HeroProps> = ({
  title,
  tagline,
  subline,
  ctaPrimary,
  ctaSecondary,
  location,
}) => {
  return (
    <section className="relative min-h-[78vh] flex items-start px-6 md:px-12 pt-8 pb-10 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[60%] w-[60%] bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.04),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.04),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <img
            src="/assets/icons/VenaLogo.png"
            alt={title}
            className="h-[10.5rem] md:h-[14rem] lg:h-[17.5rem] w-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl lg:text-[7rem] leading-[0.95] font-semibold tracking-tight font-serif"
        >
          {tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-8 max-w-2xl mx-auto text-sm md:text-base text-ink/70 leading-relaxed"
        >
          {subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#realizacje"
            className="px-6 py-3 text-[10px] tracking-[0.35em] uppercase bg-ink text-white rounded-full hover:scale-[1.02] transition-transform"
          >
            {ctaPrimary}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-[10px] tracking-[0.35em] uppercase border border-ink/30 rounded-full hover:border-ink/70 transition-colors"
          >
            {ctaSecondary}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-8 right-6 md:right-12 text-[10px] tracking-[0.35em] uppercase text-right text-ink/60 hidden md:block"
      >
        <p>EST. 2026</p>
        <p>{location}</p>
      </motion.div>
    </section>
  );
};

export default Hero;
