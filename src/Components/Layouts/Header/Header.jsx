import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../assets/logoGaia.webp';
import menu from '../../../assets/Iconos/MenuHamburguesa.svg';
import { NavMenu } from '../../WindowModals/NavMenu/NavMenu';
import { Cart } from '../../WindowModals/Cart/Cart';
import { Link, useLocation } from 'react-router-dom';
import { LiaShoppingCartSolid } from "react-icons/lia";

export const Header = ({ title, classN }) => {

  const location = useLocation();

  const [menuNav, setMenuNav] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showIconCart, setIconShowCart] = useState(false);
  const [showCart, setShowCart] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (location.pathname === '/products' && token) {
      setIconShowCart(true);
    } else {
      setIconShowCart(false);
    }
  }, [location.pathname]);

  const controlCart = () => {
    if (!showCart) {
      setShowCart(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShowCart(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header className={`ola w-full h-28 bg-cover flex justify-evenly items-center z-40 fixed transition-transform duration-300 sm:w-[40rem] md:w-[50rem] lg:w-[100%] 2xl:w-[100%] ${showHeader ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
      <div className='w-4/5 flex items-center justify-between sm:w-[100%] md:w-[100%] '>
        <div className='flex justify-center items-center sm:w-[30%] md:w-[30%]'>
          <Link to={"/"} className='w-16 flex justify-center items-center '>
              <img className='w-16 bg-white p-1 rounded-full sm:w-12 md:w-12 lg:w-14 2xl:w-16' src={logo} alt="Logo" />
              <h2 className='text-3xl font-gorditas p-3 sm:text-2xl sm:p-2 md:text-[30px] lg:text-3xl 2xl:text-4xl'>GaiaVet</h2>
          </Link>
        </div>
        <h2 className={`font-bold text-stroke-2-white text-center font-gorditas mt-16 ${classN} sm:text-[3.6rem] md:text-[3.7rem] md:mt-[5rem] md:w-[20rem] md:text-center lg:text-7xl xl:text-8xl 2xl:text-8xl`}>
          {title}
        </h2>        
        <div className='w-[30%] flex items-center justify-center sm:w-[25%]'>
          <img className='cursor-pointer w-10 sm:w-8 md:mr-4 lg:mr-0 lg:w-10 2xl:w-12' onClick={controlOpenMenu} src={menu} alt="Menu" />
          {showIconCart && <LiaShoppingCartSolid onClick={controlCart} className='text-5xl absolute right-20 top-7 cursor-pointer sm:right-28 md:right-36 lg:right-44 xl:right-56 2xl:right-64' />}
          {showCart && <Cart onClose={controlCart} />}
          {menuNav && <NavMenu onClose={() => setMenuNav(false)} />}
        </div>
      </div>
    </header>
  );
};
