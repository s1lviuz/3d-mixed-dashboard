'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export function Experience() {

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <mesh scale={1.5}>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>
    </>
}

export default function App() {
    return (
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 4, 3, 6]
            }}
        >
            <Experience />
        </Canvas>
    )
}