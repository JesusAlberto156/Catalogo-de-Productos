import { ModalContainer,Modal,ModalContent } from "../styled/Modals";
import { Form,Input, InputList } from "../styled/Forms";
import { DropdownListInput,LiInput } from "../styled/Lists";
import { ContentButton,ButtonAdd,ButtonDelete,ButtonClose } from "../styled/Buttons";
import { Titulo } from "../styled/Texts";

import { useState } from "react";

export default function EditSaleModal ({ editedVenta,OpenModalEdit,handleEditChange,handleSaveEdit,handleCancelEdit,addProducto,deleteProducto }){

    if (!OpenModalEdit || !editedVenta) return null;

    return(
        <ModalContainer>
            {OpenModalEdit && (
                <Modal>
                    <ModalContent>
                        <Titulo>Editar venta</Titulo>
                        <Form> 
                            <Input
                                type='text'
                                name='IdVenta'
                                value={editedVenta.IdVenta}
                                onChange={handleEditChange}
                                placeholder="Ingresar el ID de la venta"
                            />
                            <Input
                                type='text'
                                name='TipoDePago'
                                value={editedVenta.TipoDePago}
                                onChange={handleEditChange}
                                placeholder="Ingresar el tipo de pago (Efectivo/Tarjeta)"
                            />
                            <Input
                                type='text'
                                name='Fecha'
                                value={editedVenta.Fecha}
                                onChange={handleEditChange}
                                placeholder="Ingresar la fecha (DD/MM/AAAA)"
                            /> 
                            <Input
                                type='text'
                                name='Hora'
                                value={editedVenta.Hora}
                                onChange={handleEditChange}
                                placeholder="Ingresar la hora (24:00)"
                            />
                            <DropdownListInput>
                                {editedVenta.Productos.map((producto, index) => (
                                    <LiInput key={index}>
                                        <InputList
                                            type='text'
                                            name='IdProducto'
                                            value={producto.IdProducto}
                                            onChange={(e) => handleEditChange(e, index, 'IdProducto')}
                                            placeholder="Ingresar el ID del producto"
                                        />
                                        <DropdownListInput>
                                            <InputList
                                                type='text'
                                                name='Nombre'
                                                value={producto.Nombre}
                                                onChange={(e) => handleEditChange(e, index, 'Nombre')}
                                                placeholder="Ingresar el nombre del producto"
                                            />
                                            <InputList
                                                type='text'
                                                name='Cantidad'
                                                value={producto.Cantidad}
                                                onChange={(e) => handleEditChange(e, index, 'Cantidad')}
                                                placeholder="Ingresar la cantidad del producto"
                                            />
                                            <InputList
                                                type='number'
                                                name='PrecioUnitario'
                                                value={producto.PrecioUnitario}
                                                onChange={(e) => handleEditChange(e, index, 'PrecioUnitario')}
                                                placeholder="Ingresar el precio unitario del producto"
                                            />
                                        </DropdownListInput>
                                        <ButtonDelete onClick={() => deleteProducto(index)}>Eliminar Producto</ButtonDelete>
                                    </LiInput>
                                ))}
                            </DropdownListInput>
                            <ButtonAdd onClick={addProducto}>Agregar Producto</ButtonAdd>
                            <Input
                                type='number'
                                name='MontoTotal'
                                value={editedVenta.MontoTotal}
                                onChange={handleEditChange}
                                placeholder="Ingresar el monto total de la venta"
                            />
                        </Form>
                        <ContentButton>
                            <ButtonClose onClick={handleCancelEdit}>Cancelar</ButtonClose>
                            <ButtonAdd onClick={handleSaveEdit}>Guardar</ButtonAdd>
                        </ContentButton>
                    </ModalContent>
                </Modal>
            )}    
        </ModalContainer>
    );
};