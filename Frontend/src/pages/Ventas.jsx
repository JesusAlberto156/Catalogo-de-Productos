import { useState } from "react";

import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

import AddSaleModal from "../components/modals/AddSaleModal";
import GetSaleModal from "../components/modals/GetSaleModal";
import EditSaleModal from "../components/modals/EditSaleModal";
import DeleteSaleModal from "../components/modals/DeleteSaleModal";

import { Titulo } from "../components/styled/Texts";
import { Button,ButtonG,ButtonE,ButtonD } from "../components/styled/Buttons";
import { TablaVentas,Tabla,Td,Th,Tr } from "../components/styled/Tables";

export default function Ventas({ productos,ventas,addVenta,editVenta,deleteVenta }) {
    
    document.title = "CdP - Ventas";

    const [OpenModalAdd, setOpenModalAdd] = useState(false);
    const [OpenModalGet, setOpenModalGet] = useState(false);
    const [OpenModalEdit, setOpenModalEdit] = useState(false);
    const [OpenModalDelete, setOpenModalDelete] = useState(false);

    const [Venta, setVenta] = useState(null);
    const [VentaId, setVentaId] = useState(null);
    const [editedVenta, setEditedVenta] = useState(Venta);

    //INSERTAR
    const toggleModalAdd = () => {
        setOpenModalAdd(!OpenModalAdd);
    };
    //INSERTAR
    //MOSTRAR
    const toggleModalGet = (Venta) => {
        setOpenModalGet(!OpenModalGet);
        setVenta(Venta);
    };
    //MOSTRAR
    //EDITAR
     const toggleModalEdit = (Venta) => {
        setOpenModalEdit(!OpenModalEdit);
        setEditedVenta(Venta);
    };
    const deleteProducto = (index) => {
        const updatedProductos = [...editedVenta.Productos];
        updatedProductos.splice(index, 1);
        setEditedVenta({
            ...editedVenta,
            Productos: updatedProductos,
        });
    };
    const addProducto = () => {
        const newProducto = {
            IdProducto: '',
            Nombre: '',
            Cantidad: '',
            PrecioUnitario: 0,
        };
        setEditedVenta({
            ...editedVenta,
            Productos: [...editedVenta.Productos, newProducto],
        });
    };
    const handleEditChange = (e, productoIndex = null, productoField = null) => {
        const { name, value } = e.target;

        if (productoIndex !== null && productoField !== null) {
            const updatedProductos = [...editedVenta.Productos];
            updatedProductos[productoIndex][productoField] = value;
    
            setEditedVenta({
                ...editedVenta,
                Productos: updatedProductos,
            });
        } else {
            setEditedVenta({
                ...editedVenta,
                [name]: value,
            });
        }
    };
    const handleSaveEdit = () => {
        editVenta(editedVenta);
        toggleModalEdit();
    }
    const handleCancelEdit = () => {
        setEditedVenta(Venta);
        toggleModalEdit();
    }
    //EDITAR
    //ELIMINAR
    const toggleModalDelete = (Id) => {
        setOpenModalDelete(!OpenModalDelete);
        setVentaId(Id);
    };
    const handleDeleteVenta = (Id) => {
        deleteVenta(Id)
        setOpenModalDelete(!OpenModalDelete);
    }
    //ELIMINAR
    
    return ( 
        <>
            <Titulo>Listado de Ventas</Titulo>
            <Button onClick={toggleModalAdd}>NUEVA VENTA</Button>
            <TablaVentas>
                <Tabla>
                    <thead>
                    <Tr>
                        <Th>ID Venta</Th>
                        <Th>Tipo de Pago</Th>
                        <Th>Fecha</Th>
                        <Th>Hora</Th>
                        <Th>Monto Total</Th>
                        <Th>Acciones</Th>
                    </Tr>
                    </thead>
                    <tbody>
                    {ventas.map((venta) => (
                        <Tr key={venta.IdVenta}>
                            <Td>{venta.IdVenta}</Td>
                            <Td>{venta.TipoDePago}</Td>
                            <Td>{venta.Fecha}</Td>
                            <Td>{venta.Hora}</Td>
                            <Td>{venta.MontoTotal}</Td>
                            <Td style={{ display: 'flex', gap: '15px' , justifyContent: 'center', alignItems: 'center'}}>
                                <ButtonG onClick={() => toggleModalGet(venta)}><GrView/></ButtonG>
                                <ButtonE onClick={() => toggleModalEdit(venta)}><MdModeEdit/></ButtonE>
                                <ButtonD onClick={() => toggleModalDelete(venta.IdVenta)}><MdDelete/></ButtonD>
                            </Td>
                        </Tr>
                    ))}
                    </tbody>
                </Tabla>
            </TablaVentas> 
            <AddSaleModal 
                OpenModalAdd={OpenModalAdd} 
                addVenta={addVenta} 
                toggleModalAdd={toggleModalAdd}
            />
            <GetSaleModal 
                Venta={Venta} 
                OpenModalGet={OpenModalGet} 
                toggleModalGet={toggleModalGet}
            />
            <EditSaleModal 
                editedVenta={editedVenta} 
                OpenModalEdit={OpenModalEdit}
                handleEditChange={handleEditChange}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                addProducto={addProducto}
                deleteProducto={deleteProducto}
            />
            <DeleteSaleModal 
                VentaId={VentaId} 
                OpenModalDelete={OpenModalDelete}  
                toggleModalDelete={toggleModalDelete} 
                handleDeleteVenta={handleDeleteVenta}/>
        </>       
    );
}