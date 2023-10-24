'use client'

import { Canvas, RootState, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows } from '@react-three/drei'
import { useCallback, useRef } from 'react'
import { Color, DirectionalLight, DirectionalLightHelper, Mesh } from 'three'
import { Perf } from 'r3f-perf'

export function Experience() {
    const cube = useRef<Mesh>(null)

    const directionalLight = useRef<DirectionalLight>(null)
    useHelper(directionalLight, DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        if (cube.current)
            cube.current.rotation.y += delta * 0.2
    })

    return <>
        <BakeShadows />

        <color attach="background" args={['ivory']} />

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <directionalLight
            castShadow ref={directionalLight}
            position={[1, 2, 3]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={2}
            shadow-camera-right={2}
            shadow-camera-bottom={- 2}
            shadow-camera-left={- 2}
        />
        <ambientLight intensity={0.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}

export default function App() {
    const onCreated = useCallback((state: RootState) => {
        // state.gl.setClearColor('#ff0000', 1)
        // state.scene.background = new Color('#ff0000')
    }, [])

    return (
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [- 4, 3, 6]
            }}
            onCreated={onCreated}
        >
            <Experience />
        </Canvas>
    )
}