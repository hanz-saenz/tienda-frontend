import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logoutUsuario } from "../../Servicios/Login/loginServicio";

const NavbarWithDrawer = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logoutUsuario();
    // navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Mi Plataforma AI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* DRAWER (MENÚ LATERAL) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => handleNavigation("/dashboard")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/perfil")}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/productos")}>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/carrito")}>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="Carrito" />
            </ListItem>
            <ListItem button onClick={() => handleLogout()}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarWithDrawer;
