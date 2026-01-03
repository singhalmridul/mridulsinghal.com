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
                        I build and own production systems end-to-end—from frontend interfaces through backend services to infrastructure and observability layers.
                        At Michelin, I architected monitoring platforms processing 50M+ events/day and automated critical operations, reducing MTTR by 60% and saving 30+ engineering hours weekly.
                    </p>
                    <p className={styles.description}>
                        My approach centers on architectural tradeoffs, performance under scale, and operational reliability.
                        I've designed distributed observability systems, built self-service automation platforms, and made stack decisions that balance complexity with maintainability.
                        Every system I build includes instrumentation, graceful degradation, and clear operational runbooks.
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
                        <span className={styles.title}>systems-engineer.ts</span>
                    </div>
                    <div className={styles.codeContent}>
                        <pre>
                            <code>
                                <span className={styles.keyword}>const</span> <span className={styles.variable}>mridul</span> = {'{'}
                                {'\n'}                                {'  '}role: <span className={styles.string}>"Full-Stack Engineer & Systems Architect"</span>,
                                {'\n'}                                {'  '}focus: [<span className={styles.string}>"Production Systems"</span>, <span className={styles.string}>"Observability"</span>, <span className={styles.string}>"Infrastructure"</span>],
                                {'\n'}                                {'  '}scale: {'{'}
                                {'\n'}                                {'    '}monitoring: <span className={styles.string}>"50M+ events/day"</span>,
                                {'\n'}                                {'    '}automation: <span className={styles.string}>"30 hrs/week saved"</span>,
                                {'\n'}                                {'    '}uptime: <span className={styles.string}>"99.95%"</span>
                                {'\n'}                                {'  '}{'}'}, {'\n'}                                {'  '}decisions: [<span className={styles.string}>"Architecture"</span>, <span className={styles.string}>"Performance"</span>, <span className={styles.string}>"Reliability"</span>],
                                {'\n'}                                {'  '}stack: {'{'}
                                {'\n'}                                {'    '}observability: [<span className={styles.string}>"Splunk"</span>, <span className={styles.string}>"Custom Dashboards"</span>],
                                {'\n'}                                {'    '}automation: [<span className={styles.string}>"Python"</span>, <span className={styles.string}>"PowerShell"</span>, <span className={styles.string}>"APIs"</span>],
                                {'\n'}                                {'    '}fullStack: [<span className={styles.string}>"Next.js"</span>, <span className={styles.string}>"TypeScript"</span>, <span className={styles.string}>"MongoDB"</span>]
                                {'\n'}                                {'  '}{'}'}
                                {'\n'}                                {'}'};
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
