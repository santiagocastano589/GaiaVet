import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../../assets/google.webp';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';

export const Record = () => {
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    formData.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const dataEnd = { ...formData.current };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
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
    navigate('/login');
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Registro' />
      <div className='flex justify-center items-center z-0 pt-36 pb-10 '>
        <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='' />
          </div>
          <h2 className='my-3'>REGISTRO</h2>
          <p className='my-2'>
            ¿Ya tienes cuenta?{' '}
            <Link to={'/login'} className='text-blue-700'>
              Inicia Sesión
            </Link>
          </p>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <Input name='nombre' type='text' placeholder='Nombre' onChange={handleChange} />
            <Input name='apellido' type='text' placeholder='Apellido' onChange={handleChange} />
            <Input name='cedula' type='text' placeholder='Numero de documento' onChange={handleChange} />
            <Input name='correo' type='text' placeholder='Correo Electronico' onChange={handleChange} />
            <Input name='contraseña' type='password' placeholder='Contraseña' onChange={handleChange} />
            <div className='flex justify-center items-center flex-col'>
              <Button textButton='Registrar' onClick={handleSubmit} />
              <button className='w-72 hover:bg-slate-200 shadow-lg shadow-gray-500/50 p-3 mb-8 rounded-lg flex justify-center items-center bg-slate-100'>
                Registrate con Google
                <div className='flex items-center mx-2 rounded-xl'>
                  <img className='w-4 flex items-center' src={google} alt='' />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
