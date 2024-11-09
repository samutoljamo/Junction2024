import React from "react";
import ReactDOM from "react-dom/client";
import Map from "./routes/map";
import Bottombar from "./routes/bottom-bar";
import CameraView from "./assets/components/CameraView";
import Locate from "./assets/components/Locate";
import PreviousVisits from "./assets/components/PreviousVisits";
import Export from "./assets/components/Export";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fontsource/inter";
import CssBaseline from "@mui/joy/CssBaseline";
import SerialNumberModel from "./assets/components/SerialNumberModel";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/bottombar" element={<Bottombar />} />
            <Route path="/information" element={<SerialNumberModel />} />
            <Route path="/camera" element={<CameraView />} />
            <Route path="/locate" element={<Locate />} />
            <Route path="/previous-visits/:id" element={<PreviousVisits />} />
            <Route path="/export" element={<Export />} />
          </Routes>
          {/* <Bottombar /> */}
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
