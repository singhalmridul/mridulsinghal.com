'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function TechSphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            // Slower rotation for subtlety
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.08
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.06
        }
    })

    return (
        <group>
            {/* Main Wireframe Sphere - Subtle */}
            <mesh ref={meshRef} scale={2.5}>
                <icosahedronGeometry args={[1, 4]} />
                <meshStandardMaterial
                    color="#334155" // Muted slate
                    wireframe
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner Glow Sphere */}
            <mesh scale={2.4}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#1e293b" transparent opacity={0.08} wireframe />
            </mesh>
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
        }}>
            <Canvas camera={{ position: [0, 0, 6] }}>
                {/* Subtle Lighting */}
                <pointLight position={[10, 10, 10]} color="#475569" intensity={0.5} />
                <ambientLight intensity={0.3} color="#1e293b" />

                {/* Floating Tech Sphere */}
                <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
                    <TechSphere />
                </Float>

                {/* Very Subtle Particles */}
                <Sparkles
                    count={150}
                    scale={[10, 10, 10]}
                    size={1.5}
                    speed={0.3}
                    opacity={0.2}
                    color="#475569"
                />
            </Canvas>
        </div>
    )
}
