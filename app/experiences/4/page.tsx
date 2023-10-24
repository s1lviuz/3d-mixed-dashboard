'use client'

import { Canvas, RootState, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows } from '@react-three/drei'
import { useCallback, useRef } from 'react'
import { Color, DirectionalLight, DirectionalLightHelper, Mesh } from 'three'
import { Perf } from 'r3f-perf'

export function Experience() {
    const cube = useRef<Mesh>(null)

    const directionalLight = useRef<DirectionalLight>(null)
    useHelper(directionalLight, DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        // const time = state.clock.getElapsedTime()
        if (cube.current) {
            cube.current.rotation.y += delta * 0.2
            // cube.current.position.x = 2 + Math.sin(time)
        }
    })

    return <>
        {/* <BakeShadows /> */}
        {/* <SoftShadows size={25} samples={10} focus={0} /> */}

        <color attach="background" args={['ivory']} />

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={Infinity}
            temporal
            blend={100}
        >
            <RandomizedLight
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={1}
                position={[1, 2, 3]}
                bias={0.001}
            />
        </AccumulativeShadows> */}

        <ContactShadows />

        <directionalLight
            castShadow ref={directionalLight}
            position={[1, 2, 3]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={- 5}
            shadow-camera-left={- 5}
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

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
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