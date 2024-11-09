import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root"
import Map from "./routes/map"


import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import '@fontsource/inter';
import CssBaseline from '@mui/joy/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/map" element={<Map />} />
        </Routes>
        <div>test</div>
        <NavLink to="/map">Go to map</NavLink>
        <NavLink to="/">Go to root</NavLink>
      </Router>
  </React.StrictMode>,
)
