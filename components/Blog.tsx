'use client'

import { motion } from 'framer-motion'
import styles from '../styles/Blog.module.css'

const posts = [
    {
        title: 'Optimizing Next.js for Maximum Performance',
        excerpt: 'How I achieved a 100/100 Lighthouse score using dynamic imports, image optimization, and smart caching strategies.',
        date: 'Jan 2, 2026',
        tag: 'Next.js'
    },
    {
        title: 'The Future of AI in Web Development',
        excerpt: 'Exploring how LLMs and Generative UI are changing the way we build and interact with digital interfaces.',
        date: 'Dec 15, 2025',
        tag: 'AI/ML'
    },
    {
        title: 'Building Scalable Backend Systems',
        excerpt: 'Lessons learned from managing microservices and high-throughput data pipelines using Kafka and Node.js.',
        date: 'Nov 30, 2025',
        tag: 'Backend'
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
                    Latest <span>Thoughts</span>
                </motion.h2>

                <div className={styles.grid}>
                    {posts.map((post, i) => (
                        <motion.div
                            key={i}
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
                    ))}
                </div>
            </div>
        </section>
    )
}
