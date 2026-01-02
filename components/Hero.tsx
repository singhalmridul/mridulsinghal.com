'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import styles from '../styles/Hero.module.css'

import ThreeBackground from './ThreeBackground'

export default function Hero() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <section id="hero" className={styles.hero}>
            <div className={styles.gridBackground} />
            <ThreeBackground />

            {/* Animated Background Blob - Removed in favor of 3D, or kept as fallback? Kept subtle overlay if needed but let's remove the blob to make 3D clear */}

            <div className={styles.content}>
                <motion.p
                    className={styles.greeting}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.2 }}
                >
                    Hello, I'm
                </motion.p>

                <motion.h1
                    className={`${styles.name} h1`}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                >
                    Mridul Singhal
                </motion.h1>

                <motion.h2
                    className={styles.role}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.6 }}
                >
                    Full Stack Developer &<br />
                    <span className="text-gradient">Digital Craftsman</span>
                </motion.h2>

                <motion.div
                    className={styles.socials}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.8 }}
                >
                    <a href="https://github.com/singhalmridul" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://www.instagram.com/singhalmridul/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/mridulsinghal/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                </motion.div>

                <motion.a
                    href="#about"
                    className={styles.ctaButton}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Explore My Work
                </motion.a>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', bottom: '2rem', color: '#fff', fontSize: '1.5rem' }}
            >
                <HiArrowDown />
            </motion.div>
        </section>
    )
}
