import React, { useState, useEffect } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { FaCalendarCheck } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import Swal from 'sweetalert2'; // Importar SweetAlert

export const AppointmentPayment = () => {
    const [appointments, setAppointments] = useState([]);
    const [finishedAppointments, setFinishedAppointments] = useState([]);
    const [pets, setPets] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [petNameFilter, setPetNameFilter] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    
    const [dataPayment, setDataPayment] = useState({
        idFactura: null,
        tipoFactura: '',
        fechaFactura: '', 
        total: '',
        fk_nit: 159753,
        fk_idCita: '',
        metodo: ''
    });

    const authToken = localStorage.getItem('token');

    const servicePrices = {
        Consulta: 50000,
        Baño: 30000,
        Guarderia: 40000,
        Peluqueria: 45000
    };

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch('https://gaiavet-back.onrender.com/Pets', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                const petData = await response.json();
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                setPets(petData || []);
            } catch (error) {
                console.error('Error fetching pets:', error.message);
            }
        };

        if (authToken) {
            fetchPets();
        }
    }, [authToken]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://gaiavet-back.onrender.com/getPendingAppointment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const finalizadas = data.filter(appointment => appointment.estadoCita === 'Finalizada');
                setFinishedAppointments(finalizadas);
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
            }
        };

        if (authToken) {
            fetchAppointments();
        }
    }, [authToken]);

    const getPetName = (fk_id_mascota) => {
        const pet = pets.find(pet => pet.idMascota === fk_id_mascota);
        return pet ? pet.nombre : 'Desconocido';
    };

    const getPrice = (tipoCita) => {
        return servicePrices[tipoCita] || 0;
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    const handlePetNameChange = (e) => {
        setPetNameFilter(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const filteredAppointments = finishedAppointments.filter(item => {
        const matchesService = selectedService === '' || item.tipoCita === selectedService;
        const matchesPetName = petNameFilter === '' || getPetName(item.fk_id_mascota).toLowerCase().includes(petNameFilter.toLowerCase());
        return matchesService && matchesPetName;
    });

    const handlePayment = async (appointment) => {
        const totalAmount = getPrice(appointment.tipoCita);
        const formattedDate = new Date().toISOString().split('T')[0];

        const updatedPayment = {
            idFactura: null,
            tipoFactura: appointment.tipoCita, 
            fechaFactura: formattedDate, 
            total: totalAmount,
            fk_nit: 159753,
            fk_idCita: appointment.idCita,
            metodo: selectedPaymentMethod
        };

        setDataPayment(updatedPayment);

        // Confirmación con SweetAlert
        const confirmResult = await Swal.fire({
            title: '¿Confirmar facturación?',
            text: `¿Estás seguro que deseas facturar la cita para ${getPetName(appointment.fk_id_mascota)}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, facturar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await fetch('https://gaiavet-back.onrender.com/sellService', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(updatedPayment)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                console.log('Pago realizado exitosamente:', data);

                // Actualizar estado de la cita a "Facturada"
                await finishAppointment(appointment.idCita);

                // Alerta de éxito
                Swal.fire({
                    title: 'Cita facturada',
                    text: 'La cita ha sido facturada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Actualizar citas facturadas (remover la cita facturada de la lista)
                setFinishedAppointments(finishedAppointments.filter(item => item.idCita !== appointment.idCita));
            } catch (error) {
                console.error('Error realizando el pago:', error.message);
            }
        }
    };

    const finishAppointment = async (idCita) => {
        try {
            const response = await fetch(`https://gaiavet-back.onrender.com/updateStatusAppointment/${idCita}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ estadoCita: 'Facturada' }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            console.log('Estado de la cita actualizado a "Facturada"');
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error.message);
        }
    };

    return (
        <>
            <Header title={'Facturar servicio'} classN={'text-7xl'} />
            <div className='w-screen pt-40 flex items-center justify-center font-itim'>
                <div className='w-[90%] mb-8'>
                    <h2 className='text-4xl text-teal-800'>Citas finalizadas</h2>
                    
                    <div className='mt-4 flex'>
                        <p className='text-2xl'>Filtrar por:</p>

                        <select
                            value={selectedService}
                            onChange={handleServiceChange}
                            className='w-[20vw] h-8 ml-5 border-2 border-teal-500 rounded-xl focus:border-gray-400'>
                            <option value="">Tipo de cita</option>
                            <option value="Consulta">Consulta</option>
                            <option value="Baño">Baño</option>
                            <option value="Guarderia">Guarderia</option>
                            <option value="Peluqueria">Peluqueria</option>
                            <option value="">Todas</option>
                        </select>

                        <input
                            type="text"
                            value={petNameFilter}
                            onChange={handlePetNameChange}
                            placeholder='Nombre de la mascota'
                            className='w-[20vw] h-8 ml-5 pl-1 border-2 border-teal-500 rounded-xl'
                        />
                    </div>

                    {filteredAppointments.length === 0 ? (
                        <p className='pt-20 h-[49vh] text-4xl w-full text-center'>No se encuentran citas.</p>
                    ) : (
                        filteredAppointments.map(item => (
                            <div key={item.idCita} className='w-full h-1/2 mt-4 rounded-xl text-white border-2 border-teal-500'>
                                <div className='w-full h-1/2 pl-4 pt-4 bg-teal-600 rounded-t-xl'>
                                    <p className='text-5xl'>{getPetName(item.fk_id_mascota)}</p>
                                    <p className='text-xl'>Id mascota: {item.fk_id_mascota}</p>
                                    <p className='text-xl'>Servicio: {item.tipoCita}</p>
                                    <div className='flex items-center'>
                                        <FaCalendarCheck />
                                        <p className='pl-1'>Fecha: {item.fecha}</p>
                                    </div>
                                    <div className='flex items-center pb-4'>
                                        <IoIosTime />
                                        <p className='pl-1'>Hora: {item.hora}</p>
                                    </div>
                                </div>
                                <div className='w-full h-1/2 text-black bg-white rounded-b-xl flex flex-col pl-4'>
                                    <p className='text-2xl py-4'>Valor de la cita: ${getPrice(item.tipoCita).toLocaleString()}</p>
                                    <select
                                        value={selectedPaymentMethod}
                                        onChange={handlePaymentMethodChange}
                                        className='w-[20vw] h-8 mb-4 border-2 border-teal-500 rounded-xl focus:border-gray-400'>
                                        <option value="">Selecciona método de pago</option>
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Tarjeta">Tarjeta</option>
                                        <option value="Transferencia bancaria">Transferencia bancaria</option>
                                    </select>
                                    <button
                                        onClick={() => handlePayment(item)}
                                        className='w-[15vw] mb-4 bg-buttonProducts text-white rounded-3xl py-2'
                                        type="button">
                                        Pagar cita
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};
