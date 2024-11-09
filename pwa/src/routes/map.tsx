import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Button, CssBaseline, IconButton, Tooltip, Typography, Modal } from "@mui/joy";
import RoomIcon from "@mui/icons-material/Room";
import map_image from "../assets/kaapelitehdas_ifc_from_top 1.png";

export default function Root() {
  interface Machine {
    id: number;
    x: number;
    y: number;
    name: string;
  }

  const initialMachines: Machine[] = [
    { id: 1, x: 100, y: 200, name: "Electric main" },
    { id: 2, x: 100, y: 450, name: "Motor" },
    { id: 3, x: 250, y: 50, name: "Fuses" },
  ];

  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [activeMachineId, setActiveMachineId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const handleMachineClick = (machine: Machine) => {
    setActiveMachineId(machine.id);
    setSelectedMachine(machine);
    setOpenModal(true);  // Open modal with machine info
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMachine(null);
  };

  // Handle the creation of a new machine
  const handleAddNewDevice = () => {
    const newMachine: Machine = {
      id: machines.length + 1, // or use a more robust ID generation method
      x: Math.random() * 200,  // Random X position for the new machine
      y: Math.random() * 200,  // Random Y position for the new machine
      name: `New Device ${machines.length + 1}`,
    };

    setMachines([...machines, newMachine]);  // Add the new machine to the list
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

        {/* Labels Section: */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          {machines.map((machine) => (
            <Box key={machine.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 3 }}>
              <Typography level="body1">{`${machine.name}`}</Typography>
              <Typography>{machine.id}</Typography>
            </Box>
          ))}
        </Box>

        {/* New Device Button */}


        {/* Map Section: */}
        <Box
          sx={{
            position: "relative",
            width: "90%",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.level2",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            
          }}
        >
          <Typography sx={{ marginBottom: 2 }}>Open the device info by pressing on it</Typography>

          {/* Map Image Box */}
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

          {/* Machine Icons on Map */}
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
                  transform: "translate(-50%, -50%)",
                  backgroundColor: activeMachineId === machine.id ? "green" : "red",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "white" }}>
                  {machine.id}
                </Typography>
              </IconButton>
            </Tooltip>
          ))}
          <Button
            onClick={handleAddNewDevice}
            sx={{
              backgroundColor: "gray",
              color: "white",
              marginBottom: 2,
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Add a Device
          </Button>
        </Box>

        {/* Modal for Machine Info */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "background.level1",
              padding: 3,
              borderRadius: 2,
              boxShadow: 24,
              maxWidth: 400,
              width: "90%",
            }}
          >
            <Typography level="h6">{selectedMachine?.name}</Typography>
            <Typography>ID: {selectedMachine?.id}</Typography>
            <Typography>
              Coordinates: ({selectedMachine?.x}, {selectedMachine?.y})
            </Typography>
            <Button onClick={handleCloseModal} sx={{ marginTop: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </CssVarsProvider>
  );
}
