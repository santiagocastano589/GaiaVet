import React, { useState } from 'react';
import { Header } from '../Layouts/Header/Header';
import calendario from '../../assets/calendario.png'
import baño from '../../assets/aseo-de-mascotas.png'
import consultaGeneral from '../../assets/consulta.png'
import peluqueria from '../../assets/peluqueria.png'
import baño1 from '../../assets/baño1.jpg';
import { CartServices } from '../CartServices/CartServices';

export const Citas = () => {

    const [showMascotasModal, setShowMascotasModal] = useState(false);
    const [showServiciosModal, setShowServiciosModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [editData, setEditData] = useState(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
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

    return (
        <>
            <Header />
            <div className='pt-40 flex justify-center mb-10'>
                <form className='bg-gray-200 w-2/4 p-4 border-solid border-2 border-gray rounded-lg ' onSubmit={handleSubmit}>
                    <div className='flex justify-center '>
                        <button className='w-36 h-10 rounded-2xl text-white bg-blue-border mx-2 hover:bg-teal-400' onClick={handleMascotasClick}>Tus mascotas</button>
                        <button className='w-36 h-10 rounded-2xl text-white bg-blue-border mx-2 hover:bg-teal-400' onClick={handleServiciosClick}>Servicios</button>
                    </div>

                    <div className='pt-10'>
                        <label className='text-3xl' htmlFor="fecha">Fecha y hora de la cita:</label>
                        <input
                            type="datetime-local"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className='p-2 ms-2'
                        />
                    </div>

                    <div className='flex justify-center my-4'>
                        <div className=' w-2/3 flex flex-wrap justify-evenly'>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>9 AM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>10 AM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>11 AM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>1 PM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>2 PM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>3 PM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>4 PM</button>
                            <button className='mb-1 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>5 PM</button>
                        </div>
                    </div>

                    <div className='flex justify-center pt-16'>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400' type="submit">Agendar cita</button>
                    </div>

                </form>
            </div>

            <div>
                <div className='w-1/3 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-20'>
                    <h1 className='text-xl text-white'>Citas pendientes</h1>
                </div>

                <div className=' p-3 flex flex-wrap justify-evenly'>

                    <div className='bg-emerald-100 w-1/3 flex flex-col items-center m-4 p-3 rounded-xl'>
                        <h1 className='text-lg'>Cita de firu</h1>
                        <p>Domingo 16 de febrero a las 9 AM</p>
                        <p>Servicio: Baño de mascotas</p>
                        <div className='mt-3'>
                            <button className='mx-4 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>Cancelar</button>
                            <button className='mx-4 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400' onClick={() => handleEditClick({ mascota: 'firu', fecha: '2024-02-16T09:00', servicio: 'Baño de mascotas' })}>Editar</button>
                        </div>
                    </div>


                </div>
            </div>
            <ModalMascotas show={showMascotasModal} onClose={handleModalClose} />
            <ModalServicios show={showServiciosModal} onClose={handleModalClose} />
            <ModalEditarCita show={showEditModal} onClose={handleModalClose} cita={editData} />
        </>
    );
};
//modal mascotas
const ModalMascotas = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
          
            <div className="w-[65rem]  relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm bg-fondo p-3 ">
            <button className='rounded-full w-6 text-2xl float-end  ' onClick={onClose}>x</button>
        
            <h1 className='gorditas text-4xl text-center py-4'>Elige tu mascota</h1>

            <div className='flex h-96 flex-col items-center overflow-auto '>

              <div className='flex flex-wrap  justify-evenly py-10 '>
                
                <div className='bg-blue-border border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center my-4'>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p className='text-white text-2xl font-semibold'>firulais</p>
                  <button className='bg-white w-3/5 h-8 rounded-2xl font-semibold hover:bg-gray-300'>seleccionar</button>
                </div>
                <div className='bg-blue-border border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center my-4'>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p className='text-white text-2xl font-semibold'>firulais</p>
                  <button className='bg-white w-3/5 h-8 rounded-2xl font-semibold hover:bg-gray-300'>seleccionar</button>
                </div>
                <div className='bg-blue-border border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center my-4'>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p className='text-white text-2xl font-semibold'>firulais</p>
                  <button className='bg-white w-3/5 h-8 rounded-2xl font-semibold hover:bg-gray-300'>seleccionar</button>
                </div>
                <div className='bg-blue-border border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center my-4'>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p className='text-white text-2xl font-semibold'>firulais</p>
                  <button className='bg-white w-3/5 h-8 rounded-2xl font-semibold hover:bg-gray-300'>seleccionar</button>
                </div>
                
               </div>
              </div>

            </div>
        </div>
    );
};
//modal sevicios
const ModalServicios = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="w-full fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
          
            <div className="w-[65rem]  relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm bg-fondo p-3 ">
            <button className='px-3 float-end text-2xl' onClick={onClose}>x</button>
            <h1 className='gorditas text-4xl text-center py-4'>Elige el servicio</h1>

            <div className='flex h-96 flex-col items-center overflow-auto '>
              <div className='flex flex-wrap w-2/4 justify-between py-10'>
                
                    <CartServices image={peluqueria} service={'Peluqueria'} alt={'Peluqueria'}/>
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
