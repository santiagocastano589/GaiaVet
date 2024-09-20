import React, { useState } from 'react';
import peluqueria1 from '../../assets/peluqueria1.jpg'
import peluqueria2 from '../../assets/peluqueria2.jpg'
import peluqueria3 from '../../assets/peluqueria3.jpg'
import peluqueria4 from '../../assets/peluqueria4.jpg'

import { Button } from '../../Components/Button/Button'

import { CarouselServices } from '../CarouselServices/CarouselServices'
import { Header } from '../Layouts/Header/Header'

export const GeneralInquiry = ({title,description}) => {

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
                   
</div>

    </div>
    </>
  )
}
