import React from 'react';

const PetDetailsModal = ({ namePet, documento, tipo, raza, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-4 pb-5 bg-white rounded-md shadow-sm">
        <div className="flex justify-between items-center pb-3 border-bottom border-gray-200">
          <h5 className="text-xl font-bold text-gray-900">{namePet} Detalles</h5>
          <button type="button" className="bg-gray-500 hover:bg-gray-700 text-gray-white rounded-md p-2" onClick={onClose}>
            <span className="sr-only">Cerrar</span>
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {/* Muestra los detalles de la mascota aquí */}
          <p>Documento: {documento}</p>
          <p>Tipo: {tipo}</p>
          <p>Raza: {raza}</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;
