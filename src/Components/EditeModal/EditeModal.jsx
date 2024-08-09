import React, { useState } from 'react';
import baño1 from '../../assets/baño1.jpg';
import InputPetEditable from '../InputPetEditable/InputPetEditable';

const EditedModal = ({edad,peso, namePet, documento, tipo, raza, onClose }) => {
    const [editedDocumento, setEditedDocumento] = useState(documento);
    const [editedTipo, setEditedTipo] = useState(tipo);
    const [editedRaza, setEditedRaza] = useState(raza);
    const [editedName, setEditedName] = useState(namePet);
    const [editedPeso, setEditedPeso] = useState(peso);
    const [editedEdad, setEditedEdad] = useState(edad);

    const handleDocumentoChange = (event) => {
        setEditedDocumento(event.target.value);
    };

    const handleTipoChange = (event) => {
        setEditedTipo(event.target.value);
    };

    const handleRazaChange = (event) => {
        setEditedRaza(event.target.value);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };
  return (
    <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
      
      <div className="w-[65rem] h-[32rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-fondo  rounded-lg shadow-sm">

      <div className='flex justify-between w-full'>
        
        <div className=" p-10 text-white flex flex-col justify-center items-center ">

          <InputPetEditable htmlFor="nombre" nameLabel="Nombre:" id="nombre" value={editedName} onChange={handleNameChange}/>

          <InputPetEditable htmlFor="documento" nameLabel="Documento:" id="documento" value={editedDocumento} onChange={handleDocumentoChange}/>

          <InputPetEditable htmlFor="tipo" nameLabel="Tipo:" id="tipo" value={editedTipo} onChange={handleTipoChange}/>
            
          <InputPetEditable htmlFor="raza" nameLabel="Raza:" id="raza" value={editedRaza} onChange={handleRazaChange}/>

          <InputPetEditable htmlFor="edad" nameLabel="Edad:" id="edad" value={editedEdad}/>

          <InputPetEditable htmlFor="peso" nameLabel="Peso (Kg):" id="peso" value={editedPeso+' Kg'}/>

          <div className=' w-full   mt-14 text-black flex justify-end '>
            <button onClick={onClose} className='w-36 bg-gray-200 mx-3 p-2 rounded-md hover:bg-gray-400 hover:text-white'>Cancelar</button>
            <button className='w-36 bg-fondoTarjeta text-white mx-3 p-2 rounded-md hover:bg-teal-900 '>Guardar cambios</button>
            
          </div>

        </div>
          
        <div className="h-[32rem] w-80 bg-fondoTarjeta rounded-lg">
          <div className='flex flex-col items-center mt-24'>
                       
            <img className='w-60 h-60 rounded-full object-cover' src={baño1} alt="" />
            <h5 className="text-3xl font-bold mt-6 text-white">{namePet} </h5> 

          </div>

        </div>
      </div>
    </div>
    
    </div>
  );
};

export default EditedModal;
