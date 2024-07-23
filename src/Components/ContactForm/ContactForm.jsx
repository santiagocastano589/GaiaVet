import React from 'react'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import collage from "../../assets/collage.png";

export const ContactForm = () => {
  return (
    <div className='w-full pb-20 flex justify-evenly h-auto'>
        <form action="" className='bg-white rounded-xl shadow-formShadow ml-10 w-auto h-auto flex flex-col items-center py-5 px-20 sm:w-[290rem] sm:mt-10 lg:w-[60vw]'>
            <div className='pr-4 sm:w-[25rem] sm:justify-center'>
              <h2 className='text-2xl text-gray-600 font-semibold'>Escribenos!</h2>
              <p className='text-gray-500 sm:justify-center'>Dejanos tus datos y te brindaremos ayuda</p>
            </div>
            <Input type='text' placeholder='*Nombre' />
            <Input type='text' placeholder='*Telefono' />
            <Input type='text' placeholder='*Correo' />
            <Input type='text' placeholder='*Asunto' />
            <textarea className='w-80 border-blue-border border-2 rounded-xl my-4 p-2 h-28 outline-none focus:border-blue-border' name="message" placeholder='Dejanos tu mensaje...'></textarea>

            <div className='flex sm:w-[21rem]  sm:justify-between'>
                <input type="checkbox" />
                <p>Aceptar politicas de privacidad del sitio web</p>
            </div>
            <Button textButton='Enviar'/>

        </form>

        <div className='w-1/2 flex justify-center'>
            <img src={collage} alt="" className='w-1/2  sm:hidden lg:block lg:w-[30vw]' />
        </div>    
    </div>
  )
}
