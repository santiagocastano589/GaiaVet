import React from 'react'
import { Header } from '../Layouts/Header/Header'
import { InputHistory } from '../InputHistory/InputHistory'
import { TableHeader } from '../TableHeader/TableHeader'

export const PetHistory = () => {
  return (
    <>
    <Header title={'Historial Medico'}/>
        <div className='pt-[12rem] w-full h-full'>
            <div className='w-full text-center text-3xl py-[1rem]'>
                <h2>Historia Clinica</h2>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <h3 className='w-full text-center'>Datos del paciente</h3>
                <div className='w-2/3 flex flex-wrap justify-center items-center p-4'>
                    <InputHistory title='Nombre'/>
                    <InputHistory title='Sexo'/>
                    <InputHistory title='Peso'/>
                    <InputHistory title='Especie'/>
                    <InputHistory title='Edad'/>
                    <InputHistory title='Esterilizado'/>
                    <InputHistory title='Raza'/>
                    <InputHistory title='Color'/>
                    <InputHistory title='Medicina que toma'/>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <h3 className='w-full text-center p-4'>Datos del Dueño</h3>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <TableHeader title={'Nombre'}/>
                    <TableHeader title={'Telefono'}/>
                    <TableHeader title={'Dirección'}/>
                </div>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <InputHistory title='Nombre'/>
                    <InputHistory title='Sexo'/>
                    <InputHistory title='Peso'/>
                </div>
            </div>
        </div>
    </>
  )
}
