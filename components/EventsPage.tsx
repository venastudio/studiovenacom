"use client";

import React from "react";
import { motion } from "framer-motion";

type EventItem = {
  title: string;
  date: string;
  location: string;
  status: string;
};

type EventsPageProps = {
  heading: string;
  description: string;
  items: ReadonlyArray<EventItem>;
};

const EventsPage: React.FC<EventsPageProps> = ({ heading, description, items }) => {
  const highlight = items[0];

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

        {items.length <= 1 && highlight ? (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-black/10 bg-ink text-white p-10 md:p-14"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-[70%] w-[70%] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_65%)]" />
              <div className="absolute right-10 bottom-8 text-[120px] md:text-[160px] font-serif text-white/5 tracking-tight">
                01
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
              <div className="md:col-span-7">
                {highlight.status ? (
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                    {highlight.status}
                  </p>
                ) : null}
                <h2 className="mt-5 text-3xl md:text-5xl font-light font-serif">
                  {highlight.title}
                </h2>
                <p className="mt-4 text-sm text-white/70 max-w-lg">
                  {highlight.location}
                </p>
              </div>

              <div className="md:col-span-5 flex md:justify-end">
                <div className="text-left md:text-right">
                  <p className="text-4xl md:text-6xl font-light font-serif">
                    {highlight.date}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((event, index) => (
              <motion.article
                key={`${event.title}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[24px] border border-black/10 bg-white p-8 md:p-10"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
                  {event.status}
                </p>
                <h2 className="mt-4 text-2xl md:text-3xl font-light">
                  {event.title}
                </h2>
                <div className="mt-6 text-sm text-ink/60">
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsPage;
