export type Locale = "pl" | "en";

export const siteContent = {
  pl: {
    nav: {
      studio: "O nas",
      realizacje: "Realizacje",
      portfolio: "Portfolio",
      services: "Zakres",
      process: "Proces",
      events: "Eventy",
      contact: "Kontakt",
    },
    hero: {
      title: "VENA STUDIO",
      tagline: "LOVE. FORM. ART.",
      subline:
        "Artystyczna produkcja obrazu i dźwięku. Klipy, eventy, sesje, koncepty kreatywne.",
      ctaPrimary: "Zobacz realizacje",
      ctaSecondary: "Skontaktuj się",
      location: "Poland / Global",
    },
    about: {
      label: "O nas",
      heading:
        "Studio produkcyjne i agencja artystyczna, która prowadzi projekty od idei do finalnego kadru.",
      paragraphs: [
        "Pracujemy holistycznie: od koncepcji, przez reżyserię i produkcję, po postprodukcję i dystrybucję. Łączymy estetykę z precyzją wykonania.",
        "Budujemy język wizualny artystów, marek i wydarzeń. Dbamy o detale, rytm i spójność całego doświadczenia.",
      ],
      subsections: [
        {
          title: "GDZIE DOJEŻDŻAMY?",
          body: "Dojeżdżamy na eventy, klipy, sesje i wydarzenia na terenie całej Polski, nie zamykając się jednocześnie tylko na nią. Jeśli masz projekt lub pomysł na koncepcyjny wyjazd za granicę, jak najbardziej pomożemy, zaczynając już od pierwszej i najbardziej charakterystycznej dla dłuższej podróży kwestii, czyli właśnie logistyki.",
        },
        {
          title: "KONTAKT DO NAS",
          body: "Jeśli ktokolwiek ma do nas pytania, chciałby porozmawiać o którymś z planowanych projektów, pomysłów na jego promocję, sesję czy ubranie całości w jeden większy spójny koncept, kontaktujcie się z nami, pisząc do nas maila, którego adres znajdziecie w stopce strony. Możecie także kontaktować się przez formularz bądź dzwoniąc pod podany numer telefonu.",
        },
      ],
    },
    featured: {
      label: "Realizacje",
      heading: "Nasze realizacje",
      description:
        "Trzy najlepsze projekty na start. Pełne portfolio dostępne w osobnej sekcji.",
      ctaLabel: "Pełne portfolio",
      ctaHref: "/portfolio",
      placeholderLabel: "Realizacja",
      placeholderTitle: "Wkrótce",
    },
    portfolioPage: {
      heading: "Portfolio",
      description:
        "Pełna galeria realizacji: klipy, eventy, sesje i formaty artystyczne.",
      emptyTitle: "Brak wideo",
      emptyBody:
        "Dodaj pliki do public/assets/image lub public/assets/video (MP4/WEBM/MOV).",
      slotLabel: "Miejsce na realizację",
    },
    services: {
      label: "Specjalizacja",
      heading: "Zakres działań",
      items: [
        {
          title: "Art Direction",
          description: "Koncepcja, kierunek artystyczny, reżyseria wizualna.",
          details: ["Koncepcja", "Moodboardy", "Nadzór kreatywny"],
        },
        {
          title: "Video Production",
          description: "Teledyski, klipy, dokumentacje wydarzeń.",
          details: ["Plan zdjęć", "Realizacja", "Mastery"],
        },
        {
          title: "Creative Sessions",
          description: "Sesje zdjęciowe, stylizacja, scenografia.",
          details: ["Sesje foto", "Stylizacja", "Scenografia"],
        },
        {
          title: "Event Coverage",
          description: "Rejestracja wydarzeń, backstage, storytelling.",
          details: ["Live coverage", "Backstage", "Aftermovie"],
        },
        {
          title: "Brand Visuals",
          description: "Kampanie, formaty digital, social-first content.",
          details: ["Kampanie", "Digital", "Social-first"],
        },
      ],
    },
    process: {
      label: "Proces",
      heading: "Jak pracujemy",
      steps: [
        {
          title: "Koncepcja",
          description:
            "Definiujemy cel, narrację i estetykę. Budujemy moodboardy i scenariusz.",
        },
        {
          title: "Produkcja",
          description:
            "Realizacja zdjęć, reżyseria na planie, pełna kontrola jakości.",
        },
        {
          title: "Postprodukcja",
          description:
            "Montaż, color, dźwięk, finalny look. Materiały gotowe do publikacji.",
        },
      ],
    },
    contact: {
      label: "Kontakt",
      heading: "Nowe projekty i współprace",
      emailLabel: "Napisz do nas",
      email: "contact@studiovena.com",
      instagramLabel: "Instagram",
      location: "Polska / Świat",
      availability: "",
      cta: "Let’s build something beautiful",
      form: {
        label: "Formularz",
        nameLabel: "Imię",
        namePlaceholder: "Twoje imię",
        emailLabel: "Email",
        emailPlaceholder: "email@adres.pl",
        messageLabel: "Wiadomość",
        messagePlaceholder: "Opisz krótko projekt",
        submitLabel: "Wyślij",
        sendingLabel: "Wysyłam...",
        successMessage: "Dziękujemy. Odpowiemy w ciągu 24–48h.",
        errorMessage: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
      },
    },
    eventsPage: {
      heading: "Nadchodzące eventy",
      description:
        "Wydarzenia artystyczne, koncerty i produkcje, które realizujemy w najbliższym czasie.",
      items: [
        {
          title: "VENA EVENT",
          date: "Marzec/Kwiecień 2026",
          location: "Poznań, PL",
          status: "",
        },
      ],
    },
    footer: {
      note: "© 2026 Vena Studio. All rights reserved.",
      backToTop: "Powrót",
      privacyLabel: "Polityka prywatności",
      privacyText:
        "Dane z formularza kontaktowego wykorzystujemy wyłącznie do odpowiedzi na zapytania. Nie udostępniamy ich podmiotom trzecim ani nie używamy w celach marketingowych.",
    },
  },
  en: {
    nav: {
      studio: "About us",
      realizacje: "Selected",
      portfolio: "Portfolio",
      services: "Services",
      process: "Process",
      events: "Events",
      contact: "Contact",
    },
    hero: {
      title: "VENA STUDIO",
      tagline: "LOVE. FORM. ART.",
      subline:
        "Artistic image & sound production. Music videos, events, sessions, creative concepts.",
      ctaPrimary: "View work",
      ctaSecondary: "Get in touch",
      location: "Poland / Global",
    },
    about: {
      label: "About",
      heading:
        "A production studio and artistic agency guiding projects from idea to final frame.",
      paragraphs: [
        "We work holistically: concept, direction, production, post and delivery. A balance of aesthetics and precision.",
        "We build visual language for artists, brands, and events. Detail, rhythm, and consistency are the core.",
      ],
      subsections: [
        {
          title: "WHERE DO WE TRAVEL?",
          body: "We travel for events, music videos, sessions, and productions across all of Poland, while not limiting ourselves to it. If you have a project or an idea for a concept trip abroad, we can absolutely help, starting from the first and most characteristic part of longer travel: logistics.",
        },
        {
          title: "CONTACT US",
          body: "If you have any questions, would like to talk about one of your planned projects, ideas for its promotion, a session, or wrapping everything into one bigger cohesive concept, contact us by email (address in the footer), via the form, or by calling the provided phone number.",
        },
      ],
    },
    featured: {
      label: "Selected work",
      heading: "Our work",
      description:
        "Three key projects to start. Full portfolio lives on its own page.",
      ctaLabel: "Full portfolio",
      ctaHref: "/portfolio",
      placeholderLabel: "Project",
      placeholderTitle: "Coming soon",
    },
    portfolioPage: {
      heading: "Portfolio",
      description:
        "Full gallery: music videos, events, sessions, and art formats.",
      emptyTitle: "No videos yet",
      emptyBody:
        "Add files to public/assets/image or public/assets/video (MP4/WEBM/MOV).",
      slotLabel: "Portfolio slot",
    },
    services: {
      label: "Expertise",
      heading: "What we do",
      items: [
        {
          title: "Art Direction",
          description: "Concepts, visual direction, and creative supervision.",
          details: ["Concept", "Moodboards", "Creative lead"],
        },
        {
          title: "Video Production",
          description: "Music videos, clips, and event documentation.",
          details: ["Shoot plan", "Production", "Masters"],
        },
        {
          title: "Creative Sessions",
          description: "Photo sessions, styling, scenography.",
          details: ["Photo", "Styling", "Set design"],
        },
        {
          title: "Event Coverage",
          description: "Live documentation, backstage, storytelling.",
          details: ["Live", "Backstage", "Aftermovie"],
        },
        {
          title: "Brand Visuals",
          description: "Campaigns, digital formats, social-first content.",
          details: ["Campaigns", "Digital", "Social-first"],
        },
      ],
    },
    process: {
      label: "Process",
      heading: "How we work",
      steps: [
        {
          title: "Concept",
          description:
            "We define goals, narrative, and aesthetics. Moodboards and scripts.",
        },
        {
          title: "Production",
          description:
            "Shoot execution, on-set direction, full quality control.",
        },
        {
          title: "Post",
          description:
            "Editing, color, sound, final look. Ready-to-publish assets.",
        },
      ],
    },
    contact: {
      label: "Contact",
      heading: "New projects and collaborations",
      emailLabel: "Email us",
      email: "contact@studiovena.com",
      instagramLabel: "Instagram",
      location: "Poland / Worldwide",
      availability: "",
      cta: "Let’s build something beautiful",
      form: {
        label: "Form",
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "hello@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Briefly describe the project",
        submitLabel: "Send",
        sendingLabel: "Sending...",
        successMessage: "Thank you. We will reply within 24–48h.",
        errorMessage: "Something went wrong. Please try again.",
      },
    },
    eventsPage: {
      heading: "Upcoming events",
      description:
        "Art events, concerts, and productions we are delivering soon.",
      items: [
        {
          title: "VENA EVENT",
          date: "March/April 2026",
          location: "Poznań, PL",
          status: "",
        },
      ],
    },
    footer: {
      note: "© 2026 Vena Studio. All rights reserved.",
      backToTop: "Back to top",
      privacyLabel: "Privacy policy",
      privacyText:
        "We use contact form data only to respond to inquiries. We do not share it with third parties or use it for marketing.",
    },
  },
} as const;
