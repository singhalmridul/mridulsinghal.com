'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false)
    const [hidden, setHidden] = useState(false) // Hide locally (if off screen) or mobile

    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        // Only show custom cursor on devices that support hover (non-touch)
        const checkHoverCapability = () => {
            const canHover = window.matchMedia('(hover: hover)').matches;
            setHidden(!canHover); // If cannot hover, hide the cursor
        };

        // Initial check
        checkHoverCapability();
        // Re-check on window resize (e.g., device orientation change)
        window.addEventListener('resize', checkHoverCapability);

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16)
            mouseY.set(e.clientY - 16)
        }

        const handleMouseEnter = () => setHidden(false)
        const handleMouseLeave = () => setHidden(true)

        // Add hover listeners to clickable elements
        const handleLinkHover = () => setIsHovered(true)
        const handleLinkLeave = () => setIsHovered(false)

        window.addEventListener('mousemove', moveCursor)
        document.body.addEventListener('mouseenter', handleMouseEnter)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        // Attach logic to all links/buttons (simplified global delegation often better, but this works for React hydration phases)
        document.querySelectorAll('a, button, input, textarea, .pointer').forEach(el => {
            el.addEventListener('mouseenter', handleLinkHover)
            el.addEventListener('mouseleave', handleLinkLeave)
        })

        // Re-run listener attachment on DOM changes (simple interval for dynamic content)
        const interval = setInterval(() => {
            document.querySelectorAll('a, button, input, textarea').forEach(el => {
                el.addEventListener('mouseenter', handleLinkHover)
                el.addEventListener('mouseleave', handleLinkLeave)
            })
        }, 2000)

        // Mobile check
        if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
            setHidden(true)
        }

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            clearInterval(interval)
        }
    }, [mouseX, mouseY])

    if (hidden) return null

    return (
        <motion.div
            className="custom-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x,
                y,
                pointerEvents: 'none',
                zIndex: 9999,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid var(--primary)',
                background: isHovered ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                mixBlendMode: 'difference'
            }}
            animate={{
                scale: isHovered ? 1.5 : 1,
            }}
        />
    )
}
