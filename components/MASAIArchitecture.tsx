'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/MASAIArchitecture.module.css'

interface ArchitectureNode {
    id: string
    title: string
    description: string
    icon: string
    color: string
    position: { x: number; y: number }
    connections: string[]
}

const architectureNodes: ArchitectureNode[] = [
    {
        id: 'user',
        title: 'User Request',
        description: 'Security engineer initiates vulnerability scan via web dashboard',
        icon: '👤',
        color: '#3b82f6',
        position: { x: 50, y: 10 },
        connections: ['frontend']
    },
    {
        id: 'frontend',
        title: 'Next.js Frontend',
        description: 'Real-time WebSocket console with live attack progress updates',
        icon: '⚡',
        color: '#8b5cf6',
        position: { x: 50, y: 25 },
        connections: ['gateway']
    },
    {
        id: 'gateway',
        title: 'API Gateway',
        description: 'Express.js server with JWT auth, rate limiting, and RBAC enforcement',
        icon: '🚪',
        color: '#ec4899',
        position: { x: 50, y: 40 },
        connections: ['auth-check']
    },
    {
        id: 'auth-check',
        title: 'Authorization Check',
        description: 'Multi-stage approval: User → Domain Owner → Admin bypass',
        icon: '🔐',
        color: '#f59e0b',
        position: { x: 30, y: 55 },
        connections: ['orchestrator']
    },
    {
        id: 'orchestrator',
        title: 'AI Orchestrator',
        description: 'Coordinates 7+ AI agents, manages kill switch, monitors resource usage',
        icon: '🤖',
        color: '#10b981',
        position: { x: 50, y: 70 },
        connections: ['scanner1', 'scanner2', 'scanner3']
    },
    {
        id: 'scanner1',
        title: 'Auth Scanners',
        description: 'Authentication, Authorization, Cryptography vulnerability detection',
        icon: '🔍',
        color: '#06b6d4',
        position: { x: 20, y: 85 },
        connections: ['mongodb']
    },
    {
        id: 'scanner2',
        title: 'Web Scanners',
        description: 'Web, API, Client-Side, Business Logic vulnerability scanning',
        icon: '🌐',
        color: '#06b6d4',
        position: { x: 50, y: 85 },
        connections: ['mongodb']
    },
    {
        id: 'scanner3',
        title: 'Infrastructure',
        description: 'Network, Cloud, Supply Chain security assessment',
        icon: '☁️',
        color: '#06b6d4',
        position: { x: 80, y: 85 },
        connections: ['mongodb']
    },
    {
        id: 'mongodb',
        title: 'MongoDB',
        description: 'Scan results, vulnerability data (10K+ writes/sec)',
        icon: '🗄️',
        color: '#22c55e',
        position: { x: 25, y: 100 },
        connections: ['report']
    },
    {
        id: 'postgresql',
        title: 'PostgreSQL',
        description: 'HMAC-signed audit logs for compliance and tamper-proof trails',
        icon: '📊',
        color: '#3b82f6',
        position: { x: 50, y: 100 },
        connections: ['report']
    },
    {
        id: 'redis',
        title: 'Redis Cache',
        description: 'Session management, WebSocket pub/sub, rate limiting (<10ms)',
        icon: '⚡',
        color: '#ef4444',
        position: { x: 75, y: 100 },
        connections: ['report']
    },
    {
        id: 'report',
        title: 'PDF Report',
        description: 'Professional security assessment with CVE mappings and remediation',
        icon: '📄',
        color: '#8b5cf6',
        position: { x: 50, y: 115 },
        connections: []
    },
    {
        id: 'kill-switch',
        title: 'Kill Switch',
        description: 'Emergency stop: Redis broadcast → 5s grace → Force termination',
        icon: '🛑',
        color: '#ef4444',
        position: { x: 80, y: 55 },
        connections: ['orchestrator']
    }
]

export default function MASAIArchitecture() {
    const [activeNode, setActiveNode] = useState<string | null>(null)
    const [animatingPath, setAnimatingPath] = useState<string[]>([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [vulnerabilitiesFound, setVulnerabilitiesFound] = useState(0)

    const fullPath = ['user', 'frontend', 'gateway', 'auth-check', 'orchestrator', 'scanner1', 'scanner2', 'scanner3', 'mongodb', 'postgresql', 'redis', 'report']

    useEffect(() => {
        if (isPlaying) {
            let currentIndex = 0
            const interval = setInterval(() => {
                if (currentIndex < fullPath.length) {
                    setAnimatingPath(prev => [...prev, fullPath[currentIndex]])
                    setScanProgress(Math.floor((currentIndex / fullPath.length) * 100))

                    // Simulate vulnerability discoveries
                    if (currentIndex >= 5 && currentIndex <= 7) {
                        setVulnerabilitiesFound(prev => prev + Math.floor(Math.random() * 3))
                    }

                    currentIndex++
                } else {
                    setIsPlaying(false)
                    setScanProgress(100)
                }
            }, 800)

            return () => clearInterval(interval)
        }
    }, [isPlaying])

    const startDemo = () => {
        setAnimatingPath([])
        setScanProgress(0)
        setVulnerabilitiesFound(0)
        setIsPlaying(true)
    }

    const resetDemo = () => {
        setAnimatingPath([])
        setScanProgress(0)
        setVulnerabilitiesFound(0)
        setIsPlaying(false)
        setActiveNode(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Interactive Architecture Workflow</h3>
                <p className={styles.subtitle}>Click any node to explore • Press Play to watch a scan in action</p>
            </div>

            <div className={styles.controls}>
                <button
                    onClick={startDemo}
                    disabled={isPlaying}
                    className={styles.playButton}
                >
                    {isPlaying ? '⏸ Scanning...' : '▶ Start Security Scan Demo'}
                </button>
                <button
                    onClick={resetDemo}
                    className={styles.resetButton}
                >
                    ↻ Reset
                </button>
            </div>

            {isPlaying && (
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{scanProgress}%</div>
                        <div className={styles.statLabel}>Scan Progress</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{vulnerabilitiesFound}</div>
                        <div className={styles.statLabel}>Vulnerabilities Found</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{animatingPath.length}</div>
                        <div className={styles.statLabel}>Components Active</div>
                    </div>
                </div>
            )}

            <div className={styles.canvas}>
                <svg className={styles.svg} viewBox="0 0 100 120">
                    {/* Connection Lines */}
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {architectureNodes.map(node =>
                        node.connections.map(targetId => {
                            const targetNode = architectureNodes.find(n => n.id === targetId)
                            if (!targetNode) return null

                            const isActive = animatingPath.includes(node.id) && animatingPath.includes(targetId)

                            return (
                                <g key={`${node.id}-${targetId}`}>
                                    <motion.line
                                        x1={node.position.x}
                                        y1={node.position.y}
                                        x2={targetNode.position.x}
                                        y2={targetNode.position.y}
                                        stroke={isActive ? '#10b981' : 'url(#lineGradient)'}
                                        strokeWidth={isActive ? '0.5' : '0.2'}
                                        strokeDasharray={isActive ? '0' : '2 2'}
                                        initial={{ pathLength: 0 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: isActive ? 1 : 0.3
                                        }}
                                        transition={{ duration: 1 }}
                                        filter={isActive ? 'url(#glow)' : undefined}
                                    />

                                    {/* Animated Data Particle */}
                                    {isActive && (
                                        <motion.circle
                                            cx={node.position.x}
                                            cy={node.position.y}
                                            r="0.8"
                                            fill="#10b981"
                                            filter="url(#glow)"
                                            initial={{
                                                cx: node.position.x,
                                                cy: node.position.y
                                            }}
                                            animate={{
                                                cx: targetNode.position.x,
                                                cy: targetNode.position.y
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }}
                                        />
                                    )}
                                </g>
                            )
                        })
                    )}

                    {/* Nodes */}
                    {architectureNodes.map(node => {
                        const isActive = animatingPath.includes(node.id)
                        const isHovered = activeNode === node.id

                        return (
                            <g
                                key={node.id}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setActiveNode(node.id)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                <motion.circle
                                    cx={node.position.x}
                                    cy={node.position.y}
                                    r={isHovered ? 4.5 : 3.5}
                                    fill={isActive ? node.color : '#1e293b'}
                                    stroke={node.color}
                                    strokeWidth={isActive ? 0.4 : 0.2}
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: 1,
                                        filter: isActive ? 'url(#glow)' : undefined
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                />

                                {/* Icon */}
                                <text
                                    x={node.position.x}
                                    y={node.position.y + 0.8}
                                    fontSize="3"
                                    textAnchor="middle"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {node.icon}
                                </text>

                                {/* Pulse effect when active */}
                                {isActive && (
                                    <motion.circle
                                        cx={node.position.x}
                                        cy={node.position.y}
                                        r={3.5}
                                        fill="none"
                                        stroke={node.color}
                                        strokeWidth={0.3}
                                        initial={{ r: 3.5, opacity: 0.8 }}
                                        animate={{ r: 6, opacity: 0 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity
                                        }}
                                    />
                                )}
                            </g>
                        )
                    })}
                </svg>

                {/* Node Labels */}
                {architectureNodes.map(node => (
                    <motion.div
                        key={`label-${node.id}`}
                        className={styles.nodeLabel}
                        style={{
                            left: `${node.position.x}%`,
                            top: `${node.position.y}%`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {node.title}
                    </motion.div>
                ))}
            </div>

            {/* Detail Panel */}
            <AnimatePresence>
                {activeNode && (
                    <motion.div
                        className={styles.detailPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {architectureNodes.filter(n => n.id === activeNode).map(node => (
                            <div key={node.id}>
                                <div className={styles.detailHeader}>
                                    <span className={styles.detailIcon}>{node.icon}</span>
                                    <h4 className={styles.detailTitle}>{node.title}</h4>
                                </div>
                                <p className={styles.detailDescription}>{node.description}</p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ background: '#10b981' }}></div>
                    <span>Active Component</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ background: '#1e293b', border: '1px solid #8b5cf6' }}></div>
                    <span>Inactive Component</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendLine}></div>
                    <span>Data Flow</span>
                </div>
            </div>
        </div>
    )
}
