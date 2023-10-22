'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

const CustomObject = () => {
  const verticesCount = useMemo(() => 3 * 10, [])
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)
    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3
    }
    return positions
  }, [verticesCount])

  const geometryRef = useRef<THREE.BufferGeometry>(null)

  useEffect(() => {
    geometryRef.current?.computeVertexNormals()
  }, [positions])

  return <mesh>
    <bufferGeometry ref={geometryRef}>
      <bufferAttribute
        attach='attributes-position'
        count={verticesCount}
        itemSize={3}
        array={positions}
      />
    </bufferGeometry>
    <meshStandardMaterial color='red' side={THREE.DoubleSide} />
  </mesh>
}

const Experience = () => {
  const { camera, gl } = useThree()
  const boxRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    // const cameraAngle = state.clock.getElapsedTime() * 0.5
    // state.camera.position.x = Math.sin(cameraAngle) * 8
    // state.camera.position.z = Math.cos(cameraAngle) * 8
    // state.camera.lookAt(0, 0, 0)

    if (boxRef.current) {
      boxRef.current.rotation.y += delta

    }
    if (groupRef.current) {
      // groupRef.current.rotation.y += delta * 0.5

    }
  })

  return <>
    {/* @ts-ignore */}
    <orbitControls args={[camera, gl.domElement]} />

    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <group ref={groupRef}>
      <mesh ref={boxRef} scale={1.5} position-x={3} position-z={-2}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color='purple' />
      </mesh>

      <mesh scale={1} position-x={-4} position-z={-1}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color='orange' />
      </mesh>
    </group>

    <mesh scale={1.5} position-y={-3} rotation-x={-(Math.PI * 0.4)}>
      <planeGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color='green' />
    </mesh>

    <CustomObject />
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
