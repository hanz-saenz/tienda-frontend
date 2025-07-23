import { useState } from "react";
import {
    
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CicularProgress,
    Avatar,
    InputLabel,
    FormControl
} from "@mui/material";

import { Drawer } from 'antd';
import { actualizarPerfil } from "../../Servicios/Usuarios/perfilServicio";

const EditarPerfilDrawer = ({ open, onClose, perfil, setPerfil }) => {
    const [formData, setFormData] = useState({
        first_name: perfil?.user.first_name || '',
        last_name: perfil?.user.last_name || '',
        email: perfil?.user.email || '',
        telefono: perfil?.telefono || '',
        direccion: perfil?.direccion || '',
        fecha_nacimiento: perfil?.fecha_nacimiento || '',
    });

    const handleActualizarPerfil = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Construimos el objeto user
        const user = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email
        };

        // Agregamos el objeto user como un string JSON al FormData
        data.append('user', JSON.stringify(user));

        // Agregamos los demás campos (excepto first_name y last_name que ya están dentro de user)
        for (const key in formData) {
        if (key !== 'user' && key !== 'first_name' && key !== 'last_name' && key !== 'email') {
            const value = formData[key];
            if (value !== null && value !== undefined) {
            data.append(key, value);
            }
        }
        }

        console.log(data);
        try {
            const updatedPerfil = await actualizarPerfil(data);
            setPerfil(updatedPerfil.data);
            onClose();
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    }

    const handelOnchange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <>
        <Drawer
            title="Editar Perfil"
            width={400}
            anchor="left"
            open={open}
            onClose={onClose}
            footer= {
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleActualizarPerfil}
                >
                    Guardar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                >
                    Cerrar
                </Button>
                </div>
            }
        
        >
        
            <Typography>Editar Perfil</Typography>
            
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nombre/s"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handelOnchange}
                    required
                />
                <TextField
                    label="Apellido/s"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handelOnchange}
                    required
                />
                <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handelOnchange}
                    required
                />
                <TextField
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handelOnchange}
                    required
                />
                <TextField
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handelOnchange}
                    required
                />
                <TextField
                    label="Fecha de nacimiento"
                    name="fecha_nacimiento"
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={handelOnchange}
                    required
                />
            </Box>

        </Drawer>
        </>
    )
}

export default EditarPerfilDrawer;