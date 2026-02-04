"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import EventsPage from "./EventsPage";
import { siteContent, type Locale } from "../content/siteContent";

const STORAGE_KEY = "vena-locale";

const EventsPageClient: React.FC = () => {
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
        <EventsPage
          heading={content.eventsPage.heading}
          description={content.eventsPage.description}
          items={content.eventsPage.items}
        />
      </main>
      <Footer {...content.footer} />
    </div>
  );
};

export default EventsPageClient;
