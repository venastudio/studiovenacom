"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "../content/siteContent";
import type { WorkItem } from "../content/works";

type FeaturedWorksProps = {
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  placeholderLabel: string;
  placeholderTitle: string;
  locale: Locale;
  works: ReadonlyArray<WorkItem>;
};

type FeaturedSlot =
  | { type: "work"; work: WorkItem }
  | { type: "placeholder"; id: string };

const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  label,
  heading,
  description,
  ctaLabel,
  ctaHref,
  placeholderLabel,
  placeholderTitle,
  locale,
  works,
}) => {
  const prioritized = [
    works.find((w) => w.src.includes("3cab63c48")) || works.find((w) => w.featured),
    works.find((w) => w.src.toLowerCase().includes("img.jpg")) || works[0],
    works.find((w) => w.src.includes("e754afb235")) || works[1],
  ].filter(Boolean);

  const featuredWorks = prioritized.slice(0, 3).map((work) => ({
    type: "work" as const,
    work,
  }));

  const placeholders: FeaturedSlot[] = Array.from(
    { length: Math.max(0, 3 - featuredWorks.length) },
    (_, index) => ({
      type: "placeholder",
      id: `placeholder-${index + 1}`,
    })
  );

  const slots = [...featuredWorks, ...placeholders];

  return (
    <section id="realizacje" className="pt-12 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 md:mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
            {label}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-light font-serif">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slots.map((slot, index) => (
            <div key={`${slot.type}-${index}`} className="relative">
              <FeaturedCard
                slot={slot}
                locale={locale}
                placeholderLabel={placeholderLabel}
                placeholderTitle={placeholderTitle}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-16 pt-10 md:pt-14 flex flex-col items-center text-center">
          <p className="text-base md:text-lg uppercase tracking-[0.45em] text-ink/70">
            {locale === "pl" ? "CHECK US ON IG" : "CHECK US ON IG"}
          </p>
          <p className="mt-3 text-xs md:text-sm uppercase tracking-[0.32em] text-ink/50">
            Vena Studio
          </p>
          <a
            href="https://www.instagram.com/_venastudio/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 px-7 py-3 text-xs md:text-sm uppercase tracking-[0.32em] text-ink border border-ink/25 rounded-full hover:bg-ink hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

const FeaturedCard: React.FC<{
  slot: FeaturedSlot;
  locale: Locale;
  placeholderLabel: string;
  placeholderTitle: string;
}> = ({ slot, locale, placeholderLabel, placeholderTitle }) => {
  if (slot.type === "placeholder") {
    return (
      <div className="relative overflow-hidden rounded-[24px] border border-black/10 bg-bone/60 aspect-[4/3] flex items-end">
        <div className="p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40">
            {placeholderLabel}
          </p>
          <h3 className="mt-2 text-lg font-light text-ink/70">
            {placeholderTitle}
          </h3>
        </div>
      </div>
    );
  }

  const work = slot.work;
  const slides = work.gallery && work.gallery.length > 0 ? work.gallery : [work.src];
  const [current, setCurrent] = useState(0);
  const currentSrc = slides[current] ?? work.src;
  const isVideo =
    work.type === "video" || /\.(mp4|webm|mov|m4v)$/i.test(currentSrc);
  const openLabel = locale === "pl" ? "Otwórz" : "Open";
  const ctaLabel = work.cta?.label?.[locale];
  const cardHref = work.cta ? undefined : work.href;
  const showOpenLabel = Boolean(work.href) && !ctaLabel;
  const zoom = work.zoom ?? 1;
  const aspectClass =
    work.aspect === "landscape"
      ? "aspect-[16/9]"
      : work.aspect === "post"
        ? "aspect-[4/3]"
      : work.aspect === "square"
        ? "aspect-square"
        : "aspect-[4/5]";
  const mediaStyle =
    zoom !== 1 || work.position
      ? {
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          objectPosition: work.position,
        }
      : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <CardLink href={cardHref}>
        <div className={`relative overflow-hidden rounded-[24px] border border-black/10 bg-white ${aspectClass}`}>
          {isVideo ? (
            <video
              src={currentSrc}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              style={mediaStyle}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
            />
          ) : (
            <img
              src={currentSrc}
              alt={work.title[locale]}
              loading="lazy"
              style={mediaStyle}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
            />
          )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-90" />
        <div className="absolute bottom-5 left-5 right-5">
          {work.category || work.year ? (
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              {[work.category?.[locale], work.year].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          <h3 className="text-lg font-light text-white mt-2">
            {work.title[locale]}
          </h3>
          {work.description?.[locale] ? (
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              {work.description[locale]}
            </p>
          ) : null}
        </div>
        {showOpenLabel ? (
          <div className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.3em] text-white/70 border border-white/40 rounded-full px-3 py-1">
            {openLabel}
          </div>
        ) : null}
        {ctaLabel ? (
          <a
            href={work.cta?.href}
            target="_blank"
            rel="noreferrer"
            className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-black bg-white/90 border border-white/60 rounded-full px-4 py-2"
          >
            {ctaLabel}
          </a>
        ) : null}
        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/40 bg-black/25 text-white text-xs backdrop-blur hover:bg-black/40 transition-colors"
            >
              ◀
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setCurrent((prev) => (prev + 1) % slides.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/40 bg-black/25 text-white text-xs backdrop-blur hover:bg-black/40 transition-colors"
            >
              ▶
            </button>
          </>
        ) : null}
        </div>
      </CardLink>
    </motion.article>
  );
};

const CardLink: React.FC<{ href?: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  if (!href) {
    return <>{children}</>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {children}
    </a>
  );
};

export default FeaturedWorks;
