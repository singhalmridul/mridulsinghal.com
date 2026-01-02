'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function TechSphere() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            // Rotate the sphere
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
        }
    })

    return (
        <group>
            {/* Main Wireframe Sphere */}
            <mesh ref={meshRef} scale={2.5}>
                <icosahedronGeometry args={[1, 4]} /> {/* High detail for 'tech' grid look */}
                <meshStandardMaterial
                    color="#00f3ff" // Cyan Tech Color
                    wireframe
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner Glow Sphere */}
            <mesh scale={2.4}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#0044ff" transparent opacity={0.1} wireframe />
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
                {/* 'Tech' Lighting */}
                <pointLight position={[10, 10, 10]} color="#00f3ff" intensity={2} />
                <ambientLight intensity={0.5} color="#ffffff" />

                {/* Floating Tech Sphere */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <TechSphere />
                </Float>

                {/* Data Particles / Stars */}
                <Sparkles
                    count={500}
                    scale={[10, 10, 10]}
                    size={2}
                    speed={0.5}
                    opacity={0.8}
                    color="#00f3ff"
                />

                {/* Secondary Particles */}
                <Sparkles
                    count={200}
                    scale={[15, 15, 15]}
                    size={5}
                    speed={0.2}
                    opacity={0.5}
                    color="#ffffff"
                />
            </Canvas>
        </div>
    )
}
