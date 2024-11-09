import React from 'react';
import { Box, Button, Grid } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

export default function Bottombar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/map"); // Navigate to the "/map" route
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'black',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Button
                        onClick={handleClick}
                        variant="solid"
                        sx={{ margin: 2 }}
                    >
                        Go to Map Page
                    </Button>
                </Grid>
                <Grid xs={6}>
                    {/* You can add another button or content here */}
                </Grid>
            </Grid>
        </Box>
    );
}