import React, { useState } from 'react';
import baño1 from '../../assets/baño1.jpg';
import PetDetailsModal from '../PetDetailsModal/PetDetailsModal';


export const ContainerPets = ({ namePet, documento, tipo, raza }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex justify-center'>
        
      <div className='h-48 w-4/5 flex items-center bg-FondoPet justify-between rounded-3xl my-8'>
        <div className='w-[30rem] flex justify-evenly '>
          <img className='w-40 h-40 rounded-full object-cover' src={baño1} alt="" />

          <div className='flex flex-col justify-evenly'>
            <h3>{namePet}</h3>
            <p>Documento: {documento}</p>
            <p>Tipo: {tipo}</p>
            <p>Raza: {raza}</p>
          </div>
        </div>
        <button type="button" className='bg-blue-border px-11 py-3 rounded-md me-12 hover:bg-teal-300' onClick={handleModalToggle}>
          Ver más
        </button>
      </div>
      {isOpen && (
        <PetDetailsModal
          namePet={namePet}
          documento={documento}
          tipo={tipo}
          raza={raza}
          onClose={handleModalToggle}
        />
      )}
    </div>
  );
};

