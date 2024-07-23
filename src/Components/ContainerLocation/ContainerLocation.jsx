import React from 'react'
import { GoLocation } from "react-icons/go";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";

export const ContainerLocation = ({ direction, phone, image, alt}) => {
  return (
    <div className='w-full mt-6 pb-24 py-8 text-white'>
        <div className='w-full h-60 bg-teal-600 flex flex-row justify-evenly items-center sm:w-[57rem] sm:mt-80 md:mt-72 lg:w-[100vw]'>
            <div className='w-1/3 h-56 flex flex-col justify-evenly text-2xl sm:w-[20rem] lg:mt-2'>

                <div className='flex items-center'>
                    <GoLocation className='w-16' />
                    <p><b>Direccion: </b>{direction}</p>
                </div>

                <div className='flex items-center'>
                    <IoCall className='w-16' />              
                    <p><b>Atencion via telefonica: </b>{phone}</p>
                </div>

                <div className='flex items-center'>
                    <IoLogoWhatsapp className='w-16' />
                    <p><b>Atencion via WhatsApp: </b>{phone}</p>
                </div>
            </div>
            
            <div className='er p-4 flex justify-center items-center'>
                <img src={image} alt={alt} className='w-96 h-96 rounded-mapBorder shadow-formShadow' />
            </div>
        </div>
    </div>
  )
}
