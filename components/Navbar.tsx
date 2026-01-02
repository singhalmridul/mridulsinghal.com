'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const [activeSection, setActiveSection] = useState('Home')

    // Handle scroll spy with manual calculation (More robust for varying section heights)
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200 // Offset for "center" focus

            // Check if we are at the bottom of the page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection('Contact')
                return
            }

            // Iterate through sections to find the current one
            for (const link of navLinks) {
                const id = link.href.substring(1)
                const element = document.getElementById(id)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(link.name)
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        // Initial check
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
        e.preventDefault()
        setActiveSection(name)

        if (name === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        const id = href.substring(1)
        const element = document.getElementById(id)
        if (element) {
            const offset = 80 // Navbar height offset
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            })
        }
    }

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div className={styles.progressBar} style={{ scaleX }} />

            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${styles.navLink} ${activeSection === link.name ? styles.active : ''}`}
                            onClick={(e) => handleLinkClick(e, link.name, link.href)}
                        >
                            {link.name}
                            {activeSection === link.name && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={styles.activeTab}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
}
