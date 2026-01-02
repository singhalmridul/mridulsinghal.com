'use client'

import { motion } from 'framer-motion'
import styles from '../styles/Experience.module.css'

export default function Experience() {
    return (
        <section id="experience" className={styles.experience}>
            <div className={styles.maxWidth}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Work Experience
                </motion.h2>

                <div className={styles.timelineLine} />

                {/* Michelin */}
                <motion.div
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.dot} />
                    <div className={styles.card}>
                        <span className={styles.dateBubble}>July 2022 - Present</span>
                        <h3 className={styles.role}>Application Support Engineer</h3>
                        <span className={styles.company}>@ Michelin India Pvt. Ltd.</span>

                        <ul className={styles.list}>
                            <li>Supported 10+ mainframe and web-based applications for the Europe Zone (IBM TPX V5, Web Systems).</li>
                            <li>Developed 100+ Splunk dashboards and automated alerts, reducing manual monitoring by 25%.</li>
                            <li>Managed databases (MySQL, PostgreSQL, MongoDB) and real-time data flows via Kafka & CFT.</li>
                        </ul>

                        <div className={styles.skills}>
                            <span className={styles.skillTag}>Splunk</span>
                            <span className={styles.skillTag}>SQL</span>
                            <span className={styles.skillTag}>Kafka</span>
                            <span className={styles.skillTag}>Mainframe</span>
                        </div>
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className={styles.dot} />
                    <div className={styles.card}>
                        <span className={styles.dateBubble}>2017 - 2022</span>
                        <h3 className={styles.role}>B.Tech in Computer Science</h3>
                        <span className={styles.company}>@ MIT World Peace University</span>

                        <ul className={styles.list}>
                            <li>Relevant Coursework: Database Management, Systems Programming, Algorithms Analysis, AI, ERP Systems.</li>
                        </ul>
                        <div className={styles.skills}>
                            <span className={styles.skillTag}>C++</span>
                            <span className={styles.skillTag}>Data Structures</span>
                            <span className={styles.skillTag}>DBMS</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
