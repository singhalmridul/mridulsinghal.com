'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from '../styles/SystemDiagram.module.css'

interface Node {
    id: string
    label: string
    x: number
    y: number
    type: 'client' | 'api' | 'service' | 'database' | 'cache'
}

interface Connection {
    from: string
    to: string
}

const nodes: Node[] = [
    { id: 'client', label: 'Client', x: 10, y: 50, type: 'client' },
    { id: 'api', label: 'API Gateway', x: 30, y: 50, type: 'api' },
    { id: 'service', label: 'Services', x: 50, y: 35, type: 'service' },
    { id: 'cache', label: 'Cache', x: 50, y: 65, type: 'cache' },
    { id: 'database', label: 'Database', x: 70, y: 50, type: 'database' },
    { id: 'monitoring', label: 'Observability', x: 90, y: 50, type: 'service' },
]

const connections: Connection[] = [
    { from: 'client', to: 'api' },
    { from: 'api', to: 'service' },
    { from: 'api', to: 'cache' },
    { from: 'service', to: 'database' },
    { from: 'service', to: 'monitoring' },
    { from: 'cache', to: 'monitoring' },
]

const nodeColors = {
    client: '#60a5fa',     // blue
    api: '#34d399',        // green
    service: '#a78bfa',    // purple
    database: '#f59e0b',   // amber
    cache: '#ec4899',      // pink
}

export default function SystemDiagram() {
    const [activeFlow, setActiveFlow] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFlow((prev) => (prev + 1) % connections.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles.container}>
            <svg
                className={styles.svg}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Draw connections */}
                {connections.map((conn, idx) => {
                    const fromNode = nodes.find(n => n.id === conn.from)
                    const toNode = nodes.find(n => n.id === conn.to)
                    
                    if (!fromNode || !toNode) return null
                    
                    const isActive = idx === activeFlow
                    
                    return (
                        <g key={`${conn.from}-${conn.to}`}>
                            <motion.line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke={isActive ? '#0ea5e9' : '#334155'}
                                strokeWidth={isActive ? '0.3' : '0.15'}
                                strokeDasharray="0.5 0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ 
                                    pathLength: 1,
                                    opacity: isActive ? 1 : 0.3
                                }}
                                transition={{ 
                                    pathLength: { duration: 1 },
                                    opacity: { duration: 0.3 }
                                }}
                            />
                            
                            {/* Animated data flow dot */}
                            {isActive && (
                                <motion.circle
                                    r="0.5"
                                    fill="#0ea5e9"
                                    initial={{ 
                                        cx: fromNode.x, 
                                        cy: fromNode.y 
                                    }}
                                    animate={{ 
                                        cx: toNode.x, 
                                        cy: toNode.y 
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <animate
                                        attributeName="opacity"
                                        values="0;1;1;0"
                                        dur="1.5s"
                                        repeatCount="indefinite"
                                    />
                                </motion.circle>
                            )}
                        </g>
                    )
                })}

                {/* Draw nodes */}
                {nodes.map((node, idx) => (
                    <g key={node.id}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="2.5"
                            fill={nodeColors[node.type]}
                            stroke="#1e293b"
                            strokeWidth="0.3"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        />
                        
                        <motion.text
                            x={node.x}
                            y={node.y + 4.5}
                            textAnchor="middle"
                            className={styles.nodeLabel}
                            fill="#94a3b8"
                            fontSize="2.5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                        >
                            {node.label}
                        </motion.text>
                    </g>
                ))}
            </svg>

            {/* Tech Stack Indicators */}
            <div className={styles.techStack}>
                <motion.div 
                    className={styles.techItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    React · Next.js
                </motion.div>
                <motion.div 
                    className={styles.techItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    Node.js · TypeScript
                </motion.div>
                <motion.div 
                    className={styles.techItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    MongoDB · PostgreSQL
                </motion.div>
                <motion.div 
                    className={styles.techItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                >
                    Splunk · Observability
                </motion.div>
            </div>
        </div>
    )
}
