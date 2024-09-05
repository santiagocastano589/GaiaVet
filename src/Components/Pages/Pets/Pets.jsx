import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { AuthContext } from '../../Context/Context';
import PetDetailsModal from '../../PetDetailsModal/PetDetailsModal';

export const Pets = () => {
  const [petList, setPetList] = useState([]);
  const [filteredPetList, setFilteredPetList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const { authToken } = useContext(AuthContext);

  const accesRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchPets = async () => {
      if (!authToken) return;

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
          setPetList(data);
          setFilteredPetList(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer las mascotas:', error);
      }
    };

    fetchPets();
  }, [authToken, accesRole]);

  useEffect(() => {
    const results = petList.filter(pet => 
      pet.idMascota.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.edad.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.TipoMascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.raza.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPetList(results);
  }, [searchTerm, petList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalToggle = (pet) => {
    setSelectedPet(pet);
  };


  return (
    <>
      <Header title="Lista de mascotas" classN='text-7xl'/>
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-[60rem]">
            <input
              type="text"
              placeholder="Busca tu mascota de manera rápida"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[100vh] p-6 mb-[10rem]">
            <div className='relative overflow-x-auto shadow-xl sm:rounded-lg font-itim'>
              <table className="w-full text-xl text-left rtl:text-right text-gray-300 dark:text-gray-400">
                <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-400'>
                  <tr className="w-full bg-teal-500 text-gray-800 uppercase text-base pb-10">
                    <th scope="col" className="py-3 px-6 text-center">Imagen</th>
                    <th scope="col" className="py-3 px-6 text-center">Documento</th>
                    <th scope="col" className="py-3 px-6 text-center">Nombre</th>
                    <th scope="col" className="py-3 px-6 text-center">Tipo</th>
                    <th scope="col" className="py-3 px-6 text-center">Edad</th>
                    <th scope="col" className="py-3 px-6 text-center">Raza</th>
                    <th scope="col" className="py-3 px-6 text-center">Ver más</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {filteredPetList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-lg text-gray-700">
                        {searchTerm
                          ? "No se encontraron mascotas que coincidan con la búsqueda."
                          : "No hay mascotas registradas."}
                      </td>
                    </tr>
                  ) : (
                    filteredPetList.map((pet) => (
                      <tr key={pet.idMascota} className="dark:hover:bg-gray-50 border-gray-200 odd:bg-white odd:dark:bg-gray-100 even:dark:bg-gray-200 border-b">
                        <td className="py-1 px-2 text-center text-lg flex items-center justify-center">
                          <img src={pet.foto} alt={pet.nombre} className="w-[15rem] h-[10rem] object-cover rounded-xl" />
                        </td>
                        <td className="py-1 px-2 text-center text-lg">{pet.idMascota}</td>
                        <td className="py-1 px-2 text-center text-lg">{pet.nombre}</td>
                        <td className="py-1 px-2 text-center text-lg">{pet.TipoMascota}</td>
                        <td className="py-1 px-2 text-center text-lg">{pet.edad}</td>
                        <td className="py-1 px-2 text-center text-lg">{pet.raza}</td>
                        <td className="py-1 px-2 text-center text-base">
                          <button
                            type="button"
                            className="bg-blue-border px-11 py-3 rounded-md hover:bg-teal-300 text-white"
                            onClick={() => handleModalToggle(pet)}
                          >
                            Ver más
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedPet && (
          <PetDetailsModal
            namePet={selectedPet.nombre}
            documento={selectedPet.idMascota}
            tipo={selectedPet.TipoMascota}
            raza={selectedPet.raza}
            peso={selectedPet.peso}
            edad={selectedPet.edad}
            foto={selectedPet.foto}
            temperamento={selectedPet.temperamento}
            onClose={() => handleModalToggle(null)}
          />
        )}
      </div>
    </>
  );
};
