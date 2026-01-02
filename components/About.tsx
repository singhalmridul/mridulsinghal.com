'use client'

import { motion } from 'framer-motion'
import styles from '../styles/About.module.css'

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className={`${styles.heading} h2`}>About Me</h2>
                    <p className={styles.description}>
                        I am a Full Stack Developer & Application Support Engineer based in New Delhi, India.
                        I specialize in building robust web applications and optimizing system performance.
                    </p>
                    <p className={styles.description}>
                        With experience at Michelin, I've honed my skills in observability (Splunk), database management, and automation.
                        I'm passionate about solving complex infrastructure problems and creating seamless user experiences.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={styles.codeWindow}
                >
                    <div className={styles.windowHeader}>
                        <div className={`${styles.circle} ${styles.red}`} />
                        <div className={`${styles.circle} ${styles.yellow}`} />
                        <div className={`${styles.circle} ${styles.green}`} />
                        <span className={styles.title}>developer.ts</span>
                    </div>
                    <div className={styles.codeContent}>
                        <pre>
                            <code>
                                <span className={styles.keyword}>const</span> <span className={styles.variable}>mridul</span> = {'{\n'}
                                {'  '}role: <span className={styles.string}>"Application Support Engineer"</span>,{'\n'}
                                {'  '}location: <span className={styles.string}>"New Delhi, India"</span>,{'\n'}
                                {'  '}skills: [<span className={styles.string}>"React"</span>, <span className={styles.string}>"Next.js"</span>, <span className={styles.string}>"Splunk"</span>],{'\n'}
                                {'  '}databases: [<span className={styles.string}>"MongoDB"</span>, <span className={styles.string}>"PostgreSQL"</span>],{'\n'}
                                {'  '}certifications: [<span className={styles.string}>"ITIL 4"</span>, <span className={styles.string}>"MongoDB Pro"</span>],{'\n'}
                                {'  '}hobbies: <span className={styles.string}>"Cricket & Tech Exploration"</span>{'\n'}
                                {'}'};
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
