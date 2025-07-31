import React, { useEffect, useState } from "react";
import NavbarWithDrawer from "../Dashboard/NavbarWithDrawer";
import { Box, Typography, Container, Button, Avatar, Paper } from '@mui/material';
import { perfilUsuario } from "../../Servicios/Usuarios/perfilServicio";
import EditarPerfilDrawer from "./EditarPerfilDrawer";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setLoading(true);
        const response = await perfilUsuario();
        setPerfil(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setError("Error al obtener el perfil");
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

  const abrirDrawerEdicion = () => {
    setOpenDrawer(true);
  };

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!perfil) {
    return <div>No hay perfil disponible</div>;
  } 

  const userData = perfil.user || perfil;



  return (
    <>
      <NavbarWithDrawer />
      <Box sx={{ p: 4 }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {perfil ? (
                <>
                  {perfil.foto_perfil && (
                    <Avatar
                      src={`https://tiendaonline-1gvm.onrender.com${perfil.foto_perfil}`}
                      sx={{ width: 100, height: 100 }}
                    />
                  )}
                  {userData?.username && (
                    <Typography variant="h4">{userData.username}</Typography>
                  )}
                  <Typography variant="body1">Nombre: {userData.first_name || 'No especificado'}</Typography>
                  <Typography variant="body1">Apellido: {userData.last_name || 'No especificado'}</Typography>
                  {userData?.email && (
                    <Typography variant="body1">Email: {userData.email}</Typography>
                  )}
                  <Typography variant="body1">Teléfono: {perfil.telefono || 'No especificado'}</Typography>
                  <Typography variant="body1">Dirección: {perfil.direccion || 'No especificada'}</Typography>
                  <Typography variant="body1">Fecha de nacimiento: {perfil.fecha_nacimiento || 'No especificada'}</Typography>
                </>
              ) : (
                <Typography variant="body1">No hay información del perfil</Typography>
              )}
              <Button variant="contained" onClick={abrirDrawerEdicion}>
                Editar Perfil
              </Button>
            </Box>
          </Paper>
        </Container>

        {perfil && (
          <EditarPerfilDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            perfil={perfil}
            setPerfil={setPerfil}
          />
        )}
      </Box>
    </>
  );
};

export default Perfil;
