import { PortfolioViewer } from "./components/portfolio-viewer";
import { getFrames, getSettings } from "../lib/sanity";

export default async function Home() {
  const [frames, settings] = await Promise.all([getFrames(), getSettings()]);

  return <PortfolioViewer frames={frames} siteName={settings?.name ?? ""} />;
}
