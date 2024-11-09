import React from 'react';
import { Box, Button, Grid, Item } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

export default function Bottombar() {
    const navigate = useNavigate();

  
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
                <Grid alignItems="center" justifyContent="center" xs={6}>
                    <Button
                         onClick={() => navigate("/map")}
                        variant="solid"
                        sx={{ margin: 2 }}
                    >
                        Map
                    </Button>
                </Grid>
                <Grid xs={6}>
                    <Button
                        
                        onClick={() => navigate("/")}
                        variant="solid"
                        sx={{ margin: 2 }}
                    >
                        I am here
                    </Button>
                    {/* You can add another button or content here */}
                </Grid>
            </Grid>
        </Box>
    );
}
