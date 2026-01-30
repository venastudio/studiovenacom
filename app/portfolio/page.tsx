import PortfolioPageClient from "../../components/PortfolioPageClient";
import { getWorks } from "../../lib/getWorks";

export const dynamic = "force-dynamic";

export default function PortfolioPageRoute() {
  const works = getWorks();
  return <PortfolioPageClient works={works} />;
}
