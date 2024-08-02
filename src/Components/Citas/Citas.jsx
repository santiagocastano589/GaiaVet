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
    const [selectedDate, setSelectedDate] = useState('');

       
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
                        <button className='mb-4 w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>9 AM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>10 AM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>11 AM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>1 PM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>2 PM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>3 PM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>4 PM</button>
                        <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400'>5 PM</button>
                    </div>
                </div>

                <div className='flex justify-center pt-16'>
                    <button className='w-32 h-10 rounded-2xl text-white bg-blue-border hover:bg-teal-400' type="submit">Agendar cita</button>
                </div>

                </form>
            </div>
            <ModalMascotas show={showMascotasModal} onClose={handleModalClose} />
            <ModalServicios show={showServiciosModal} onClose={handleModalClose} />
        </>
    );
};

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
