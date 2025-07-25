import React, { useState, useEffect } from "react";
import NavbarWithDrawer from "../Dashboard/NavbarWithDrawer";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { listarProductosAny, listarMarca, listarCategoria, listarProveedor } from "../../Servicios/Productos/productosServicio";
import { Select } from "antd";
import { agregarCarrito } from "../../Servicios/Productos/carritoServicio";


const { Option } = Select;
const Index = () => {

    const [ productos, setProductos ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    const [filtroProveedor, setFiltroProveedor] = useState(null);
    const [filtroCategorias, setFiltroCategorias] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const obtenerProductos = async () => {
            setLoading(true);
          try {
            const response = await listarProductosAny();
            setProductos(response.data);
            const responseCategorias = await listarCategoria();
            setCategorias(responseCategorias);
    
            const responseMarcas = await listarMarca();
            setMarcas(responseMarcas.data);
    
            const responseProveedores = await listarProveedor();
            setProveedores(responseProveedores.data);
          } catch (error) {
            console.error("Error al obtener los productos:", error);
          } finally {
            setLoading(false);
          }
        };
    
        obtenerProductos();
      }, []);


      const productosFiltrados = productos.filter((producto) => {
    const coincideProveedor = filtroProveedor ? producto.proveedor.id === filtroProveedor : true;
    const coincideMarca = filtroMarca ? producto.marca.id === filtroMarca : true;
    const coincideCategorias =
      filtroCategorias.length > 0 && !filtroCategorias.includes(0)
        ? filtroCategorias.some((catId) =>
            producto.categorias.some((cat) => cat.id === catId)
          )
        : true;
    return coincideProveedor && coincideMarca && coincideCategorias;
  });

      console.log('categorias', categorias);

      const handleAgregarCarrito = async (productoId, cantidadProducto) => {
        try {
          console.log('productoId', productoId);
          console.log('cantidadProducto', cantidadProducto);
          await agregarCarrito({
                    "producto_id": productoId,
                    "cantidad": parseInt(cantidadProducto)
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
          Bienvenido a mi tienda Virtual
        </Typography>

        <Box sx={{ mb: 2 }}>

            <Select
                placeholder="Seleccione el proveedor"
                style={{ width: 200 }}
                onChange={setFiltroProveedor}
                allowClear
            >   
                <Option value={0}>Todos</Option>
                {proveedores?.map((proveedor) => (
                    
                    <Option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                    </Option>
                ))}
            </Select>
            <Select
                mode="multiple"
                placeholder="Seleccione las Categorias"
                style={{ width: 300 }}
                onChange={setFiltroCategorias}
                allowClear
            >   
            <Option value={0}>Todos</Option>
                {categorias?.map((categoria) => (
                    <Option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                    </Option>
                ))}
            </Select>
            <Select
                placeholder="Seleccione la marca"
                style={{ width: 200 }}
                onChange={setFiltroMarca}
                allowClear
            >
                <Option value={0}>Todos</Option>
                {marcas?.map((marca) => (
                    <Option key={marca.id} value={marca.id}>
                        {marca.nombre}
                    </Option>
                ))}
            </Select>

        </Box>
        <Grid container spacing={4}>
        {loading ? (
          <Typography variant="h6" gutterBottom>
            Cargando productos...
          </Typography>
        ) : (
            <>
            {productosFiltrados.length > 0 ? (
                <>
                    {productosFiltrados.map((producto) => (
                        <Grid item key={producto.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={
                                        producto.imagenes.find((imagen) => imagen.es_principal) 
                                        ? `http://localhost:8000${producto.imagenes.find((imagen) => imagen.es_principal).imagen}`
                                        : "https://hapuricellisa.com.ar/plugins/productos/producto-sin-imagen.png"
                                    }
                                    alt={producto.nombre}
                                    sx={{ height: 100}}
                                    onClick={() => { window.location.href = `/detalle-producto/${producto.id}`; }}
                                    />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {producto.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {producto.proveedor?.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {producto.marca?.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Precio: ${producto.precio}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Categorías:</strong>{" "}
                                        {producto.categorias?.length > 0
                                            ? producto.categorias.map((cat) => cat.nombre).join(", ")
                                            : "Sin categorías"}
                                    </Typography>
                                    <input type="text" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                                    <Button variant="contained" color="primary" onClick={() => handleAgregarCarrito(producto.id, cantidad)}>
                                        Agregar al carrito
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </>
            ) : (
                <Typography variant="h6" gutterBottom>
                No hay productos disponibles
                </Typography>
            )}
            </>
        )} 
        </Grid>
      </Box>
    </>
  );
};

export default Index;
