"use client";

import React, { useRef, useEffect, useState } from "react";

type Reel = {
  id: string;
  title?: string;
  src: string;
};

const ReelsSection: React.FC<{ reels: ReadonlyArray<Reel> }> = ({ reels }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const hasCentered = useRef(false);
  const autoDirection = useRef<1 | -1>(-1);

  const next = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: scrollerRef.current.clientWidth, behavior: "smooth" });
  };

  const prev = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: -scrollerRef.current.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (!scrollerRef.current || reels.length === 0 || hasCentered.current) return;
    const scroller = scrollerRef.current;
    const children = Array.from(scroller.children) as HTMLElement[];
    if (children.length === 0) return;
    const middleIndex = Math.floor(children.length / 2);
    const target = children[middleIndex];

    const center = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const targetLeft =
        target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2;
      const clamped = Math.max(0, Math.min(targetLeft, maxScroll));
      scroller.scrollTo({ left: clamped });
      hasCentered.current = true;
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(center));
    return () => cancelAnimationFrame(raf);
  }, [reels.length]);

  useEffect(() => {
    if (!autoScroll || reels.length === 0 || !scrollerRef.current) return;
    const scroller = scrollerRef.current;

    const nudge = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll <= 0) return;
      if (scroller.scrollLeft <= 4) autoDirection.current = 1;
      if (scroller.scrollLeft >= maxScroll - 4) autoDirection.current = -1;
      const delta = autoDirection.current * 60;
      scroller.scrollBy({ left: delta, behavior: "smooth" });
      autoDirection.current = autoDirection.current * -1;
    };

    const interval = setInterval(nudge, 2500);
    return () => clearInterval(interval);
  }, [autoScroll, reels.length]);

  if (!reels || reels.length === 0) return null;

  return (
    <section
      id="reels"
      className="pt-0 md:pt-0 pb-24 md:pb-32 px-6 md:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
              Direct
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-light font-serif">
              In Motion
            </h2>
          </div>
        <div className="flex gap-3">
            <button
              onClick={() => { setAutoScroll(false); prev(); }}
              aria-label="Previous"
              className="text-ink/70 hover:text-ink transition-colors text-lg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M15.5 19 8.5 12l7-7" />
              </svg>
            </button>
            <button
              onClick={() => { setAutoScroll(false); next(); }}
              aria-label="Next"
              className="text-ink/70 hover:text-ink transition-colors text-lg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="m8.5 5 7 7-7 7" />
              </svg>
            </button>
        </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
          onMouseEnter={() => setAutoScroll(false)}
          onMouseLeave={() => setAutoScroll(true)}
          onTouchStart={() => setAutoScroll(false)}
        >
          {reels.map((r) => (
            <div key={r.id} className="snap-start flex-none w-full sm:w-[90vw] md:w-[65vw] lg:w-[560px] rounded-2xl overflow-hidden bg-bone border border-black/10">
              <video
                src={r.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-[50vh] md:h-[65vh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
