import React, { useState } from 'react';
import { Buttons } from '../../Buttons/Buttons';
import { MenuItems } from '../../MenuItems/MenuItems';
import './NavMenu.css'

export const NavMenu = ({ onClose}) => {


  return (
    <div className={`w-96 h-MenuNav bg-white shadow-xl top-24 right-0 fixed animate-flip-down itim-regular`} >

      <div className='h-12 flex justify-start'>
        <p className=' cursor-pointer fixed right-10 top-8 font-extrabold text-xl bg-header w-7 text-center rounded-full'onClick={onClose}>X</p>
      </div>

      <div className='w-full h-3/5 flex items-center '>
        <ul className='w-full h-full  flex flex-col justify-center'>
          <MenuItems nameItem='Inicio' />
          <MenuItems nameItem='Sobre Nosotros' />
          <MenuItems nameItem='Nuestros Productos' />
          <MenuItems nameItem='Nuestros Servicios' />
          <MenuItems nameItem='Contactanos' />
        </ul>
      </div>

      <div className='w-full h-1/4 flex flex-col items-center justify-center '>
        <Buttons direccion={'../Pages/Login/Login'} btnName='Registrate' />
        <Buttons btnName='Inicia Sesión' />
        
      </div>


    </div>
  );
};
