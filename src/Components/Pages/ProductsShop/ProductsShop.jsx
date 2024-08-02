import React from 'react'
import { Header } from '../../Layouts/Header/Header'
import { Main } from '../../Layouts/Main/Main'
import { ContainerCategory } from "../../ContainerCategory/ContainerCategory";
import { ContainerProducts } from '../../ContainerProducts/ContainerProducts';

export const ProductsShop = () => {
  return (
    <>
      <Header title='Productos' />
      <Main>
        <ContainerCategory/>
        <div className='w-full h-10 bg-teal-500 flex justify-evenly items-center my-8 py-8'>
            <h2 className='text-2xl text-white'>Busca tus productos deseados:</h2>
            <input className='w-[30rem] h-[2rem] rounded p-1 border-solid border-2 border-gray-50r focus:outline-none focus:border-blue-border' type='text' placeholder='Buscar'/>
            <select className='w-[12rem] bg-slate-200 rounded border-solid border-2 border-gray-50r focus:outline-none focus:border-blue-border'>
                <option>Todos los productos</option>
                <option>Comida de perros</option>
                <option>Comida de gatos</option>
                <option>Productos de aseo</option>
            </select>
        </div>
        <ContainerProducts/>

      </Main>
    
    </>
  )
}
