"use client";

import React from "react";
import { motion } from "framer-motion";

type ServiceItem = {
  title: string;
  description: string;
  details?: string[];
};

type ServicesProps = {
  label: string;
  heading: string;
  items: ServiceItem[];
};

const Services: React.FC<ServicesProps> = ({ label, heading, items }) => {
  return (
    <section id="services" className="pt-10 pb-12 md:pt-24 md:pb-28 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20 flex flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ink/50">
            {label}
          </span>
          <h2 className="text-2xl md:text-4xl font-light font-serif">{heading}</h2>
        </div>

        <div className="border-t border-black/10 pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16">
            {items.map((service, index) => {
              const isRight = index % 2 === 1;
              const alignment = isRight
                ? "md:col-start-7 md:col-span-6 md:pr-16 md:pl-0 md:text-right md:ml-auto"
                : "md:col-start-1 md:col-span-6 md:pl-16";
              const numberPosition = isRight
                ? "left-0 md:left-auto md:right-0"
                : "left-0";

              return (
                <motion.article
                  key={`${service.title}-${index}`}
                  className={`relative pl-10 text-left ${alignment}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`absolute top-0 text-4xl md:text-5xl font-serif text-ink/10 ${numberPosition}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-light tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-ink/60 leading-relaxed max-w-2xl md:max-w-none">
                    {service.description}
                  </p>
                  {service.details && service.details.length > 0 ? (
                    <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ink/40">
                      {service.details.join(" · ")}
                    </p>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
          <div className="mt-10 md:mt-20 border-t border-black/10" />
        </div>
      </div>
    </section>
  );
};

export default Services;
