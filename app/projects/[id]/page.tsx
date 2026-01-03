import { notFound } from 'next/navigation'
import { getProjectById, getAllProjectIds } from '@/data/projects'
import ProjectCaseStudy from '@/components/ProjectCaseStudy'
import type { Metadata } from 'next'

export async function generateStaticParams() {
    const ids = getAllProjectIds()
    return ids.map((id) => ({ id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const project = getProjectById(id)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Mridul Singhal`,
        description: project.tagline,
        openGraph: {
            title: project.title,
            description: project.tagline,
        },
    }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = getProjectById(id)

    if (!project) {
        notFound()
    }

    return <ProjectCaseStudy project={project} />
}
