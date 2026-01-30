"use client";

import React, { useRef, useEffect, useState } from "react";

type Reel = {
  id: string;
  title?: string;
  src: string;
};

const ReelsSection: React.FC<{ reels: Reel[] }> = ({ reels }) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const next = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: scrollerRef.current.clientWidth, behavior: "smooth" });
  };

  const prev = () => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: -scrollerRef.current.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoScroll || reels.length === 0) return;
    const interval = setInterval(next, 5000);
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
            <button onClick={() => { setAutoScroll(false); prev(); }} aria-label="Previous" className="text-ink/70 hover:text-ink transition-colors text-lg">◀</button>
            <button onClick={() => { setAutoScroll(false); next(); }} aria-label="Next" className="text-ink/70 hover:text-ink transition-colors text-lg">▶</button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
          style={{ WebkitOverflowScrolling: "touch" }}
          onMouseEnter={() => setAutoScroll(false)}
          onMouseLeave={() => setAutoScroll(true)}
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
