import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header'
import { Main } from '../../Layouts/Main/Main'
import { ContainerCategory } from "../../ContainerCategory/ContainerCategory";
import { ContainerProducts } from '../../ContainerProducts/ContainerProducts';

export const ProductsShop = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <>
      <Header title='Productos' />
      <Main>
        <ContainerCategory setSelectedCategory={setSelectedCategory} />
        <div className='w-full h-10 bg-teal-500 flex justify-evenly items-center my-8 py-8'>
            <h2 className='text-xl text-white'>Busca tus productos deseados:</h2>
            <input 
              className="w-[40rem] px-4 py-1 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-500 text-gray-700 placeholder-gray-400"
              type='text' 
              placeholder='Busca tus productos de manera rapida' 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select className='w-[12rem] bg-slate-200 rounded border-solid border-2 border-gray-50 focus:outline-none focus:border-blue-border'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value=''>Todos los productos</option>
                <option value='Comida para perros'>Comida para perros</option>
                <option value='Comida para gatos'>Comida para gatos</option>
                <option value='Aseo para tu mascota'>Productos de aseo</option>
            </select>
        </div>
        
        <ContainerProducts searchText={searchText} selectedCategory={selectedCategory}/>

      </Main>
    
    </>
  )
}
