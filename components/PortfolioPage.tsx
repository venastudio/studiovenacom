"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "../content/siteContent";
import type { WorkItem } from "../content/works";

type PortfolioPageProps = {
  heading: string;
  description: string;
  emptyTitle: string;
  emptyBody: string;
  locale: Locale;
  works: ReadonlyArray<WorkItem>;
};

const PortfolioPage: React.FC<PortfolioPageProps> = ({
  heading,
  description,
  emptyTitle,
  emptyBody,
  locale,
  works,
}) => {
  const chunk = <T,>(items: ReadonlyArray<T>, size: number) => {
    const rows: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      rows.push(Array.from(items.slice(i, i + size)));
    }
    return rows;
  };

  const sectionLabels = useMemo(
    () => [
      {
        key: "eventy" as const,
        label: locale === "pl" ? "Eventy" : "Events",
      },
      {
        key: "sesje" as const,
        label: locale === "pl" ? "Sesje koncertowe i prywatne" : "Concert & private sessions",
      },
      {
        key: "teledyski" as const,
        label: locale === "pl" ? "Teledyski" : "Music videos",
      },
      {
        key: "social" as const,
        label: locale === "pl" ? "Social media" : "Social media",
      },
    ],
    [locale]
  );

  const grouped = useMemo(() => {
    const bySection = sectionLabels.map((section) => {
      const items = works
        .filter((work) => work.section === section.key)
      const sortedItems = [...items].sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title[locale].localeCompare(b.title[locale], "pl", { numeric: true });
      });
      return { ...section, items: sortedItems };
    });
    return bySection;
  }, [sectionLabels, works, locale]);

  return (
    <section className="py-28 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-light font-serif">
            {heading}
          </h1>
          <p className="mt-4 text-sm md:text-base text-ink/60 max-w-2xl">
            {description}
          </p>
        </div>

        {works.length === 0 ? (
          <div className="mb-10 rounded-[24px] border border-black/10 bg-white/80 p-6 text-sm text-ink/60">
            <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
              {emptyTitle}
            </p>
            <p className="mt-3">{emptyBody}</p>
          </div>
        ) : null}

        {grouped.map((section, index) => {
          if (section.items.length === 0) return null;
          const rows = chunk(section.items, 3);
          return (
            <div key={section.key} className={index === 0 ? "mt-10" : "mt-14"}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
                {section.label}
              </p>
              <div className="mt-6 space-y-6">
                {rows.map((row, rowIndex) => (
                  <div key={`${section.key}-row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {row.map((work, itemIndex) => {
                      const isLastRowSingleItem =
                        rowIndex === rows.length - 1 && row.length === 1;
                      const centerClass = isLastRowSingleItem ? "md:col-start-2" : undefined;
                      return (
                        <WorkCard
                          key={`${section.key}-${work.id}-${rowIndex}-${itemIndex}`}
                          work={work}
                          locale={locale}
                          className={centerClass}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Instagram CTA Button */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://www.instagram.com/_venastudio/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.3em] text-ink border border-ink/20 rounded-full hover:bg-ink hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
            </svg>
            {locale === "pl" ? "Check us on Instagram" : "Check us on Instagram"}
          </a>
        </div>
      </div>
    </section>
  );
};

const WorkCard: React.FC<{
  work: WorkItem;
  locale: Locale;
  className?: string;
}> = ({ work, locale, className }) => {
  const slides = work.gallery && work.gallery.length > 0 ? work.gallery : [work.src];
  const [current, setCurrent] = useState(0);
  const currentSrc = slides[current] ?? work.src;
  const isVideo =
    work.type === "video" || /\.(mp4|webm|mov|m4v)$/i.test(currentSrc);
  const openLabel = locale === "pl" ? "Otwórz" : "Open";
  const cardHref = work.href;
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
      whileHover={{ scale: 1.02 }}
      className={`relative ${className ?? ""}`}
    >
      <CardLink href={cardHref}>
        <div className={`relative overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm hover:shadow-md transition-shadow ${aspectClass}`}>
          {isVideo ? (
            <video
              src={currentSrc}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              style={mediaStyle}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={currentSrc}
              alt={work.title[locale]}
              loading="lazy"
              style={mediaStyle}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
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
                className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-white/40 bg-black/25 text-white text-[10px] backdrop-blur hover:bg-black/40 transition-colors"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full border border-white/40 bg-black/25 text-white text-[10px] backdrop-blur hover:bg-black/40 transition-colors"
              >
                ▶
              </button>
            </>
          ) : null}
        </div>
        <div className="mt-4 px-2">
          {work.category || work.year ? (
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
              {[work.category?.[locale], work.year].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          {!/^[a-f0-9]{16,}$/i.test(work.title[locale]) && (
            <>
              <h3 className="text-sm font-light text-ink mt-2">{work.title[locale]}</h3>
              {work.description?.[locale] ? (
                <p className="mt-1 text-xs text-ink/60 leading-relaxed">
                  {work.description[locale]}
                </p>
              ) : null}
            </>
          )}
        </div>
        {cardHref ? (
          <div className="mt-3 px-2 pb-2">
            <div className="text-[9px] uppercase tracking-[0.35em] text-ink/60 border border-ink/20 rounded-full px-2 py-1 inline-block">
              {openLabel}
            </div>
          </div>
        ) : null}
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

export default PortfolioPage;
