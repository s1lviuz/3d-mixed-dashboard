'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function Experience() {

    useFrame((state, delta) => {
       
    })

    return <>

        <OrbitControls makeDefault />

        <mesh>
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