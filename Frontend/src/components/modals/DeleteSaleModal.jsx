import { ModalContainer,Modal,ModalContent } from "../styled/Modals";
import { Titulo } from "../styled/Texts";
import { ContentButton,ButtonClose,ButtonDelete } from "../styled/Buttons";

export default function DeleteSaleModal ({ VentaId,OpenModalDelete,toggleModalDelete,handleDeleteVenta }){
    
    if (!OpenModalDelete || !VentaId) return null;

    return(
        <ModalContainer>
            {OpenModalDelete && (
                <Modal>
                    <ModalContent>
                        <Titulo>¿Esta seguro?</Titulo>
                        <p>Eliminaras la venta {VentaId}</p>
                        <ContentButton>
                            <ButtonClose onClick={toggleModalDelete}>Cerrar</ButtonClose>
                            <ButtonDelete onClick={() => handleDeleteVenta(VentaId)}>Eliminar</ButtonDelete>
                        </ContentButton>
                    </ModalContent>
                </Modal>
            )}
        </ModalContainer>
    );
};