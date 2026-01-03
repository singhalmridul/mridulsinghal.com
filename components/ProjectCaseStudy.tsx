'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import type { FlagshipProject } from '../data/projects'
import styles from '../styles/ProjectCaseStudy.module.css'

interface Props {
    project: FlagshipProject
}

export default function ProjectCaseStudy({ project }: Props) {
    return (
        <div className={styles.caseStudy}>
            {/* Header */}
            <div className={styles.header}>
                <Link href="/#projects" className={styles.backLink}>
                    <FaArrowLeft /> Back to Projects
                </Link>

                <motion.div
                    className={styles.titleSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.scope}>
                        {project.scope.map((s, i) => (
                            <span key={i} className={styles.scopeTag}>{s}</span>
                        ))}
                    </div>

                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.tagline}>{project.tagline}</p>

                    <div className={styles.meta}>
                        <span className={styles.timeline}>{project.timeline}</span>
                        <div className={styles.links}>
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    <FaGithub /> View Source
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Key Metrics */}
                <motion.div
                    className={styles.metricsGrid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {project.metrics.map((metric, i) => (
                        <div key={i} className={styles.metricCard}>
                            <div className={styles.metricValue}>{metric.value}</div>
                            <div className={styles.metricLabel}>{metric.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Content Sections */}
            <div className={styles.content}>
                {/* Problem & Context */}
                <Section title="Problem & Context" delay={0.3}>
                    <div className={styles.problemContext}>
                        <div className={styles.subsection}>
                            <h4>The Challenge</h4>
                            <p>{project.problem}</p>
                        </div>
                        <div className={styles.subsection}>
                            <h4>Context</h4>
                            <p>{project.context}</p>
                        </div>
                    </div>
                </Section>

                {/* System Overview */}
                <Section title="System Overview" delay={0.4}>
                    <p className={styles.overview}>{project.systemOverview}</p>

                    <div className={styles.architecture}>
                        <h4>Architecture</h4>
                        <p className={styles.archDescription}>{project.architecture.description}</p>

                        <div className={styles.components}>
                            {project.architecture.components.map((component, i) => (
                                <div key={i} className={styles.component}>
                                    <div className={styles.componentName}>{component.name}</div>
                                    <div className={styles.componentResp}>{component.responsibility}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Visual Evidence */}
                {project.visualEvidence && project.visualEvidence.length > 0 && (
                    <Section title="Visual Evidence" delay={0.45}>
                        <div className={styles.visualEvidence}>
                            {project.visualEvidence.map((evidence, i) => (
                                <div key={i} className={styles.evidenceItem}>
                                    <Image
                                        src={evidence.src}
                                        alt={evidence.caption}
                                        width={900}
                                        height={600}
                                        className={styles.evidenceImage}
                                        priority={i === 0}
                                        quality={90}
                                    />
                                    <p className={styles.evidenceCaption}>{evidence.caption}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Tech Stack */}
                <Section title="Tech Stack" delay={0.5}>
                    <div className={styles.techStack}>
                        {project.techStack.map((tech, i) => (
                            <span key={i} className={styles.techItem}>{tech}</span>
                        ))}
                    </div>
                </Section>

                {/* Key Engineering Decisions */}
                <Section title="Key Engineering Decisions" delay={0.6}>
                    <div className={styles.decisions}>
                        {project.decisions.map((decision, i) => (
                            <div key={i} className={styles.decision}>
                                <h4>{decision.title}</h4>
                                <div className={styles.decisionContent}>
                                    <div className={styles.decisionItem}>
                                        <strong>Challenge:</strong>
                                        <p>{decision.challenge}</p>
                                    </div>
                                    <div className={styles.decisionItem}>
                                        <strong>Solution:</strong>
                                        <p>{decision.solution}</p>
                                    </div>
                                    <div className={styles.decisionItem}>
                                        <strong>Tradeoffs:</strong>
                                        <p>{decision.tradeoffs}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Results & Impact */}
                <Section title="Results & Impact" delay={0.7}>
                    <div className={styles.results}>
                        {project.results.map((result, i) => (
                            <div key={i} className={styles.resultCard}>
                                <div className={styles.resultHeader}>
                                    <h4>{result.label}</h4>
                                    <div className={styles.improvement}>{result.improvement}</div>
                                </div>
                                <div className={styles.comparison}>
                                    <div className={styles.before}>
                                        <FaTimesCircle className={styles.iconBefore} />
                                        <span className={styles.label}>Before:</span>
                                        <span className={styles.value}>{result.before}</span>
                                    </div>
                                    <div className={styles.after}>
                                        <FaCheckCircle className={styles.iconAfter} />
                                        <span className={styles.label}>After:</span>
                                        <span className={styles.value}>{result.after}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Learnings */}
                <Section title="Failures & Learnings" delay={0.8}>
                    <div className={styles.learnings}>
                        {project.learnings.map((learning, i) => (
                            <div key={i} className={styles.learning}>
                                <div className={styles.learningNumber}>{i + 1}</div>
                                <p>{learning}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>

            {/* Footer CTA */}
            <motion.div
                className={styles.footer}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <Link href="/#projects" className={styles.backButton}>
                    <FaArrowLeft /> View More Projects
                </Link>
                <Link href="/#contact" className={styles.contactButton}>
                    Get In Touch
                </Link>
            </motion.div>
        </div>
    )
}

interface SectionProps {
    title: string
    children: React.ReactNode
    delay?: number
}

function Section({ title, children, delay = 0 }: SectionProps) {
    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay }}
        >
            <h2 className={styles.sectionTitle}>{title}</h2>
            {children}
        </motion.section>
    )
}
