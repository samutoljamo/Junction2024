import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root"
import Map from "./routes/map"
import Bottombar from './routes/bottom-bar'
import CameraView from './assets/components/CameraView'
import AddDevice from './routes/add-device'

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import '@fontsource/inter';
import CssBaseline from '@mui/joy/CssBaseline';
import SerialNumberModel from './assets/components/SerialNumberModel';
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <CssBaseline />
    <Provider store={store}>
    <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/map" element={<Map />} />
          <Route path="/bottombar" element={<Bottombar />} />
          <Route path="/information" element={<SerialNumberModel />}/>
          <Route path="/camera" element={<CameraView />}/>
          <Route path="/adddevice" element={<AddDevice />}/>
        </Routes>
        {/* <Bottombar /> */}
      </Router>
      </Provider>
  </React.StrictMode>,
)
