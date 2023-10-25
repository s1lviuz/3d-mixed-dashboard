'use client'

import { Canvas, RootState, useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows, Sky, Environment, Lightformer, Stage } from '@react-three/drei'
import { useCallback, useRef } from 'react'
import { Color, DirectionalLight, DirectionalLightHelper, Mesh } from 'three'
import { Perf } from 'r3f-perf'
import { Leva, useControls } from 'leva'

export function Experience() {
    const cube = useRef<Mesh>(null)

    const directionalLight = useRef<DirectionalLight>(null)
    // useHelper(directionalLight, DirectionalLightHelper, 1)

    useFrame((state, delta) => {
        // const time = state.clock.getElapsedTime()
        if (cube.current) {
            cube.current.rotation.y += delta * 0.2
            // cube.current.position.x = 2 + Math.sin(time)
        }
    })

    // const contactShadows = useControls('Contact Shadows', {
    //     color: '#4b2709',
    //     opacity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    //     blur: { value: 1, min: 0, max: 10, step: 0.01 },
    // })

    // const sky = useControls('Sky', {
    //     sunPosition: { value: [1, 2, 3], min: - 1, max: 1, step: 0.01 },
    // })

    const environment = useControls('Environment', {
        envMapIntensity: { value: 3.5, min: 0, max: 10, step: 0.01 },
        // envMapHeight: { value: 7, min: 0, max: 100, step: 0.01 },
        // envMapRadius: { value: 28, min: 0, max: 1000, step: 0.01 },
        // envMapScale: { value: 100, min: 0, max: 1000, step: 0.01 },
    })

    return <>
        {/* <Environment
            // background
            ground={{
                height: environment.envMapHeight,
                radius: environment.envMapRadius,
                scale: environment.envMapScale,
            }}
            // files={[
            //     '/environmentMaps/2/px.jpg',
            //     '/environmentMaps/2/nx.jpg',
            //     '/environmentMaps/2/py.jpg',
            //     '/environmentMaps/2/ny.jpg',
            //     '/environmentMaps/2/pz.jpg',
            //     '/environmentMaps/2/nz.jpg',
            // ]}
            //  files={'/environmentMaps/the_sky_is_on_fire_2k.hdr'}
            preset='sunset'
            // resolution={32}
        >
            <color args={['#000']} attach={'background'} />
            <Lightformer
                position-z={-5}
                scale={10}
                color='red'
                intensity={10}
                form='ring'
            />
            <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={[10, 0, 0]} />
            </mesh>
        </Environment> */}


        {/* <BakeShadows /> */}
        {/* <SoftShadows size={25} samples={10} focus={0} /> */}

        {/* <color attach="background" args={['ivory']} /> */}

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

        {/* <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            resolution={512}
            far={5}
            color={contactShadows.color}
            opacity={contactShadows.opacity}
            blur={contactShadows.blur}
            frames={1}
        /> */}

        {/* <directionalLight
            castShadow ref={directionalLight}
            position={sky.sunPosition}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={- 5}
            shadow-camera-left={- 5}
        />
        <ambientLight intensity={0.5} /> */}

        {/* <Sky sunPosition={sky.sunPosition} /> */}

        {/* <mesh castShadow position-y={1} position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={environment.envMapIntensity} />
        </mesh> */}

        {/* <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={environment.envMapIntensity} />
        </mesh> */}

        {/* <mesh rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={environment.envMapIntensity} />
        </mesh> */}

        <Stage
            shadows={{
                type: 'contact',
                opacity: 0.2,
                blur: 3
            }}
            environment={'sunset'}
            preset={'portrait'}
            intensity={2}
        >
            <mesh castShadow position-y={1} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={environment.envMapIntensity} />
            </mesh>

            <mesh castShadow position-y={1} ref={cube} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={environment.envMapIntensity} />
            </mesh>
        </Stage>
    </>
}

export default function App() {
    const onCreated = useCallback((state: RootState) => {
        // state.gl.setClearColor('#ff0000', 1)
        // state.scene.background = new Color('#ff0000')
    }, [])

    return (
        <>
            <Leva
                titleBar={{
                    position: {
                        x: 0,
                        y: 150,
                    }
                }}
            />
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
        </>
    )
}