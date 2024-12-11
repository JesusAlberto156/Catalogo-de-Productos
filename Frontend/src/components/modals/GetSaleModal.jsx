import { ContentButton,ButtonClose } from '../styled/Buttons'
import { ModalContainer,Modal,ModalContent } from '../styled/Modals'
import { DropdownList,Li } from '../styled/Lists'
import { Titulo } from '../styled/Texts';

export default function GetSaleModal ({ Venta, OpenModalGet, toggleModalGet }){

    if (!OpenModalGet || !Venta) return null;

    return(
        <ModalContainer>
            {OpenModalGet && (
            <Modal>
                <ModalContent>
                    <Titulo>{Venta.IdVenta}</Titulo> 
                    <DropdownList>
                        <Li>Tipo de pago: {Venta.TipoDePago}</Li>
                        <Li>Fecha: {Venta.Fecha}</Li>
                        <Li>Hora: {Venta.Hora}</Li>
                        <Li>Productos:</Li>
                        <DropdownList>
                            {Venta.Productos.map((producto, index) => (
                                <Li key={index}>
                                    Id producto: {producto.IdProducto}
                                    <DropdownList>
                                        <Li>Nombre: {producto.Nombre}</Li>
                                        <Li>Cantidad: {producto.Cantidad}</Li>
                                        <Li>Precio unitario: {producto.PrecioUnitario}</Li>
                                    </DropdownList>
                                </Li>
                            ))}
                        </DropdownList> 
                        <Li>Monto total: {Venta.MontoTotal}</Li>
                    </DropdownList>
                    <ContentButton>
                        <ButtonClose onClick={toggleModalGet}>Cerrar</ButtonClose>
                    </ContentButton>
                </ModalContent>
            </Modal>
            )}
        </ModalContainer>
    );
};