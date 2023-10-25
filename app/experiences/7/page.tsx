'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

export function Experience() {
    const cube = useRef<Mesh>(null)

    const model = useGLTF('/model/portal.glb')

    useFrame((state, delta) => {
        
    })

    return <>
        <color args={['#030202']} attach={'background'} />

        <OrbitControls makeDefault />

        <mesh geometry={model.nodes.baked.geometry} />
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