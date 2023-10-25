'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useMemo, useState } from 'react'

export function Experience() {
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    const donutsArray = useMemo(() => [...Array(100)], [])

    const [torusGeometry, setTorusGeometry] = useState<any>(null)

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <torusGeometry ref={setTorusGeometry} />

        <Center>
            <Text3D
                font={'/fonts/helvetiker_regular.typeface.json'}
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
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>

        {donutsArray.map((_, index) => <mesh key={index}
            geometry={torusGeometry}
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
        >
            <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>)}
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