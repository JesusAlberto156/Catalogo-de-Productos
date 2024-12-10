import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import App from "../app";
import AddProductModal from "../components/modales/AddProductModal";
import EditProductModal from "../components/modales/EditProductModal";
import DeleteProductModal from "../components/modales/DeleteProductModal";

const initialProducts = [
  { id: "P-CDP-0001", nombre: "Guitarra Acústica Yamaha", precio: "200", urlImagen: "https://example.com/guitarra.jpg" },
  { id: "P-CDP-0002", nombre: "Teclado Casio CTK-3500", precio: "150", urlImagen: "https://example.com/teclado.jpg" },
  { id: "P-CDP-0003", nombre: "Batería Pearl Export Series", precio: "800", urlImagen: "https://example.com/bateria.jpg" },
  { id: "P-CDP-0004", nombre: "Bajo Eléctrico Fender", precio: "600", urlImagen: "https://example.com/bajo.jpg" },
  { id: "P-CDP-0005", nombre: "Amplificador Marshall 15W", precio: "120", urlImagen: "https://example.com/amplificador.jpg" },
];


export default function Productos() {
  const [productos, setProductos] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Para el menú de filtro
  const [filterOption, setFilterOption] = useState("Todos");
  const [searchValue, setSearchValue] = useState(""); // Para búsqueda
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Función para manejar la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para manejar búsqueda
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
    setPage(0);
  };

  // Función para abrir el modal de agregar
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

// Función para agregar un producto
const handleAddProduct = (newProduct) => {
  // Generar el nuevo ID_Producto basado en la longitud actual de productos
  const newId = `P-CDP-${(productos.length + 1).toString().padStart(4, "0")}`;
  
  // Agregar el ID_Producto generado al nuevo producto
  const updatedProduct = { ...newProduct, id: newId };

  // Actualizar la lista de productos
  const updatedProducts = [...productos, updatedProduct];
  setProductos(updatedProducts);
  setFilteredProducts(updatedProducts);
}

  // Función para abrir el modal de editar
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // Función para editar un producto
  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = productos.map((producto) =>
      producto.id === updatedProduct.id ? updatedProduct : producto
    );
    setProductos(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  // Función para abrir el modal de eliminar
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  // Función para eliminar un producto
  const handleDeleteProduct = (id) => {
    const updatedProducts = productos.filter((producto) => producto.id !== id);
    setProductos(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  // Función para manejar el filtro por precio
  const handleOpenFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleFilterByPrice = (option) => {
    setFilterOption(option);
    handleCloseFilterMenu();

    if (option === "Todos") {
      setFilteredProducts(productos.filter((producto) => producto.nombre.toLowerCase().includes(searchValue)));
    } else if (option === "Menor a 200") {
      setFilteredProducts(
        productos.filter(
          (producto) =>
            parseInt(producto.precio, 10) < 200 &&
            producto.nombre.toLowerCase().includes(searchValue)
        )
      );
    } else if (option === "Entre 200 y 500") {
      setFilteredProducts(
        productos.filter(
          (producto) =>
            parseInt(producto.precio, 10) >= 200 &&
            parseInt(producto.precio, 10) <= 500 &&
            producto.nombre.toLowerCase().includes(searchValue)
        )
      );
    } else if (option === "Mayor a 500") {
      setFilteredProducts(
        productos.filter(
          (producto) =>
            parseInt(producto.precio, 10) > 500 &&
            producto.nombre.toLowerCase().includes(searchValue)
        )
      );
    }
  };

  return (
    <App>
      <h2 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
        Módulo de Productos
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "0 5% 10px" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar producto..."
          value={searchValue}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
          }}
          style={{ width: "60%" }}
        />
        <div>
          <Tooltip title="Agregar Producto">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={handleOpenAddModal}
              style={{ marginRight: "10px" }}
            >
              Agregar
            </Button>
          </Tooltip>
          <Tooltip title="Editar Producto">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleOpenEditModal}
              disabled={!selectedProduct}
              style={{ marginRight: "10px" }}
            >
              Editar
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar Producto">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleOpenDeleteModal}
              disabled={!selectedProduct}
            >
              Eliminar
            </Button>
          </Tooltip>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
  <TableRow style={{ backgroundColor: "#4caf50" }}>
    <TableCell
      style={{
        fontWeight: "bold",
        color: "#fff",
        fontSize: "16px",
        textTransform: "uppercase",
      }}
    >
      ID_Producto
    </TableCell>
    <TableCell
      style={{
        fontWeight: "bold",
        color: "#fff",
        fontSize: "16px",
        textTransform: "uppercase",
      }}
    >
      Nombre
    </TableCell>
    <TableCell
      style={{
        fontWeight: "bold",
        color: "#fff",
        fontSize: "16px",
        textTransform: "uppercase",
      }}
    >
      Precio
      <IconButton onClick={handleOpenFilterMenu}>
        <FilterListIcon style={{ color: "#fff" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseFilterMenu}
      >
        <MenuItem onClick={() => handleFilterByPrice("Todos")}>Todos</MenuItem>
        <MenuItem onClick={() => handleFilterByPrice("Menor a 200")}>Menor a 200</MenuItem>
        <MenuItem onClick={() => handleFilterByPrice("Entre 200 y 500")}>
          Entre 200 y 500
        </MenuItem>
        <MenuItem onClick={() => handleFilterByPrice("Mayor a 500")}>Mayor a 500</MenuItem>
      </Menu>
    </TableCell>
    <TableCell
      style={{
        fontWeight: "bold",
        color: "#fff",
        fontSize: "16px",
        textTransform: "uppercase",
      }}
    >
      URL Imagen
    </TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {filteredProducts
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((producto) => (
      <TableRow key={producto.id} onClick={() => setSelectedProduct(producto)}>
        <TableCell>{producto.id}</TableCell>
        <TableCell>{producto.nombre}</TableCell>
        <TableCell>${producto.precio}</TableCell>
        <TableCell>
          {producto.urlImagen ? (
            <a
              href={producto.urlImagen}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a73e8", textDecoration: "none" }}
            >
              Ver Imagen
            </a>
          ) : (
            "Sin URL"
          )}
        </TableCell>
      </TableRow>
    ))}
</TableBody>


        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modales */}
      <AddProductModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddProduct={handleAddProduct}
        nextId={productos.length + 1}
      />
      <EditProductModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditProduct={handleEditProduct}
        product={selectedProduct}
      />
      <DeleteProductModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteProduct={handleDeleteProduct}
        product={selectedProduct}
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
    </App>
  );
}
