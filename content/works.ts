export type WorkItem = {
  id: string;
  title: { pl: string; en: string };
  category?: { pl: string; en: string };
  year?: string;
  description?: { pl: string; en: string };
  credits?: { pl: string[]; en: string[] };
  src: string;
  type?: "video" | "image";
  href?: string;
  zoom?: number;
  position?: string;
  aspect?: "square" | "portrait" | "landscape" | "post";
  cta?: { label: { pl: string; en: string }; href: string };
  featured?: boolean;
  gallery?: string[];
  section?: "eventy" | "sesje" | "teledyski" | "social";
  order?: number;
  hidden?: boolean;
};

export const works: WorkItem[] = [
  {
    id: "01",
    title: { pl: "Noir Pulse", en: "Noir Pulse" },
    category: { pl: "Teledysk", en: "Music Video" },
    year: "2025",
    src: "/assets/image/vena-01.mp4",
    featured: true,
  },
  {
    id: "02",
    title: { pl: "Midnight Session", en: "Midnight Session" },
    category: { pl: "Live Session", en: "Live Session" },
    year: "2024",
    src: "/assets/image/vena-02.mp4",
  },
  {
    id: "03",
    title: { pl: "Symbiosis", en: "Symbiosis" },
    category: { pl: "Event Artystyczny", en: "Art Event" },
    year: "2024",
    src: "/assets/image/vena-03.mp4",
    featured: true,
  },
  {
    id: "04",
    title: { pl: "Studio Diary", en: "Studio Diary" },
    category: { pl: "Short Form", en: "Short Form" },
    year: "2025",
    src: "/assets/image/vena-04.mp4",
  },
  {
    id: "05",
    title: { pl: "Echoes", en: "Echoes" },
    category: { pl: "Dokument", en: "Documentary" },
    year: "2023",
    src: "/assets/image/vena-05.mp4",
  },
  {
    id: "06",
    title: { pl: "Pulse", en: "Pulse" },
    category: { pl: "Fashion / Styling", en: "Fashion / Styling" },
    year: "2024",
    src: "/assets/image/vena-06.mp4",
  },
];
