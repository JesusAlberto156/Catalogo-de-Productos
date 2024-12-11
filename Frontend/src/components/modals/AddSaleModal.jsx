import { useState } from "react";

import { ModalContainer,Modal,ModalContent } from "../styled/Modals";
import { Form,Input,InputList,InputGroup,Label } from "../styled/Forms";
import { DropdownListInput,LiInput } from "../styled/Lists";
import { Titulo } from "../styled/Texts";
import { ContentButton,ButtonClose,ButtonAdd,ButtonDelete } from "../styled/Buttons";

export default function AddSaleModal ({ OpenModalAdd,addVenta,toggleModalAdd }){
    
    const [venta,setVenta] = useState({
        IdVenta: '',
        TipoDePago: '',
        Fecha: '',
        Hora: '',
        Productos: [
            {
                IdProducto: '',
                Nombre: '',
                Cantidad: '',
                PrecioUnitario: 0
            }
        ],
        MontoTotal: 0
    });

    const deleteProducto = (index) => {
        const updatedProductos = [...venta.Productos];
        updatedProductos.splice(index, 1);
        setVenta({
            ...venta,
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
        setVenta({
            ...venta,
            Productos: [...venta.Productos, newProducto],
        });
    };
    
    const handleChange = (e, index = null, field = null) => {
        const { name, value } = e.target;
    
        if (index !== null && field) {
            const updatedProductos = [...venta.Productos];
            updatedProductos[index][field] = value;
            setVenta({
                ...venta,
                Productos: updatedProductos,
            });
        } else {
            setVenta({
                ...venta,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(venta.IdVenta && venta.TipoDePago && venta.Fecha && venta.Hora && venta.Productos && venta.MontoTotal){
            addVenta(venta);
            setVenta({
                IdVenta: '',
                TipoDePago: '',
                Fecha: '',
                Hora: '',
                Productos: [
                    {
                        IdProducto: '',
                        Nombre: '',
                        Cantidad: '',
                        PrecioUnitario: 0
                    }
                ],
                MontoTotal: 0
            });
        }
    }

    if (!OpenModalAdd) return null;

    return(
        <ModalContainer>
            {OpenModalAdd && (
                <Modal>
                    <ModalContent>
                        <Titulo>Agregar venta</Titulo>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Label>ID Venta</Label>
                                <Input
                                    type="text"
                                    name="IdVenta"
                                    value={venta.IdVenta}
                                    onChange={handleChange}
                                    placeholder="Ingresar el ID de la venta"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Label>Tipo de pago</Label>
                                <Input
                                    type="text"
                                    name="TipoDePago"
                                    value={venta.TipoDePago}
                                    onChange={handleChange}
                                    placeholder="Ingresar el tipo de pago (Efectivo/Tarjeta)"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Label>Fecha</Label>
                                <Input
                                    type="text"
                                    name="Fecha"
                                    value={venta.Fecha}
                                    onChange={handleChange}
                                    placeholder="Ingresar la fecha (DD/MM/AAAA)"
                                />
                            </InputGroup>
                            <InputGroup>
                                <Label>Hora</Label>
                                <Input
                                    type="text"
                                    name="Hora"
                                    value={venta.Hora}
                                    onChange={handleChange}
                                    placeholder="Ingresar la hora (24:00)"
                                />
                            </InputGroup>
                            <DropdownListInput>
                                {venta.Productos.map((producto, index) => (
                                    <LiInput key={index}>
                                        <InputList
                                            type='text'
                                            name='IdProducto'
                                            value={producto.IdProducto}
                                            onChange={(e) => handleChange(e, index, 'IdProducto')}
                                            placeholder="Ingresar el ID del producto"
                                        />
                                        <DropdownListInput>
                                            <InputList
                                                type='text'
                                                name='Nombre'
                                                value={producto.Nombre}
                                                onChange={(e) => handleChange(e, index, 'Nombre')}
                                                placeholder="Ingresar el nombre del producto"
                                            />
                                            <InputList
                                                type='text'
                                                name='Cantidad'
                                                value={producto.Cantidad}
                                                onChange={(e) => handleChange(e, index, 'Cantidad')}
                                                placeholder="Ingresar la cantidad del producto"
                                            />
                                            <InputList
                                                type='number'
                                                name='PrecioUnitario'
                                                value={producto.PrecioUnitario}
                                                onChange={(e) => handleChange(e, index, 'PrecioUnitario')}
                                                placeholder="Ingresar el precio unitario del producto"
                                            />
                                        </DropdownListInput>
                                        <ButtonDelete onClick={() => deleteProducto(index)}>Eliminar Producto</ButtonDelete>
                                    </LiInput>
                                ))}
                            </DropdownListInput> 
                            <ButtonAdd onClick={addProducto}>Agregar Producto</ButtonAdd>               
                            <InputGroup>
                                <Label>Monto total</Label>
                                <Input
                                    type="text"
                                    name="MontoTotal"
                                    value={venta.MontoTotal}
                                    onChange={handleChange}
                                    placeholder="Ingresar el monto total de la venta"
                                />
                            </InputGroup>
                        </Form>
                        <ContentButton>
                            <ButtonClose onClick={toggleModalAdd}>Cancelar</ButtonClose>
                            <ButtonAdd onClick={() => addVenta(venta)}>Guardar</ButtonAdd>
                        </ContentButton>
                    </ModalContent>
                </Modal>
            )}
        </ModalContainer>
    );
};