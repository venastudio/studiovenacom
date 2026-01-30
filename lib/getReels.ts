import fs from "fs";
import path from "path";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

const titleize = (raw: string) => {
  const spaced = raw.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
};

export type ReelItem = {
  id: string;
  title?: string;
  src: string;
};

export const getReels = (): ReelItem[] => {
  const publicDir = path.join(process.cwd(), "public", "assets", "video");

  const readVideos = (dir: string) => {
    if (!fs.existsSync(dir)) return [] as string[];
    return fs
      .readdirSync(dir)
      .filter((file) => VIDEO_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  };

  const files = readVideos(publicDir);

  if (files.length === 0) return [];

  return files.map((file, index) => {
    const rawName = file.replace(path.extname(file), "");
    const title = titleize(rawName);
    return {
      id: String(index + 1).padStart(2, "0"),
      title,
      src: `/assets/video/${file}`,
    };
  });
};

export default getReels;
