import React, { useState, useRef } from "react";
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

export default function Root() {
  const navigate = useNavigate();

  const imageRef = useRef();

  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.backend.items);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuOpen = (event: any, item) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItem(null);
  };

  return (
    <Stack alignItems="center" alignContent="center" justifyContent="center">
      <Typography level="h4" sx={{ marginTop: 1 }}>
        Kaapelitehdas
      </Typography>
      <Typography sx={{ marginBottom: 0 }}>Press to open info</Typography>
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
            dispatch(
              addItem({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
                floor: 1,
                visits: [],
              })
            );
          }}
        />

        {/* Map over items and render circles */}
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={(e) => handleMenuOpen(e, item)}
            onMouseLeave={handleMenuClose}
            style={{
              position: "absolute",
              top: `${item.y * 100}%`,
              left: `${item.x * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              cursor: "pointer",
            }}
          />
        ))}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          placement="bottom-start"
          disableAutoFocus
          disableEnforceFocus
        >
          <MenuItem onClick={() => navigate(`/item/${selectedItem?.id}`)}>
            View Details
          </MenuItem>
          <MenuItem onClick={() => console.log("Edit item", selectedItem?.id)}>
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => console.log("Delete item", selectedItem?.id)}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <Button onClick={() => navigate("/adddevice")} color="primary">
        Add a Device
      </Button>
    </Stack>
  );
}
