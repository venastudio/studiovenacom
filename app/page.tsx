import HomeClient from "../components/HomeClient";
import { getWorks } from "../lib/getWorks";
import { getReels } from "../lib/getReels";

export const dynamic = "force-dynamic";

export default function Home() {
  const works = getWorks();
  const reels = getReels();
  return <HomeClient works={works} reels={reels} />;
}
