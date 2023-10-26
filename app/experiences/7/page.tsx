'use client'

import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial ,Center, OrbitControls, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { Color, Mesh } from 'three'
import portalVertexShader from '@/shaders/portal/vertex.glsl'
import portalFragmentShader from '@/shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial({
    uTime: 0,
    uColorStart: new Color('#ffffff'),
    uColorEnd: new Color('#000000'),
},portalVertexShader, portalFragmentShader)

extend({ PortalMaterial })

export function Experience() {
    const cube = useRef<Mesh>(null)
    const portalMaterial = useRef<any>(null)

    const model = useGLTF('/model/portal.glb')

    const bakedTexture = useTexture('/model/baked.jpg')

    useFrame((state, delta) => {
        if (portalMaterial.current) {
            portalMaterial.current.uTime += delta
        }
    })

    return <>
        <color args={['#030202']} attach={'background'} />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={model.nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} map-flipY={false} />
            </mesh>

            <mesh geometry={model.nodes.poleLightA.geometry} position={model.nodes.poleLightA.position}>
                <meshBasicMaterial color='ffffe5' />
            </mesh>

            <mesh geometry={model.nodes.poleLightB.geometry} position={model.nodes.poleLightB.position}>
                <meshBasicMaterial color='ffffe5' />
            </mesh>

            <mesh geometry={model.nodes.portalLight.geometry} position={model.nodes.portalLight.position} rotation={model.nodes.portalLight.rotation}>
                {/* <shaderMaterial 
                    vertexShader={portalVertexShader}
                    fragmentShader={portalFragmentShader}
                    uniforms={{
                        uTime: { value: 0 },
                        uColorStart: { value: new Color('#ffffff') },
                        uColorEnd: { value: new Color('#000000') }
                    }}
                /> */}

                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={6}
                scale={[4,2,4]}
                position-y={1}
                speed={0.2}
                count={40}
            />
        </Center>
    </>
}

export default function App() {
    return (
        <Canvas
            flat
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