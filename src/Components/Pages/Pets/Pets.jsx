import React,{useEffect, useState} from 'react'
import { Header } from '../../Layouts/Header/Header'
import { ContainerPets } from '../../ContainerPets/ContainerPets'



export const Pets = () => {

  // https://gaiavet-back.onrender.com/auth/login'

  // useEffect(() => {
  
  //   const [petList,setPetList] = useState([])

  //   return () => {
      
  //   }
  // })

  return (
    <>
    <Header title="Busca tu mascota"/>

    <div className=''>

    <div className='flex justify-center pt-48'>
    <div className='flex flex-row items-center w-2/4'>
      <input type="text" placeholder='Ingresa tu documento o nombre de tu mascota' className='flex-grow rounded-md border border-gray-300 p-2' />
      <button type="button" class='ml-2 bg-blue-border hover:bg-teal-300 hover:text-black text-white font-bold py-2 px-4 rounded-md'>Buscar</button>
    </div> 
    </div>

    <ContainerPets namePet="FIRULAIS" documento="1212331" tipo="perro" raza="criollo"/>
    <ContainerPets namePet="JUAN" documento="33333" tipo="perro" raza="criollo"/>
    <ContainerPets namePet="ALEX" documento="888" tipo="perro" raza="criollo"/>

    </div>
    </>
  )
}
