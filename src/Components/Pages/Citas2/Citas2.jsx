import React, { useState, useEffect } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { FaLessThan } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { MdOutlinePets } from "react-icons/md";
import { format, parse, formatISO } from 'date-fns';
import { ShowAppointments } from '../../ShowAppointments/ShowAppointments';

import './Citas.css'
import Swal from 'sweetalert2';
import axios from 'axios';



registerLocale('es', es);

export const Citas2 = () => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [services, setServices] = useState(false);
  const [pets, setPets] = useState(false);
  const [workers, setWorkers] = useState(false)
  const [dates, setDates] = useState(false);
  const [userPets, setUserPets] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedDate, setSelectedDate] = useState(getCurrentDate())
  const [selectedTime, setSelectedTime] = useState(null)
  const [appointmentData, setAppointmentData] = useState(null);

  const [filter, setFilter] = useState('Pendiente'); 

  const [selectedDateTime, setSelectedDateTime] = useState(null)

  const [startDate, setStartDate] = useState(new Date());

  const initialAvailableTimes = [
    '08:00:00','09:00:00','10:00:00','11:00:00','13:00:00','14:00:00','15:00:00','16:00:00','17:00:00'
  ];
  const [availableTimes, setAvailableTimes] = useState(initialAvailableTimes);
  const [occupiedTimes, setOccupiedTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchOccupiedTimes(selectedDate);
    } else {
      // Si no hay fecha seleccionada, restablece las horas disponibles
      setAvailableTimes(initialAvailableTimes);
    }
  }, [selectedDate]);

  const fetchOccupiedTimes = async (date) => {
    try {
      const response = await axios.get(`https://gaiavet-back.onrender.com/GetAppointments/${date}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log('API Response:', response.data);

      const appointments = response.data; // Asegúrate de que appointments sea un array
      if (Array.isArray(appointments)) {
        // Extrae las horas ocupadas si appointments es un array de objetos
        const times = appointments.map(appointment => appointment.hora); // Ajusta 'hora' si la propiedad es diferente
        setOccupiedTimes(times);
        filterAvailableTimes(times); // Pasar directamente el array de horas ocupadas
      } else {
        console.error('Expected an array but received:', appointments);
      }
    } catch (error) {
      console.error('Error fetching occupied times:', error);
    }
  };

  const filterAvailableTimes = (occupiedTimes) => {

    console.log('horas ocupadas: ', occupiedTimes );
    
    // Usa el estado inicial para asegurarse de que se restablezca a la lista completa
    const filteredTimes = initialAvailableTimes.filter(time => !occupiedTimes.includes(time));
    setAvailableTimes(filteredTimes);
    console.log('horas despues del filtro:', filteredTimes); // Imprime las horas disponibles después del filtro
  };



  const updateDateTime = () => {
    if (selectedDate && selectedTime) {

      let date;
      if (typeof selectedDate === 'string') {
        const [day, month, year] = selectedDate.split('/').map(Number);
        date = new Date(year, month - 1, day);
      } else if (selectedDate instanceof Date) {
        date = selectedDate;
      } else {
        console.error('selectedDate debe ser un string o un objeto Date');
        return;
      }


      const formattedDateTime = date

      setSelectedDateTime(formattedDateTime);

    }
  };

  useEffect(() => {
    if (selectedService && selectedPet && selectedWorker && selectedDateTime) {
      const cita = {
        idCita: null,
        tipoCita: selectedService,
        fecha:selectedDateTime,
        hora:selectedTime,
        tipoMascota: selectedPet.TipoMascota,
        estadoCita: 'Pendiente',
        fk_id_mascota: parseInt(selectedPet.idMascota),
        fk_nit: parseInt(159753),
        fk_cc_Empleado: selectedWorker.cedulaEmpleado
      };

      setAppointmentData(cita);
      console.log('Datos de la cita preparados para enviar:', cita);
    }
  }, [selectedService, selectedPet, selectedWorker, selectedDateTime]);


  useEffect(() => {
    updateDateTime();
  }, [selectedDate, selectedTime]);


  const authToken = localStorage.getItem('token');
  const accessRole = localStorage.getItem('role');

  const isNotSunday = (date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);


    return currentDate >= today && currentDate.getDay() !== 0;
  };

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
          setUserPets(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al traer las mascotas:', error);
      }
    };

    fetchPets();
  }, [authToken, accessRole]);

  const showServices = () => {
    setServices(!services);
  };

  const showPets = () => {
    if (selectedService) {
      setPets(!pets);
    }
  };

  const showEmployees = () => {
    if (selectedPet) {
      setWorkers(!workers);
    }
  };

  const showDates = () => {
    if (selectedWorker) {
      setDates(!dates);
    }
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedService && selectedPet) {
        try {
          // Realiza el fetch para obtener los empleados según el servicio seleccionado
          const response = await fetch(`https://gaiavet-back.onrender.com/employeServices/${(selectedService)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al traer los empleados');
          }

          const data = await response.json();
          // Guarda los empleados en el estado
          setEmployees(data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
    };

    fetchEmployees();
  }, [selectedService, selectedPet, authToken]);

  const handleServiceSelect = async (service) => {
    // Actualiza el estado del servicio seleccionado
    setSelectedService(service);
    // Restablece la selección de mascota y empleado cuando se cambia el servicio
    setSelectedPet(null);
    setSelectedWorker(null);
    setEmployees([]);
  };


  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
  };

  const clearServiceSelection = () => {
    setSelectedService(null);
    setSelectedPet(null);
    setSelectedWorker(null)
    setPets(false);
    setDates(false);
    setWorkers(false)
  };

  const clearPetSelection = () => {
    setSelectedPet(null);
    setSelectedWorker(null)
    setDates(false);
  }

  const clearWorkerSelection = () => {
    setSelectedWorker(null);
    setDates(false);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    updateDateTime();
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    updateDateTime();
  };

  const submitAppointment = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'No se encontró un token. Por favor, inicia sesión.', 'error');
      return;
    }

    if (!appointmentData) {
      Swal.fire('Advertencia', 'Los datos de la cita no están completos. Verifica los datos ingresados.', 'warning');
      return;
    }

    try {
      const response = await fetch('https://gaiavet-back.onrender.com/newAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }

      const result = await response.json();

      Swal.fire('Éxito', 'La cita se ha creado exitosamente.', 'success').then(() => {
        window.location.reload();
      });

    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear la cita. Intenta nuevamente más tarde.', 'error');
      console.error('Error al enviar los datos de la cita:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Actualiza el filtro seleccionado
  };


  return (
    <>
      <Header title={'Citas'} classN='text-8xl' />

      <div className='pt-40 w-screen h-auto'>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='self-start mb-10 bg-teal-600 w-[35rem] h-[7vh] text-white text-4xl font-itim flex items-center justify-center rounded-r-3xl'>
            <h2>Agenda tus citas</h2>
          </div>
          <div className='w-4/5 flex flex-col items-center justify-center'>

            {/* Selección de Servicio */}
            <div className='w-full bg-teal-600 rounded-lg mb-4 cursor-pointer p-8 hover:bg-opacity-85 duration-200' >
              <div className='flex items-center' onClick={showServices}>
                <FaLessThan className={`text-white text-2xl ${services ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona el servicio</h2>
              </div>
              {services && (
                <div className={`w-full flex justify-center text-white pt-8 font-itim transition-all duration-500 ease-in-out transform ${services ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-[90%] flex justify-evenly flex-wrap'>
                    {selectedService ? (
                      <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center sm:p-1'>
                        <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Baño" />
                        <p className='text-3xl sm:text-xl'>{selectedService}</p>
                        <button className='mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 sm:text-base sm:w-[12rem] sm:p-1' onClick={(e) => { e.stopPropagation(); clearServiceSelection(); }}>
                          Eliminar selección
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 sm:p-1' onClick={() => handleServiceSelect('Baño')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Baño" />
                          <p className='text-3xl sm:text-lg'>Baño</p>
                        </div>

                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 sm:p-1' onClick={() => handleServiceSelect('Consulta')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="data:image/jpeg;base64,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" alt="Consulta" />
                          <p className='text-3xl sm:text-lg'>Consulta</p>
                        </div>

                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 sm:p-1' onClick={() => handleServiceSelect('Peluqueria')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://img.freepik.com/fotos-premium/peluquero-profesional-masculino-haciendo-corte-pelo-perro-yorkshire-terrier-salon-aseo-equipo-profesional_194143-9326.jpg?w=360" alt="Consulta" />
                          <p className='text-3xl sm:text-lg'>Peluqueria</p>
                        </div>

                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 sm:p-1' onClick={() => handleServiceSelect('Guarderia')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="data:image/jpeg;base64,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" alt="Consulta" />
                          <p className='text-3xl sm:text-lg'>Guarderia</p>
                        </div>
                      </>

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
                <div className={`w-full flex justify-center text-white pt-8 font-itim transition-all duration-500 ease-in-out transform  ${pets ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-[90%] flex justify-evenly flex-wrap overflow-auto custom-scrollbar'>
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

            {/* Seleccion de empleado */}

            <div className={`w-full bg-teal-600 rounded-lg mb-4 cursor-pointer p-8 hover:bg-opacity-85 duration-200 ${selectedPet ? '' : 'opacity-50 cursor-not-allowed'}`}>
              <div className='flex items-center' onClick={showEmployees}>
                <FaLessThan className={`text-white text-2xl ${workers ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona quien atendera tu mascota</h2>
              </div>
              {workers && (
                <div className={`w-full flex justify-center text-white pt-8 font-itim transition-all duration-500 ease-in-out transform ${employees ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-[90%] flex justify-evenly flex-wrap'>
                    {selectedWorker ? (
                      <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center'>
                        <img className='rounded-full object-cover w-[10vw] h-[10vw]' src={selectedWorker.foto} alt={selectedWorker.name} />
                        <p className='text-3xl'>{selectedWorker.name}</p>
                        <button className='mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700' onClick={(e) => { e.stopPropagation(); clearWorkerSelection(); }}>
                          Eliminar selección
                        </button>
                      </div>
                    ) : (
                      employees.map(employee => (
                        <div key={employee.cedulaEmpleado} className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500' onClick={() => handleWorkerSelect(employee)}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src={employee.foto} alt={employee.nombre} />
                          <p className='text-3xl'>{employee.nombre}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>


            {/* Selección de Fecha y Hora */}
            <div className={`w-full bg-buttonProducts rounded-lg mb-4 cursor-pointer p-8 ${selectedWorker ? '' : 'opacity-50 cursor-not-allowed'}`} >
              <div className='flex items-center' onClick={showDates}>
                <FaLessThan className={`text-white text-2xl ${dates ? 'rotate-90' : 'rotate-180'} mr-4 transition-transform duration-300`} />
                <h2 className='font-gorditas text-3xl text-white'>Selecciona fecha y hora</h2>
              </div>
              {dates && (
                <div className={`transition-all flex flex-col items-center duration-500 ease-in-out transform ${dates ? 'opacity-100' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <div className='w-full flex justify-around items-center mt-10'>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        handleDateChange(date);
                      }}
                      inline
                      minDate={new Date()}
                      locale="es"
                      filterDate={isNotSunday}
                      calendarClassName='font-itim scale-125  overflow-hidden rounded-xl '
                      dayClassName={(date) =>
                        ` rounded-full  ${isNotSunday(date) ? 'cursor-pointer hover:bg-header focus:bg-header' : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`
                      }

                    />

                    <div className='w-[25vw] h-[45vh] bg-header rounded-xl flex flex-wrap  justify-evenly font-itim'>

                      <div className='w-full self-start text-center text-2xl'>
                        <h2>Selecciona la hora</h2>
                      </div>

                      <div className='h-full flex flex-col'>

                        <div className='h-4/5 flex flex-wrap justify-evenly items-center'>

                          {
                            availableTimes.map((item) => (
                              <div
                                className={`w-[9vw] h-[6vh] bg-white text-center text-xl rounded-3xl pt-1 hover:bg-gray-300 hover:-translate-y-1 duration-300 flex items-center justify-center`}
                                onClick={() => {
                                  handleTimeChange(item);
                                }}
                                key={item}
                              >
                                <div className='w-1/4 flex justify-end'>
                                  <MdOutlinePets />
                                </div>

                                <div className='w-3/4 flex justify-center '>
                                  <p>{item}</p>
                                </div>
                              </div>
                            ))

                          }
                        </div>

                        <div className='py-1 rounded-b-xl text-center text-xl bg-white'>
                          Hora seleccionada: {selectedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-8 w-4/5 text-center'>
                    <button onClick={submitAppointment} className='bg-white text-buttonProducts text-2xl w-2/5 h-12 rounded-3xl '>Agendar cita</button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* visualizacion de las citas */}
          <div className='self-start h-auto mt-10'>

            <div className='bg-teal-600 w-[35rem] h-[7vh] text-white text-4xl font-itim flex items-center justify-center rounded-r-3xl'>
              <h2>Conoce tus citas</h2>
            </div>

            <div className='w-screen h-auto flex flex-col justify-center items-center py-8'>

              <select  onChange={handleFilterChange} className='w-80 mx-9 p-3 mb-7 rounded-xl border-solid border-2 border-gray-50r focus:outline-none focus:border-blue-border'>
                <option value="" >Todas</option>
                <option value="Pendiente" selected >Pendientes</option>
                <option value="Cancelada" >Canceladas</option>
                <option value="Finalizada">Finalizadas</option>
              </select>

              <div className='w-4/5 h-auto max-h-[85vh] overflow-auto custom-scrollbar  py-5 bg-gray-50 rounded-3xl shadow-formShadow flex flex-wrap items-center justify-evenly '>
                <ShowAppointments filter={filter} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};