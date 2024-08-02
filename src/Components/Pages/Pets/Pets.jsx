import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { ContainerPets } from '../../ContainerPets/ContainerPets';
import { AuthContext } from '../../Context/Context';

export const Pets = () => {
  const [petList, setPetList] = useState([]);

  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('https://gaiavet-back.onrender.com/Pets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        
        // Verificar que la respuesta sea un array
        if (Array.isArray(data)) {
          setPetList(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer las mascotas:', error);
      }
    };

    fetchPets();
  }, [authToken]);

  return (
    <>
      <Header title="Busca tu mascota" />
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
        {Array.isArray(petList) ? (
          petList.map((pet) => (
            <ContainerPets
              key={pet.idMascota}
              namePet={pet.nombre}
              documento={pet.idMascota}
              tipo={pet.edad}
              raza={pet.raza}
            />
          ))
        ) : (
          <p>No se encontraron mascotas</p>
        )}
      </div>
    </>
  );
};
