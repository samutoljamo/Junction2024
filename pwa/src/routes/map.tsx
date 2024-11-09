import React, { useState, useRef, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Stack,
  Menu,
  MenuItem,
} from "@mui/joy";
import RoomIcon from "@mui/icons-material/Room";
import map_image from "../assets/kaapelitehdas_ifc_from_top 1.png";
import CameraView from "../assets/components/CameraView";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { addItem } from "../store/backendSlice";
import { resetForm } from "../store/formSlice";
import { gpsToNormalized } from "../utils";

export default function Root() {
  const navigate = useNavigate();

  const imageRef = useRef<HTMLImageElement>();

  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.backend.items);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuOpen = (event: any, item: any) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItem(null);
  };

  const handleMenuItemClick = (action: () => void) => {
    handleMenuClose();
    action();
  };
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
      <Typography level="h4" sx={{ marginTop: 1 }}>
        Kaapelitehdas
      </Typography>
      <Typography sx={{ marginBottom: 0 }}>
        Click the red dots(Items) or add a new device
      </Typography>
      <div style={{ position: "relative", display: "inline-block" }}
      onClick={() => {
        if (menuAnchorEl) {
          handleMenuClose();
        }}}
        >

        <img
          ref={imageRef}
          src={map_image}
          alt="Map"
          style={{
            maxHeight: 500,
            display: "block",
          }}
        />
        {/* Map over items and render circles */}
        {items.map((item) => (
          <div
            key={item.id}
            //onMouseEnter={(e) => handleMenuOpen(e, item)}
            onClick={(e) => handleMenuOpen(e, item)}
            style={{
              position: "absolute",
              top: `${item.y * 100}%`,
              left: `${item.x * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              cursor: "pointer",
            }}
          />
        ))}
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
              backgroundColor: "#3C48C9",
              cursor: "pointer",
            }}
          />
        )}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          placement="bottom-start"
        >
          <MenuItem
            onClick={() =>
              handleMenuItemClick(() => navigate(`/item/${selectedItem?.id}`))
            }
          >
            Add new visit
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleMenuItemClick(() =>
                navigate(`/previous-visits/${selectedItem?.id}`)
              )
            }
          >
            View previous visits
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleMenuItemClick(() =>
                console.log("Delete item", selectedItem?.id)
              )
            }
          >
            Replace device
          </MenuItem>
        </Menu>
          
      </div>
      <Button
        onClick={() => {
          dispatch(resetForm());
          navigate("/camera");
        }}
        color="primary"
      >
        Add a Device
      </Button>
    </Stack>
  );
}
