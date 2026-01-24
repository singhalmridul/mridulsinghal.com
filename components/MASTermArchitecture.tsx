'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/MASAIArchitecture.module.css' // Reusing styles for consistency

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
        id: 'shell',
        title: 'Shell (Zsh/Bash)',
        description: 'User shell intercepting the prompt draw event',
        icon: '💻',
        color: '#94a3b8',
        position: { x: 50, y: 10 },
        connections: ['cli']
    },
    {
        id: 'cli',
        title: 'MASTerm CLI',
        description: 'Binary invoked via shell hook (<2ms startup)',
        icon: '🚀',
        color: '#f97316',
        position: { x: 50, y: 25 },
        connections: ['core']
    },
    {
        id: 'core',
        title: 'Core Engine (Rust)',
        description: 'Orchestrates config loading and plugin execution',
        icon: '⚙️',
        color: '#ef4444',
        position: { x: 50, y: 40 },
        connections: ['plugin-git', 'plugin-lang', 'plugin-safe']
    },
    {
        id: 'plugin-git',
        title: 'Git Plugin',
        description: 'Async repo status check (libgit2)',
        icon: 'xb',
        color: '#f43f5e',
        position: { x: 20, y: 60 },
        connections: ['renderer']
    },
    {
        id: 'plugin-lang',
        title: 'Language Plugins',
        description: 'Detects Node/Rust/Python versions',
        icon: '📦',
        color: '#3b82f6',
        position: { x: 50, y: 60 },
        connections: ['renderer']
    },
    {
        id: 'plugin-safe',
        title: 'Safety Guard',
        description: 'Checks for production environment patterns',
        icon: '🛡️',
        color: '#10b981',
        position: { x: 80, y: 60 },
        connections: ['renderer']
    },
    {
        id: 'renderer',
        title: 'Prompt Renderer',
        description: 'Aggregates data into structured ANSI output',
        icon: '🎨',
        color: '#8b5cf6',
        position: { x: 50, y: 80 },
        connections: ['output']
    },
    {
        id: 'output',
        title: 'Terminal Display',
        description: 'Final prompt rendered to user (<30ms total)',
        icon: '👀',
        color: '#eab308',
        position: { x: 50, y: 95 },
        connections: []
    }
]

export default function MASTermArchitecture() {
    const [activeNode, setActiveNode] = useState<string | null>(null)
    const [animatingPath, setAnimatingPath] = useState<string[]>([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [metrics, setMetrics] = useState({ latency: 0, memory: 0 })

    // Animation sequence
    const fullPath = [
        ['shell', 'cli'],
        ['cli', 'core'],
        ['core', 'plugin-git', 'plugin-lang', 'plugin-safe'], // Parallel
        ['plugin-git', 'renderer'],
        ['plugin-lang', 'renderer'],
        ['plugin-safe', 'renderer'],
        ['renderer', 'output']
    ]

    useEffect(() => {
        if (isPlaying) {
            let stepIndex = 0
            const interval = setInterval(() => {
                if (stepIndex < fullPath.length) {
                    const nodesInStep = fullPath[stepIndex]
                    setAnimatingPath(prev => [...prev, ...nodesInStep])
                    
                    // Update stats simulation
                    const progress = Math.min(100, Math.floor(((stepIndex + 1) / fullPath.length) * 100))
                    setScanProgress(progress)
                    setMetrics({
                        latency: Math.floor(progress * 0.3), // simulate ms
                        memory: Math.floor(Math.random() * 2 + 3) // 3-5MB
                    })

                    stepIndex++
                } else {
                    setIsPlaying(false)
                    setScanProgress(100)
                }
            }, 600)

            return () => clearInterval(interval)
        }
    }, [isPlaying])

    const startDemo = () => {
        setAnimatingPath([])
        setScanProgress(0)
        setMetrics({ latency: 0, memory: 0 })
        setIsPlaying(true)
    }

    const resetDemo = () => {
        setAnimatingPath([])
        setScanProgress(0)
        setMetrics({ latency: 0, memory: 0 })
        setIsPlaying(false)
        setActiveNode(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>MASTerm Execution Pipeline</h3>
                <p className={styles.subtitle}>Click nodes to explore core components • Visualization of a single prompt cycle</p>
            </div>

            <div className={styles.controls}>
                <button
                    onClick={startDemo}
                    disabled={isPlaying}
                    className={styles.playButton}
                >
                    {isPlaying ? '⚡ Rendering...' : '▶ Simulate Prompt Generation'}
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
                        <div className={styles.statValue}>{metrics.latency}ms</div>
                        <div className={styles.statLabel}>Total Latency</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{metrics.memory}MB</div>
                        <div className={styles.statLabel}>Memory Usage</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>Rust 🦀</div>
                        <div className={styles.statLabel}>Powered By</div>
                    </div>
                </div>
            )}

            <div className={styles.canvas}>
                <svg className={styles.svg} viewBox="0 0 100 110">
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

                    {/* Connections */}
                    {architectureNodes.map(node =>
                        node.connections.map(targetId => {
                            const targetNode = architectureNodes.find(n => n.id === targetId)
                            if (!targetNode) return null

                            // Check if connection is active (both nodes in path)
                            const isActive = animatingPath.includes(node.id) && animatingPath.includes(targetId)

                            return (
                                <g key={`${node.id}-${targetId}`}>
                                    <motion.line
                                        x1={node.position.x}
                                        y1={node.position.y}
                                        x2={targetNode.position.x}
                                        y2={targetNode.position.y}
                                        stroke={isActive ? '#f97316' : 'url(#lineGradient)'}
                                        strokeWidth={isActive ? '0.6' : '0.2'}
                                        initial={{ pathLength: 0 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: isActive ? 1 : 0.3
                                        }}
                                        transition={{ duration: 0.8 }}
                                    />
                                    {isActive && (
                                        <motion.circle
                                            r="1"
                                            fill="#f97316"
                                            filter="url(#glow)"
                                            initial={{ cx: node.position.x, cy: node.position.y }}
                                            animate={{ cx: targetNode.position.x, cy: targetNode.position.y }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                ease: "linear"
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
                        const isHovered = activeNode === node.id || (!activeNode && isActive)

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
                                    r={isHovered ? 5 : 4}
                                    fill={isActive ? node.color : '#1e293b'}
                                    stroke={node.color}
                                    strokeWidth={isActive ? 0.5 : 0.2}
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                                <text
                                    x={node.position.x}
                                    y={node.position.y + 1}
                                    fontSize="3.5"
                                    textAnchor="middle"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {node.icon}
                                </text>
                            </g>
                        )
                    })}
                </svg>

                {/* Labels */}
                {architectureNodes.map(node => (
                    <motion.div
                        key={`label-${node.id}`}
                        className={styles.nodeLabel}
                        style={{
                            left: `${node.position.x}%`,
                            top: `${node.position.y}%`,
                            transform: 'translate(-50%, 15px)'
                        }}
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
        </div>
    )
}
