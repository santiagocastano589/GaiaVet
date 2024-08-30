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
  const [showIconCart,setIconShowCart] = useState(false)
  const [showCart,setShowCart] = useState(false)

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

  if (location.pathname == '/products') {
    setIconShowCart(true)
  }else if (location.pathname != '/products') {
    setIconShowCart(false)
  }
  
}, [])

const controlCart = ()=>{

  if (!showCart) {
    setShowCart(true)
    document.body.style.overflow = 'hidden';
  }else{
    setShowCart(false)
    document.body.style.overflow = 'auto';
  }
}

  
  

  return (
    <header className={`ola w-full h-28 bg-cover flex justify-center z-40 fixed transition-transform duration-300 ${showHeader ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
      <div className='w-4/5 flex items-center justify-between'>
        <Link to={"/"} className='w-16 flex items-center'>
          <img className='bg-white p-1 rounded-full' src={logo} alt="" />
          <h2 className='text-3xl font-gorditas p-3'>GaiaVet</h2>
        </Link>
        <h2 className={`font-bold text-stroke-2-white font-gorditas mt-16 ${classN}`}>
          {title}
        </h2>        
        <div className='flex'>

        <img className='cursor-pointer w-10' onClick={controlOpenMenu} src={menu} alt="" />
          {showIconCart && <LiaShoppingCartSolid onClick={controlCart} className='text-5xl absolute right-20 top-7 cursor-pointer' />}
          {showCart && <Cart onClose={controlCart} />}
          {menuNav && <NavMenu onClose={() => setMenuNav(false)} />}
        </div>

      </div>
    </header>
  );
};
