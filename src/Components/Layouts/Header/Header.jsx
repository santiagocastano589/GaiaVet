import React from 'react'
import './Header.css'
import logo from '../../../assets/logoGaia.webp'


export const Header = () => {
  return (
    <header className='w-full'>

      <div className='ola h-48 flex items-center justify-evenly'>

        <div className='w-20 bg-white rounded-full flex items-center'>
          <img className='' src={logo} alt="" />
          <h2 className=''>GaiaVet</h2>
        </div>

        <h2 class="text-8xl gorditas text-black text-stroke-2-white">GaiaVet</h2>

      </div>

    </header>
    
  )
}
