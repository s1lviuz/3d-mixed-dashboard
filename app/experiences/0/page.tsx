'use client'

import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial, Outlines, Center, PresentationControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction } from 'postprocessing'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const Experience = () => {
  const cubeRef = useRef<THREE.Mesh>(null)

  const transparentMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '0x00ff00',
    opacity: 0,
    transparent: true
  }), [])

  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '0xff0000',
    wireframe: true
  }), [])

  const [camera, setCamera] = useState<THREE.Camera>()

  useFrame((state, delta) => {
    setCamera(state.camera)
  })

  const orbitRef = useRef<typeof OrbitControls>(null)

  const textRef = useRef<THREE.Mesh>(null)

  const bloomControls = useControls({
    luminanceThreshold: {
      value: 0.86,
      min: 0,
      max: 1,
      step: 0.001
    },
    luminanceSmoothing: {
      value: 0.22,
      min: 0,
      max: 1,
      step: 0.001
    },
    intensity: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.001
    },
    radius: {
      value: 0.39,
      min: 0,
      max: 1,
      step: 0.001
    },
    levels: {
      value: 2.6,
      min: 0,
      max: 10,
      step: 0.1
    }
  })

  return <>

    {/* <OrbitControls
      ref={orbitRef}
      enableDamping={false}
      makeDefault
      onEnd={e => {
        console.log(orbitRef)
      }}
    /> */}

    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <EffectComposer>
      <Bloom
        mipmapBlur
        {...bloomControls}
      />
      <Vignette
        offset={0.3}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>

    <group scale={1.5}>
      <mesh ref={cubeRef} material={transparentMaterial}>
        <boxGeometry args={[1, 1, 1]} />
        <Outlines thickness={0.01} color={0x18C964} transparent opacity={1} screenspace={false} angle={Math.PI} />
      </mesh>
      <mesh>
        <meshBasicMaterial color='0x00ff00' />
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.6, 2.85, 1.6]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          VENDA
        </Text>
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.6, 1.37, 0]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          COMISSÃO
        </Text>
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.45, 0.17, 0]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          FUNIL
        </Text>
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.2, 1.4, 2.7]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          LEADS
        </Text>
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.6, 0.35, 1.6]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          PROPOSTA
        </Text>
        <Text
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.1, 2.45, 2.7]}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
        >
          PÓS-VENDA
        </Text>
      </mesh>
    </group>
  </>
}


export default function Home() {
  return (
    <div className='w-full h-full'>
      <Canvas
        orthographic
        // flat
        // dpr={[1, 2]}
        // @ts-ignore
        lg={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          fov: 45,
          zoom: 150,
          near: 0.1,
          far: 200,
          position: [4.056746571187045, 4.027066964378264, 4.040487460885816]
        }}

      >
        <Experience />
      </Canvas>
    </div>
  )
}
