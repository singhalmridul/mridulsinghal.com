'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaCheck, FaChevronDown, FaSearch } from 'react-icons/fa'
import { countries } from '../data/countries'
import styles from '../styles/ContactForm.module.css'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [countryCode, setCountryCode] = useState(countries.find(c => c.name === 'India') || countries[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Filter countries based on search
    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.includes(searchTerm)
    )

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('submitting')

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries()) as Record<string, string>

        if (data.whatsappNumber) {
            data.whatsapp = `${countryCode.code}${data.whatsappNumber}`.replace(/\+/g, '')
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className={styles.checkIcon}><FaCheck /></div>
                <h3>Message Sent!</h3>
                <p>I've sent a confirmation to your email. Talk soon!</p>
                <button onClick={() => setStatus('idle')} className={styles.resetBtn}>Send another</button>
            </motion.div>
        )
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <input type="text" name="name" required placeholder=" " className={styles.input} />
                <label className={styles.label}>Your Name</label>
            </div>

            <div className={styles.inputGroup}>
                <input type="email" name="email" required placeholder=" " className={styles.input} />
                <label className={styles.label}>Email Address</label>
            </div>

            <div className={`${styles.inputGroup} ${styles.phoneGroup}`} ref={dropdownRef}>
                {/* Custom Country Selector */}
                <div className={styles.countrySelectorWrapper}>
                    <button
                        type="button"
                        className={styles.countryTrigger}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className={styles.flag}>{countryCode.flag}</span>
                        <span className={styles.code}>{countryCode.code}</span>
                        <FaChevronDown className={styles.chevron} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className={styles.dropdownMenu}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <div className={styles.searchWrapper}>
                                    <FaSearch className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        className={styles.searchInput}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className={styles.countryList}>
                                    {filteredCountries.map((c) => (
                                        <div
                                            key={`${c.name}-${c.code}`}
                                            className={styles.countryOption}
                                            onClick={() => {
                                                setCountryCode(c)
                                                setIsDropdownOpen(false)
                                                setSearchTerm('')
                                            }}
                                        >
                                            <span className={styles.flag}>{c.flag}</span>
                                            <span className={styles.countryName}>{c.name}</span>
                                            <span className={styles.codeLight}>{c.code}</span>
                                        </div>
                                    ))}
                                    {filteredCountries.length === 0 && (
                                        <div className={styles.noResult}>No country found</div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.phoneInputWrapper}>
                    <input type="tel" name="whatsappNumber" placeholder=" " className={styles.input} />
                    <label className={styles.label}>WhatsApp <span style={{ fontSize: '0.75em', opacity: 0.7, fontWeight: 400 }}>(Optional)</span></label>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <textarea name="message" required placeholder=" " rows={5} className={styles.textarea} />
                <label className={styles.label}>Message</label>
            </div>

            <button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                {status === 'submitting' ? 'Sending...' : (
                    <>Send Message <FaPaperPlane /></>
                )}
            </button>
        </form>
    )
}
