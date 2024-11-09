import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import Ifc from './ifc/ifc.tsx'
import {Button} from '@mui/joy'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loc, setLoc] = useState('')

  useEffect(() => {
    navigator.geolocation.watchPosition((val) => {
      console.log("location updated")
      setLoc(`lat: ${val.coords.latitude} lon: ${val.coords.longitude}`)
    })
  }, [])

  return (
    <>
    <div>
    {loc}</div>
      
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={appLogo} className="logo" alt="pwa logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>pwa</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div id="container"></div>
      <PWABadge />
      <Button>Testing</Button>
    </>
  )
}

export default App
