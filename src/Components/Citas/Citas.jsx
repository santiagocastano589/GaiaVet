import React, { useState } from 'react';
import { Header } from '../Layouts/Header/Header';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import baño1 from '../../assets/baño1.jpg';

export const Citas = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [showMascotasModal, setShowMascotasModal] = useState(false);
    const [showServiciosModal, setShowServiciosModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Fecha seleccionada:', selectedDate);
        console.log('Hora seleccionada:', selectedTime);
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
            <div className='pt-40'>
                <form className='bg-yellow-100' onSubmit={handleSubmit}>
                    <div>
                        <button className='p-3 bg-blue-border' onClick={handleMascotasClick}>Tus mascotas</button>
                        <button className='p-3 bg-blue-border' onClick={handleServiciosClick}>Servicios</button>
                    </div>

                    <div>
                        <label htmlFor="fecha">Fecha de la cita:</label>
                        <Calendar
                            id="fecha"
                            onChange={setSelectedDate}
                            value={selectedDate}
                            minDate={new Date()}
                            maxDate={new Date(2025, 11, 31)}
                            locale="es"
                        />
                    </div>

                    <div>
                        <label htmlFor="hora">Hora de la cita:</label>
                        <TimePicker
                            id="hora"
                            onChange={setSelectedTime}
                            value={selectedTime}
                            format="HH:mm" // Formato de 24 horas (cambia a "hh:mm a" para 12 horas)
                            clockClassName='bg-yellow-200'
                        />
                    </div>

                    <button type="submit">Agendar cita</button>
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
          
            <div className="w-[65rem] h-[32rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-sm bg-white p-3 ">
            <button className='px-3 float-end text-2xl' onClick={onClose}>x</button>
            
              <div className='flex flex-grow justify-evenly'>
                
              <div className='border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center'>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p>firulais</p>

                  <button className='bg-emerald-400 py-1 px-3 rounded-2xl'>seleccionar</button>
                </div>
                <div className='border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center '>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p>firulais</p>

                  <button className='bg-emerald-400 py-1 px-3 rounded-2xl'>seleccionar</button>
                </div>
                <div className='border-solid border-2 border-gray w-64 h-64 rounded-3xl p-3 flex flex-col justify-evenly items-center '>
                  <img className='w-32 h-32 object-cover rounded-full' src={baño1} alt="" />
                  <p>firulais</p>

                  <button className='bg-emerald-400 py-1 px-3 rounded-2xl'>seleccionar</button>
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
        <div className="modal">
            <div className="modal-content">
                <h2>Servicios</h2>
                {/* Contenido del modal */}
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};
