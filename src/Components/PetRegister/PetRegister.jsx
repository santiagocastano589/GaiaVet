import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoGaia.webp';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Header } from '../Layouts/Header/Header';

export const PetRegister = () => {
    const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    tipo: '',
    raza: '',
    edad: '',
    peso:''
  });

  const handleChange = (e) => {
    formData.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const dataEnd = { ...formData.current };

    try {
      const response = await fetch('https://', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataEnd),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
        
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      alert('Registro exitoso');
      setSuccessful(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Redirigir a la página de inicio de sesión si el registro es exitoso
  if (successful) {
    navigate('/pets');
  }
    return (
        <div className='h-full w-full flex flex-col'>
          <Header title='Registro de Mascotas' />
          <div className='flex justify-center items-center z-0 pt-36 pb-10 '>
            <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
              <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
                <img className='' src={logo} alt='' />
              </div>
              <h2 className='my-3'>REGISTRO DE MASCOTAS</h2>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <Input name='Nombre de la mascota' type='text' placeholder='Ingrese el nombre de la mascota' onChange={handleChange} />
                <Input name='Tipo de mascota' type='text' placeholder='Ingrese el tipo de mascota' onChange={handleChange} />
                <Input name='Raza de la mascota' type='text' placeholder='Ingrese la raza de la mascota' onChange={handleChange} />
                <Input name='Edad de la mascota' type='text' placeholder='Ingrese la edad de la mascota' onChange={handleChange} />
                <Input name='Peso de la mascota' type='text' placeholder='Ingrese el peso de la mascota' onChange={handleChange} />
                <div className='flex justify-center items-center flex-col'>
                  <Button textButton='Registrar Mascota' onClick={handleSubmit} />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
