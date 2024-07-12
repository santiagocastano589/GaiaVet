import React from 'react'
import { Header } from '../Layouts/Header/Header'
import { ContainerPets } from '../ContainerPets/ContainerPets'

export const Pets = () => {
  return (
    <>
    <Header title="Busca tu mascota"/>

    <div className=''>
    <ContainerPets namePet="firuu" documento="1311211" tipo="perro" raza="criollo"/>
    <ContainerPets namePet="juan" documento="33333" tipo="perro" raza="criollo"/>
    <ContainerPets namePet="alex" documento="888" tipo="perro" raza="criollo"/>

    </div>
    </>
  )
}
