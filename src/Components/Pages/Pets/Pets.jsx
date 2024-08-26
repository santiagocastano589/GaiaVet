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
  }, [authToken]);

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
      <Header title="Buscar mascota" />
      <div className="">
        <div className="flex justify-center pt-48">
          <div className="flex flex-row items-center w-[60rem]">
            <input
              type="text"
              placeholder="Busca tu mascota de manera rapida"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="w-full flex justify-center my-10">
          <div className="w-[80%] h-[100vh] p-6 mb-[10rem]">
            <div className='overflow-y-auto max-h-[100vh] '>

            <table className="w-full bg-white border-4">
              <thead>
                <tr className="w-full bg-teal-500 text-gray-800 uppercase text-sm pb-10">
                  <th className="py-3 px-6 text-center">Imagen</th>
                  <th className="py-3 px-6 text-center">Documento</th>
                  <th className="py-3 px-6 text-center">Nombre</th>
                  <th className="py-3 px-6 text-center">Tipo</th>
                  <th className="py-3 px-6 text-center">Edad</th>
                  <th className="py-3 px-6 text-center">Raza</th>
                  <th className="py-3 px-6 text-center">Ver mas</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {filteredPetList.map((pet) => (
                  <tr key={pet.idMascota} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-1 px-2 text-center text-lg flex items-center justify-center">
                      <img src={pet.foto} alt={pet.nombre} className='w-[15rem] h-[10rem] object-contain'/>
                    </td>
                    <td className="py-1 px-2 text-center text-lg">{pet.idMascota}</td>
                    <td className="py-1 px-2 text-center text-lg">{pet.nombre}</td>
                    <td className="py-1 px-2 text-center text-lg">{pet.TipoMascota}</td>
                    <td className="py-1 px-2 text-center text-lg">{pet.edad}</td>
                    <td className="py-1 px-2 text-center text-lg">{pet.raza}</td>
                    <td className="py-1 px-2 text-center ">
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