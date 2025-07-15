import React from "react";
import NavbarWithDrawer from "../Dashboard/NavbarWithDrawer";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <NavbarWithDrawer />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Panel de Control
        </Typography>
        {/* Aquí puedes renderizar las secciones de tu dashboard */}
      </Box>
    </>
  );
};

export default Dashboard;
