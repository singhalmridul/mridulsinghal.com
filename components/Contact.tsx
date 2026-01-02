'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin, FaFileDownload } from 'react-icons/fa'
import styles from '../styles/Contact.module.css'

import ContactForm from './ContactForm'

export default function Contact() {
    return (
        <section id="contact" className={styles.contact}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.title}>Let's Work <span>Together</span></h2>
                <p className={styles.text}>
                    I'm currently open to new opportunities. Check out my socials or drop me a Message.
                </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <ContactForm />
            </motion.div>


            <div className={styles.grid}>
                {/* GitHub */}
                <motion.a
                    href="https://github.com/singhalmridul"
                    target="_blank"
                    className={styles.socialCard}
                    whileHover={{ y: -5 }}
                >
                    <div className={styles.iconWrapper}><FaGithub /></div>
                    <span className={styles.cardTitle}>GitHub</span>
                    <span className={styles.cardLabel}>Check functionality</span>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                    href="https://www.linkedin.com/in/mridulsinghal/"
                    target="_blank"
                    className={styles.socialCard}
                    whileHover={{ y: -5 }}
                >
                    <div className={styles.iconWrapper}><FaLinkedin /></div>
                    <span className={styles.cardTitle}>LinkedIn</span>
                    <span className={styles.cardLabel}>Professional Connect</span>
                </motion.a>

                {/* Instagram */}
                <motion.a
                    href="https://www.instagram.com/singhalmridul/"
                    target="_blank"
                    className={styles.socialCard}
                    whileHover={{ y: -5 }}
                >
                    <div className={styles.iconWrapper}><FaInstagram /></div>
                    <span className={styles.cardTitle}>Instagram</span>
                    <span className={styles.cardLabel}>Behind the scenes</span>
                </motion.a>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <a href="/Mridul_Resume_Latest.pdf" download="Mridul_Resume_Latest.pdf" className={styles.resumeButton}>
                    <FaFileDownload />
                    Download Resume
                </a>
            </motion.div>

            <p className={styles.copyright}>
                © {new Date().getFullYear()} Mridul Singhal. Made with Next.js & Coffee.
            </p>
        </section>
    )
}
