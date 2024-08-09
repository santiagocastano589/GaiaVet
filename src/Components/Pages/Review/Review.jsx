import React from 'react';
import estrella from '../../../assets/estrella-vasia.png'
import { Header } from '../../Layouts/Header/Header'
import { Button } from '../../Button/Button'
import { ContainerCard } from '../../ContainerCard/ContainerCard';

export const Review = () => {


  return (
    <>
    <Header title='Reseñas'/>
            
        <div className='pt-44 flex justify-center'>
          <form className='bg-gray-200 border-solid border-2 border-gray rounded-lg w-2/4 mb-20' action="">

              <h1 className='text-5xl gorditas text-center pt-10'>Deja tu opinion</h1>

              <p className='text-2xl text-center py-5'> Las opiniones son publicas y contienen la información de tu cuenta</p>

              <div className='flex justify-center py-10'>
                <div className='flex justify-between w-64'> 
                    <img className='h-11 w-11' src={estrella} alt="" />
                    <img className='h-11 w-11' src={estrella} alt="" />
                    <img className='h-11 w-11' src={estrella} alt="" />
                    <img className='h-11 w-11' src={estrella} alt="" />
                    <img className='h-11 w-11' src={estrella} alt="" />
          
                </div>
              </div>

             <div className='mb-4 w-2/4 flex justify-center'>
              <select className=' rounded-xl p-2  border-solid border-2 border-gray' name="servicio">
                  <option disabled selected="Seleccione el servicio">Seleccione el servicio</option>
                  <option>Baño</option>
                  <option>Peluqueria</option>
                  <option>Consulta General</option>
                  <option>Guarderia</option>

                </select>
             </div>

              <div className='flex justify-center '>
                <textarea className='w-2/4 h-56 p-3' name="" id="" placeholder='Escribe tu comentario'></textarea>
              </div>

              <div className='flex justify-center'>
                <Button textButton='Enviar'/>
              </div>
          </form>

 

        </div>


        <div className='w-1/3 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-9'>
        
          <h1 className='text-xl text-white'>Reseñas</h1>
        
        </div>

        <div className='flex w-96 justify-evenly mt-6'>
          <h1 className='text-3xl'>Filtros :</h1>
          <button className='bg-gray-300 px-2'>Malas reseñas</button>
          <button className='bg-gray-300 px-2'>Buenas reseñas</button>
        </div>

        <div className='my-10 flex flex-wrap justify-evenly'>

          <ContainerCard name="Pepito Perez Peres" hour="Hace 3 horas" comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora minus cumque ab laborum rerum perferendis error, pariatur quia odit aliquam vel praesentium consequuntur vitae beatae, sint tempore quas mollitia facere?"/>

          <ContainerCard name="Pepito Perez Peres" hour="Hace 3 horas" comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora minus cumque ab laborum rerum perferendis error, pariatur quia odit aliquam vel praesentium consequuntur vitae beatae, sint tempore quas mollitia facere?"/>

          <ContainerCard name="Pepito Perez Peres" hour="Hace 3 horas" comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora minus cumque ab laborum rerum perferendis error, pariatur quia odit aliquam vel praesentium consequuntur vitae beatae, sint tempore quas mollitia facere?"/>

          <ContainerCard name="Pepito Perez Peres" hour="Hace 3 horas" comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora minus cumque ab laborum rerum perferendis error, pariatur quia odit aliquam vel praesentium consequuntur vitae beatae, sint tempore quas mollitia facere?"/>

        </div>
    </>
  )
}