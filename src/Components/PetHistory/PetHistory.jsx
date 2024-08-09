import React from 'react'
import { Header } from '../Layouts/Header/Header'
import { InputHistory } from '../InputHistory/InputHistory'
import { TableHeader } from '../TableHeader/TableHeader'

export const PetHistory = () => {
  return (
    <>
    <Header title={'Historial Medico'}/>
        <div className='pt-[12rem] w-full h-full bg-teal-100 flex flex-col justify-center items-center'>
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
                    <InputHistory title='Telefono'/>
                    <InputHistory title='Dirección'/>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <h3 className='w-full text-center p-4'>Constantes fisiologicas</h3>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <TableHeader title={'Diagnostico'}/>
                    <TableHeader title={'Diagnostico'}/>
                    <TableHeader title={'Diagnostico'}/>
                </div>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                    <InputHistory title=''/>
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center py-6'>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <th className='w-[28rem] border p-2 mx-4 bg-teal-500 rounded-lg'>Vacunaciones</th>
                    <th className='w-[28rem] border p-2 mx-4 bg-teal-500 rounded-lg'>Esterilización</th>
                </div>
                <div className='w-2/3 flex flex-wrap justify-center items-center'>
                    <textarea placeholder='Vacunaciones' className='w-[28rem] h-[10.5rem] mx-4 my-4 p-2 border shadow-xl rounded-lg'/>
                    <textarea placeholder='Esterilización' className='w-[28rem] h-[10.5rem] mx-4 my-4 p-2 border shadow-xl rounded-lg'/>
                </div>

            </div>
            <button className='w-[20rem] h-[3rem] rounded-lg bg-teal-500 my-6'>Enviar</button>

        </div>
    </>
  )
}
