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

export const GeneralInquiry = ({title,description}) => {
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
     <h1 className='mb-2 gorditas text-2xl'>¿Qué incluye el servicio de consulta general básico?</h1>
     <li className='list-none'>
       <ul className='mb-2'>Historia clínica: El veterinario te hará preguntas sobre la salud general de tu mascota, incluyendo su historial médico, hábitos alimenticios, comportamiento, alergias, medicamentos actuales, etc.</ul>
       <ul className='mb-2'>Signos vitales: Se medirá la temperatura corporal, frecuencia cardíaca, frecuencia respiratoria y peso de tu mascota.</ul>
       <ul className='mb-2'>Examen físico general: Se revisará la piel y el pelaje, ojos, oídos, nariz, boca, dientes, encías, ganglios linfáticos, sistema cardiovascular, sistema respiratorio, sistema digestivo y aparato locomotor (huesos, músculos, articulaciones) de tu mascota.</ul>
       <ul className='mb-2'>Pruebas de diagnóstico: Como radiografías, ecografías o exámenes de alergia, para obtener un diagnóstico más preciso en caso de que tu mascota presente algún problema de salud específico.</ul>
     </li>

     <div className='my-10'>
       <h1 className='mb-2 gorditas text-2xl'>Servicios adicionales</h1>
       <li className='list-none'>
         <ul className='mb-2'>Consulta general: Examen físico completo, revisión de historial médico, recomendaciones sobre cuidado y prevención.</ul>
         <ul className='mb-2'>Vacunación y desparasitación: Protección contra enfermedades infecciosas y parásitos.</ul>
         <ul className='mb-2'>Asesoramiento nutricional: Orientación sobre la dieta adecuada para tu mascota.</ul>
         <ul className='mb-2'>Esterilización o castración: Prevención de la reproducción no deseada y reducción de riesgos de salud.</ul>
       </li>
     </div>

     <div className='w-4/5'>
       <h1 className='mb-2 gorditas text-2xl'>Beneficios del servicio de consulta general:</h1>
       <li className='list-none'>
         <ul className='mb-2'>Identificación de signos tempranos: Un chequeo regular permite detectar posibles problemas de salud en sus primeras etapas, cuando el tratamiento suele ser más efectivo y con mayor probabilidad de éxito.</ul>
         <ul className='mb-2'>Disminución de riesgos: La detección temprana de enfermedades como diabetes, enfermedades cardíacas, renales o cancerígenas permite tomar medidas preventivas y controlar su progresión, mejorando la calidad de vida de tu mascota y reduciendo costos a largo plazo.</ul>
         <ul className='mb-2'>Asesoría experta: El veterinario te brindará recomendaciones personalizadas sobre la alimentación adecuada, la rutina de ejercicio ideal, el cuidado dental, la higiene, la prevención de parásitos y el programa de vacunación y desparasitación para tu mascota, considerando su edad, raza, estilo de vida y estado de salud.</ul>
         <ul className='mb-2'>Seguimiento del historial médico: Se mantiene un registro actualizado del historial médico de tu mascota, incluyendo vacunas, desparasitaciones, cirugías, alergias y medicamentos actuales, lo que permite un diagnóstico más preciso y un tratamiento efectivo en caso de cualquier problema de salud.</ul>
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
