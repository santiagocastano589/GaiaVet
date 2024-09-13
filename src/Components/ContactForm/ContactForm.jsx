import React, { useState, useRef } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import collage from "../../assets/collage.png";
import Swal from 'sweetalert2';

export const ContactForm = () => {
  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({});
  const formData = useRef({
    nombre: '',
    telefono: '',
    correo: '',
    asunto: '',
    mensaje: '',
    aceptaPoliticas: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    formData.current[name] = type === 'checkbox' ? checked : value;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataEnd = { ...formData.current };

    
    const newErrors = {};
    Object.keys(dataEnd).forEach((key) => {
      if (!dataEnd[key] && key !== 'aceptaPoliticas') {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    
    if (!dataEnd.aceptaPoliticas) {
      newErrors.aceptaPoliticas = 'Debes aceptar las políticas de privacidad';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/contact', {
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
          title: 'Mensaje enviado',
          showConfirmButton: true,
        });
        setSuccessful(true);
        document.querySelector("form").reset(); 
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full pb-20 flex justify-evenly h-auto'>
      <form onSubmit={handleSubmit} className='bg-white rounded-xl shadow-formShadow ml-10 w-auto h-auto flex flex-col items-center py-5 px-20'>
        <div className='pr-4'>
          <h2 className='text-2xl text-gray-600 font-semibold'>Escríbenos!</h2>
          <p className='text-gray-500'>Déjanos tus datos y te brindaremos ayuda</p>
        </div>
        
        <Input type='text' name='nombre' placeholder='*Nombre' onChange={handleChange} />
        {errors.nombre && <p className='text-red-500'>{errors.nombre}</p>}
        
        <Input type='text' name='telefono' placeholder='*Teléfono' onChange={handleChange} />
        {errors.telefono && <p className='text-red-500'>{errors.telefono}</p>}
        
        <Input type='text' name='correo' placeholder='*Correo' onChange={handleChange} />
        {errors.correo && <p className='text-red-500'>{errors.correo}</p>}
        
        <Input type='text' name='asunto' placeholder='*Asunto' onChange={handleChange} />
        {errors.asunto && <p className='text-red-500'>{errors.asunto}</p>}
        
        <textarea
          className='w-80 border-blue-border border-2 rounded-xl my-4 p-2 h-28 outline-none focus:border-blue-border'
          name='mensaje'
          placeholder='Déjanos tu mensaje...'
          onChange={handleChange}
        />
        {errors.mensaje && <p className='text-red-500'>{errors.mensaje}</p>}

        <div className='flex'>
          <input type="checkbox" name="aceptaPoliticas" onChange={handleChange} />
          <p className='pl-2'>Aceptar políticas de privacidad del sitio web</p>
        </div>
        {errors.aceptaPoliticas && <p className='text-red-500'>{errors.aceptaPoliticas}</p>}
        
        <Button textButton='Enviar' onClick={handleSubmit} />
      </form>

      <div className='w-1/2 flex justify-center'>
        <img src={collage} alt="Imagen decorativa" className='w-1/2' />
      </div>
    </div>
  );
};