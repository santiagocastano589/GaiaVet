import React, { useEffect, useState, useContext } from 'react';
import EditedModal from '../EditeModal/EditeModal';
import InputPetNoEditable from '../InputPetNoEditable/InputPetNoEditable';
import { AuthContext } from '../Context/Context';

const PetDetailsModal = ({edad,peso, namePet, documento, tipo, raza, foto, onClose }) => {
  const [editedDocumento, setEditedDocumento] = useState(documento);
  const [editedTipo, setEditedTipo] = useState(tipo);
  const [editedRaza, setEditedRaza] = useState(raza);
  const [editedName, setEditedName] = useState(namePet);
  const [editedPeso, setEditedPeso] = useState(peso);
  const [editedEdad, setEditedEdad] = useState(edad);
  const [editedFoto, setEditedFoto] = useState(foto);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
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
  const [petList, setPetList] = useState([]);
  const { authToken } = useContext(AuthContext);
  const accesRole = localStorage.getItem('role')

  console.log(accesRole);
  
  

  useEffect(() => {

    const fetchPets = async () => {
      if (!authToken) return;

      if (accesRole == 'user') {

        try {
          const response = await fetch('https://gaiavet-back.onrender.com/DeletePet', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });
  
          const data = await response.json();
  
          if (Array.isArray(data)) {
            setPetList(data);
            console.log(petList);
            
          } else {
            console.error('La respuesta no es un array:', data);
          }
        } catch (error) {
          console.log('Error al traer la mascotas:', error);
        }
      
      }
      
    };

    fetchPets();
  }, [authToken]);

  const handleDeleteClick = () => {
    alert('hola')
    
  };
  return (
    <div className="w-full fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
      
      <div className="w-[65rem] h-[32rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-fondo  rounded-lg shadow-sm">

      <div className='flex justify-between w-full'>
        
        <div className=" p-10 text-white flex flex-col justify-center items-center ">

          <InputPetNoEditable htmlFor="nombre" nameLabel="Nombre:" id="nombre" value={editedName} onChange={handleNameChange}/>

          <InputPetNoEditable htmlFor="documento" nameLabel="Documento:" id="documento" value={editedDocumento} onChange={handleDocumentoChange}/>

          <InputPetNoEditable htmlFor="tipo" nameLabel="Tipo:" id="tipo" value={editedTipo} onChange={handleTipoChange}/>
            
          <InputPetNoEditable htmlFor="raza" nameLabel="Raza:" id="raza" value={editedRaza} onChange={handleRazaChange}/>

          <InputPetNoEditable htmlFor="edad" nameLabel="Edad (Meses):" id="edad" value={editedEdad}/>

          <InputPetNoEditable htmlFor="peso" nameLabel="Peso (Kg):" id="peso" value={editedPeso+' Kg'}/>

          <div className=' w-full   mt-14 text-black flex justify-end '>
            <button className='w-36 bg-gray-200 mx-3 p-2 rounded-md hover:bg-gray-400 hover:text-white'>Historial Medico</button>
            <button onClick={handleModal} className='w-36 bg-gray-200 mx-3 p-2 rounded-md hover:bg-gray-400 hover:text-white'>Editar</button>
            <button onClick={handleDeleteClick} className='w-36 bg-gray-200 mx-3 p-2 text-red-500 rounded-md hover:bg-red-600 hover:text-white'>Eliminar</button>
          </div>

        </div>
          
        <div className="h-[32rem] w-80 bg-fondoTarjeta rounded-lg">
          
          <button type="button" className="float-end text-white p-3" onClick={onClose}>
            <span className="sr-only">Cerrar</span>   
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className='flex flex-col items-center mt-24'>
            
            <img className='w-60 h-60 rounded-full object-cover' src={editedFoto} alt="" />

            <h5 className="text-3xl font-bold mt-6 text-white">{namePet} </h5> 
          </div>

        </div>
      </div>
    </div>
    {isOpen && (
        <EditedModal
          namePet={namePet}
          documento={documento}
          tipo={tipo}
          raza={raza}
          edad={edad}
          peso={peso}
          foto={foto}
          onClose={() => handleModal()}        />
      )}
    </div>
  );
};

export default PetDetailsModal;
