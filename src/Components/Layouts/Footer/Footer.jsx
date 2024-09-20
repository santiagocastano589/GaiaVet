import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className='bg-buttonProducts text-white sm:w-[57rem] lg:w-[100vw]'>
      <div className=' h-24 flex items-center justify-evenly text-2xl border-solid sm:w-[57rem] lg:w-[100vw] lg:justify-evenly'>
          <div className='text-center'>
            <p>
              &copy; GaiaVet  
            </p>
            <p>Armenia, Colombia</p>
          </div>
        <div className='w-[55%] flex justify-evenly items-center sm:text-lg md:text-xl'>
            <div className='flex items-center justify-center w-[50%] sm:m-4 lg:text-2xl'>
               <p>gaiavet@gmail.com</p>
            </div>
            <div className='w-[40%] flex justify-evenly items-center mx-4 text-3xl sm:text-2xl xl:text-3xl'>
              <FaFacebook className='mx-2' /><FaWhatsapp className='mx-2' /><FaInstagram className='mx-2' /><FaXTwitter className='mx-2' />
            </div>
        </div>
      </div>
    </footer>
  )
}
