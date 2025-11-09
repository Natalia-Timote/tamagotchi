import Button from "../Button";
import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
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