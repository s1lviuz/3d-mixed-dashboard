import { useEffect, useMemo, useRef } from 'react'
import { DoubleSide } from 'three'

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
        <meshStandardMaterial color='red' side={DoubleSide} />
    </mesh>
}

export default CustomObject