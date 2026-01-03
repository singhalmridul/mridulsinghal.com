'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'

const posts = [
    {
        title: 'Architecting Observability at Scale',
        excerpt: 'How I built a Splunk platform processing 50M+ events/day with 93% faster incident detection. Deep dive into data pipelines, alert strategies, and operational tradeoffs.',
        date: 'Case Study',
        tag: 'Observability',
        link: '/projects/splunk-observability'
    },
    {
        title: 'Infrastructure Automation: Design Decisions & Tradeoffs',
        excerpt: 'Building a self-service automation platform that eliminated manual errors and saved 30 hours/week. Exploring idempotency, rollback strategies, and cross-platform challenges.',
        date: 'Case Study',
        tag: 'Infrastructure',
        link: '/projects/automation-scripts'
    },
    {
        title: 'Building This Portfolio: A Meta Case Study',
        excerpt: 'Engineering-first portfolio design using Next.js 16, RSC, and system thinking. Framework decisions, content strategy, and performance optimization for 100/100 Lighthouse score.',
        date: 'Case Study',
        tag: 'Full-Stack',
        link: '/projects/portfolio-website'
    }
]

export default function Blog() {
    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical <span>Writing</span>
                </motion.h2>
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Engineering case studies, architecture deep-dives, and production learnings
                </motion.p>

                <div className={styles.grid}>
                    {posts.map((post, i) => (
                        <Link key={i} href={post.link} className={styles.cardLink}>
                            <motion.div
                                className={styles.card}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <span className={styles.tag}>{post.tag}</span>
                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                                <span className={styles.date}>{post.date}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
