import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const PetUserModal = ({ onClose }) => {
  const { authToken } = useContext(AuthContext);
  const [pets, setPets] = useState([]); 

  const accesRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchPets = async () => {
      if (!authToken || !cedula) return;

      const url = accesRole === 'administrador' 
        ? 'https://gaiavet-back.onrender.com/Pets'
        : 'https://gaiavet-back.onrender.com/Pet';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPets(data); 
          
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer las mascotas del usuario:', error);
      }
    };

    fetchPets();
  }, [authToken, cedula]);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] h-[30rem]">
        <h2 className="text-2xl font-bold mb-4">Mascotas del Usuario</h2>
        <ul>
          {pets && pets.length > 0 ? (
            pets.map((pet, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{pet.nombre}</span> - {pet.TipoMascota} - {pet.edad} meses
              </li>
            ))
          ) : (
            <li>No hay mascotas registradas.</li>
          )}
        </ul>
        <button className="mt-6 bg-teal-600 text-white py-2 px-4 rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PetUserModal;
