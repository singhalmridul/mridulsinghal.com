'use client'

import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import styles from './page.module.css'

import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/CustomCursor'
import Blog from '@/components/Blog'

export default function Home() {
  return (
    <main className={styles.main}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
    </main>
  )
}
