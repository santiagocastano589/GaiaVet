import React from 'react'
import google from '../../assets/google.webp'
import logo from '../../assets/logoGaia.webp'
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const Record = () => {
  return (
    
    <div className='flex justify-center items-center '>

    <div className="bg-white flex justify-center items-center border-solid border-2 flex-col rounded-lg py-6 shadow-lg shadow-gray">

      <div className='w-24 bg-blue-border rounded-full'>
        <img className='p-4' src={logo} alt="" />
      </div>

    <h2 className='my-3'>REGISTRO</h2>
    <p className='my-2'>¿Ya tienes cuenta? <a className='text-blue-700' href="#">Inicia Sesión</a></p>

    <form className='flex flex-col ' action="">

      <Input name="Nombre Completo" type="text" placeholder='Nombre Completo'/>
      <Input name="Correo Electronico" type="text" placeholder='correo@gmil.com'/>
      <Input name="Contraseña" type="password" placeholder='Contraseña'/>
      
    <div className='mt-4 flex justify-center items-center flex-col'>
    <Button textButton="Registrar"/>
    <button className='w-72 hover:bg-slate-200 shadow-lg shadow-gray-500/50 p-3 mb-8 rounded-lg flex justify-center items-center bg-slate-100 '>Registrate con Google<div className='flex items-center mx-2 rounded-xl'><img className='w-4 flex items-center' src={google} alt="" /></div> </button>
    </div>
    </form>
    </div>
    </div>

  )
}