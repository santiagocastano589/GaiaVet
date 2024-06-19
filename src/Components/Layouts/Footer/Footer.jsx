import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export const Footer = () => {
  return (
    <footer className='mt-5 py-8 flex justify-evenly text-2xl border-solid border-2 border-blue-border'>
      <p>
        &copy; GaiaVet  
      </p>
    <div className='flex '>
        <div >gaiavet@gmail.com</div>
        <div className='flex items-center mx-4 text-3xl'><FaFacebook className='mx-2' /><FaWhatsapp className='mx-2' /><FaInstagram className='mx-2' /><FaXTwitter className='mx-2' /></div>
    </div>
    </footer>
  )
}
