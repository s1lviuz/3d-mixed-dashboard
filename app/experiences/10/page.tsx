'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, ContactShadows, Environment, Float, Html, OrbitControls, PresentationControls, useGLTF, Text } from '@react-three/drei'

export function Experience() {
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    useFrame((state, delta) => {

    })

    return <>

        <Environment preset='city' />

        <color args={['#241a1a']} attach='background' />

        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-0.1, 0.75]}
            config={{
                mass: 2,
                tension: 400
            }}
            snap={{
                mass: 4,
                tension: 400
            }}
        >
            <Center>
                <Float rotationIntensity={0.4}>
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color='#ff6900'
                        rotation={[-0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />
                    <primitive object={computer.scene}>
                        <Html
                            transform
                            wrapperClass='htmlScreen'
                            distanceFactor={1.17}
                            position={[0, 1.56, -1.4]}
                            rotation-x={-0.256}
                        >
                            <iframe
                                src='https://s1lviuz.github.io'
                            />
                        </Html>
                    </primitive>
                    <Text
                    font='/fonts/bangers-v20-latin-regular.woff'
                    fontSize={1}
                    position={[2, 1.75, 0.75]}
                    rotation-y={-1.25}
                    maxWidth={3}
                    textAlign='center'
                    >
                        SILVIO JR
                    </Text>
                </Float>
            </Center>
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />

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