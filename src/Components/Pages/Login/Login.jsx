import React, { useContext, useRef, useState } from 'react';
import google from '../../../assets/google.webp';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';

export const Login = () => {
  const loginContext = useContext(AuthContext);
  const [lSuccessfull, setLSuccessfull] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const dataLogin = useRef({
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    dataLogin.current[e.target.name] = e.target.value;
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Limpiar error al cambiar el valor
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const loginEnd = { ...dataLogin.current };

    // Validar campos vacíos
    const newErrors = {};
    Object.keys(loginEnd).forEach((key) => {
      if (!loginEnd[key]) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://gaiavet-back.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginEnd),
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
        localStorage.setItem('token', data.token);
        loginContext.setAuthToken(data.token);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido a GaiaVet',
          showConfirmButton: true,
        });

        setLSuccessfull(true);
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

  if (lSuccessfull) {
    navigate('/');
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Inicio de sesión' />
      <div className='flex justify-center items-center pt-36 pb-10 bg-fondo '>
        <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='' />
          </div>
          <h2 className='my-3'>INICIAR SESION</h2>
          <p className='my-2'>
            ¿No tienes cuenta? <Link to={'/register'} className='text-blue-700'>Registrate</Link>
          </p>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <Input name='correo' type='text' placeholder='Correo Electronico' onChange={handleChange} />
            {errors.correo && <p className='text-red-500 mx-9'>{errors.correo}</p>}

            <Input name='contraseña' type='password' placeholder='Contraseña' onChange={handleChange} />
            {errors.contraseña && <p className='text-red-500 mx-9'>{errors.contraseña}</p>}

            <a className='my-4 mx-9 border-b-2 border-blue-border w-48' href='#'>
              ¿Olvidaste la contraseña?
            </a>
            <div className='flex justify-center items-center flex-col'>
              <Button onClick={handleSubmit} textButton='Iniciar sesion' />
              <button className='w-72 hover:bg-slate-200 shadow-lg shadow-gray-500/50 p-3 mb-8 rounded-lg flex justify-center items-center bg-slate-100 '>
                Iniciar sesion con Google
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
