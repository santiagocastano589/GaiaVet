import React from 'react'
import { GoLocation } from "react-icons/go";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import LocatorApi from '../LocatorApi/LocatorApi';


export const ContainerLocation = ({ direction, phone, image, alt}) => {
  return (
    <div className='w-full mt-6 pb-24 py-8 text-white'>
        <div className='w-full h-60 bg-teal-600 flex flex-row justify-evenly items-center'>
            <div className='w-1/3 h-56 flex flex-col justify-evenly text-2xl'>

                <div className='flex items-center'>
                    <GoLocation className='w-16 mr-5' />
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
            
            <div className='w-96 h-96 '>
                <LocatorApi />
            </div>
        </div>
    </div>
  )
}
