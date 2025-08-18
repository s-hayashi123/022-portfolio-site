import { ProjectCard } from "../components/ProgectCard";
import projects from "@/data/projects.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "制作物一覧 | My Portfolio",
  description: "これまでに製作したプロジェクトの一覧です",
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
