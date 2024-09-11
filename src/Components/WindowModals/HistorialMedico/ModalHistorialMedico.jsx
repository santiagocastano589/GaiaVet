import React, { useState, useEffect,useContext } from 'react';
import { AuthContext } from '../../Context/Context';

const ModalHistorialMedico = ({ onClose,tipo,nombreMascota,raza, edad, peso,temperamento }) => {
    const [Nombre, setNombre] = useState(nombreMascota);
    const [Tipo, setTipo] = useState(tipo);
    const [Raza, setRaza] = useState(raza);
    const [Edad, setedad] = useState(edad);
    const [Peso, setpeso] = useState(peso);
    const [Temperamento, setTemperamento] = useState(temperamento);
    const { authToken } = useContext(AuthContext);
const handleInfoChange = (event) => {
    setTipo(event.target.value);
    setRaza(event.target.value);
    setNombre(event.target.value);
    setedad(event.target.value);
    setNombre(event.target.value);
    setpeso(event.target.value);
    setTemperamento(event.target.value);
};
  return (
    <div className="w-full fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
      <div className="w-[65rem] h-[45rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between w-full">

          <div className="p-10 text-black w-full  ">
            <h2 className="text-4xl font-gorditas mb-6 text-center">Historial Médico de la Mascota</h2>

            <div className='flex justify-center h-[35rem] overflow-y-auto'>
            <div className='bg-white flex flex-wrap w-11/12 justify-evenly '>

                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Nombre </label>
                    <input type="text"
                    value={Nombre} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Tipo </label>
                    <input type="text"
                    value={Tipo} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Raza </label>
                    <input type="text"
                    value={Raza} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Edad </label>
                    <input type="text"
                    value={Edad+" Meses"} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Peso </label>
                    <input type="text"
                    value={Peso+" Kg"} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
                <div className='w-[15rem] flex flex-col my-4'>
                    <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Temperamento </label>
                    <input type="text"
                    value={Temperamento} 
                    onChange={handleInfoChange}
                    className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                    disabled
                    />
                </div>
          
                    <div className='w-full'>
                        <h1 className='text-4xl text-center font-gorditas'>Datos del dueño</h1>
                        <div className='flex justify-center '>
                    <div className='bg-white flex flex-wrap w-11/12 justify-between'>

                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Nombre </label>
                        <input type="text"
                        value={Temperamento} 
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        disabled
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Cedula </label>
                        <input type="text"
                        value={Temperamento} 
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        disabled
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Teléfono </label>
                        <input type="text"
                        value={Temperamento} 
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        disabled
                        />
                    </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className='w-full'>
                        <h1 className='text-4xl text-center font-gorditas'>Consulta</h1>
                        <div className='flex justify-center '>
                    <div className='bg-white flex flex-wrap w-11/12 justify-between'>

                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Fecha de la visita </label>
                        <input type="date"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Peso actual Kg</label>
                        <input type="number"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Motivo de la consulta</label>
                        <input type="text"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Medicaciones administradas
                        </label>
                        <input type="text"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Síntomas
                        </label>
                        <input type="text"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                    <div className='w-[15rem] flex flex-col my-4'>
                        <label className='bg-teal-500 text-center rounded-md py-1 text-lg' htmlFor="">Duración de los síntomas
                        </label>
                        <input type="text"
                        className='p-1 my-2 bg-gray-200 text-black rounded-lg text-lg text-center shadow-lg'
                        />
                    </div>
                   
                            </div>
                            
                        </div>
                     </div>
                
                </div>
            </div>
          </div>

          <div className="h-[45rem] rounded-lg">
            <button type="button" className="float-end text-black p-3" onClick={onClose}>
              <span className="sr-only">Cerrar</span>
              <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialMedico;
