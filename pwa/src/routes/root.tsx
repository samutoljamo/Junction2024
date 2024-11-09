import {Box} from "@mui/joy"

import {Camera} from "react-camera-pro"
import SerialNumberModel from '../assets/components/SerialNumberModel.tsx'
import { useState, useEffect, useRef } from 'react'
import PWABadge from '../PWABadge.tsx'
import Ifc from './ifc/ifc.tsx'
import {Button } from '@mui/joy'

export default function Root(){
    
  const [count, setCount] = useState(0)
  const [loc, setLoc] = useState('')
  const camera = useRef();
  const [image, setImage] = useState(null);

  useEffect(() => {
    navigator.geolocation.watchPosition((val) => {
      console.log("location updated")
      setLoc(`lat: ${val.coords.latitude} lon: ${val.coords.longitude}`)
    })
  }, [])
    return <Box>
        Hello form root
        
    <div>
      
    {loc}</div>
    {!image && <Camera ref={camera} errorMessages={{}} aspectRatio={1} />}
    <Button onClick={() => {
      if(camera.current){
        setImage(camera.current.takePhoto())
      }
    }}>Testing
    </Button>
    <img src={image} />
      <PWABadge />
    </Box>
}