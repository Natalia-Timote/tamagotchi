import Button from "../Button";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) {
        return (
            null
        )
    } else {
        return (
            <div className="modal-container" onClick={onClose}>
                <div className="modal-content" onClick={event => event.stopPropagation()}>
                    {children}
                    <Button control={onClose}>Continuar</Button>
                </div>
            </div>
        )
    }
}