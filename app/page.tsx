import { ProjectViewer } from "./components/project-viewer";
import { PROJECTS } from "./data/projects";

export default function Home() {
  return <ProjectViewer projects={PROJECTS} />;
}
