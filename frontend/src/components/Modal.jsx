import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modal() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Titulo del Modal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Cuerpo del Modal</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cerrar</Button>
          <Button variant="primary">Guardar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Modal;