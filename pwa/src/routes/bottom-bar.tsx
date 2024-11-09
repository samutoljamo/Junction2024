import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/joy";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";


export default function Bottombar() {
  const navigate = useNavigate();

  const routes = ["/map", "/", "/confirmdata", "/confirmcondition"];

  // Use state to track the current index in the route list
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextRoute = () => {
    // Increment the index and handle loop around
    const nextIndex = (currentIndex + 1) % routes.length; // This ensures it loops back to the first route
    setCurrentIndex(nextIndex); // Update the state with the next index

    // Navigate to the next route
    navigate(routes[nextIndex]);
  };

  const handlePreviousRoute = () => {
    // Decrement the index and handle loop around (if going back from the first route)
    const prevIndex = (currentIndex - 1 + routes.length) % routes.length; // This ensures it loops to the last route
    setCurrentIndex(prevIndex); // Update the state with the previous index

    // Navigate to the previous route
    navigate(routes[prevIndex]);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "black",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={6} container justifyContent="center" alignItems="center">
          <Button
            onClick={handlePreviousRoute} // Use the backward navigation here
            variant="solid"
            sx={{
              margin: 2,
              minWidth: "150px", // Set minimum width here
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid xs={6} container justifyContent="center" alignItems="center">
          <Button
            onClick={handleNextRoute}
            variant="solid"
            endDecorator={<KeyboardArrowRight />}
            sx={{
              margin: 2,
              minWidth: "150px", // Set minimum width here
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
