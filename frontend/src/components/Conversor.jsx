import React, { useState } from 'react'
import Axios from "axios";
import "../css/Conversor.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Conversor = () => {

  const [show, setShow] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultado, setResultado] = useState(""); // Estado para almacenar la respuesta del servidor
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [descargar, setDescargar] = useState(false)

  const [valor, setValor] = useState({
    valor1: "",
    cantidad: "",
    valor2: ""
  })

  const PasarMayuscula = (evento) => {
    let {name, value} = evento.target;
    setValor({...valor, [name]: value.toUpperCase()})
  }

  const Envio = (evento) => {
    evento.preventDefault();

    if(typeof valor.valor1 == "string" && valor.cantidad != "" && typeof valor.valor2 == "string") {

      Axios.get(`https://conversormonedasoracle.onrender.com/enviar?valor1=${valor.valor1}&cantidad=${valor.cantidad}&valor2=${valor.valor2}`)
            .then((response) => {
              const resultado = response.data
              setResultado(resultado)
              handleShowResultModal(); // Mostrar el modal de resultado
            })
            .catch(error => {
              console.log("Ocurrió un error en el servidor. Error: ", error)
              setShowErrorModal(true); // Mostrar el modal de error si hay un error
            })
    } else {
      setShowErrorModal(true); // Mostrar el modal de error si hay un error
    }
    setValor({    
      valor1: "",
      cantidad: "",
      valor2: ""})
  }

  const handleShowResultModal = () => {
    setShowResultModal(true);
  };

  const ConfirmarDescarga = () => {
    if(window.confirm("¿Decargar historial de las conversiones echas?")) {
      window.location.href = 'https://conversormonedasoracle.onrender.com/descargar' // Si el usuario confirma, realizar la descarga
    } 
  }


  return (
    <div className='h-[80%] flex justify-center items-center'>
      <div className='h-[70%] w-[90%] sm:w-[70%] sm:h-[70%] md:w-[65%] md:h-[70%] lg:w-[60%] lg:h-[70%] xl:w-[30%] xl:h-[70%] flex justify-center items-center bg-red-500 bg-opacity-20 rounded-lg shadow-sombra h'>
        <form action="" onSubmit={Envio} className='w-[90%]' method='GET'>
          <div className='campo my-6 xl:my-7'>
            <input 
              type="text" 
              name='valor1'
              value={valor.valor1}
              onChange={PasarMayuscula}
              placeholder='Ingrese el tipo de moneda' 
              className='p-3 text-md sm:text-lg md:text-lg md:p-3 xl:p-4 w-full xl:text-xl' 
              maxLength={3} 
              required
            />
          </div>
          <div className='campo my-6 xl:my-7'>
            <input 
              type="number" 
              name='cantidad'
              value={valor.cantidad}
              onChange={PasarMayuscula}
              placeholder='Ingrese la cantidad' 
              className='p-3 text-md sm:text-lg md:text-lg md:p-3 xl:p-4 w-full xl:text-xl' 
              required
            />
          </div>
          <div className='campo my-6 xl:my-7'>
            <input 
              type="text" 
              name='valor2'
              value={valor.valor2}
              onChange={PasarMayuscula}
              placeholder='Ingrese el tipo de cambio' 
              className='p-3 text-md sm:text-lg md:text-lg md:p-3 xl:p-4 w-full xl:text-xl' 
              maxLength={3} required
            />
          </div>
          <a 
            className='text-zinc-50 block text-center sm:text-xl sm:mt-6 md:mt-6 md:text-xl xl:text-2xl xl:mb-6 hover:text-red-500 font-bold underline hover:cursor-pointer'
            onClick={ConfirmarDescarga}
            download={"Historial.txt"}>
              Descargar historial
          </a>
          <Button 
            type='submit'
            onClick={handleShow}
            className='bg-gray-100 text-zinc-900 w-20 p-0.5 mt-8 mx-auto block border rounded-sm sm:mt-6 sm:text-xl md:mt-6 md:text-xl xl:text-xl xl:w-28 xl:p-1 xl:mt-10 font-bold hover:cursor-pointer hover:bg-violet-500 shadow-sombra'>
              Enviar
          </Button>
        </form>
      </div>
      
      {/* Modal que va a manejar Errores */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error de Validación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, asegúrate de ingresar los datos correctamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal que va a manejar un resultado exitoso */}
      <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultado}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowResultModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Conversor;
