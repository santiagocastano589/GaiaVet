import React, { useState } from 'react';
import peluqueria1 from '../../assets/peluqueria1.jpg'
import peluqueria2 from '../../assets/peluqueria2.jpg'
import peluqueria3 from '../../assets/peluqueria3.jpg'
import peluqueria4 from '../../assets/peluqueria4.jpg'
import estrellaVacia from '../../assets/estrella-vasia.png'
import estrellaLlena from '../../assets/estrella-llena.png'
import estrellaMedia from '../../assets/estrellaMedia.png'
import { Button } from '../../Components/Button/Button'

import { ContainerCard } from '../ContainerCard/ContainerCard'
import { CarouselServices } from '../CarouselServices/CarouselServices'
import { Header } from '../Layouts/Header/Header'

export const PetDaycare = ({title,description}) => {
  const [rating, setRating] = useState(0); // Estado para las estrellas seleccionadas

  const handleStarClick = (index) => {
    if (rating === index + 0.5) {
      // Si ya está seleccionada la media estrella, cambia a la estrella llena
      setRating(index + 1);
    } else {
      // Selecciona la media estrella si no lo está
      setRating(index + 0.5);
    }
  };

  const renderStar = (index) => {
    if (rating >= index + 1) {
      return estrellaLlena; // Estrella llena
    } else if (rating >= index + 0.5) {
      return estrellaMedia; // Media estrella
    } else {
      return estrellaVacia; // Estrella vacía
    }
  };
  return (
    <>
    <Header title={title} />
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
        <h1 className='mb-2 gorditas text-2xl'>¿Qué incluye el servicio de guarderia básico?</h1>
        <li className='list-none'>
          <ul className='mb-2'>Espacio seguro y cómodo: Tu perro tendrá un lugar designado para dormir y descansar, ya sea en una jaula individual o en un área común con otros perros compatibles.</ul>
          <ul className='mb-2'>Limpieza y desinfección: Las áreas de alojamiento se limpian y desinfectan con regularidad para mantener un ambiente higiénico y saludable.</ul>
          <ul className='mb-2'>Control de temperatura: Se mantiene una temperatura adecuada en las instalaciones para garantizar la comodidad de los perros.</ul>
          <ul className='mb-2'>Comida de alta calidad: Se proporciona a los perros una dieta balanceada y de alta calidad, de acuerdo a sus necesidades nutricionales y preferencias. Puedes llevar la comida habitual de tu perro o elegir entre las opciones que ofrece la guardería.</ul>
          <ul className='mb-2'>Agua fresca: Los perros siempre tendrán acceso a agua fresca y limpia.</ul>
          <ul className='mb-2'>Paseos diarios: Los perros disfrutan de paseos diarios al aire libre para realizar ejercicio, liberar energía y socializar con otros perros.</ul>
          <ul className='mb-2'>Áreas de juego: Algunas guarderías cuentan con áreas de juego seguras y supervisadas donde los perros pueden correr, jugar y divertirse.</ul>
        </li>

        <div className='my-10'>
          <h1 className='mb-2 gorditas text-2xl'>Servicios adicionales</h1>
          <li className='list-none'>
            <ul className='mb-2'>Aromaterapia: La aromaterapia utiliza aceites esenciales para promover la relajación y el bienestar del perro.</ul>
            <ul className='mb-2'>rMasaje relajante: Un masaje no solo es placentero para tu perro, sino que también puede ayudar a reducir el estrés, mejorar la circulación y aliviar la tensión muscular.</ul>
            <ul className='mb-2'>Terapias alternativas: terapias alternativas como Reiki o acupuntura para ayudar a calmar a los perros ansiosos o con dolor.</ul>
          </li>
        </div>

        <div className='w-4/5'>
          <h1 className='mb-2 gorditas text-2xl'>Beneficios del servicio de guarderia:</h1>
          <li className='list-none'>
            <ul className='mb-2'>Ejercicio y actividad física: Los perros y gatos en las guarderías disfrutan de paseos diarios, juegos y actividades al aire libre que les permiten liberar energía, mantenerse en forma y prevenir el sobrepeso.</ul>
            <ul className='mb-2'>Alimentación saludable: Se les proporciona una dieta balanceada y de alta calidad, de acuerdo a sus necesidades nutricionales y preferencias.</ul>
            <ul className='mb-2'>Higiene y cuidado: Se les brinda un baño regular, cepillado del pelaje, corte de uñas y limpieza de oídos, lo que mantiene su higiene y salud general.</ul>
            <ul className='mb-2'>Supervisión veterinaria: Algunas guarderías cuentan con un veterinario que supervisa la salud de los animales y atiende cualquier necesidad médica que pueda surgir durante su estancia.</ul>
            <ul className='mb-2'>Socialización: La interacción con otros perros o gatos en un ambiente controlado y supervisado les ayuda a socializar, reducir el estrés y mejorar sus habilidades de comunicación animal.</ul>
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
            {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  className='h-8 w-8 cursor-pointer'
                  src={renderStar(index)}
                  alt='Estrella'
                  onClick={() => handleStarClick(index)}
                />
              ))}               
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
