'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useMemo, useRef, useState } from 'react'
import { Group } from 'three'

export function Experience() {
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    const donutsArray = useMemo(() => [...Array(100)], [])

    const [torusGeometry, setTorusGeometry] = useState<any>(null)
    const [material, setMaterial] = useState<any>(null)

    const torusGroupRef = useRef<Group | null>(null)

    useFrame((state, delta) => {
        if (torusGroupRef.current) {
            torusGroupRef.current.children.forEach((torus, index) => {
                torus.rotation.y += (delta * 0.33)
            })
        }
    })

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <torusGeometry ref={setTorusGeometry} />
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

        <Center>
            <Text3D
                font={'/fonts/helvetiker_regular.typeface.json'}
                material={material}
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO R3F
            </Text3D>
        </Center>

        <group ref={torusGroupRef}>
            {donutsArray.map((_, index) => <mesh key={index}
                geometry={torusGeometry}
                material={material}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            />)}
        </group>
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