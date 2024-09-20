import React, { useState } from 'react';
import peluqueria1 from '../../assets/peluqueria1.jpg'
import peluqueria2 from '../../assets/peluqueria2.jpg'
import peluqueria3 from '../../assets/peluqueria3.jpg'
import peluqueria4 from '../../assets/peluqueria4.jpg'

import { Button } from '../../Components/Button/Button'

import { CarouselServices } from '../CarouselServices/CarouselServices'
import { Header } from '../Layouts/Header/Header'

export const PetDaycare = ({title,description}) => {
  
  return (
    <>
    <Header title={''} />
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

</div>

    </div>
    </>
  )
}
