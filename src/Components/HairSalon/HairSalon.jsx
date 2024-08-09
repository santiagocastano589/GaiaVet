import React from 'react'
import peluqueria1 from '../../assets/peluqueria1.jpg'
import peluqueria2 from '../../assets/peluqueria2.jpg'
import peluqueria3 from '../../assets/peluqueria3.jpg'
import peluqueria4 from '../../assets/peluqueria4.jpg'
import estrella from '../../assets/estrella.webp'

import { Button } from '../../Components/Button/Button'
import { ContainerCard } from '../ContainerCard/ContainerCard'
import { CarouselServices } from '../CarouselServices/CarouselServices'
import { Header } from '../Layouts/Header/Header'

export const HairSalon = ({title,description}) => {
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

      <CarouselServices img1={peluqueria1} img2={peluqueria2} img3={peluqueria3} img4={peluqueria4} />
  
    </div>

       <div className='mt-11'>
    
       <div className='flex flex-col items-center w-3/4 '>
        <p className='w-5/6'>{description}</p>
        <div className='w-4/5 '>
        <div className='pt-5'>
        <h1 className='mb-2 gorditas text-2xl'>¿Qué incluye el servicio de peluqueria básico?</h1>
        <li className='list-none'>
          <ul className='mb-2'>Cepillado: Un cepillado profundo elimina el pelo suelto, la suciedad y las enredaderas, previniendo la formación de nudos y mejorando la salud de la piel.</ul>
          <ul className='mb-2'>Corte de uñas: El corte regular de las uñas es importante para evitar que crezcan demasiado, lo que puede causar dolor, molestias e incluso problemas de postura.</ul>
          <ul className='mb-2'>Limpieza de orejas: Se limpian las orejas con productos específicos para eliminar la cera y la suciedad acumulada, previniendo infecciones y olores desagradables.</ul>
          <ul className='mb-2'>Deslanado: Si tu perro tiene un pelaje largo o doble, el deslanado es un proceso importante para eliminar el pelo subpelo suelto y prevenir la formación de nudos.</ul>
        </li>

        <div className='my-10'>
          <h1 className='mb-2 gorditas text-2xl'>Servicios adicionales</h1>
          <li className='list-none'>
            <ul className='mb-2'>Masaje relajante: Un masaje no solo es placentero para tu perro, sino que también puede ayudar a reducir el estrés.</ul>
            <ul className='mb-2'>romaterapia: La aromaterapia utiliza aceites esenciales para promover la relajación y el bienestar del perro.</ul>
            <ul className='mb-2'>Terapias alternativas: terapias alternativas como Reiki o acupuntura para ayudar a calmar a los perros ansiosos o con dolor.</ul>
          </li>
        </div>

        <div className='w-4/5'>
          <h1 className='mb-2 gorditas text-2xl'>Beneficios del servicio de peluqueria:</h1>
          <li className='list-none'>
            <ul className='mb-2'>Pelaje limpio y libre de parásitos: Un baño profundo con champús y acondicionadores adecuados elimina la suciedad, las pulgas, garrapatas y otros parásitos, previniendo enfermedades de la piel y mejorando la salud del pelaje.</ul>
            <ul className='mb-2'>Piel sana y libre de irritaciones: El cepillado regular elimina el pelo suelto y las células muertas, estimulando la circulación sanguínea y previniendo la formación de enredos y molestias en la piel.</ul>
            <ul className='mb-2'>Uñas recortadas y limpias: El corte regular de las uñas evita el crecimiento excesivo, lo que puede ocasionar dolor, problemas de postura e incluso lesiones.</ul>
            <ul className='mb-2'>Higiene bucal: Algunos servicios incluyen cepillado dental y eliminación de sarro, previniendo enfermedades periodontales y el mal aliento.</ul>
            <ul className='mb-2'>Detección temprana de problemas de salud: Durante el proceso de peluquería, los profesionales pueden detectar señales de problemas de salud en la piel, orejas, patas o incluso el comportamiento del perro, remitiéndolo al veterinario si es necesario.</ul>
          </li>
        </div>
        </div>
        </div>
        
    </div>
                       
            <div className='w-1/3 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-9'>
            
              <h1 className='text-xl text-white'>Reseñas del servicio</h1>
            
            </div>
            
          <div className='border-solid border-2 border-gray mt-10 w-1/3 h-80 rounded-3xl p-3 flex flex-col items-center justify-between ms-10 bg-white'>
            <h1 className='text-3xl'>Deja tu opinión</h1>
            
            <p className='text-base'> Las opiniones son publicas y contienen la información de tu cuenta</p>
            <div className='flex justify-between w-48'> 
                <img className='h-8 w-8' src={estrella} alt="" />
                <img className='h-8 w-8' src={estrella} alt="" />
                <img className='h-8 w-8' src={estrella} alt="" />
                <img className='h-8 w-8' src={estrella} alt="" />
                <img className='h-8 w-8' src={estrella} alt="" />           
            </div>

            <textarea className='w-3/4 h-28 bg-gray-200 p-3 rounded-xl' placeholder='Escribe tu comentario' name="" id=""></textarea>
            <button className='bg-blue-border p-2 w-56 rounded-full text-white'>Enviar</button>
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
