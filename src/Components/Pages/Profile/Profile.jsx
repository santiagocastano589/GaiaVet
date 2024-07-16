import React from 'react'
import { Header } from '../../Layouts/Header/Header'
import ImgUser from '../../../assets/imgUser.png'
import './Profile.css'
import { InputProfile } from '../../InputProfile/InputProfile'

export const Profile = () => {
  return (
    <>
        <Header title='GaiaVet'/>

        <div className='w-full h-screen pt-40 flex flex-col items-center justify-center imprima-regular'>

            <div className='w-full h-3/4 flex'> 

                <div className='flex justify-end items-center w-2/5'>
                    <div className=' rounded-full bg-gray-300 flex justify-center p-10  '>
                        <img className='w-5/6' src={ImgUser} alt="" />
                    </div>
                </div>

                <div className='w-1/2 flex flex-col items-center'>
                    <h2 className='h-1/5 gorditas text-5xl self-center'>Gestión de perfil</h2>
                    <div className='w-4/5 h-4/5 flex flex-col '>
                        <InputProfile lblName='Nombre' InValue='Pepito Perez' />
                        <InputProfile lblName='Correo' InValue='Pepito Perez' />
                        <InputProfile lblName='Dirección' InValue='Pepito Perez' />
                        <InputProfile lblName='Telefono' InValue='Pepito Perez' />
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-evenly'>
                <button className='w-60 h-12 rounded-xl bg-buttonProducts text-white' type="button">Cerrar Sesión</button>
                <button className='w-60 h-12 rounded-xl bg-red-600 text-white' type="button">Eliminar cuenta</button>
            </div>
        </div>
    </>
  )
}
