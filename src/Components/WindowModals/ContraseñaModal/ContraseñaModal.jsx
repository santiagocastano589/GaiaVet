import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const ContraseñaModal = ({ onClose }) => {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [step, setStep] = useState(1); // 1: input de correo, 2: input de código, 3: nueva contraseña

  const handleCorreoSubmit = async (e) => {
    e.preventDefault();
    // Simular el envío del correo
    const success = true; // Cambia esto según la respuesta del servidor
    if (success) {
      setStep(2);
    } else {
      Swal.fire('Error', 'No se pudo enviar el código, intenta de nuevo.', 'error');
    }
  };

  const handleCodigoSubmit = (e) => {
    e.preventDefault();
    // Simular la verificación del código
    const success = true; // Cambia esto según la respuesta del servidor
    if (success) {
      setStep(3); // Pasar al siguiente paso: ingresar nueva contraseña
    } else {
      Swal.fire('Error', 'Código incorrecto, intenta de nuevo.', 'error');
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Verificar que ambas contraseñas coincidan
    if (nuevaContraseña !== confirmarContraseña) {
      Swal.fire('Error', 'Las contraseñas no coinciden, intenta de nuevo.', 'error');
      return;
    }

    // Aquí puedes agregar la lógica para restablecer la contraseña en el servidor
    Swal.fire('Éxito', 'Contraseña restablecida correctamente.', 'success');
    onClose(); // Cerrar el modal
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
