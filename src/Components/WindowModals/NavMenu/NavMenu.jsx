import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItems } from '../../MenuItems/MenuItems';
import './NavMenu.css';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';

export const NavMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(false);
  const [adminRole, setAdminRole] = useState(false);

  const navContext = useContext(AuthContext);

  useEffect(() => {
    const accesRole = localStorage.getItem('role');

    if (accesRole === "User") {
      setUserRole(true);
    } else if (accesRole === "administrador") {
      setAdminRole(true);
    }
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez, después del primer render.

  const closeSesion = () => {
    Swal.fire({
      title: "GaiaVet",
      text: "¿Deseas cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sesión cerrada",
          text: "Tu sesión ha sido cerrada correctamente",
          icon: "success",
        });
        localStorage.removeItem('token','role');
        localStorage.removeItem('role');
        navigate('/');

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    });
  };

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

          {!navContext.authToken && 
            <>
              <MenuItems nameItem="Sobre Nosotros" to="sobre" type="scroll" />
              <MenuItems nameItem="Nuestros Productos" to="productos" type="scroll" />
              <MenuItems nameItem="Nuestros Servicios" to="servicios" type="scroll" />
              <MenuItems nameItem="Contáctanos" to="contactanos" type="scroll" />
            </>
          }

          {userRole && 
            <>
              <MenuItems nameItem="Perfil" to="/Profile" type="link" />
              <MenuItems nameItem="Registrar mascota" to="/petRegister" type="link" />
              <MenuItems nameItem="Mascotas" to="/pets" type="link" />
              <MenuItems nameItem="Tienda" to="/products" type="link" />
              <button onClick={closeSesion} className='w-60 h-12 rounded-xl bg-buttonProducts text-white self-center mb-4' type="button">Cerrar Sesión</button>
            </>
          }

          {adminRole && 
            <>
              <MenuItems nameItem="Mascotas" to="/pets" type="link" />
              <MenuItems nameItem="Lista de productos" to="/admin/productList" type="link" />
              <button onClick={closeSesion} className='w-60 h-12 rounded-xl bg-buttonProducts text-white self-center mb-4' type="button">Cerrar Sesión</button>
            </>
          }

        </ul>
      </div>
      <div className="w-full h-1/4 flex flex-col items-center justify-center ">
        {!navContext.authToken && (
          <>
            <Link to="/login" className="w-2/3 h-12 mt-2 rounded-xl bg-blue-border hover:bg-buttonProducts duration-200 text-white shadow-md flex justify-center items-center">
              Inicia Sesión
            </Link>
            <Link to="/register" className="w-2/3 h-12 mt-2 mb-4 rounded-xl bg-blue-border hover:bg-buttonProducts duration-200 text-white shadow-md flex justify-center items-center">
              Regístrate
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
