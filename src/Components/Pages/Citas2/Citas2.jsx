import React, { useState, useEffect } from 'react';
import { Header } from '../../Layouts/Header/Header';
import { FaLessThan } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { MdOutlinePets } from "react-icons/md";
import { format, parse, formatISO } from 'date-fns';


registerLocale('es', es);

export const Citas2 = () => {
  const [services, setServices] = useState(false);
  const [pets, setPets] = useState(false);
  const [workers, setWorkers] = useState(false)
  const [dates, setDates] = useState(false);
  const [userPets, setUserPets] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [appointmentData, setAppointmentData] = useState(null);

  const [selectedDateTime, setSelectedDateTime] = useState(null)

  const [startDate, setStartDate] = useState(new Date());


  const times = ["12:00PM", "8:00AM", "10:00AM", "5:00PM", "1:00PM"]



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


      const [time, period] = selectedTime.split(/(AM|PM)/);
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      date.setHours(hours, minutes);

      const formattedDateTime = formatISO(date, { representation: 'date' }) + ' ' + format(date, 'HH:mm:ss');

      setSelectedDateTime(formattedDateTime);

    }
  };

  useEffect(() => {
    if (selectedService && selectedPet && selectedWorker && selectedDateTime) {
      const cita = {
        idCita: null,
        tipoCita: selectedService,
        fechaHoraCita: selectedDateTime,
        tipoMascota: selectedPet.TipoMascota,
        estadoCita: 'Pendiente',
        fk_id_mascota: parseInt(selectedPet.idMascota),
        fk_nit: parseInt(159753),
        fk_cc_Empleado: "109841225"
      };

      setAppointmentData(cita);
      console.log('Datos de la cita preparados para enviar:', cita);
    }
  }, [selectedService, selectedPet, selectedWorker, selectedDateTime]);


  useEffect(() => {
    updateDateTime();
  }, [selectedDate, selectedTime]);


  const authToken = localStorage.getItem('token');
  const accessRole = localStorage.getItem('accessRole');

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
      alert('No se encontró un token. Por favor, inicia sesión.');
      return;
    }

    if (!appointmentData) {
      alert('Los datos de la cita no están completos. Verifica los datos ingresados.');
      return;
    }

    try {

      const response = await fetch('https://gaiavet-back.onrender.com/newAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData),
      });


      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }


      const result = await response.json();


      alert('Cita creada con éxito');


      console.log('Respuesta del servidor:', result);
    } catch (error) {
      alert('Hubo un error al crear la cita');
      console.error('Error al enviar los datos de la cita:', error);
    }
  };

  return (
    <>
      <Header title={'Citas'} classN='text-8xl' />

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
                      <>
                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 ' onClick={() => handleServiceSelect('Baño')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Baño" />
                          <p className='text-3xl'>Baño</p>
                        </div>

                        <div className='w-1/5 mx-2 flex flex-col items-center rounded-full p-5 justify-center hover:-translate-y-4 hover:bg-emerald-950 duration-500 ' onClick={() => handleServiceSelect('Consulta')}>
                          <img className='rounded-full object-cover w-[10vw] h-[10vw]' src="https://st.depositphotos.com/44176906/53261/i/450/depositphotos_532613348-stock-photo-dog-sitting-bubble-bath-yellow.jpg" alt="Consulta" />
                          <p className='text-3xl'>Consulta</p>
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

            {/* Seleccion de empleado */}

            <div className={`w-full bg-buttonProducts rounded-lg mb-4 cursor-pointer p-8 hover:bg-opacity-85 duration-200 ${selectedPet ? '' : 'opacity-50 cursor-not-allowed'}`}>
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
                            times.map((item) => (
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
        </div>
      </div>
    </>
  );
};