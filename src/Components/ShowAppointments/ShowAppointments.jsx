import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const ShowAppointments = ({ filter }) => {
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState([]);
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const authToken = localStorage.getItem('token');
    const accesRole = localStorage.getItem('role');

    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const urlAppointments = accesRole === 'administrador'
        ? 'https://gaiavet-back.onrender.com/getPendingAppointment'
        : 'https://gaiavet-back.onrender.com/getUserAppointment';

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(urlAppointments, {
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

                setAppointments(data || []);
            } catch (error) {
                console.error('Error fetching appointments:', error.message);
            }
        };

        if (authToken) {
            fetchAppointments();
        }
    }, [authToken]);


    useEffect(() => {
        console.log("appointments:", appointments);
        if (filter) {
            setFilteredAppointments(
                Array.isArray(appointments) ? appointments.filter((appointment) => appointment.estadoCita === filter) : []
            );
        } else {
            setFilteredAppointments(Array.isArray(appointments) ? appointments : []); // Si no hay filtro, muestra todas
        }
    }, [filter, appointments]);


    const urlPets = accesRole === 'administrador'
        ? 'https://gaiavet-back.onrender.com/Pets'
        : 'https://gaiavet-back.onrender.com/Pet';

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(urlPets, {
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

                setPets(data || []);
            } catch (error) {
                console.error('Error fetching pets:', error.message);
            }
        };

        if (authToken) {
            fetchPets();
        }
    }, [authToken]);

    const fetchUserByCedula = async (cedula) => {
        try {
            const response = await fetch(`https://gaiavet-back.onrender.com/userFind/${cedula}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const userData = await response.json();

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return userData;
        } catch (error) {
            console.error('Error fetching user by cedula:', error.message);
        }
    };

    const fetchEmployeeByCedula = async (cedula) => {
        try {
            const response = await fetch(`https://gaiavet-back.onrender.com/employee/${cedula}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const employeeData = await response.json();

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return employeeData;
        } catch (error) {
            console.error('Error fetching employee by cedula:', error.message);
        }
    };

    useEffect(() => {
        const fetchUsersForAppointments = async () => {
            const usersData = await Promise.all(
                pets.map(async (pet) => {
                    if (pet.fk_cedulaU) {
                        const user = await fetchUserByCedula(pet.fk_cedulaU);
                        return user;
                    }
                    return null;
                })
            );
            setUsers(usersData.filter(Boolean));
        };

        if (pets.length > 0) {
            fetchUsersForAppointments();
        }
    }, [pets, authToken]);

    useEffect(() => {
        const fetchEmployeesForAppointments = async () => {
            const employeesData = await Promise.all(
                appointments.map(async (appointment) => {
                    if (appointment.fk_cc_Empleado) {
                        const employee = await fetchEmployeeByCedula(appointment.fk_cc_Empleado);
                        return employee;
                    }
                    return null;
                })
            );
            setEmployees(employeesData.filter(Boolean));
        };

        if (appointments.length > 0) {
            fetchEmployeesForAppointments();
        }
    }, [appointments, authToken]);

    const findPetById = (petId) => {
        return pets.find(pet => pet.idMascota === petId);
    };

    const findUserByCedula = (cedula) => {
        return users.find(user => user.cedula === cedula);
    };

    const findEmployeeByCedula = (cedula) => {
        return employees.find(employee => employee.cedulaEmpleado === cedula);
    };


    const cancelAppointment = async (id, appointmentDate) => {
        // Convertir appointmentDate a objeto Date
        const appointmentDateObj = new Date(appointmentDate);
        const currentDate = new Date();

        // Obtener la diferencia en días entre la fecha de la cita y la fecha actual
        const timeDifference = appointmentDateObj - currentDate;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Diferencia en días

        if (accesRole != 'administrador') {
            if (daysDifference <= 1) {
                // Mostrar una alerta si la cita no puede ser cancelada
                Swal.fire('No se puede cancelar', 'Solo puedes cancelar la cita al menos un día antes de la fecha establecida o comunicate con la veterinaria', 'warning');
                return;
            }
        }


        // Mostrar una alerta de confirmación antes de proceder con la cancelación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cancelar esta cita?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener',
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            // El usuario seleccionó "No, mantener"
            return;
        }

        try {
            // Realizar la solicitud de cancelación si el usuario confirmó
            const response = await fetch(`https://gaiavet-back.onrender.com/updateStatusAppointment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ estadoCita: 'Cancelada' }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.idCita === id
                        ? { ...appointment, estadoCita: 'Cancelada' }
                        : appointment
                )
            );

            // Mostrar una alerta de éxito después de cancelar la cita
            Swal.fire('Éxito', 'La cita ha sido cancelada exitosamente.', 'success');

        } catch (error) {
            console.error('Error al cancelar la cita:', error.message);
            // Mostrar una alerta de error si algo sale mal
            Swal.fire('Error', 'Hubo un error al cancelar la cita. Intenta nuevamente más tarde.', 'error');
        }
    };




    useEffect(() => {
        console.log(appointments);

    }, [appointments])

    const finishAppointment = async (id, appointmentDate, appointmentHour) => {
        console.log(appointmentDate, appointmentHour);

        // Combinar la fecha y la hora en un solo objeto Date
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentHour}`);
        const currentDateTime = new Date();

        // Comparar la fecha y hora de la cita con la fecha y hora actual
        if (currentDateTime < appointmentDateTime) {
            // Si la fecha y hora actual es anterior a la cita, no permitir finalizar
            Swal.fire('No se puede finalizar', 'Solo puedes finalizar la cita cuando la fecha y hora de la cita hayan pasado.', 'warning');
            return;
        }

        // Mostrar una alerta de confirmación antes de proceder con la finalización
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas finalizar esta cita?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, finalizar',
            cancelButtonText: 'No, mantener',
            reverseButtons: true,
        });

        if (!result.isConfirmed) {
            // El usuario seleccionó "No, mantener"
            return;
        }

        try {
            // Realizar la solicitud para finalizar la cita si el usuario confirmó
            const response = await fetch(`https://gaiavet-back.onrender.com/updateStatusAppointment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ estadoCita: 'Finalizada' }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.idCita === id
                        ? { ...appointment, estadoCita: 'Finalizada' }
                        : appointment
                )
            );

            // Mostrar una alerta de éxito después de finalizar la cita
            Swal.fire('Éxito', 'La cita ha sido finalizada exitosamente.', 'success');

        } catch (error) {
            console.error('Error al finalizar la cita:', error.message);
            // Mostrar una alerta de error si algo sale mal
            Swal.fire('Error', 'Hubo un error al finalizar la cita. Intenta nuevamente más tarde.', 'error');
        }
    };

    return (
        <>
            {appointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => {
                    const pet = findPetById(appointment.fk_id_mascota);
                    const user = pet ? findUserByCedula(pet.fk_cedulaU) : null;
                    const employee = findEmployeeByCedula(appointment.fk_cc_Empleado);

                    return (
                        <div
                            key={index}
                            className='w-[45%] h-[25vh] my-2 rounded-3xl bg-white shadow-formShadow flex flex-col justify-center font-itim'
                        >

                            <div className='flex'>
                                <img
                                    className='w-[30%] h-[18vh] object-cover rounded-3xl mx-4'
                                    src={pet?.foto || "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1725313635/tplymxa46fraujjjzsxs.jpg"}
                                    alt=""
                                />
                                <div className='flex w-[70%] justify-around pt-3'>
                                    <div>
                                        <p className='font-semibold flex'>Mascota: <span className='font-normal pl-1'>{pet?.nombre || 'Desconocido'}</span></p>
                                        <p className='font-semibold flex'>Fecha: <span className='font-normal pl-1'>{appointment.fecha}</span></p>
                                        <p className='font-semibold flex'>Hora: <span className='font-normal pl-1'>{appointment.hora}</span></p>
                                        <p className='flex font-semibold'>Estado: <span className={` font-normal pl-1 ${appointment.estadoCita === 'Pendiente' ? 'text-orange-500' : appointment.estadoCita === 'Cancelada' ? 'text-red-600' : appointment.estadoCita === 'Finalizada' ? 'text-green-400' : appointment.estadoCita == 'Facturada' ? 'text-blue-600' : ''}`}>{appointment.estadoCita}</span></p>
                                    </div>
                                    <div>
                                        {
                                            (accesRole === 'administrador' || accesRole === 'empleado') ?
                                                <>
                                                    <p className='font-semibold flex'>Dueño: <span className='font-normal pl-1'>{user?.nombre + " " + user?.apellido || 'Desconocido'}</span></p>
                                                    <p className='font-semibold flex'>Contacto: <span className='font-normal pl-1'>{user?.telefono || 'Desconocido'}</span></p>
                                                </>
                                                : ""
                                        }

                                        <p className='font-semibold flex'>Responsable: <span className='font-normal pl-1'>{employee?.nombre + " " + employee?.apellido || 'Desconocido'}</span></p>
                                        <p className='font-semibold flex'>Servicio: <span className='font-normal pl-1'>{appointment.tipoCita}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/5 self-end text-white'>

                                {
                                    appointment.estadoCita == 'Pendiente' ?
                                        <button
                                            className='bg-red-600 rounded-3xl px-4 ml-4 py-1 cursor-pointer hover:bg-opacity-80'
                                            onClick={() => cancelAppointment(appointment.idCita, appointment.fecha)}
                                        >
                                            Cancelar cita
                                        </button> : ''
                                }
                                {
                                    accesRole == 'administrador' && appointment.estadoCita == 'Pendiente' ?

                                        <button
                                            className='bg-green-600 rounded-3xl px-4 ml-4 py-1 cursor-pointer hover:bg-opacity-80'
                                            onClick={() => finishAppointment(appointment.idCita, appointment.fecha, appointment.hora)}
                                        >
                                            Finalizar cita
                                        </button> : ''
                                }

                            </div>
                        </div>
                    );
                })
            ) : (
                <p className='font-itim font-bold text-center text-xl mt-3 text-red-500'>
                    {accesRole === 'administrador' ? 'No hay citas pendientes' : 'No tienes citas'}
                </p>
            )}
        </>
    );
};
