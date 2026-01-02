'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaFolder, FaStar, FaCodeBranch } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiPython, SiCplusplus, SiReact, SiNextdotjs, SiNodedotjs, SiHtml5, SiCss3 } from 'react-icons/si'
import styles from '../styles/Projects.module.css'

interface Repo {
    id: number
    name: string
    description: string
    html_url: string
    homepage: string
    stargazers_count: number
    forks_count: number
    language: string
    topics: string[]
}

const LanguageIcon = ({ language }: { language: string }) => {
    switch (language?.toLowerCase()) {
        case 'javascript': return <SiJavascript color="#f7df1e" />
        case 'typescript': return <SiTypescript color="#3178c6" />
        case 'python': return <SiPython color="#3776ab" />
        case 'c++': return <SiCplusplus color="#00599c" />
        case 'html': return <SiHtml5 color="#e34f26" />
        case 'css': return <SiCss3 color="#1572b6" />
        default: return <FaFolder />
    }
}

export default function Projects() {
    const [repos, setRepos] = useState<Repo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetching from GitHub API (Public)
                const res = await fetch('https://api.github.com/users/singhalmridul/repos?sort=updated&per_page=100')
                const data = await res.json()

                if (Array.isArray(data)) {
                    // Filter out forks and profile repo, sort by stars
                    const featured = data
                        .filter(repo => !repo.fork && repo.name !== 'singhalmridul')
                        .map(repo => {
                            if (repo.name === 'mridulsinghal.com') {
                                return { ...repo, homepage: 'https://mridulsinghal.com' }
                            }
                            return repo
                        })
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 6) // Top 6 Projects
                    setRepos(featured)
                }
            } catch (error) {
                console.error("Failed to fetch repos", error)
            } finally {
                setLoading(false)
            }
        }
        fetchRepos()
    }, [])

    return (
        <section id="projects" className={styles.projects}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.headerContainer}
            >
                <h2 className={styles.title}>Featured <span>Projects</span></h2>
                <div className={styles.githubBadge}>
                    <FaGithub /> Live from GitHub
                </div>
            </motion.div>

            <div className={styles.grid}>
                {loading ? (
                    // Skeletons
                    [...Array(3)].map((_, i) => (
                        <div key={i} className={styles.cardSkeleton} />
                    ))
                ) : (
                    repos.map((repo, index) => (
                        <motion.div
                            key={repo.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.langIcon}>
                                    <LanguageIcon language={repo.language} />
                                </div>
                                <div className={styles.links}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} aria-label="GitHub Repo">
                                        <FaGithub />
                                    </a>
                                    {repo.homepage && (
                                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} aria-label="Live Demo">
                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <a href={repo.html_url} target="_blank" className={styles.projectTitle}>{repo.name}</a>
                            <p className={styles.projectDesc}>{repo.description || "No description provided."}</p>

                            <div className={styles.projectFooter}>
                                <div className={styles.stats}>
                                    <span className={styles.stat}><FaStar color="#e3b341" /> {repo.stargazers_count}</span>
                                    <span className={styles.stat}><FaCodeBranch /> {repo.forks_count}</span>
                                </div>
                                <div className={styles.techStack}>
                                    {repo.language && <span className={styles.techItem}>{repo.language}</span>}
                                    {repo.topics?.slice(0, 2).map(t => (
                                        <span key={t} className={styles.techItem}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    )
}
