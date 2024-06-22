import React, { useState } from 'react';
import './Header.css';
import logo from '../../../assets/logoGaia.webp';
import menu from '../../../assets/Iconos/MenuHamburguesa.svg';
import { NavMenu } from '../../WindowModals/NavMenu/NavMenu';

export const Header = () => {
  const [menuNav, setMenuNav] = useState(false);

  const controlOpenMenu = ()=>{
    if (menuNav == false) {
      openMenu()
    }else{
      closeMenu()
    }
  }

  const openMenu = () => {
    setMenuNav(true);
  };

  const closeMenu = () => {
      setMenuNav(false);
  }

  return (

    <header className='ola w-full h-28 bg-cover flex justify-center fixed '>
      <div className='w-4/5 flex items-center justify-between'>

        <div className='w-16 flex items-center'>
          <img className='bg-white p-1 rounded-full' src={logo} alt="" />
          <h2 className='text-3xl'>GaiaVet</h2>
        </div>

       
         <h2 className='text-8xl font-bold text-stroke-2-white gorditas mt-16'>GaiaVet</h2>
        

        <img className='cursor-pointer w-10' onClick={controlOpenMenu} src={menu} alt="" />

        {
          menuNav &&
          <NavMenu onClose={closeMenu}  />
        }
      </div>
    </header>
  );
}
