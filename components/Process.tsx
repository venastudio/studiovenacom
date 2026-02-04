"use client";

import React from "react";
import { motion } from "framer-motion";

type Step = {
  title: string;
  description: string;
};

type ProcessProps = {
  label: string;
  heading: string;
  steps: ReadonlyArray<Step>;
};

const Process: React.FC<ProcessProps> = ({ label, heading, steps }) => {
  return (
    <section id="process" className="py-16 md:py-32 px-6 md:px-12 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
            {label}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-light font-serif">{heading}</h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-3 h-px bg-black/10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <motion.div
                  key={`${step.title}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-6 md:pl-0 pt-6 md:pt-0"
                >
                  <span className="absolute left-0 top-2 md:top-2 w-2 h-2 rounded-full bg-ink/70" />
                  {!isLast ? (
                    <span className="absolute left-1 top-4 bottom-0 w-px bg-black/10 md:hidden" />
                  ) : null}
                  <span className="text-[11px] font-mono text-ink/40">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-light">{step.title}</h3>
                  <p className="mt-3 text-sm text-ink/60 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
