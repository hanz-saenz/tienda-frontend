import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registoUsuario } from "../../Servicios/Login/loginServicio";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Alert,
} from "@mui/material";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await registoUsuario(username, password, email);
      console.log("Registro exitoso:", response);
      navigate("/login");
    } catch (err) {
      console.error("Error en el registro:", err);
      setError("Error al registrar el usuario. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={registrarUsuario}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Username"
            variant="outlined"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth>
            Registrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registro;
