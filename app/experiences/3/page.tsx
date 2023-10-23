'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'

interface Experience {
    perfVisible: boolean
}

export function Experience({ perfVisible }: Experience) {
    const sphere = useControls('Sphere', {
        position: {
            value: {
                x: 2,
                y: 0,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Position'
        },
        rotation: {
            value: {
                x: 0,
                y: 0,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Rotation'
        },
        scale: {
            value: 1,
            step: 0.1,
            min: 0,
            max: 10,
            label: 'Scale'
        },
        color: {
            value: '#ff0000',
            label: 'Color'
        }
    }, { collapsed: true })

    const cube = useControls('Cube', {
        position: {
            value: {
                x: -2,
                y: 0,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Position'
        },
        rotation: {
            value: {
                x: 0,
                y: 0,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Rotation'
        },
        scale: {
            value: 1,
            step: 0.1,
            min: 0,
            max: 10,
            label: 'Scale'
        },
        color: {
            value: '#00ff00',
            label: 'Color'
        }
    }, { collapsed: true })

    const plane = useControls('Plane', {
        position: {
            value: {
                x: 0,
                y: -1,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Position'
        },
        rotation: {
            value: {
                x: - Math.PI * 0.5,
                y: 0,
                z: 0
            },
            step: 0.01,
            min: -10,
            max: 10,
            label: 'Rotation'
        },
        scale: {
            value: 10,
            step: 0.1,
            min: 0,
            max: 10,
            label: 'Scale'
        },
        color: {
            value: '#0000ff',
            label: 'Color'
        }
    }, { collapsed: true })

    return <>

        {perfVisible && <Perf />}

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh
            position={[sphere.position.x, sphere.position.y, sphere.position.z]}
            rotation={[sphere.rotation.x, sphere.rotation.y, sphere.rotation.z]}
            scale={sphere.scale}
        >
            <sphereGeometry />
            <meshStandardMaterial color={sphere.color} />
        </mesh>

        <mesh
            position={[cube.position.x, cube.position.y, cube.position.z]}
            rotation={[cube.rotation.x, cube.rotation.y, cube.rotation.z]}
            scale={cube.scale}
        >
            <boxGeometry />
            <meshStandardMaterial color={cube.color} />
        </mesh>

        <mesh
            position={[plane.position.x, plane.position.y, plane.position.z]}
            rotation={[plane.rotation.x, plane.rotation.y, plane.rotation.z]}
            scale={plane.scale}
        >
            <planeGeometry />
            <meshStandardMaterial color={plane.color} />
        </mesh>

    </>
}

export default function App() {
    const perf = useControls('Performance', {
        visible: true,
    })

    return (<>
        <Leva collapsed
            titleBar={{
                title: 'Controls',
                position: {
                    x: 0,
                    y: perf.visible ? 150 : 0
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
            <Experience perfVisible={perf.visible} />
        </Canvas>
    </>)
}