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
      <Header title="Lista de mascotas" classN='text-7xl sm:text-[2.8rem] sm:w-[50%] md:text-5xl lg:text-[3.3rem] lg:w-[50%] xl:text-[4rem] 2xl:text-7xl'/>
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-[60rem] sm:justify-center">
            <input
              type="text"
              placeholder="Busca tu mascota de manera rápida"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400 sm:w-[30rem] md:w-[35rem] lg:w-[45rem] xl:w-[50rem]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[100vh] p-6 mb-[10rem] sm:w-[100%] sm:py-2 sm:mb-[5rem] lg:w-[90%] xl:w-[90%]">
            <div className='overflow-y-auto max-h-[100vh] relative overflow-x-auto shadow-xl sm:rounded-lg font-itim'>
              <table className="w-full text-xl text-left rtl:text-right text-gray-300 dark:text-gray-400">
                <thead className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-400'>
                  <tr className="w-full bg-teal-500 text-gray-800 uppercase text-base pb-10 sm:text-xs lg:text-base xl:text-lg">
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Imagen</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Documento</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Nombre</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Tipo</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Edad</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Raza</th>
                    <th scope="col" className="py-3 px-6 text-center sm:py-2 sm:px-2">Ver más</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {filteredPetList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-lg text-gray-700 sm:text-base md:text-lg lg:text-xl">
                        {searchTerm
                          ? "No se encontraron mascotas que coincidan con la búsqueda."
                          : "No hay mascotas registradas."}
                      </td>
                    </tr>
                  ) : (
                    filteredPetList.map((pet) => (
                      <tr key={pet.idMascota} className="dark:hover:bg-gray-50 border-gray-200 odd:bg-white odd:dark:bg-gray-100 even:dark:bg-gray-200 border-b ">
                        <td className="py-1 px-2 text-center text-lg flex items-center justify-center ">
                          <img src={pet.foto} alt={pet.nombre} className="w-[15rem] h-[10rem] object-cover rounded-xl sm:h-[8rem] sm:w-[12rem] sm:object-contain md:object-cover lg:w-[14rem] lg:h-[10rem]" />
                        </td>
                        <td className="py-1 px-2 text-center text-lg sm:text-xs md:text-sm lg:text-lg xl:text-xl">{pet.idMascota}</td>
                        <td className="py-1 px-2 text-center text-lg sm:text-xs md:text-sm lg:text-lg xl:text-xl">{pet.nombre}</td>
                        <td className="py-1 px-2 text-center text-lg sm:text-xs md:text-sm lg:text-lg xl:text-xl">{pet.TipoMascota}</td>
                        <td className="py-1 px-2 text-center text-lg sm:text-xs md:text-sm lg:text-lg xl:text-xl">{pet.edad}</td>
                        <td className="py-1 px-2 text-center text-lg sm:text-xs md:text-sm lg:text-lg xl:text-xl">{pet.raza}</td>
                        <td className="py-1 px-2 text-center text-base">
                          <button
                            type="button"
                            className="bg-blue-border px-11 py-3 rounded-md hover:bg-teal-300 text-white sm:w-[5rem] sm:h-[2.5rem] sm:text-xs sm:p-2 md:text-sm lg:w-[6rem] lg:h-[3rem] lg:text-base xl:w-[7rem] xl:h-[3.5rem] xl:text-lg"
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
