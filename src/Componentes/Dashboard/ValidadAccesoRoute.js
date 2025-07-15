import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { validarAcceso } from '../../Servicios/validarAcceso';
import { CircularProgress, Box } from '@mui/material';

export default function ValidarAccesoRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const res = await validarAcceso();
        console.log("Validación de acceso:", res);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Fallo autenticación:", err);
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verificarAuth();
  }, []); // No se incluye 'router' porque useNavigate es estable

  if (checking) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}