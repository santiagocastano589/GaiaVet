import React from 'react'
import { GoLocation } from "react-icons/go";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import LocatorApi from '../LocatorApi/LocatorApi';


export const ContainerLocation = ({ direction, phone, image, alt}) => {
  return (
    <div className='w-full mt-6 pb-24 py-8 text-white'>
        <div className='w-full h-60 bg-teal-600 flex flex-row justify-evenly items-center'>
            <div className='w-[30vw] h-56 flex text-2xl'>


                <div className='h-full flex flex-col justify-evenly pr-2'>
                    <GoLocation className='w-8' /> 
                    <IoCall className='w-8' /> 
                    <IoLogoWhatsapp className='w-8' /> 
                </div>

                <div className='h-[90%] full flex flex-col justify-around'>
                    <p><b>Dirección: </b>{direction}</p>
                    <p><b>Atención vía telefónica: </b>{phone}</p>
                    <p><b>Atención vía WhatsApp: </b>{phone}</p>
                </div>

                {/* <div className='w-full flex items-center justify-evenly'>
                    <div className='w-8'>
                        <GoLocation className='w-8' />
                    </div>
                    <p><b>Dirección: </b>{direction}</p>
                </div>

                <div className='w-full flex items-center justify-evenly'>
                    <IoCall className='w-8' />              
                    <p><b>Atención vía telefónica: </b>{phone}</p>
                </div>

                <div className='w-full flex items-center justify-evenly'>
                    <IoLogoWhatsapp className='w-8' />
                    <p><b>Atención vía WhatsApp: </b>{phone}</p>
                </div> */}
            </div>
            
            <div className='w-96 h-96 '>
                <LocatorApi />
            </div>
        </div>
    </div>
  )
}
