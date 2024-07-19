import React from 'react'
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
                    
                        <img className='rounded-full w-72 h-72 my-5' src={ImgUser} alt="" />
                        <p className='text-5xl mb-5'>Pepito Perez</p>
                </div>

                <div className='w-full flex flex-col justify-center items-center   '>
                    
                    <div className='w-2/4 h-96  bg-blue-border rounded-xl p-8'>
                        <InputProfile lblName='Nombre' InValue='Pepito Perez' />
                        <InputProfile lblName='Correo' InValue='Pepito Perez' />
                        <InputProfile lblName='Dirección' InValue='Pepito Perez' />
                        <InputProfile lblName='Telefono' InValue='Pepito Perez' />
                        <button className='px-5 py-1 bg-black text-white rounded-lg float-end me-16'>Editar</button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
            <div className='w-3/5 flex justify-evenly my-10  '>
                <button className='w-60 h-12 rounded-xl bg-buttonProducts text-white' type="button">Cerrar Sesión</button>
                <button className='w-60 h-12 rounded-xl bg-red-600 text-white' type="button">Eliminar cuenta</button>
            </div>
            </div>
           
        </div>
    </>
  )
}
