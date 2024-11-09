import { Typography, Stack, Button, Box } from "@mui/joy";
import map_image from "../kaapelitehdas_ifc_from_top 1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useRef, useState } from "react";
import { setX, setY } from "../../store/formSlice";
import { gpsToNormalized } from "../../utils";

export default function Locate() {
  const imageRef = useRef();

  const dispatch = useAppDispatch();
  const [coords, setCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const localized = gpsToNormalized(
        pos.coords.latitude,
        pos.coords.longitude
      );
      console.log(localized);
      setCoords(localized);
    });
  }, []);

  return (
    <Stack alignItems="center" alignContent="center" justifyContent="center">
      <Typography level="h1">Add Device</Typography>
      <Typography sx={{ marginBottom: 0 }}>
        Choose the device location by clicking on the map
      </Typography>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          ref={imageRef}
          src={map_image}
          alt="Map"
          style={{
            maxHeight: 500,
            display: "block",
          }}
          onClick={(e) => {
            const rect = imageRef.current?.getBoundingClientRect();
            setCoords({
              x: (e.clientX - rect.left) / rect.width,
              y: (e.clientY - rect.top) / rect.height,
            });
          }}
        />
        {coords && (
          <div
            style={{
              position: "absolute",
              top: `${coords.y * 100}%`,
              left: `${coords.x * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              cursor: "pointer",
            }}
          ></div>
        )}
      </div>
      <Box flexGrow={1} />
      <Stack direction="row" spacing={2} p={2}>
        <NavLink to="/information">
          <Button style={{
          backgroundColor: "#542DAE",
          fontWeight: "400",
          boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.35)",
          borderRadius: "10px"
        }}
            disabled={coords === null}
            onClick={() => {
              if (!coords) return;
              dispatch(setX(coords.x));
              dispatch(setY(coords.y));
            }}
          >
            Continue
          </Button>
        </NavLink>
        <NavLink to="/camera">
          <Button
          style={{
            backgroundColor: "transparent",
            fontWeight: "400",
            color: "#542DAE",
            border: "2px solid #542DAE",
            borderRadius: "10px"
          }}
          >Back</Button>
        </NavLink>
      </Stack>
    </Stack>
  );
}
