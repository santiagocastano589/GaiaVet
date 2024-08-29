import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../../assets/google.webp';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import Swal from 'sweetalert2';

export const Record = () => {
  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    direccion: '',
    telefono: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    formData.current[e.target.name] = e.target.value;
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Limpiar error al cambiar el valor
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const dataEnd = { ...formData.current };

    // Validar campos vacíos
    const newErrors = {};
    Object.keys(dataEnd).forEach((key) => {
      if (!dataEnd[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

  
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataEnd),
      });
      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        });

        throw new Error('Error en la solicitud');
      } else if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: true,
        });

        setSuccessful(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.message,
      });
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
      <div className='flex justify-center items-center z-0 pt-36 pb-10'>
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
            <Input lblName='Nombres' name='nombre' type='text' placeholder='Nombre' onChange={handleChange} />
            {errors.nombre && <p className='text-red-500 mx-9'>{errors.nombre}</p>}

            <Input lblName='Apellidos' name='apellido' type='text' placeholder='Apellido' onChange={handleChange} />
            {errors.apellido && <p className='text-red-500 mx-9'>{errors.apellido}</p>}

            <Input lblName='Número de documento' name='cedula' type='text' placeholder='Número de documento' onChange={handleChange} />
            {errors.cedula && <p className='text-red-500 mx-9'>{errors.cedula}</p>}

            <Input lblName='Correo Electrónico' name='correo' type='text' placeholder='Correo Electrónico' onChange={handleChange} />
            {errors.correo && <p className='text-red-500 mx-9'>{errors.correo}</p>}

            <Input lblName='Contraseña' name='contraseña' type='password' placeholder='Contraseña' onChange={handleChange} />
            {errors.contraseña && <p className='text-red-500 mx-9'>{errors.contraseña}</p>}

            <Input lblName='Dirección' name='direccion' type='text' placeholder='Dirección' onChange={handleChange} />
            {errors.direccion && <p className='text-red-500 mx-9'>{errors.direccion}</p>}

            <Input lblName='Teléfono' name='telefono' type='text' placeholder='Teléfono' onChange={handleChange} />
            {errors.telefono && <p className='text-red-500 mx-9'>{errors.telefono}</p>}

            

            <div className='flex justify-center items-center flex-col'>
              <Button textButton='Registrar' onClick={handleSubmit} />
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
