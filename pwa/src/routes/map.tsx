import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, CssBaseline, IconButton, Tooltip, Typography } from "@mui/joy";
import RoomIcon from "@mui/icons-material/Room";
import map_image from "../assets/kaapelitehdas_ifc_from_top 1.png";

export default function Root() {
  interface Machine {
    id: number;
    x: number;
    y: number;
    name: string;
  }

  const machines: Machine[] = [
    { id: 1, x: 100, y: 200, name: "Machine 1" },
    { id: 2, x: 100, y: 450, name: "Machine 2" },
    { id: 3, x: 250, y: 50, name: "Machine 3" },
  ];

  const [activeMachineId, setActiveMachineId] = useState<number | null>(null);

  const handleMachineClick = (machine: Machine) => {
    setActiveMachineId(machine.id);
    alert(`Clicked on ${machine.name}`);
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100vh",
          width: "100vw",
          backgroundColor: "background.level1",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <Typography level="h4" sx={{ marginBottom: 2 }}>
          Kaapelitehdas
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "90%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.level2",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              backgroundImage: `url(${map_image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: "8px",
            }}
          />
          {machines.map((machine) => (
            <Tooltip key={machine.id} title={machine.name}>
              <IconButton
                onClick={() => handleMachineClick(machine)}
                sx={{
                  position: "absolute",
                  top: machine.y,
                  left: machine.x,
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  transform: "translate(-50%, -50%)", // Centers the icon
                  display: "flex", // Ensure it centers content correctly
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: activeMachineId === machine.id ? "red" : "transparent", // Red background when active
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.5)", // Slight red hover effect
                  },
                  ...(activeMachineId === machine.id && {
                    animation: "pulse 1s", // Pulse once on click
                  }),
                }}
              >
                <RoomIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </CssVarsProvider>
  );
}
