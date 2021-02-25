import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import styled from 'styled-components';
import {useSpring, a} from 'react-spring/three';






const ContentContainer = styled.div`

width: 100vw;
height: 100vh;
display: flex;
align-items:center;
justify-content: center;
font-size: 100px;
color: white;

&:hover{
    color: red;
}

`

export const Content = ({text}) => {


    return (
        <ContentContainer><p>{text}</p></ContentContainer>
    )
}