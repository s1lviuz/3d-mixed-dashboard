'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { forwardRef, useRef } from 'react'
import { Mesh, Vector2 } from 'three'
import { Perf } from 'r3f-perf'
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, SSR, Vignette } from '@react-three/postprocessing'
import { BlendFunction, Effect, GlitchMode } from 'postprocessing'
import { Leva, useControls } from 'leva'

const fragmentShader = /* glsl */`
    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * 10.0) * 0.1;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = inputColor;
        // color.rgb += vec3(0.8, 1.0, 0.5);
        outputColor = color;
    }
`

class DrunkEffect extends Effect {


    constructor(props: any) {
        super('DrunkEffect', fragmentShader, {
            uniforms: new Map([
                ['frequency', { value: props.frequency }],
                ['amplitude', { value: props.amplitude }]   
            ])
        })
    }
}

const Drunk = forwardRef((props: any, ref) => {
    const effect = new DrunkEffect(props)

    return <primitive ref={ref} object={effect} /> 
})

export function Experience() {
    const drunkRef = useRef<any>(null)

    // const SSRProps = useControls('SSR', {
    //     temporalResolve: true,
    //     STRETCH_MISSED_RAYS: true,
    //     USE_MRT: true,
    //     USE_NORMALMAP: true,
    //     USE_ROUGHNESSMAP: true,
    //     ENABLE_JITTERING: true,
    //     ENABLE_BLUR: true,
    //     temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    //     temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    //     maxSamples: { value: 0, min: 0, max: 1 },
    //     resolutionScale: { value: 1, min: 0, max: 1 },
    //     blurMix: { value: 0.5, min: 0, max: 1 },
    //     blurKernelSize: { value: 8, min: 0, max: 8 },
    //     blurSharpness: { value: 0.5, min: 0, max: 1 },
    //     rayStep: { value: 0.3, min: 0, max: 1 },
    //     intensity: { value: 1, min: 0, max: 5 },
    //     maxRoughness: { value: 0.1, min: 0, max: 1 },
    //     jitter: { value: 0.7, min: 0, max: 5 },
    //     jitterSpread: { value: 0.45, min: 0, max: 1 },
    //     jitterRough: { value: 0.1, min: 0, max: 1 },
    //     roughnessFadeOut: { value: 1, min: 0, max: 1 },
    //     rayFadeOut: { value: 0, min: 0, max: 1 },
    //     MAX_STEPS: { value: 20, min: 0, max: 20 },
    //     NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    //     maxDepthDifference: { value: 3, min: 0, max: 10 },
    //     maxDepth: { value: 1, min: 0, max: 1 },
    //     thickness: { value: 10, min: 0, max: 10 },
    //     ior: { value: 1.45, min: 0, max: 2 }
    // })

    useFrame((state, delta) => {
        
    })

    return <>
        <color attach="background" args={['#ffffff']} />

        <EffectComposer>
            {/* <Vignette
                offset={0.3}
                darkness={0.9}
                blendFunction={BlendFunction.NORMAL}
            /> */}

            {/* <Glitch
                delay={new Vector2(0.5, 1)}
                duration={new Vector2(0.1, 0.3)}
                strength={new Vector2(0.2, 0.4)}
                mode={GlitchMode.CONSTANT_WILD}
            /> */}

            {/* <Noise
                premultiply
                blendFunction={BlendFunction.SOFT_LIGHT}
            /> */}

            {/* <Bloom
                mipmapBlur
            /> */}

            {/* <DepthOfField
                focusDistance={0.025}
                focalLength={0.025}
                bokehScale={6}
            /> */}

            {/* <SSR
                {...SSRProps}
            /> */}

            <Drunk 
                ref={drunkRef}
                frequency={2}
                amplitude={0.1}
            />
        </EffectComposer>


        <Perf position="bottom-left" />

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh position-x={2} scale={1.5}>
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
        <>
            <Leva titleBar={{
                position: {
                    x: 0,
                    y: 0
                }
            }} />
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