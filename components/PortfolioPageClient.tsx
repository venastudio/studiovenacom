"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PortfolioPage from "./PortfolioPage";
import { siteContent, type Locale } from "../content/siteContent";
import type { WorkItem } from "../content/works";

type PortfolioPageClientProps = {
  works: WorkItem[];
};

const STORAGE_KEY = "vena-locale";

const PortfolioPageClient: React.FC<PortfolioPageClientProps> = ({ works }) => {
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
      <main className="pt-24">
        <PortfolioPage
          heading={content.portfolioPage.heading}
          description={content.portfolioPage.description}
          emptyTitle={content.portfolioPage.emptyTitle}
          emptyBody={content.portfolioPage.emptyBody}
          locale={locale}
          works={works}
        />
      </main>
      <Footer {...content.footer} />
    </div>
  );
};

export default PortfolioPageClient;
