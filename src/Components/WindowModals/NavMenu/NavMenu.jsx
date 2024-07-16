import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from '../../MenuItems/MenuItems';
import './NavMenu.css';

export const NavMenu = ({ onClose }) => {
  return (
    <div className="w-96 h-auto bg-white shadow-xl top-24 right-0 absolute animate-flip-down itim-regular rounded-md">
      <div className="h-12 flex justify-start">
        <p
          className="cursor-pointer fixed right-10 top-8 font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white"
          onClick={onClose}
        >
          X
        </p>
      </div>
      <div className="w-full h-3/5 flex items-center ">
        <ul className="w-full h-full flex flex-col justify-center">
          <MenuItems nameItem="Inicio" to="/" type="Link" />
          <MenuItems nameItem="Sobre Nosotros" to="sobre" type="scroll" />
          <MenuItems nameItem="Nuestros Productos" to="productos" type="scroll" />
          <MenuItems nameItem="Nuestros Servicios" to="servicios" type="scroll" />
          <MenuItems nameItem="Contactanos" to="contactanos" type="scroll" />
          <MenuItems nameItem="Perfil" to="/Profile" type="link" />
          <MenuItems nameItem="Mascotas" to="/Pets" type="link" />
        </ul>
      </div>
      <div className="w-full h-1/4 flex flex-col items-center justify-center ">
        <Link to="/login" className="w-2/3 h-12 mt-2 rounded-xl bg-blue-border hover:bg-buttonProducts duration-200 text-white shadow-md flex justify-center items-center">
          Inicia Sesión
        </Link>
        <Link to="/register" className="w-2/3 h-12 mt-2 mb-4 rounded-xl bg-blue-border hover:bg-buttonProducts duration-200 text-white shadow-md flex justify-center items-center">
          Registrate
        </Link>
      </div>
    </div>
  );
};
