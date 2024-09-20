import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const ContraseñaModal = ({ onClose }) => {
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState(''); // Nuevo estado para la cédula
  const [codigo, setCodigo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [step, setStep] = useState(1); // 1: input de correo, 2: input de cédula, 3: input de código, 4: nueva contraseña

  const handleCorreoSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });
  
      const result = await response.json();
      
      if (response.ok) {
        Swal.fire('Código enviado', 'Revisa tu correo electrónico.', 'success');
        setStep(2); // Pasar al siguiente paso
      } else {
        Swal.fire('Error', result.message || 'Error al enviar el código', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al conectarse con el servidor', 'error');
    }
  };
  

  const handleCedulaSubmit = (e) => {
    e.preventDefault();
    if (cedula.trim() === '') {
      Swal.fire('Error', 'La cédula es requerida.', 'error');
    } else {
      setStep(3); 
    }
  };

  const handleCodigoSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/vCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigoIngresado: codigo }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire('Código verificado', 'El código es válido.', 'success');
        setStep(4); // Pasar al siguiente paso: nueva contraseña
      } else {
        Swal.fire('Error','Código incorrecto, intenta de nuevo.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al conectarse con el servidor', 'error');
    }
  };
  

  const handleResetPassword = async (e) => {
    e.preventDefault();

  
    if (nuevaContraseña !== confirmarContraseña) {
      Swal.fire('Error', 'Las contraseñas no coinciden, intenta de nuevo.', 'error');
      return;
    }
  
    try {
      const response = await fetch(`https://gaiavet-back.onrender.com/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nuevaContraseña,
          confirmarContraseña,
          cedula,
        }),
      });
  
      const result = await response.json();
  console.log(result);
  
      if (response.ok) {
        Swal.fire('Éxito', 'Contraseña restablecida correctamente.', 'success');
        onClose(); // Close modal
      } else {
        Swal.fire('Error', result.message || 'No se pudo restablecer la contraseña', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al conectarse con el servidor', 'error');
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
        >
          X
        </button>
        {step === 1 ? (
          <form onSubmit={handleCorreoSubmit}>
            <h2 className="text-lg font-semibold mb-4">Ingresa tu correo electrónico</h2>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="Correo electrónico"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-teal-300 text-black px-4 py-2 rounded hover:bg-teal-400">
              Enviar código
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleCedulaSubmit}>
            <h2 className="text-lg font-semibold mb-4">Ingresa tu cédula</h2>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
              placeholder="Cédula"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-teal-300 text-black px-4 py-2 rounded hover:bg-teal-400">
              Verificar cédula
            </button>
          </form>
        ) : step === 3 ? (
          <form onSubmit={handleCodigoSubmit}>
            <h2 className="text-lg font-semibold mb-4">Ingresa el código de verificación</h2>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              placeholder="Código de verificación"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-teal-300 text-black px-4 py-2 rounded hover:bg-teal-400">
              Verificar código
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-lg font-semibold mb-4">Ingresa tu nueva contraseña</h2>
            <input
              type="password"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
              placeholder="Nueva contraseña"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <input
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
              placeholder="Confirmar nueva contraseña"
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-teal-300 text-black px-4 py-2 rounded hover:bg-teal-400">
              Restablecer contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContraseñaModal;
