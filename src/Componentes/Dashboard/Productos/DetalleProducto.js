import React, { useState, useEffect } from "react";
import NavbarWithDrawer from "../../Dashboard/NavbarWithDrawer";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { listarProductosDetalle } from "../../../Servicios/Productos/productosServicio";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import { agregarCarrito } from "../../../Servicios/Productos/carritoServicio";

const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const obtenerProducto = async () => {
            setLoading(true);
            try {
                const response = await listarProductosDetalle(id);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerProducto();
    }, [id]);

    // Ordena las imágenes: principal primero, luego las demás
    const imagenesOrdenadas = producto.imagenes
        ? [
            ...producto.imagenes.filter(img => img.es_principal),
            ...producto.imagenes.filter(img => !img.es_principal)
        ]
        : [];

    const handleAgregarCarrito = async (productoId) => {
            try {
              console.log('productoId', productoId);
              console.log('cantidadProducto', cantidad);
              await agregarCarrito({
                        "producto_id": productoId,
                        "cantidad": parseInt(cantidad)
                    });
              alert("Producto agregado al carrito");
            } catch (error) {
              console.error("Error al agregar el producto al carrito:", error);
            }
          };

    return (
        <>
            <NavbarWithDrawer />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {producto.nombre}
                </Typography>

                {loading ? (
                    <Typography variant="h6" gutterBottom>
                        Cargando producto...
                    </Typography>
                ) : (
                    <Card sx={{ maxWidth: 800, mx: "auto" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ height: 300 }}>
                                    <Carousel
                                        dots={imagenesOrdenadas.length > 1}
                                        autoplay={false}
                                        arrows={true}
                                        style={{ width: "50%", height: 300 }}
                                    >
                                        {imagenesOrdenadas.length > 0
                                            ? imagenesOrdenadas.map((imagen, idx) => (
                                                <img
                                                    key={idx}
                                                    src={`https://tiendaonline-1gvm.onrender.com${imagen.imagen}`}
                                                    alt={producto.nombre}
                                                    style={{
                                                        width: 300,
                                                        height: 300,
                                                        objectFit: "contain",
                                                        borderRadius: 8
                                                    }}
                                                />
                                            ))
                                            : (
                                                <img
                                                    src="https://hapuricellisa.com.ar/plugins/productos/producto-sin-imagen.png"
                                                    alt="Sin imagen"
                                                    style={{
                                                        width: 300,
                                                        height: 300,
                                                        objectFit: "contain",
                                                        borderRadius: 8
                                                    }}
                                                />
                                            )
                                        }
                                    </Carousel>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {producto.nombre}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Precio: ${producto.precio}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Stock: {producto.stock}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Categorías:</strong>{" "}
                                        {producto.categorias?.length > 0
                                            ? producto.categorias.map((cat) => cat.nombre).join(", ")
                                            : "Sin categorías"}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Proveedor:</strong>{producto.proveedor?.nombre}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Marca:</strong>{producto.marca?.nombre}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                                        {producto.descripcion || "Sin descripción"}
                                    </Typography>
                                    <input type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                                    <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                                        <Button variant="contained" color="primary"
                                        onClick={() => handleAgregarCarrito(producto.id)}
                                        >
                                            Agregar al carrito
                                        </Button>
                                        
                                        <Button variant="outlined" color="primary"
                                            onClick={() => navigate("/")}
                                        >
                                            Volver a la tienda
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            </Box>
        </>
    );
};

export default DetalleProducto;