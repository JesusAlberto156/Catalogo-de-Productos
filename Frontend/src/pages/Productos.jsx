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
    { id: 1, nombre: "Guitarra Acústica Yamaha", precio: "200" },
    { id: 2, nombre: "Teclado Casio CTK-3500", precio: "150" },
    { id: 3, nombre: "Batería Pearl Export Series", precio: "800" },
    { id: 4, nombre: "Bajo Eléctrico Fender", precio: "600" },
    { id: 5, nombre: "Amplificador Marshall 15W", precio: "120" },
    { id: 6, nombre: "Micrófono Shure SM58", precio: "100" },
    { id: 7, nombre: "Cajón Flamenco Meinl", precio: "180" },
    { id: 8, nombre: "Pedal de Distorsión Boss DS-1", precio: "60" },
    { id: 9, nombre: "Guitarra Eléctrica Fender Stratocaster", precio: "750" },
    { id: 10, nombre: "Cinturón para guitarra", precio: "20" },
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
    const updatedProducts = [...productos, newProduct];
    setProductos(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

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
                ID
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
                        <TableCell style={{
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: "16px",
                    textTransform: "uppercase",
                }}>
                Precio
                <IconButton onClick={handleOpenFilterMenu}>
                  <FilterListIcon />
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto) => (
              <TableRow key={producto.id} onClick={() => setSelectedProduct(producto)}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>${producto.precio}</TableCell>
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
