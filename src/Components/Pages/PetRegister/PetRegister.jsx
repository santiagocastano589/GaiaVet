import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';


export const PetRegister = () => {

  const { authToken } = useContext(AuthContext);
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    tipo: '',
    raza: '',
    edad: '',
    peso:'',
    temperamento:''
  });

  const handleChange = (e) => {
    formData.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const dataEnd = { ...formData.current };

    console.log(dataEnd);
    

    try {
      const response = await fetch('https://gaiavet-back.onrender.com/newPet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
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
      }else if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mascota registrada!!',
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
    navigate('/pets');
  }
    return (
        <div className='h-full w-full flex flex-col'>
          <Header title='Registrar mascota' />
          <div className='flex justify-center items-center z-0 pt-36 pb-10 '>
            <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
              <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
                <img className='' src={logo} alt='' />
              </div>
              <h2 className='my-3'>REGISTRO DE MASCOTAS</h2>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <Input name='nombre' lblName='Nombre de la mascota' type='text' placeholder='Ingrese el nombre de la mascota' onChange={handleChange} />
                <Input name='tipo' lblName='Tipo de mascota' type='text' placeholder='Ingrese el tipo de mascota' onChange={handleChange} />
                <Input name='raza' lblName='Raza de la mascota' type='text' placeholder='Ingrese la raza de la mascota' onChange={handleChange} />
                <Input name='edad' lblName='Edad de la mascota (meses)' type='number' placeholder='Ingrese la edad de la mascota (meses)' onChange={handleChange} />
                <Input name='peso' lblName='Peso de la mascota (Kg)' type='number' placeholder='Ingrese el peso de la mascota (Kg)' onChange={handleChange} />
                <Input name='temperamento' lblName='Temperamento' type='text' placeholder='Ingrese Temperamento de su mascota' onChange={handleChange} />
                <div className='flex justify-center items-center flex-col'>
                  <Button textButton='Registrar Mascota' onClick={handleSubmit} />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    };
