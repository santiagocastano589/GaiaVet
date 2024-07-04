import React from 'react'
import google from '../../../assets/google.webp'
import logo from '../../../assets/logoGaia.webp'
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import { Link } from 'react-router-dom';


export const Login = () => {
  return (
    <div className='h-full w-full flex flex-col'>
      <Header />

      <div className='flex justify-center items-center pt-36 pb-10 bg-fondo '>

        <div className="bg-white flex justify-center items-center  flex-col border-solid border-2 border-blue-border rounded-lg">

          <div className='w-24 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt="" />
          </div>

          <h2 className='my-3'>INICIAR SESION</h2>
          <p className='my-2'>¿No tienes cuenta? <Link to={'/register'} className='text-blue-700'>Registrate</Link></p>

          <form className='flex flex-col ' action="">

            <Input name="Correo Electronico" type="text" placeholder='Correo Electronico' />
            <Input name="Contraseña" type="password" placeholder='Contraseña' />

            <a className='my-4 mx-9 border-b-2 border-blue-border w-48' href="#">¿Olvidaste la contraseña?</a>

            <div className='flex justify-center items-center flex-col'>

              <Button textButton="Iniciar sesion" />
              <button className='w-72 hover:bg-slate-200 shadow-lg shadow-gray-500/50 p-3 mb-8 rounded-lg flex justify-center items-center bg-slate-100 '>Iniciar sesion con Google<div className='flex items-center mx-2 rounded-xl'><img className='w-4 flex items-center' src={google} alt="" /></div> </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}