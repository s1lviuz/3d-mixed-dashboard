'use client'

import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
// import { useMediaQuery } from '@mui/material'
import { OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial, Outlines, Center, PresentationControls, shaderMaterial, Svg, Line, Line2Props, CameraControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { button, useControls } from 'leva'
import { useCallback, useMemo, useRef, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegHandshake } from "react-icons/fa";
import * as THREE from 'three'
import { IoOpenOutline } from "react-icons/io5";

const Experience = () => {
  // const lgScreen = useMediaQuery('(min-width:1536px)')
  const lgScreen = true

  const cubeRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<any>(null)
  const cameraControlsRef = useRef<CameraControls>(null)
  const svgJoystickRef = useRef<THREE.Mesh>(null)
  const textVendaRef = useRef<THREE.Mesh>(null)
  const textComissaoRef = useRef<THREE.Mesh>(null)
  const textFunilRef = useRef<THREE.Mesh>(null)
  const textLeadsRef = useRef<THREE.Mesh>(null)
  const textPropostaRef = useRef<THREE.Mesh>(null)
  const textPosVendaRef = useRef<THREE.Mesh>(null)

  const transparentMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '0x00ff00',
    opacity: 0,
    transparent: true
  }), [])

  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '0xff0000',
    wireframe: true,
    wireframeLinewidth: 0.01,
    wireframeLinejoin: 'round',
    wireframeLinecap: 'round',
  }), [])

  const defaultBoxRotation = useMemo(() => new THREE.Euler(Math.PI / 4 + 0.17, 0, Math.PI / 4), [])
  const defaultSvgJoystickPosition = useMemo(() => new THREE.Vector3(-0.25, 0.25, 0), [])
  const joystickDeadZone = useMemo(() => 0.2, [])

  const [camera, setCamera] = useState<THREE.Camera>()
  const [rotateGeometry, setRotateGeometry] = useState<{
    velocidade: number,
    vetor: THREE.Vector3,
    geometryRef: THREE.Mesh
  }>();
  const [moveGeometry, setMoveGeometry] = useState<{
    velocidade: number,
    vetor: THREE.Vector3,
    geometryRef: THREE.Mesh
  }>();
  const [mouseHoverBox, setMouseHoverBox] = useState(false)
  const [linesVisible, setLinesVisible] = useState(true)
  const [textVisible, setTextVisible] = useState(true)
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<
    'VENDA' |
    'COMISSAO' |
    'FUNIL' |
    'LEADS' |
    'PROPOSTA' |
    'POS-VENDA'
  >()
  const [exibirMenuAtivo, setExibirMenuAtivo] = useState(false)

  const stateControls = useControls({
    transformActive: false,
  })

  useControls({
    'Reset orbit': button(() => {
      (orbitRef as any).current.reset()
    }),
    'Reset Box': button(() => {
      setRotateGeometry({
        velocidade: 2,
        vetor: new THREE.Vector3(defaultBoxRotation.x, defaultBoxRotation.y, defaultBoxRotation.z),
        geometryRef: cubeRef.current as THREE.Mesh
      })
      setTimeout(() => {
        setLinesVisible(true)
      }, 2000)
      setExibirMenuAtivo(false)
      setTextVisible(true)
      cameraControlsRef.current?.zoomTo(150, true)
    }),
  })

  const handleOpenCubeMenu = useCallback(() => {
    setRotateGeometry({
      velocidade: 3,
      vetor: new THREE.Vector3(0, 0, 0),
      geometryRef: cubeRef.current as THREE.Mesh
    })
    setLinesVisible(false)
    setTimeout(() => {
      cameraControlsRef.current?.zoomTo(400, true)
      setTimeout(() => {
        setTextVisible(false)
      }, 400)
      setTimeout(() => {
        setExibirMenuAtivo(true)
        svgJoystickRef.current?.position.set(defaultSvgJoystickPosition.x, defaultSvgJoystickPosition.y, defaultSvgJoystickPosition.z)
      }, 1000)
    }, 500)
  }, [setRotateGeometry, setLinesVisible, setTextVisible, cameraControlsRef])

  useFrame((state, delta) => {
    setCamera(state.camera)
    if (rotateGeometry) {
      const geometryRotation = rotateGeometry.geometryRef.rotation;
      const target = rotateGeometry.vetor;
      geometryRotation.x += (target.x - geometryRotation.x) * rotateGeometry.velocidade * delta;
      geometryRotation.y += (target.y - geometryRotation.y) * rotateGeometry.velocidade * delta;
      geometryRotation.z += (target.z - geometryRotation.z) * rotateGeometry.velocidade * delta;
      if ([geometryRotation.x, geometryRotation.y, geometryRotation.z].every(v => v === target.x)) {

        setRotateGeometry(undefined)
      }
    }

    if (moveGeometry) {
      const geometryPosition = moveGeometry.geometryRef.position;
      const target = moveGeometry.vetor;
      geometryPosition.x += (target.x - geometryPosition.x) * moveGeometry.velocidade * delta;
      geometryPosition.y += (target.y - geometryPosition.y) * moveGeometry.velocidade * delta;
      geometryPosition.z += (target.z - geometryPosition.z) * moveGeometry.velocidade * delta;
      if ([geometryPosition.x, geometryPosition.y, geometryPosition.z].every(v => v === target.x)) {
        setMoveGeometry(undefined)
      }
    }

    if (mouseHoverBox && svgJoystickRef.current) {
      const { x, y } = state.mouse
      svgJoystickRef.current.position.x = (x * 3) - 0.25
      svgJoystickRef.current.position.y = (y * 1.5) + 0.25

      if ((Math.abs(x) > joystickDeadZone - 0.12 || Math.abs(y) > joystickDeadZone) && linesVisible) {
        const positionPointerV3 = new THREE.Vector3(x, y, 0)

        const distanceToVenda = positionPointerV3.distanceTo(new THREE.Vector3(textVendaRef.current?.position.x || 0, (textVendaRef.current?.position.y || 0) - 0.28, 0))
        const distanceToComissao = positionPointerV3.distanceTo(new THREE.Vector3((textComissaoRef.current?.position.x || 0) - 0.4, (textComissaoRef.current?.position.y || 0) - 0.07, 0))
        const distanceToFunil = positionPointerV3.distanceTo(new THREE.Vector3((textFunilRef.current?.position.x || 0) - 0.4, (textFunilRef.current?.position.y || 0) + 0.07, 0))
        const distanceToLeads = positionPointerV3.distanceTo(new THREE.Vector3(textLeadsRef.current?.position.x || 0, (textLeadsRef.current?.position.y || 0) + 0.28, 0))
        const distanceToProposta = positionPointerV3.distanceTo(new THREE.Vector3((textPropostaRef.current?.position.x || 0) + 0.4, (textPropostaRef.current?.position.y || 0) + 0.07, 0))
        const distanceToPosVenda = positionPointerV3.distanceTo(new THREE.Vector3((textPosVendaRef.current?.position.x || 0) + 0.4, (textPosVendaRef.current?.position.y || 0) - 0.07, 0))

        const distances = [
          distanceToVenda,
          distanceToComissao,
          distanceToFunil,
          distanceToLeads,
          distanceToProposta,
          distanceToPosVenda
        ]

        const minDistance = Math.min(...distances)

        const index = distances.indexOf(minDistance)

        const opcoes = [
          'VENDA',
          'COMISSAO',
          'FUNIL',
          'LEADS',
          'PROPOSTA',
          'POS-VENDA'
        ]

        setOpcaoSelecionada(opcoes[index])
        window.document.body.style.cursor = 'pointer'
      } else {
        setOpcaoSelecionada(undefined)
        window.document.body.style.cursor = 'default'
      }
    }
  })

  //   const bloomControls = useControls({
  //     luminanceThreshold: {
  //       value: 0.86,
  //       min: 0,
  //       max: 1,
  //       step: 0.001
  //     },
  //     luminanceSmoothing: {
  //       value: 0.25,
  //       min: 0,
  //       max: 1,
  //       step: 0.001
  //     },
  //     intensity: {
  //       value: 0.81,
  //       min: 0,
  //       max: 1,
  //       step: 0.001
  //     },
  //     radius: {
  //       value: 0.8,
  //       min: 0,
  //       max: 1,
  //       step: 0.001
  //     },
  //     levels: {
  //       value: 4.1,
  //       min: 0,
  //       max: 10,
  //       step: 0.1
  //     }
  //   })


  return <>

    <OrbitControls
      ref={orbitRef}
      enableDamping={false}
      makeDefault
      onEnd={e => {
        console.log(orbitRef)
      }}
    />

    <CameraControls
      ref={cameraControlsRef}
    />

    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <EffectComposer>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.21}
        luminanceSmoothing={0.30}
        intensity={0.26}
        radius={0.46}
        levels={1.3}

      // {...bloomControls}
      />
    </EffectComposer>

    <group scale={lgScreen ? 1.5 : 1}>
      <mesh ref={cubeRef} material={transparentMaterial} rotation={defaultBoxRotation}
        position={[0, 0, -1]}
        onPointerOver={e => {
          setMouseHoverBox(true)
        }}
        onPointerLeave={e => {
          setMouseHoverBox(false)
          setMoveGeometry({
            velocidade: 1.5,
            vetor: new THREE.Vector3(defaultSvgJoystickPosition.x, defaultSvgJoystickPosition.y, defaultSvgJoystickPosition.z),
            geometryRef: svgJoystickRef.current as THREE.Mesh
          })
          setTimeout(() => {
            setOpcaoSelecionada(undefined)
          }, 100)
        }}
        onClick={() => {
          if (opcaoSelecionada) {
            handleOpenCubeMenu()
          }
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <Outlines thickness={0.01} color={0x18C964} transparent opacity={1} screenspace={false} angle={Math.PI} />
      </mesh>
      <Line visible={linesVisible} points={[[0, 0, 0], [textVendaRef.current?.position.x || 0, (textVendaRef.current?.position.y || 0) - 0.28, 0]]} color={opcaoSelecionada === 'VENDA' ? 0x18C964 : 0x121212} lineWidth={1} />
      <Line visible={linesVisible} points={[[0, 0, 0], [(textComissaoRef.current?.position.x || 0) - 0.4, (textComissaoRef.current?.position.y || 0) - 0.07, 0]]} color={opcaoSelecionada === 'COMISSAO' ? 0x18C964 : 0x121212} lineWidth={1} />
      <Line visible={linesVisible} points={[[0, 0, 0], [(textFunilRef.current?.position.x || 0) - 0.4, (textFunilRef.current?.position.y || 0) + 0.07, 0]]} color={opcaoSelecionada === 'FUNIL' ? 0x18C964 : 0x121212} lineWidth={1} />
      <Line visible={linesVisible} points={[[0, 0, 0], [textLeadsRef.current?.position.x || 0, (textLeadsRef.current?.position.y || 0) + 0.28, 0]]} color={opcaoSelecionada === 'LEADS' ? 0x18C964 : 0x121212} lineWidth={1} />
      <Line visible={linesVisible} points={[[0, 0, 0], [(textPropostaRef.current?.position.x || 0) + 0.4, (textPropostaRef.current?.position.y || 0) + 0.07, 0]]} color={opcaoSelecionada === 'PROPOSTA' ? 0x18C964 : 0x121212} lineWidth={1} />
      <Line visible={linesVisible} points={[[0, 0, 0], [(textPosVendaRef.current?.position.x || 0) + 0.4, (textPosVendaRef.current?.position.y || 0) - 0.07, 0]]} color={opcaoSelecionada === 'POS-VENDA' ? 0x18C964 : 0x121212} lineWidth={1} />
      <mesh>
        <Text
          visible={textVisible}
          ref={textVendaRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[0, 1.1, 0]}
          color={opcaoSelecionada === 'VENDA' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
            window.document.body.style.cursor = 'pointer'
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
            window.document.body.style.cursor = 'default'
          }}
          onClick={handleOpenCubeMenu}
        >
          VENDA
        </Text>
        <Text
          visible={textVisible}
          ref={textComissaoRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.1, 0.48, 0]}
          color={opcaoSelecionada === 'COMISSAO' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
          }}
          onClick={handleOpenCubeMenu}
        >
          COMISSÃO
        </Text>
        <Text
          visible={textVisible}
          ref={textFunilRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[1.1, -0.47, 0]}
          color={opcaoSelecionada === 'FUNIL' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
          }}
          onClick={handleOpenCubeMenu}
        >
          FUNIL
        </Text>
        <Text
          visible={textVisible}
          ref={textLeadsRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[0, -1.1, 0]}
          color={opcaoSelecionada === 'LEADS' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
          }}
          onClick={handleOpenCubeMenu}
        >
          LEADS
        </Text>
        <Text
          visible={textVisible}
          ref={textPropostaRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[-1.1, -0.47, 0]}
          color={opcaoSelecionada === 'PROPOSTA' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
          }}
          onClick={handleOpenCubeMenu}
        >
          PROPOSTA
        </Text>
        <Text
          visible={textVisible}
          ref={textPosVendaRef}
          font='/fonts/Jura-Bold.ttf'
          fontSize={0.10}
          position={[-1.1, 0.48, 0]}
          color={opcaoSelecionada === 'POS-VENDA' ? 0x18C964 : 0xFFFFFF}
          rotation={[camera?.rotation.x || 0, camera?.rotation.y || 0, camera?.rotation.z || 0]}
          onPointerOver={e => {
            (e.object as unknown as any).color = 0x18C964
          }}
          onPointerOut={e => {
            (e.object as unknown as any).color = 0xFFFFFF
          }}
          onClick={handleOpenCubeMenu}
        >
          PÓS-VENDA
        </Text>
      </mesh>
      <Svg visible={linesVisible} ref={svgJoystickRef} src='/+.svg' position={defaultSvgJoystickPosition} scale={0.02} />
      {exibirMenuAtivo && <Html position={[0, 0, 1.1]} scale={0.195}>
        <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center'>
          <div className=' flex flex-col min-w-[600px] h-[600px] p-5 font-[Jura] relative'>
            <IconContext.Provider value={{ size: '2.5em' }}>
              <div className='absolute top-6 left-5 rotate-180 cursor-pointer text-danger-400'
                onClick={(e) => {
                  e.stopPropagation()
                  setRotateGeometry({
                    velocidade: 2,
                    vetor: new THREE.Vector3(defaultBoxRotation.x, defaultBoxRotation.y, defaultBoxRotation.z),
                    geometryRef: cubeRef.current as THREE.Mesh
                  })
                  setTimeout(() => {
                    setLinesVisible(true)
                  }, 2000)
                  setExibirMenuAtivo(false)
                  setTextVisible(true)
                  cameraControlsRef.current?.zoomTo(150, true)
                  setOpcaoSelecionada(undefined)
                }}
              >
                <IoOpenOutline />
              </div>
            </IconContext.Provider>
            <div className='flex items-start justify-center w-full'>
              <div className='text-4xl font-bold text-shadow'>VENDA</div>
            </div>
            <IconContext.Provider value={{ size: '8em' }}>
              <div className='w-full flex justify-center mt-10'>
                <FaRegHandshake />
              </div>
            </IconContext.Provider>
            <div className='h-full flex flex-col justify-center gap-20'>
              <div className='text-2xl text-shadow mt-10'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
              <div className='mb-10'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
            </div>
          </div>
        </div>
      </Html>}
    </group>
    {stateControls.transformActive && <TransformControls object={cubeRef.current || undefined} mode='rotate' onObjectChange={() => {
      console.log(cubeRef.current?.rotation)
    }} />}
  </>
}

export default function Cube() {
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
          position: [0, 0, 4.040487460885816]
        }}

      >
        <Experience />
      </Canvas>
    </div>
  )
}
