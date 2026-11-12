import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";
import ProjectCaseStudyClient from "@/components/ProjectCaseStudyClient";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.overview,
  };
}

export default function ProjectDetailsPage({ params }: Props) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <ProjectCaseStudyClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
