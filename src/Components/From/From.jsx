import React from 'react'
import { FaGoogle } from "react-icons/fa";
import logo from '../../assets/logoGaia.webp'
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export const From = () => {
  return (
    
    <div className='flex justify-center items-center my-28'>

    <div className=" flex justify-center items-center  flex-col border-solid border-2 border-blue-border w-96">

      <div className='w-24 bg-blue-border rounded-full my-6'>
        <img className='' src={logo} alt="" />
      </div>

    <h2 className='my-3'>INICIAR SESION</h2>
    <p className='my-2'>¿No tienes cuenta? <a className='text-blue-700' href="#">Registrate</a></p>

    <form className='flex flex-col ' action="">

      <Input name="Correo Electronico" type="text" placeholder='Correo Electronico'/>
      <Input name="Contraseña" type="password" placeholder='Contraseña'/>

    <a className='my-4 border-b-2 border-blue-border w-48' href="#">¿Olvidaste la contraseña?</a>

    <Button textButton="INICIAR SESION"/>
    <button className='p-3 my-2 rounded-lg flex bg-slate-100 '>Iniciar sesion con <div className='flex items-center mx-2 rounded-xl'><p className='text-blue-700'>Google</p><FaGoogle className='mx-1' /></div> </button>
    </form>
    </div>
    </div>

  )
}