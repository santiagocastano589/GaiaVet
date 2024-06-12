import React, {useState} from 'react'
import './Header.css'
import logo from '../../../assets/logoGaia.webp'
import menu from '../../..//assets/Iconos/MenuHamburguesa.svg'
import { NavMenu } from '../../WindowModals/NavMenu/NavMenu'


export const Header = ({children}) => {

  const [menuNav,setMenuNav] = useState(false)

  const openMenu = ()=>{
    setMenuNav(true)
    console.log(menuNav);
  }
  const closeMenu = ()=>{
    setMenuNav(false)
    console.log(menuNav);
  }

  return (
    <header className='w-full h-44'>
      <div className='w-full h-1/5 bg-cover fixed'>
        <div className='ola w-full h-full bg-cover flex  justify-between'>
          <div className='flex items-center justify-center w-1/3 mb-8'>
          <div className=' bg-white w-20 h-20 rounded-full flex items-center justify-center'>
            <img className='w-16 h-16 cursor-pointer' src={logo} alt="" />
          </div>
          <h2 className='text-3xl cursor-pointer'>GaiaVet</h2>
        </div>

        <div className='w-1/3 flex justify-center'>
          <h2 class="text-8xl gorditas text-black text-stroke-2-white fixed top-12">GaiaVet</h2>
        </div>

        <div className='w-1/3 flex justify-center'>
          <img src={menu} alt="" className='cursor-pointer w-12  mb-8' onClick={openMenu} />
        </div>
          {
            menuNav && 
            <div> <NavMenu onClose={closeMenu} /> </div>
          }
          </div>
      </div>
   

    </header>
    
  )
}
