import React, { useState, useEffect } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { FaLessThan } from "react-icons/fa";

export const Citas2 = () => {
  const [services, setServices] = useState(false);
  const [pets, setPets] = useState(false);
  const [dates, setDates] = useState(false);
  const [userPets, setUserPets] = useState([]); // Estado para guardar las mascotas
  const [selectedService, setSelectedService] = useState(null); // Estado para controlar la selección de servicio
  const [selectedPet, setSelectedPet] = useState(null); // Estado para controlar la selección de mascota

  // Variables para autenticación y rol de usuario
  const authToken = localStorage.getItem('token'); // Asumiendo que el token está guardado en el localStorage
  const accessRole = localStorage.getItem('accessRole'); // Asumiendo que el rol está guardado en el localStorage

  useEffect(() => {
    const fetchPets = async () => {
      if (!authToken) {
        console.error('No se encontró el token de autenticación');
        return;
      }

      const url = accessRole === 'administrador' 
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

        if (!response.ok) {
          console.error('Error en la respuesta del servidor:', response.status, response.statusText);
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setUserPets(data); // Guardar las mascotas en el estado
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al traer las mascotas:', error);
      }
    };

    fetchPets();
  }, [authToken, accessRole]);  // Dependencias actualizadas

  const showServices = () => {
    setServices(!services);
  };

  const showPets = () => {
    if (selectedService) { // Solo permitir mostrar mascotas si se ha seleccionado un servicio
      setPets(!pets);
    }
  };

  const showDates = () => {
    if (selectedPet) { // Solo permitir mostrar fechas si se ha seleccionado una mascota
      setDates(!dates);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service); // Guardar servicio seleccionado
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet); // Guardar mascota seleccionada
  };

  const clearServiceSelection = () => {
    setSelectedService(null);
    setSelectedPet(null); // Limpiar selección de mascota también
    setPets(false); // Ocultar contenedor de mascotas
    setDates(false); // Ocultar contenedor de fechas
  };

  const clearPetSelection = () => {
    setSelectedPet(null);
    setDates(false); // Ocultar contenedor de fechas
  };

  return (
    <>
      <Header title={'Citas'} />

      <div className='pt-48 w-screen h-auto'>
        <div className='w-full flex justify-center'>
          <div className='w-4/5 flex flex-col items-center justify-center'>

            {/* Selección de Servicio */}
            <div className='w-full bg-buttonProducts rounded-lg mb-4 cursor-pointer p-8 hover:bg-opacity-85 duration-200' >
              <div className='flex items-center' onClick={showServices}>
                <FaLessThan className={`text-white text-2xl ${services ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona el servicio</h2>
              </div>
              {services && (
                <div className={`w-full flex justify-center text-white pt-8 font-itim transition-all duration-500 ease-in-out transform ${services ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-[90%] flex justify-evenly flex-wrap'>
                    {selectedService ? (
                      <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center'>
                        <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Baño" />
                        <p className='text-3xl'>{selectedService}</p>
                        <button className='mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700' onClick={(e) => { e.stopPropagation(); clearServiceSelection(); }}>
                          Eliminar selección
                        </button>
                      </div>
                    ) : (
                      <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 ' onClick={() => handleServiceSelect('Baño')}>
                        <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Baño" />
                        <p className='text-3xl'>Baño</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Selección de Mascota */}
            <div className={`w-full bg-buttonProducts rounded-lg mb-4 cursor-pointer p-8 ${selectedService ? '' : 'opacity-50 cursor-not-allowed'}`} >
              <div className='flex items-center' onClick={showPets}>
                <FaLessThan className={`text-white text-2xl ${pets ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona tu mascota</h2>
              </div>
              {pets && (
                <div className={`w-full flex justify-center text-white pt-8 font-itim transition-all duration-500 ease-in-out transform ${pets ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-[90%] flex justify-evenly flex-wrap'>
                    {selectedPet ? (
                      <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center'>
                        <img className='rounded-full bg-white object-cover w-[10vw] h-[10vw]' src={selectedPet.foto} alt={selectedPet.nombre} />
                        <p className='text-3xl'>{selectedPet.nombre}</p>
                        <button className='mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700' onClick={(e) => { e.stopPropagation(); clearPetSelection(); }}>
                          Eliminar selección
                        </button>
                      </div>
                    ) : (
                      userPets.map((pet) => (
                        <div key={pet.id} className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 ' onClick={() => handlePetSelect(pet)}>
                          <img className='rounded-full bg-white object-cover w-[10vw] h-[10vw]' src={pet.foto} alt={pet.nombre} />
                          <p className='text-3xl'>{pet.nombre}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Selección de Fecha y Hora */}
            <div className={`w-full bg-buttonProducts rounded-lg mb-4 cursor-pointer p-8 ${selectedPet ? '' : 'opacity-50 cursor-not-allowed'}`} >
              <div className='flex items-center' onClick={showDates}>
                <FaLessThan className={`text-white text-2xl ${dates ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona fecha y hora</h2>
              </div>
              {dates && (
                <div className={`transition-all duration-500 ease-in-out transform ${dates ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  
                  

                  <p>Hora seleccionada</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
