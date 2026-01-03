import { MetadataRoute } from 'next'
import { getAllProjectIds } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const projectIds = getAllProjectIds()

    const projectPages = projectIds.map(id => ({
        url: `https://mridulsinghal.com/projects/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: 'https://mridulsinghal.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...projectPages,
        {
            url: 'https://mridulsinghal.com/Mridul_Resume_Latest.pdf',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]
}
