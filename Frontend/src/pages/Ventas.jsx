import { useState } from "react";
import App from "../app";
import '../css/Ventas.css'
import '../css/ModalVenta.css'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";

export default function Ventas() {
    
    const [OpenModalGet, setOpenModalGet] = useState(false);
    const [OpenModalEdit, setOpenModalEdit] = useState(false);
    const [OpenModalDelete, setOpenModalDelete] = useState(false);
    const [Venta, setVenta] = useState(null);
    const [VentaId, setVentaId] = useState(null);
    const [editedVenta, setEditedVenta] = useState(Venta);

    const toggleModalGet = (Venta) => {
        setOpenModalGet(!OpenModalGet);
        setVenta(Venta);
    };

    const toggleModalEdit = (Venta) => {
        setOpenModalEdit(!OpenModalEdit);
        setEditedVenta(Venta);
    };

    const toggleModalDelete = (Id) => {
        setOpenModalDelete(!OpenModalDelete);
        setVentaId(Id);
    };
    
    const [ventas,setVentas] = useState([
        {
            IdVenta: 'CDP-0001',
            TipoDePago: 'Tarjeta',
            Fecha: '09/12/2024',
            Hora: '09:41',
            Productos: [
                {
                    IdProducto: 'P-CDP-0001',
                    Nombre: 'Guitarra Acústica Yamaha',
                    Cantidad: '2',
                    PrecioUnitario: 200
                },{
                    IdProducto: 'P-CDP-0004',
                    Nombre: 'Bajo Eléctrico Fender',
                    Cantidad: '1',
                    PrecioUnitario: 600
                }
            ],
            MontoTotal: 1000
        },
        {
            IdVenta: 'CDP-0002',
            TipoDePago: 'Efectivo',
            Fecha: '09/12/2024',
            Hora: '11:27',
            Productos: [
                {
                    IdProducto: 'P-CDP-0010',
                    Nombre: 'Cinturón para guitarra',
                    Cantidad: '1',
                    PrecioUnitario: 20
                },{
                    IdProducto: 'P-CDP-0009',
                    Nombre: 'Guitarra Eléctrica Fender Stratocaster',
                    Cantidad: '1',
                    PrecioUnitario: 750
                }
            ],
            MontoTotal: 770
        },
        {
            IdVenta: 'CDP-0003',
            TipoDePago: 'Efectivo',
            Fecha: '09/12/2024',
            Hora: '15:27',
            Productos: [
                {
                    IdProducto: 'P-CDP-0010',
                    Nombre: 'Cinturón para guitarra',
                    Cantidad: '10',
                    PrecioUnitario: 20
                }
            ],
            MontoTotal: 200
        },
        {
            IdVenta: 'CDP-0004',
            TipoDePago: 'Efectivo',
            Fecha: '10/12/2024',
            Hora: '13:35',
            Productos: [
                {
                    IdProducto: 'P-CDP-0005',
                    Nombre: 'Amplificador Marshall 15W',
                    Cantidad: '2',
                    PrecioUnitario: 120
                },{
                    IdProducto: 'P-CDP-0006',
                    Nombre: 'Micrófono Shure SM58',
                    Cantidad: '1',
                    PrecioUnitario: 100
                }
            ],
            MontoTotal: 340
        }
    ]);

    const deleteVenta = (Id) => {
        setVentas(ventas.filter((venta) => venta.IdVenta !== Id));
        setOpenModalDelete(!OpenModalDelete);
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

    const editVenta = (updatedVenta) => 
        setVentas(ventas.map((venta) => 
          (venta.IdVenta === updatedVenta.IdVenta ? updatedVenta : venta)));

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

    return (
        <App>
            <div className="module-app">
                <h2 className="titulo">Listado de Ventas</h2>
                <button className="button">NUEVA VENTA</button>
                <div className="tabla-ventas">
                    <table>
                        <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Tipo de Pago</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Monto Total</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.IdVenta}>
                                <td>{venta.IdVenta}</td>
                                <td>{venta.TipoDePago}</td>
                                <td>{venta.Fecha}</td>
                                <td>{venta.Hora}</td>
                                <td>{venta.MontoTotal}</td>
                                <td style={{ display: 'flex', gap: '15px' , justifyContent: 'center', alignItems: 'center'}}>
                                    <button className="baccion bget" onClick={() => toggleModalGet(venta)}><GrView/></button>
                                    <button className="baccion bedit" onClick={() => toggleModalEdit(venta)}><MdModeEdit/></button>
                                    <button className="baccion bdelete" onClick={() => toggleModalDelete(venta.IdVenta)}><MdDelete/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>  
                <div className="modal-container">
                    {OpenModalDelete && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2 style={{textAlign: 'center'}}>¿Esta seguro?</h2>
                                <p>Eliminaras la venta {VentaId}</p>
                                <div style={{ display: 'flex', gap: '15px' , justifyContent: 'center', alignItems: 'center'}}>
                                    <button className="button-close" onClick={toggleModalDelete}>Cerrar</button>
                                    <button className="button-delete" onClick={() => deleteVenta(VentaId)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal-container">
                    {OpenModalGet && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2 style={{textAlign: 'center'}}>{Venta.IdVenta}</h2> 
                                <ul className="dropdown-list"> 
                                    <li>Tipo de pago: {Venta.TipoDePago}</li>
                                    <li>Fecha: {Venta.Fecha}</li>
                                    <li>Hora: {Venta.Hora}</li>
                                    <li>Productos:</li>
                                    <ul className="dropdown-list">
                                        {Venta.Productos.map((producto, index) => (
                                            <li key={index}>
                                                Id producto: {producto.IdProducto}
                                                <ul className="dropdown-list">
                                                    <li>Nombre: {producto.Nombre}</li>
                                                    <li>Cantidad: {producto.Cantidad}</li>
                                                    <li>Precio unitario: {producto.PrecioUnitario}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                    <li>Monto total: {Venta.MontoTotal}</li>
                                </ul>
                                <div style={{ display: 'flex', gap: '15px' , justifyContent: 'center', alignItems: 'center'}}>
                                    <button className="button-close" onClick={toggleModalGet}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal-container">
                    {OpenModalEdit && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2 style={{textAlign: 'center'}}>Editar venta</h2>
                                <div className="form"> 
                                    <input className="input"
                                        type='text'
                                        name='IdVenta'
                                        value={editedVenta.IdVenta}
                                        onChange={handleEditChange}
                                        placeholder="Id-Venta"
                                    />
                                    <input className="input"
                                        type='text'
                                        name='TipoDePago'
                                        value={editedVenta.TipoDePago}
                                        onChange={handleEditChange}
                                        placeholder="Efectivo/Tarjeta"
                                    />
                                    <input className="input"
                                        type='text'
                                        name='Fecha'
                                        value={editedVenta.Fecha}
                                        onChange={handleEditChange}
                                        placeholder="DD/MM/AAAA"
                                    /> 
                                    <input className="input"
                                        type='text'
                                        name='Hora'
                                        value={editedVenta.Hora}
                                        onChange={handleEditChange}
                                        placeholder="24:00"
                                    />
                                    <ul className="dropdown-list-input">
                                        {editedVenta.Productos.map((producto, index) => (
                                            <li key={index}>
                                                <input className="input-list"
                                                    type='text'
                                                    name='IdProducto'
                                                    value={producto.IdProducto}
                                                    onChange={(e) => handleEditChange(e, index, 'IdProducto')}
                                                    placeholder="P-CDP-0000"
                                                />
                                                <ul className="dropdown-list-input">
                                                    <input className="input-list"
                                                        type='text'
                                                        name='Nombre'
                                                        value={producto.Nombre}
                                                        onChange={(e) => handleEditChange(e, index, 'Nombre')}
                                                        placeholder="Jabon de baño"
                                                    />
                                                    <input className="input-list"
                                                        type='text'
                                                        name='Cantidad'
                                                        value={producto.Cantidad}
                                                        onChange={(e) => handleEditChange(e, index, 'Cantidad')}
                                                        placeholder="24"
                                                    />
                                                    <input className="input-list"
                                                        type='number'
                                                        name='PrecioUnitario'
                                                        value={producto.PrecioUnitario}
                                                        onChange={(e) => handleEditChange(e, index, 'PrecioUnitario')}
                                                        placeholder="240"
                                                    />
                                                </ul>
                                                <button
                                                    className="button-delete"
                                                    onClick={() => deleteProducto(index)}
                                                >
                                                    Eliminar Producto
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="button-add" onClick={addProducto}>
                                            Agregar Producto
                                        </button>
                                    <input className="input"
                                        type='number'
                                        name='MontoTotal'
                                        value={editedVenta.MontoTotal}
                                        onChange={handleEditChange}
                                        placeholder="100"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '15px' , justifyContent: 'center', alignItems: 'center'}}>
                                    <button className="button-close" onClick={handleCancelEdit}>Cancelar</button>
                                    <button className="button-add" onClick={handleSaveEdit}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    )}    
                </div>
            </div>
        </App>
    );
}