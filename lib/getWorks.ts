import fs from "fs";
import path from "path";
import { type WorkItem } from "../content/works";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const EXCLUDED_FILES = new Set([
  "venalogo.png",
  "teledysk3_crop_test.png",
  "teledysk3_cropped.png",
]);

const overrides: Record<string, Partial<WorkItem>> = {
  "igpierwszewydarzenie.png": {
    title: {
      pl: "OFMD — event inauguracyjny",
      en: "OFMD — inaugural event",
    },
    category: {
      pl: "Event",
      en: "Event",
    },
    year: "2025",
    description: {
      pl: "Pierwszy event OFMD × Vena Studio. Koncerty, performansy, społeczność.",
      en: "First OFMD × Vena Studio event. Concerts, performances, community.",
    },
    section: "eventy",
    aspect: "portrait",
    zoom: 2.6,
    position: "20% 50%",
    href: "https://www.instagram.com/_venastudio/",
    featured: true,
    hidden: true,
  },
  "img.jpg": {
    title: {
      pl: "Victoria’s Secret — otwarcie",
      en: "Victoria’s Secret — opening",
    },
    category: {
      pl: "Sesja zdjęciowa",
      en: "Photo session",
    },
    description: {
      pl: "Sesja zdjęciowa jako promocja otwarcia sklepu @victoriassecretpolska w Poznaniu.",
      en: "Photo session promoting the opening of the @victoriassecretpolska store in Poznań.",
    },
    section: "sesje",
    aspect: "portrait",
    gallery: ["img.jpg", "img2.jpg"],
    featured: true,
  },
  "img2.jpg": {
    hidden: true,
  },
  "img3.jpg": {
    hidden: true,
  },
  "img4.jpg": {
    hidden: true,
  },
  "teledysk.jpg": {
    title: {
      pl: "Twój, Dawid — To boli!",
      en: "Twój, Dawid — To boli!",
    },
    category: {
      pl: "Teledysk",
      en: "Music video",
    },
    section: "teledyski",
    description: {
      pl: "Oficjalny klip — kliknij, aby obejrzeć.",
      en: "Official music video — click to watch.",
    },
    href: "https://www.youtube.com/watch?v=gj42lsxfdi0",
    aspect: "landscape",
    zoom: 2.8,
    position: "20% 50%",
    featured: true,
  },
  "teledysk2.png": {
    title: {
      pl: "Stan Zapalny — Stacja Hel",
      en: "Stan Zapalny — Stacja Hel",
    },
    category: {
      pl: "Teledysk",
      en: "Music video",
    },
    section: "teledyski",
    description: {
      pl: "Klip z albumu „My Name Is Poznań 3.0”.",
      en: "Music video from “My Name Is Poznań 3.0”.",
    },
    href: "https://www.youtube.com/watch?v=LXn9Crt8pgg",
    aspect: "landscape",
    zoom: 2.8,
    position: "20% 50%",
    featured: true,
  },
  "teledysk3.png": {
    title: {
      pl: "zibex — tak, chce do ciebie",
      en: "zibex — tak, chce do ciebie",
    },
    category: {
      pl: "Teledysk",
      en: "Music video",
    },
    section: "teledyski",
    description: {
      pl: "Logistyka lokacji i organizacja planu do teledysku. Piosenka osiągnęła status złotej płyty, teledysk posiada ~5 mln wyświetleń na YouTube.",
      en: "Location logistics & production planning. The single achieved gold record status with ~5M YouTube views.",
    },
    href: "https://www.youtube.com/watch?v=-yhbNJWOgaM",
    aspect: "landscape",
    zoom: 1.65,
    position: "50% 40%",
  },
  "igzdj1.png": {
    title: { pl: "ŚWIĄTEK — okładka & canvas", en: "ŚWIĄTEK — cover & canvas" },
    category: { pl: "Artwork", en: "Artwork" },
    section: "sesje",
    description: {
      pl: "Projekt okładki i canvasu do singla „Nie znają mnie”.",
      en: "Cover & canvas for the single “Nie znają mnie”.",
    },
    year: "2025",
    href: "https://www.instagram.com/p/DPHZjLgDPQF/?img_index=1",
    aspect: "post",
    zoom: 3.1,
    position: "15% 50%",
  },
  "zdjig2.png": {
    title: { pl: "Reklama kosmetyków greckich", en: "Greek cosmetics commercial" },
    category: { pl: "Kampania", en: "Campaign" },
    section: "social",
    description: {
      pl: "Produkcja reklamy dla @verthe.pl (współpraca z fotz.studio).",
      en: "Commercial for @verthe.pl (with fotz.studio).",
    },
    href: "https://www.instagram.com/p/DIpDSIYMKR7/?img_index=1",
    aspect: "post",
    zoom: 3.2,
    position: "15% 50%",
  },
  "zdjig3.png": {
    title: { pl: "Schron — koncert", en: "Schron — live" },
    category: { pl: "Koncert", en: "Concert" },
    section: "eventy",
    description: {
      pl: "Koncertowe ujęcia live.",
      en: "Live concert coverage.",
    },
    href: "https://www.instagram.com/p/DKPfbnhiglC/?img_index=1",
    aspect: "post",
    zoom: 3.4,
    position: "12% 50%",
  },
  "zdjig4.png": {
    title: { pl: "Next Fest — SMC", en: "Next Fest — SMC" },
    category: { pl: "Festiwal", en: "Festival" },
    section: "sesje",
    description: {
      pl: "SMC i backstage z festiwalu muzycznego.",
      en: "SMC & backstage from a music festival.",
    },
    href: "https://www.instagram.com/p/DJjzcKLIHRc/?img_index=1",
    aspect: "post",
    zoom: 3.4,
    position: "12% 50%",
  },
  "zdjig5.png": {
    title: { pl: "Stan Zapalny — Stacja Hel (IG)", en: "Stan Zapalny — Stacja Hel (IG)" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "teledyski",
    description: {
      pl: "Klip realizowany w Helu i Poznaniu.",
      en: "Shot in Hel and Poznań.",
    },
    href: "https://www.instagram.com/p/DC4TyaeN-CO/?img_index=1",
    credits: {
      pl: [
        "Produkcja: farout.video × Vena Studio",
        "Reżyseria / DOP: @_tesluk",
        "Montaż & Color: @marcelle_",
      ],
      en: [
        "Production: farout.video × Vena Studio",
        "Director / DOP: @_tesluk",
        "Edit & Color: @marcelle_",
      ],
    },
    aspect: "post",
    zoom: 3.1,
    position: "15% 50%",
  },
  "rolkkaig6.png": {
    title: { pl: "AZYL.2000 — klip", en: "AZYL.2000 — music video" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "teledyski",
    description: {
      pl: "Klip dla azyl.2000 — współpraca z hivibe.eu.",
      en: "Music video for azyl.2000 — with hivibe.eu.",
    },
    href: "https://www.instagram.com/p/DK4j93ZsmGU/",
    aspect: "post",
    zoom: 5.0,
    position: "4% 50%",
  },
  "zibexcaleosiedle.png": {
    title: { pl: "zibex — Całe Osiedle", en: "zibex — Całe Osiedle" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "teledyski",
    description: {
      pl: "Utwór z albumu „XX” Zibexa. Logistyka lokacji i organizacja planu do teledysku.",
      en: "Track from Zibex’s “XX” album. Location logistics and production planning.",
    },
    href: "https://youtu.be/mMPq_NuPG-o",
    aspect: "landscape",
    zoom: 1.2,
    position: "50% 50%",
  },
  "3cab63c48b6d428f915bd9c156bf6b68.mp4": {
    title: { pl: "Studio Session", en: "Studio Session" },
    category: { pl: "Reel", en: "Reel" },
    section: "social",
    year: "2026",
    zoom: 1.5,
    position: "50% 50%",
  },
  "59a2183b12454a838bb857da97c473a2.mp4": {
    title: { pl: "Live Performance", en: "Live Performance" },
    category: { pl: "Reel", en: "Reel" },
    section: "social",
    year: "2026",
    zoom: 1.5,
    position: "50% 50%",
  },
  "e754afb235f74b098a5d65a7f06491f5.mp4": {
    title: { pl: "Creative Moment", en: "Creative Moment" },
    category: { pl: "Reel", en: "Reel" },
    section: "social",
    year: "2026",
    zoom: 1.5,
    position: "50% 50%",
  },
  "video1.mp4": {
    title: { pl: "GAŚNIOR — teledysk", en: "GAŚNIOR — music video" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "social",
    description: {
      pl: "Wsparcie ekipy VENA przy realizacji teledysku rapera GAŚNIOR.",
      en: "VENA crew support during GAŚNIOR’s music video production.",
    },
  },
  "video2.mp4": {
    title: { pl: "Track Day", en: "Track Day" },
    category: { pl: "Reel", en: "Reel" },
    section: "social",
    description: {
      pl: "Zajawka z wydarzenia na torze — ujęcia oraz montaż by VENA.",
      en: "Track event teaser — shots and edit by VENA.",
    },
    order: 999,
  },
  "video3.mp4": {
    title: { pl: "Vic — High Fee", en: "Vic — High Fee" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "social",
    description: {
      pl: "Realizowaliśmy teledysk dla rapera Vic. Numer „High Fee” obejrzycie po kliknięciu w „Otwórz”. Kolejny teledysk wyprodukowany przez naszą ekipę.",
      en: "We produced Vic’s music video for “High Fee”. Watch it by clicking “Open”. Another video produced by our team.",
    },
    href: "https://youtu.be/HwVBE73xxbk",
  },
  "video4.mp4": {
    title: { pl: "Olka Świątek — teledysk", en: "Olka Świątek — music video" },
    category: { pl: "Teledysk", en: "Music video" },
    section: "social",
    description: {
      pl: "Produkcja od A do Z przy jednym z numerów Olki Świątek.",
      en: "End-to-end production for one of Olka Świątek’s tracks.",
    },
  },
  "video5.mp4": {
    title: { pl: "Race Day", en: "Race Day" },
    category: { pl: "Reel", en: "Reel" },
    section: "social",
    description: {
      pl: "Nagrywki i montaż ujęć pod sociale z pokazów jazdy motorsportu.",
      en: "Footage and edits for social from motorsport driving showcases.",
    },
  },
  "video6.mp4": {
    hidden: true,
  },
};

const titleize = (raw: string) => {
  const spaced = raw
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
};

const resolveGallery = (gallery?: string[]) => {
  if (!gallery || gallery.length === 0) return undefined;
  return gallery.map((item) =>
    item.startsWith("/") ? item : `/assets/image/${item}`
  );
};

const inferSection = (category?: { pl?: string; en?: string }, type?: string) => {
  const label = category?.pl?.toLowerCase() ?? "";
  if (label.includes("teledysk")) return "teledyski";
  if (label.includes("koncert") || label.includes("session") || label.includes("sesja")) return "sesje";
  if (label.includes("event") || label.includes("festiwal")) return "eventy";
  if (type === "video") return "social";
  return "social";
};

export const getWorks = (): WorkItem[] => {
  const mediaDirs = [
    {
      dir: path.join(process.cwd(), "public", "assets", "image"),
      urlBase: "/assets/image",
    },
    {
      dir: path.join(process.cwd(), "public", "assets", "video"),
      urlBase: "/assets/video",
    },
  ];

  const readMedia = (dir: string) => {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        const normalized = file.toLowerCase();
        return (
          !EXCLUDED_FILES.has(normalized) &&
          (VIDEO_EXTENSIONS.has(ext) || IMAGE_EXTENSIONS.has(ext))
        );
      })
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  };

  const entries = mediaDirs.flatMap(({ dir, urlBase }) =>
    readMedia(dir).map((file) => ({ file, urlBase }))
  );

  if (entries.length === 0) {
    return [];
  }

  const uniqueEntries = new Map<string, { file: string; urlBase: string }>();
  entries.forEach((entry) => {
    const key = entry.file.toLowerCase();
    if (!uniqueEntries.has(key)) {
      uniqueEntries.set(key, entry);
    }
  });

  const files = Array.from(uniqueEntries.values()).sort((a, b) =>
    a.file.localeCompare(b.file, "en", { numeric: true })
  );

  const items = files.map((entry, index) => {
    const file = entry.file;
    const rawName = file.replace(path.extname(file), "");
    const yearMatch = rawName.match(/\b20\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : undefined;
    const cleanName = year ? rawName.replace(year, "").trim() : rawName;
    const title = titleize(cleanName);
    const ext = path.extname(file).toLowerCase();
    const type: WorkItem["type"] = VIDEO_EXTENSIONS.has(ext) ? "video" : "image";
    const override = overrides[file.toLowerCase()];
    const gallery = resolveGallery(override?.gallery);
    const section = override?.section ?? inferSection(override?.category, type);
    const hidden = override?.hidden ?? false;

    return {
      id: String(index + 1).padStart(2, "0"),
      title: override?.title ?? { pl: title, en: title },
      category: override?.category,
      description: override?.description,
      credits: override?.credits,
      year: override?.year ?? year,
      src: `${entry.urlBase}/${file}`,
      type,
      href: override?.href,
      zoom: override?.zoom,
      position: override?.position,
      aspect: override?.aspect,
      cta: override?.cta,
      featured: override?.featured ?? (index === 0 || index === 2),
      gallery,
      section,
      order: override?.order ?? index,
      hidden,
    };
  });

  return items.filter((item) => !item.hidden);
};
