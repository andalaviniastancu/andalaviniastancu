import { PortfolioViewer } from "./components/portfolio-viewer";
import { SEQUENCE } from "./data/sequence";

export default function Home() {
  return <PortfolioViewer frames={SEQUENCE} />;
}
