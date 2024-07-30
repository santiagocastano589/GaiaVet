import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../assets/logoGaia.webp';
import menu from '../../../assets/Iconos/MenuHamburguesa.svg';
import { NavMenu } from '../../WindowModals/NavMenu/NavMenu';
import { Link } from 'react-router-dom';

export const Header = ({ title }) => {
  const [menuNav, setMenuNav] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlOpenMenu = () => {
    setMenuNav(!menuNav);
  };

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll hacia abajo
      setShowHeader(false);
    } else {
      // Scroll hacia arriba
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  

  return (
    <header className={`ola w-full h-28 bg-cover flex justify-center z-40 fixed transition-transform duration-300 ${showHeader ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
      <div className='w-4/5 flex items-center justify-between'>
        <Link to={"/"} className='w-16 flex items-center'>
          <img className='bg-white p-1 rounded-full' src={logo} alt="" />
          <h2 className='text-3xl gorditas p-3'>GaiaVet</h2>
        </Link>
        <h2 className='text-8xl font-bold text-stroke-2-white gorditas mt-16'>{title}</h2>
        <img className='cursor-pointer w-10' onClick={controlOpenMenu} src={menu} alt="" />
        {menuNav && <NavMenu onClose={() => setMenuNav(false)} />}
      </div>
    </header>
  );
};
