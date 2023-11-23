'use client'

import { Chip } from '@nextui-org/react'
import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {
  const cubeRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {

  })

  return <>

    <OrbitControls
      enableDamping={false}
      makeDefault
    />

    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <PivotControls
      anchor={[0, 0, 0]}
      depthTest={false}
    >
      <mesh ref={sphereRef} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color='orange' />
        <Html
          position={[1, 1, 0]}
          wrapperClass='label'
          center
          distanceFactor={6}
          occlude={[cubeRef]}
        >
          <Chip size='lg'>Sphere</Chip>
        </Html>
      </mesh>
    </PivotControls>

    <mesh ref={cubeRef} scale={1.5} position-x={2}>
      <boxGeometry />
      <meshStandardMaterial color='mediumpurple' />
    </mesh>
    <TransformControls object={cubeRef} mode='translate' />

    <mesh position-y={-1} rotation-x={-(Math.PI * 0.5)} scale={10}>
      <planeGeometry />
      <MeshReflectorMaterial
        resolution={512}
        blur={[1000, 1000]}
        mixBlur={1}
        mirror={0.75}
        color='greenyellow'
      />
    </mesh>

    <Float
      speed={5}
      floatIntensity={2}
    >
      <Text
        position-y={2}
        color='salmon'
      >
        Teste R3F
      </Text>
    </Float>

  </>
}

export default function Home() {
  return (
    <div className='w-full h-full'>
      <Canvas
        // orthographic
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
          // zoom: 100,
          near: 0.1,
          far: 200,
          position: [3, 2, 6]
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
