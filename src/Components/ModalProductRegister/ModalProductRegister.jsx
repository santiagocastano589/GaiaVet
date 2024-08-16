import React, { useState } from 'react';
import gato from '../../assets/comidaGato.png';
import InputProducts from '../InputProducts/InputProducts';

const ModalProductRegister = ({onClose }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="w-full fixed z-50 inset-0 overflow-y-auto bg-slate-50 border bg-opacity-75 transition-all ease-in-out duration-300">
      
      <div className="w-[70rem] h-[30rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-fondo  rounded-lg shadow-sm">

      <div className='w-full h-[30rem] flex justify-between items-center rounded-xl bg-slate-400'>
        
        <div className="w-[80%] h-[30rem] p-4 text-white flex flex-col items-center justify-evenly">
        <h3 className='gorditas text-black text-xl'>Registro de productos</h3>

          <InputProducts nameLabel={'Imagen del producto:'}/>
          <InputProducts nameLabel={'Nombre del producto:'}/>
          <InputProducts nameLabel={'Descripcion del producto:'}/>
          <InputProducts nameLabel={'Imagen del producto:'}/>
          <InputProducts nameLabel={'Categoria del producto:'}/>
          <InputProducts nameLabel={'Precio del producto:'}/>
          <InputProducts nameLabel={'Stock del producto:'}/>


          <div className='w-[90%] text-black flex justify-end'>
            <button className='w-36 bg-teal-500 mt-2 p-2 text-white rounded-md hover:bg-teal-400 hover:text-white'>Registrar</button>
          </div>

        </div>
          
        <div className="h-[30rem] w-[35%] bg-fondoTarjeta rounded-lg">
          
          <button type="button" className="float-end text-white p-3" onClick={onClose}>
            <span className="sr-only">Cerrar</span>   
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className=' flex flex-col items-center mt-24'>
            
            <img className='w-80 h-80 rounded-xl object-cover' src={gato} alt="" />
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ModalProductRegister;
