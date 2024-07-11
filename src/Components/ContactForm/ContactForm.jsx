import React from 'react'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import collage from "../../assets/collage.png";

export const ContactForm = () => {
  return (
    <div className='w-full pb-20 flex justify-between'>
        <form action="" className='bg-white rounded-xl shadow-formShadow ml-10 w-2/5 flex flex-col items-center py-5'>
            <div className='pr-4'>
              <h2 className='text-2xl text-gray-600 font-semibold'>Escribenos!</h2>
              <p className='text-gray-500'>Dejanos tus datos y te brindaremos ayuda</p>
            </div>
            <Input type='text' placeholder='*Nombre' />
            <Input type='text' placeholder='*Telefono' />
            <Input type='text' placeholder='*Correo' />
            <Input type='text' placeholder='*Asunto' />
            <textarea className='w-80 border-blue-border border-2 rounded-xl my-4 p-2 h-28 outline-none focus:border-blue-border' name="message" placeholder='Dejanos tu mensaje...'></textarea>

            <div className='flex'>
                <input type="checkbox" />
                <p>Aceptar politicas de privacidad del sitio web</p>
            </div>
            <Button textButton='Enviar'/>

        </form>

        <div className='w-1/2 flex justify-center'>
            <img src={collage} alt="" className='w-1/2' />
        </div>    
    </div>
  )
}
