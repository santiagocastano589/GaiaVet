import React, { useState } from 'react';
import InputPetNoEditable from '../../InputPetNoEditable/InputPetNoEditable';
import ImgUser from '../../../assets/imgUser.png';
import PetUserModal from '../PetUserModal/PetUserModal'; 

const UserDetailsModal = ({ cedula, nombre, apellido, correo, direccion, telefono, userImg, pets, onClose }) => {
  const [Cedula, setCedula] = useState(cedula);
  const [Nombre, setNombre] = useState(nombre);
  const [Apellido, setApellido] = useState(apellido);
  const [Correo, setCorreo] = useState(correo);
  const [Direccion, setDireccion] = useState(direccion);
  const [Telefono, setTelefono] = useState(telefono);
  const [showPetModal, setShowPetModal] = useState(false);

  const handleInfoChange = (event) => {
    setCedula(event.target.value);
    setNombre(event.target.value);
    setApellido(event.target.value);
    setCorreo(event.target.value);
    setDireccion(event.target.value);
    setTelefono(event.target.value);
  };

  return (
    <div className="w-full fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300">
      <div className="w-[65rem] h-[32rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white  rounded-lg shadow-sm">
        <div className="flex justify-between w-full">
          <div className="p-10 text-white flex flex-col justify-center items-center">
            <h1 className="text-black text-4xl font-gorditas">Datos del usuario</h1>

            <InputPetNoEditable htmlFor="cedula" nameLabel="Cédula:" id="cedula" value={Cedula} onChange={handleInfoChange} />
            <InputPetNoEditable htmlFor="nombre" nameLabel="Nombre:" id="nombre" value={Nombre} onChange={handleInfoChange} />
            <InputPetNoEditable htmlFor="apellido" nameLabel="Apellido:" id="apellido" value={Apellido} onChange={handleInfoChange} />
            <InputPetNoEditable htmlFor="correo" nameLabel="Correo:" id="correo" value={Correo} onChange={handleInfoChange} />
            <InputPetNoEditable htmlFor="direccion" nameLabel="Dirección:" id="direccion" value={Direccion} onChange={handleInfoChange} />
            <InputPetNoEditable htmlFor="telefono" nameLabel="Teléfono:" id="telefono" value={Telefono} onChange={handleInfoChange} />
          </div>

          <div className="h-[32rem] w-80 bg-teal-600 rounded-lg">
            <button type="button" className="float-end text-white p-3" onClick={onClose}>
              <span className="sr-only">Cerrar</span>
              <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex flex-col items-center mt-32">
              <img className="w-60 h-60 rounded-full" src={userImg || ImgUser} alt="" />
              <button onClick={() => setShowPetModal(true)} className="bg-gray-400 px-11 py-3 rounded-md hover:bg-teal-300 text-white mt-5">
                Mascotas
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPetModal && <PetUserModal cedula={cedula} onClose={() => setShowPetModal(false)} />}
    </div>
  );
};

export default UserDetailsModal;
