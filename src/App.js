import React, { useMemo, useRef, useState, useCallback } from 'react';

import { Canvas, extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import styled from 'styled-components';

import {useSpring, a} from 'react-spring/three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Roboto } from './fonts'

import { Html, Text, MeshWobbleMaterial, MeshReflectorMaterial, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Content } from './comp/content'
import { Projects } from './comp/projects'
import { Nav } from './comp/navbar'
import lerp from 'lerp'

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  position,
}) => {
  const ref = useRef();

  const [rotate, setRotate] =useState(0);

  window.addEventListener('scroll', (e) => {

    setRotate(Math.round(window.pageYOffset))
    
  
  
  });
  
  return (
<>
      <group position={[0, rotate / 100 , 0]}>

        <Html fullscreen >
          <div  className='container'>
            <h1 className='title'>Hi, I'm Julian</h1>
          </div>
        </Html>
       


      </group>

<group position={[0, -10 + rotate / 100, 0]}>

<Html fullscreen >
  <div  className='container'>
    <h1 className='title'>I am a designer</h1>
  </div>
</Html>



</group>
</>
  );
};




extend({ OrbitControls });

const Controls =() => {

  const orbitRef = useRef();
  const { camera, gl } = useThree();


  useFrame(() => (
 
    orbitRef.current.update() 
  
  
   
   ));

  return ( 
    <orbitControls
      autoRotate
      enableZoom={false}

      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}


/* const MySphere = () => {

  const [top, setTop] = useState(false);
  
  
  
    window.addEventListener('scroll', () => {
  
    window.pageYOffset > 100 ? setTop(true) : setTop(false)
      
  
    
    });
  
  
    return(
      <mesh  >
      <Html fullscreen >
        <div style={{height: '100vh', textAlign:'center', color:'white', fontSize:'50px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Content/> 
        </div></Html>
      </mesh>
    )
  } */
  

const Container = styled.div`

width: 100vw;
height: 500vh;
position: absolute;
background: rgb(151, 199, 255);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow: scroll;
`

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}


const Words = () => {

  const[top, setTop] = useState(false);

  const props = useSpring({

    words: top ? 'hey' : 'yo',
 
  })
  

  window.addEventListener('scroll', () => {

    if(Math.round(window.pageYOffset) > 1000){setTop(true)} else if (Math.round(window.pageYOffset) < 1000){setTop(false)}
  
  });

  

return(
  <Text color='white' fontSize='2' rotation={[0, 0, 0]}>

  {top ? 'hello' : 'hey'}

  </Text>
)


}

const Box = ({boxColor, boxSize, mouse, position, rotation, top}) => {



  

/*   const [boxRotate, setRotate] = useState(null)

  window.addEventListener('scroll', () => {

    setRotate(Math.round(window.pageYOffset))
    
    console.log(mesh)
 
  })

  const mesh = useRef(null);
useFrame(() => (
 
   mesh.current.position.y = -10 + boxRotate / 150,
   mesh.current.rotation.y = boxRotate / 500


  
  ));
 */





const [hovered, setHovered] = useState(false);
const [active, setActive] = useState(false);


  
const props = useSpring({

  config: { mass: 8, tension: 280, friction: 100 },

  color: hovered ? '#ffd166' : '#FFB7D9' ,
  scale: active ? [1, 1, 1] : [2, 2, 2],
  position: position,
  rotation: rotation
})







return (

<a.mesh 
position={props.position}
rotation={props.rotation}
onClick={() => setActive(!active)}
  onPointerOver={() => setHovered(!hovered)}
  onPointerOut={() => setHovered(!hovered)}
  scale={props.scale}

  >


  <a.boxBufferGeometry attach="geometry" args ={[1, 1, 1]} />
  <MeshWobbleMaterial speed={1} factor={.6}
    attach="material"
    color = '#FFB7D9'
    
  />
  
</a.mesh>

);



};

export default function App() {









  /*  
const onMouseMove = (e) => {
    setMouse({x:e.clientX,y:e.clientY})
  }
  


window.addEventListener('scroll', () => {


  setPosition(window.pageYOffset)

}) */



const [rotate, setRotate] =useState(0);

window.addEventListener('scroll', (e) => {

  setRotate(Math.round(window.pageYOffset))
  


});



return(
  <>

  <Container>

  <Nav></Nav>
   
  </Container>
 
  


  <Canvas colorManagemet style={{transition: '0.9s ease', width:'100vw', height:'100vh', position:'fixed',/*  bottom: (-500 + boxPosition / 5.5) */ }} camera={{position: [-5, 0, 10 ], fov: 50}}>
   
    <ambientLight intensity={.3}/>
    <FillLight brightness={5.6} color={"#a2d2ff"} />
    <RimLight brightness={1004} color={"#a2d2ff"} />

<Controls></Controls>
  <Box  position={[-1, -7 + rotate / 300, -rotate / 500]} rotation={[0, -rotate / 500, 0]}/>
  <Box position={[-4, -15 + rotate / 100, rotate / 300]} rotation={[0, rotate / 700, 0]} />
  <Box position={[4, -15 + rotate / 200, -rotate / 400]} rotation={[0, rotate / 400, 0]}/>

  <Box position={[6, -15 + rotate / 100, -rotate / 500]} rotation={[0, rotate / 400, 0]}/>

  <Box position={[9, -15 + rotate / 700, -rotate / 200]} rotation={[0, rotate / 400, 0]}/>


<Stars></Stars>

<HTMLContent></HTMLContent>

  </Canvas>




  </>
)

}


