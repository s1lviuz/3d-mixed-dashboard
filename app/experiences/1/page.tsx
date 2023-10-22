'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Group } from 'three'

const Experience = () => {
  const boxRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta

    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5

    }
  })

  return <>
    <group ref={groupRef}>
      <mesh ref={boxRef} scale={1.5} position-x={3} position-z={-2}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color='purple' />
      </mesh>

      <mesh scale={1} position-x={-4} position-z={-1}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color='orange' />
      </mesh>
    </group>

    <mesh scale={1.5} position-z={-6} rotation-x={-(Math.PI * 0.4)}>
      <planeGeometry args={[20, 10, 10]} />
      <meshBasicMaterial color='green' />
    </mesh>
  </>
}

export default function Home() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  )
}
