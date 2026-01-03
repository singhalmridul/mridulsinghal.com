'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import styles from '../styles/Projects.module.css'
import { flagshipProjects } from '../data/projects'

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.headerContainer}
            >
                <h2 className={styles.title}>Engineering <span>Case Studies</span></h2>
                <p className={styles.subtitle}>
                    Production systems built, deployed, and maintained. Emphasis on architecture decisions, tradeoffs, and measurable impact.
                </p>
            </motion.div>

            <div className={styles.grid}>
                {flagshipProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.scope}>
                                {project.scope.map((s, i) => (
                                    <span key={i} className={styles.scopeTag}>{s}</span>
                                ))}
                            </div>
                            <div className={styles.links}>
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkIcon}
                                        aria-label="GitHub"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaGithub />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkIcon}
                                        aria-label="Live Demo"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaExternalLinkAlt />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectTagline}>{project.tagline}</p>

                        <div className={styles.metrics}>
                            {project.metrics.slice(0, 3).map((metric, i) => (
                                <div key={i} className={styles.metric}>
                                    <span className={styles.metricValue}>{metric.value}</span>
                                    <span className={styles.metricLabel}>{metric.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.techStack}>
                            {project.techStack.slice(0, 4).map((tech, i) => (
                                <span key={i} className={styles.techItem}>{tech}</span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span className={styles.techItem}>+{project.techStack.length - 4}</span>
                            )}
                        </div>

                        <Link href={`/projects/${project.id}`} className={styles.caseStudyLink}>
                            Read Full Case Study <FaArrowRight />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={styles.footer}
            >
                <p className={styles.footerNote}>
                    Open source contributions available on{' '}
                    <a href="https://github.com/singhalmridul" target="_blank" rel="noopener noreferrer">
                        GitHub <FaGithub style={{ display: 'inline', marginLeft: '0.25rem' }} />
                    </a>
                </p>
            </motion.div>
        </section>
    )
}
