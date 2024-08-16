import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { AuthContext } from '../../Context/Context';
import PetDetailsModal from '../../PetDetailsModal/PetDetailsModal';

export const Pets = () => {
  const [petList, setPetList] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const { authToken } = useContext(AuthContext);

  const accesRole = localStorage.getItem('role')
  console.log(accesRole);
  
  

  useEffect(() => {

    const fetchPets = async () => {
      if (!authToken) return;

      if (accesRole == 'administrador') {

        try {
          const response = await fetch('https://gaiavet-back.onrender.com/Pets', {
            method: 'GET',
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
          console.log('Error al traer las mascotas:', error);
        }
      }else if (accesRole == 'User') {

        try {
          const response = await fetch('https://gaiavet-back.onrender.com/Pet', {
            method: 'GET',
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
          console.log('Error al traer las mascotas:', error);
        }
      }

      
    };

    fetchPets();
  }, [authToken]);

  const handleModalToggle = (pet) => {
    setSelectedPet(pet);
  };

  return (
    <>
      <Header title="Buscar mascota" />
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-2/4">
            <input
              type="text"
              placeholder="Ingresa tu documento o nombre de tu mascota"
              className="flex-grow rounded-md border border-gray-300 p-2"
            />
            <button
              type="button"
              className="ml-2 bg-blue-border hover:bg-teal-300 hover:text-black text-white font-bold py-2 px-4 rounded-md"
            >
              Buscar
            </button>
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[20rem] p-6 mb-[20rem]">
            <table className="w-full bg-white border-4">
              <thead>
                <tr className="w-full bg-teal-500 text-gray-800 uppercase text-sm pb-10">
                  <th className="py-3 px-6 text-center">Documento</th>
                  <th className="py-3 px-6 text-center">Nombre</th>
                  <th className="py-3 px-6 text-center">Tipo</th>
                  <th className="py-3 px-6 text-center">Edad</th>
                  <th className="py-3 px-6 text-center">Raza</th>
                  <th className="py-3 px-6 text-center">Ver mas</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {petList.map((pet) => (
                  <tr key={pet.idMascota} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-center">{pet.idMascota}</td>
                    <td className="py-3 px-6 text-center">{pet.nombre}</td>
                    <td className="py-3 px-6 text-center">{pet.tipo}</td>
                    <td className="py-3 px-6 text-center">{pet.edad}</td>
                    <td className="py-3 px-6 text-center">{pet.raza}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        type="button"
                        className='bg-blue-border px-11 py-3 rounded-md hover:bg-teal-300 text-white'
                        onClick={() => handleModalToggle(pet)}
                      >
                        Ver más
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedPet && (
          <PetDetailsModal
            namePet={selectedPet.nombre}
            documento={selectedPet.idMascota}
            tipo={selectedPet.tipo}
            raza={selectedPet.raza}
            peso={selectedPet.peso}
            edad={selectedPet.edad}
            foto={selectedPet.foto}
            onClose={() => handleModalToggle(null)}
          />
        )}
      </div>
    </>
  );
};
