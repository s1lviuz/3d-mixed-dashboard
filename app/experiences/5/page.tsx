'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Clone, OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Suspense, useEffect } from 'react'
import { Leva, useControls } from 'leva'

function Hamburger() {
    // const model = useLoader(
    //     GLTFLoader,
    //     '/FlightHelmet/glTF/FlightHelmet.gltf',
    //     (loader) => {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('/draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     })

    // return <primitive object={model.scene} scale={5} position-y={-1} />

    // const model = useLoader(
    //     GLTFLoader,
    //     '/hamburger.glb',
    //     (loader) => {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('/draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     })

    const model = useGLTF('/hamburger-draco.glb')

    // return <primitive object={model.scene} scale={0.35} />

    return <>
        {/* <Clone object={model.scene} scale={0.35} position-x={-4} /> */}
        <Clone object={model.scene} scale={0.35} position-x={0} />
        {/* <Clone object={model.scene} scale={0.35} position-x={4} /> */}
    </>
}

useGLTF.preload('/hamburger-draco.glb')

function Fox() {
    const model = useLoader(GLTFLoader, '/Fox/glTF/Fox.gltf')

    const animations = useAnimations(model.animations, model.scene)

    const { animationName } = useControls({
        animationName: {
            options: animations.names,
        }
    })

    useEffect(() => {
        animations.actions[animationName]?.reset().fadeIn(0.5).play()

        // setTimeout(() => {
        //     animations.actions.Walk?.play()
        //     animations.actions.Walk?.crossFadeFrom(animations.actions.Run!, 1, true)
        // }, 2000)

        return () => {
            animations.actions[animationName]?.fadeOut(0.5)
        }
    }, [animationName])

    return <primitive
        object={model.scene}
        scale={0.02}
        position={[-2.5, 0, 2.5]}
        rotation-y={0.3}
    />
}

function Placeholder(props: any) {
    return <mesh {...props}>
        <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <meshBasicMaterial wireframe color="red" />
    </mesh>
}

function Experience() {
    useFrame((state, delta) => {

    })

    // const model = useLoader(GLTFLoader, '/hamburger.glb')

    // const model = useLoader(
    //     GLTFLoader,
    //     '/hamburger-draco.glb',
    //     (loader) => {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('/draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     })

    return <>

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* <primitive object={model.scene} scale={0.35} /> */}

        <Suspense
            fallback={<Placeholder position-y={-0.5} scale={[2, 3, 2]} />}
        >
            <Hamburger />
        </Suspense>

        <Suspense
            fallback={<Placeholder position-y={-0.5} scale={[2, 3, 2]} />}
        >
            <Fox />
        </Suspense>
    </>
}

export default function App() {
    return (
        <>
        <Leva titleBar={{
            position: {
                x:0,
                y:150
            }
        }} 
        />  
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
        </>
    )
}