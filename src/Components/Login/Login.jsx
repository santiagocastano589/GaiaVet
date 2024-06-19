import React from 'react'
import google from '../../assets/google.webp'
import logo from '../../assets/logoGaia.webp'
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const Login = () => {
  return (
    
    <div className='flex justify-center items-center mt-3'>

    <div className="bg-white flex justify-center items-center flex-col border-solid border-2 rounded-lg py-6 shadow-lg shadow-gray">

      <div className='w-24 bg-blue-border rounded-full '>
        <img className='p-4' src={logo} alt="" />
      </div>

    <h2 className='my-3'>INICIAR SESION</h2>
    <p className='my-2'>¿No tienes cuenta? <a className='text-blue-700' href="#">Registrate</a></p>

    <form className='flex flex-col ' action="">

      <Input name="Correo Electronico" type="text" placeholder='correo@gmail.com'/>
      <Input name="Contraseña" type="password" placeholder='Contraseña'/>

    <a className='my-4 mx-9 border-b-2 border-blue-border w-48' href="#">¿Olvidaste la contraseña?</a>

    <div className='flex justify-center items-center flex-col'>

    <Button textButton="Iniciar sesion"/>
    <button className='w-72 hover:bg-slate-200 shadow-lg shadow-gray-500/50 p-3 mb-8 rounded-lg flex justify-center items-center bg-slate-100 '>Iniciar sesion con Google<div className='flex items-center mx-2 rounded-xl'><img className='w-4 flex items-center' src={google} alt="" /></div> </button>

    </div>
    </form>
    </div>
    </div>
  )
}