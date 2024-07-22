import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header'
import ImgUser from '../../../assets/perfil.webp'
import './Profile.css'
import { InputProfile } from '../../InputProfile/InputProfile'

export const Profile = () => {
  
  return (
    <>
        <Header/>

        <div className='w-full pt-40 '>

            <div className='w-full flex justify-center flex-col'> 

            <h2 className=' gorditas text-7xl self-center'>Gestión de perfil</h2>

                <div className='flex flex-col items-center justify-center w-full'>
                    
                        <img className='rounded-full w-80 h-80 my-5' src={ImgUser} alt="" />
                        <p className='text-5xl mb-5'>Jeronimo Arias Mosquera</p>
                </div>

                <div className='w-full flex flex-col justify-center items-center   '>
                    
                    <div className='w-2/4 h-auto  bg-blue-border rounded-xl p-8'>

                        <InputProfile lblName='Nombre' initialValue='Jeronimo' />
                        <InputProfile lblName='Apellido' initialValue='Arias Mosquera' />
                        <InputProfile lblName='Correo' initialValue='jeroarias@gmail.com' />
                        <InputProfile lblName='Dirección' initialValue='corbones calle 17 #23-57 casa #7' />
                        <InputProfile lblName='Telefono' initialValue='3022606983' />
                        <button className='px-5 py-1 bg-black text-white rounded-lg float-end me-16 hover:bg-gray-600'>Editar</button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
            <div className='w-3/5 flex justify-evenly my-10  '>
                <button className='w-60 h-12 rounded-xl hover:bg-emerald-900 bg-buttonProducts text-white' type="button">Cerrar Sesión</button>
                <button className='w-60 h-12 rounded-xl hover:bg-red-400 hover:text-black bg-red-600 text-white' type="button">Eliminar cuenta</button>
            </div>
            </div>
           
        </div>
    </>
  )
}
