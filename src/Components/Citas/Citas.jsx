import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../Layouts/Header/Header';
import calendario from '../../assets/calendario.png';
import baño from '../../assets/aseo-de-mascotas.png';
import consultaGeneral from '../../assets/consulta.png';
import peluqueria from '../../assets/peluqueria.png';
import { CartServices } from '../CartServices/CartServices';
import { AuthContext } from '../Context/Context';

export const Citas = () => {
    const [showMascotasModal, setShowMascotasModal] = useState(false);
    const [showServiciosModal, setShowServiciosModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPet, setSelectedPet] = useState(null); // Estado para la mascota seleccionada
    const [selectedService, setSelectedService] = useState(null); // Estado para el servicioseleccionado
    const [citas, setCitas] = useState([]);
    
    const [editData, setEditData] = useState(null);
    const { authToken } = useContext(AuthContext);
    const accesRole = localStorage.getItem('role');
    
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        const isSunday = selectedDate.getDay() === 0;
        const isPast = selectedDate < today;

        if (isSunday || isPast) {
            alert('No puedes seleccionar domingos o fechas pasadas');
            return;
        }

        setSelectedDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        console.log(accesRole);

        event.preventDefault();
       
    
        const citaData = {
            service: "Peluqueria",
            date: selectedDate,
            tipoMascota: "gato",
            estado:"Pendiente",
            
            };
                console.log(citaData);

                
        try {
            const response = await fetch('https://gaiavet-back.onrender.com/newCita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, 
                },
                body: JSON.stringify(citaData),
            });
    
            if (!response.ok) {
                throw new Error('Error al crear la cita');
            }
    
            const result = await response.json();
            console.log('Cita creada exitosamente:', result);
    
            // Aquí puedes hacer algo después de una creación exitosa, como mostrar un mensaje o redirigir al usuario
        } catch (error) {
            console.error('Error al enviar la cita:', error);
            console.log('Hubo un problema al crear la cita. Inténtalo de nuevo.');
        }
    };
    

    
    const handleMascotasClick = () => {
        setShowMascotasModal(true);
    };

    const handleServiciosClick = () => {
        setShowServiciosModal(true);
    };

    const handleModalClose = () => {
        setShowMascotasModal(false);
        setShowServiciosModal(false);
        setShowEditModal(false);
    };

    const handleEditClick = (cita) => {
        setEditData(cita);
        setShowEditModal(true);
    };
    const citasPendientes = async () => {
        try {
            const response = await fetch('https://gaiavet-back.onrender.com/getCitasPendientes', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
    
            // Asegurarse de que `data` sea un array antes de actualizar el estado
            if (Array.isArray(data)) {
                setCitas(data);
            } else {
                console.error('La respuesta no es un array:', data);
                setCitas([]); // o maneja el error de otra manera
            }
        } catch (error) {
            console.error('Error ', error);
            setCitas([]); // Maneja el error estableciendo un array vacío o un estado de error
        }
    };
    
    useEffect(() => {
        citasPendientes();
    }, [authToken]);
    return (
        <>
            <Header />
            <div className='pt-40 flex justify-center mb-10'>
                <form className='bg-gray-200 w-1/3 p-4 border-solid border-2 border-gray rounded-lg ' onSubmit={handleSubmit}>
                    <div className='flex justify-center '>
                        <button className='w-36 h-10 rounded-2xl text-white bg-blue-border mx-2 hover:bg-teal-400' type="button" onClick={handleMascotasClick}>Tus mascotas</button>
                        <button className='w-36 h-10 rounded-2xl text-white bg-blue-border mx-2 hover:bg-teal-400' type="button" onClick={handleServiciosClick}>Servicios</button>
                    </div>

                    <div className='flex justify-center'>
                        <div className='pt-10 mb-10'>
                            <label className='text-3xl' htmlFor="fecha">Fecha y hora de la cita:</label>
                            <input
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className='p-2 ms-2'
                            />
                        </div>
                    </div>

                    <div className='flex justify-center mt-4'>
                        {selectedPet && (
                            <div className=' w-2/3'>
                                <h2 className='text-xl'>Mascota seleccionada:</h2>

                                <div className='flex flex-col items-center '>
                                    <img src={selectedPet.foto} alt={selectedPet.nombre} className='w-32 h-32 object-cover rounded-xl mt-4' />
                                    <p className='mt-2 text-xl'>{selectedPet.nombre}</p>

                                </div>
                                
                                
                            </div>
                        )}
                    </div>

                    <div className='flex justify-center pt-16'>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400' type="submit">Agendar cita</button>
                    </div>
                </form>
            </div>

            <div>
                <div className='w-1/4 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-20'>
                    <h1 className='text-xl text-white'>Citas pendientes</h1>
                </div>

                <div className=' p-3 flex flex-wrap justify-evenly'>

                    {citas.map((cita) => (
                        <div key={cita.id} className='bg-teal-100 w-1/3 flex flex-col items-center m-4 p-3 rounded-xl'>
                            <h1 className='text-lg'>{`Cita de ${cita.nombre}`}</h1>
                            <p>{new Date(cita.fecha)}</p>
                            <p>{`Servicio: ${cita.servicio}`}</p>
                            <div className='mt-3'>
                                <button className='mx-4 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>Cancelar</button>
                                <button className='mx-4 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400' onClick={() => handleEditClick(cita)}>Editar</button>
                            </div>
                            
                        </div>
                    ))}
                        
                </div>
            </div>
            <ModalMascotas show={showMascotasModal} onClose={handleModalClose} onSelectPet={setSelectedPet} />
            <ModalServicios show={showServiciosModal} onClose={handleModalClose} onSelectService={setSelectedService} />
            <ModalEditarCita show={showEditModal} onClose={handleModalClose} cita={editData} />
        </>
    );
};

// Modal de selección de mascotas
const ModalMascotas = ({ show, onClose, onSelectPet }) => {
    if (!show) {
        return null;
    }
    const [petList, setPetList] = useState([]);
    const { authToken } = useContext(AuthContext);

    const accesRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchPets = async () => {
            if (!authToken) return;

            try {
                const endpoint = accesRole === 'user' ? 'https://gaiavet-back.onrender.com/Pets' : 'https://gaiavet-back.onrender.com/Pet';
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                const data = await response.json();

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

    const handleSelectPet = (pet) => {
        onSelectPet(pet);
        onClose(); 
    };

    return (
        <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
            <div className="w-[65rem]  relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm bg-fondo p-3 ">
                <button className='rounded-full w-6 text-2xl float-end' onClick={onClose}>x</button>
                <h1 className='gorditas text-4xl text-center py-4'>Elige tu mascota</h1>

                <div className='flex h-96 flex-col items-center overflow-auto'>
                    <div className='flex flex-wrap justify-evenly py-10 '>

                        {petList.map((pet) => (
                            <div key={pet.idMascota} className='bg-blue-border border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center my-4'>
                                <img className='w-32 h-32 object-cover rounded-full' src={pet.foto} alt="" />
                                <p className='text-white text-2xl font-semibold'>{pet.nombre}</p>
                                <button className='bg-white w-3/5 h-8 rounded-2xl font-semibold hover:bg-gray-300' onClick={() => handleSelectPet(pet)}>Seleccionar</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
//modal sevicios
const ModalServicios = ({ show, onClose,onSelectService }) => {
    if (!show) {
        return null;
    }
const handleService =(service)=>{
    onSelectService(service);    
    onClose();
}
    return (
        <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
          
            <div className="w-[65rem]  relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm bg-fondo p-3 ">
            <button className='px-3 float-end text-2xl' onClick={onClose}>x</button>
            <h1 className='gorditas text-4xl text-center py-4'>Elige el servicio</h1>

            <div className='flex h-96 flex-col items-center overflow-auto '>
              <div className='flex flex-wrap w-2/4 justify-between py-10'>
                <button onClick={() => handleService('peliqueria')}>Peluqueria</button>
                    <CartServices image={peluqueria} service={'Peluqueria'} alt={'Peluqueria'} onClick={() => handleService('Peluqueria')}/>
                    <CartServices image={baño} service={'Baño'} alt={'Baño'}/>
                    <CartServices image={calendario} service={'Guarderia'} alt={'Guarderia'}/>
                    <CartServices image={consultaGeneral} service={'Consulta General'} alt={'Consulta General'}/>        
        
              </div>
              </div>               
            </div>
        </div>
    );
};
//modal editar cita
const ModalEditarCita = ({ show, onClose, cita }) => {
    const [date, setDate] = useState(cita?.fecha || '');
    const [service, setService] = useState(cita?.servicio || '');

    if (!show) return null;

    const handleSave = () => {
        // Aquí puedes manejar la lógica de guardar los cambios
        alert(`Cita actualizada: ${date} - ${service}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-10 flex items-center justify-center">
            <div className="bg-white h-[30rem] w-[50rem] p-6 rounded-lg shadow-lg overflow-auto ">
                <h2 className="text-2xl font-bold mb-4">Editar Cita</h2>

                <label className="block mb-2 text-xl">Fecha y hora:</label>
                <input 
                    type="datetime-local" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="mb-4 p-2 border w-full rounded"
                />

                <label className="block mb-2 text-xl">Servicio:</label>
                <div className='flex h-96 flex-col items-center '>
              <div className='flex flex-wrap w-2/3 justify-between py-10'>
                
                    <CartServices image={peluqueria} service={'Peluqueria'} alt={'Peluqueria'} />
                    <CartServices image={baño} service={'Baño'} alt={'Baño'}/>
                    <CartServices image={calendario} service={'Guarderia'} alt={'Guarderia'}/>
                    <CartServices image={consultaGeneral} service={'Consulta General'} alt={'Consulta General'}/>        
        
              </div>
              </div>

                <div className="flex justify-end pt-56">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancelar</button>
                    <button className="px-4 py-2 bg-blue-border text-white rounded hover:bg-teal-400" onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
};
