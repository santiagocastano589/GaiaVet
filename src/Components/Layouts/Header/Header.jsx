import React from 'react'
import './Header.css'
import logo from '../../../assets/logoGaia.webp'
import menu from '../../..//assets/Iconos/MenuHamburguesa.svg'


export const Header = () => {
  return (
    <header className='w-full fixed'>

      <div className='ola w-full h-48 flex items-center justify-between object-cover'>

        <div className='flex items-center justify-center w-1/3'>
          <div className=' bg-white w-20 h-20 rounded-full flex items-center justify-center'>

            <img className='w-16 h-16 cursor-pointer' src={logo} alt="" />
          </div>
          <h2 className='text-3xl cursor-pointer'>GaiaVet</h2>
        </div>

        <div className='w-1/3 flex justify-center'>
          <h2 class="text-9xl gorditas text-black text-stroke-2-white fixed top-20">GaiaVet</h2>
        </div>

        <div className='w-1/3 flex justify-center'>
          <img src={menu} alt="" className='cursor-pointer' />
        </div>

      </div>

    </header>
    
  )
}
