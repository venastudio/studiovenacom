"use client";

import React from "react";
import { motion } from "framer-motion";

type AboutProps = {
  label: string;
  heading: string;
  paragraphs: ReadonlyArray<string>;
  subsections?: ReadonlyArray<{
    title: string;
    body: string;
  }>;
};

const About: React.FC<AboutProps> = ({ label, heading, paragraphs, subsections }) => {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-white border-t border-black/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-repeat" style={{backgroundImage: "url('/assets/icons/VenaLogo.png')", backgroundSize: "180px 180px"}} />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-4">
          <span className="text-[14px] md:text-[15px] uppercase tracking-[0.32em] text-ink/50">
            {label}
          </span>
          <div className="mt-10 hidden md:block">
            <img
              src="/assets/icons/VenaWordmark.png"
              alt="Vena"
              className="h-12 w-auto opacity-60"
            />
          </div>
        </div>

        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight mb-10 font-serif">
              {heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-ink/70 leading-relaxed">
              {paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            {subsections && subsections.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-8">
                {subsections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-ink/60">
                      {section.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-ink/70 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
