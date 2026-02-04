"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import FeaturedWorks from "./FeaturedWorks";
import ReelsSection from "./ReelsSection";
import Services from "./Services";
import Process from "./Process";
import Contact from "./Contact";
import Footer from "./Footer";
import { siteContent, type Locale } from "../content/siteContent";
import type { WorkItem } from "../content/works";

type Reel = {
  id: string;
  title?: string;
  src: string;
};

type HomeClientProps = {
  works: ReadonlyArray<WorkItem>;
  reels?: ReadonlyArray<Reel>;
};

const STORAGE_KEY = "vena-locale";

const HomeClient: React.FC<HomeClientProps> = ({ works, reels }) => {
  const [locale, setLocale] = useState<Locale>("pl");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pl" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const content = siteContent[locale];

  return (
    <div className="min-h-screen">
      <Header locale={locale} onLocaleChange={setLocale} labels={content.nav} />
      <main className="pt-20">
        <Hero {...content.hero} />
        <About {...content.about} />
        <FeaturedWorks
          label={content.featured.label}
          heading={content.featured.heading}
          description={content.featured.description}
          ctaLabel={content.featured.ctaLabel}
          ctaHref={content.featured.ctaHref}
          placeholderLabel={content.featured.placeholderLabel}
          placeholderTitle={content.featured.placeholderTitle}
          locale={locale}
          works={works}
        />
        <ReelsSection reels={reels ?? []} />
        <Services
          label={content.services.label}
          heading={content.services.heading}
          items={content.services.items}
        />
        <Process
          label={content.process.label}
          heading={content.process.heading}
          steps={content.process.steps}
        />
        <Contact {...content.contact} />
      </main>
      <Footer {...content.footer} />
    </div>
  );
};

export default HomeClient;
