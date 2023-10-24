import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Perf } from 'r3f-perf'

export function Experience() {
    const cube = useRef<Mesh>(null)

    useFrame((state, delta) => {
        if (cube.current)
            cube.current.rotation.y += delta * 0.2
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
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