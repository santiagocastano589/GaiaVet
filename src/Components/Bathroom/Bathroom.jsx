import React from 'react'
import baño1 from '../../assets/baño1.jpg'
import baño2 from '../../assets/baño2.jpg'
import baño3 from '../../assets/baño3.jpg'
import baño4 from '../../assets/baño4.jpg'
import { ContainerCard } from '../ContainerCard/ContainerCard'
import { CarouselServices } from '../CarouselServices/CarouselServices'
import { Header } from '../Layouts/Header/Header'
import { Button } from '../Button/Button'

export const Bathroom = ({title,description}) => {
  return (
    <>
    <Header  />
    <div className='flex flex-col justify-center items-center pb-10'>

    <div className='w-full mb-11 relative '>  
        <div className='bg-white w-[40rem] bg-opacity-50 h-[40rem] rounded-full   absolute  bottom-[-3rem]  -ml-10  z-10 flex justify-center items-center flex-col shadow-lg'>
          <h1 className='gorditas text-8xl '>{title}</h1>
          <Button textButton="Agenda tu cita"/>
        </div>

        <div className='bg-white bg-opacity-50 w-[300px] h-[300px] rounded-full z-10 bottom-[-3rem]  absolute mt-[500px] left-[28rem] shadow-lg '></div>

      <CarouselServices img1={baño1} img2={baño2} img3={baño1} img4={baño2} />
  
    </div>

    <div className='mt-11'>
    
    <div className='flex justify-center'>
        <p className='w-5/6'>{description}</p>
    </div>
                   
        <div className='w-1/3 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-9'>
        
          <h1>Reseñas del servicio</h1>
        
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

        

</div>

    </div>
    </>
  )
}
