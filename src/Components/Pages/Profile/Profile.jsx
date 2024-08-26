import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../Layouts/Header/Header';
import ImgUser from '../../../assets/imgUser.png';
import { InputProfile } from '../../InputProfile/InputProfile';
import { AuthContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCamera } from 'react-icons/fa';
import { SelectIcon } from '../../WindowModals/SelectIcon/SelectIcon';

export const Profile = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [iconSelection, setIconSelection] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    telefono: '',
    imagen: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      setUserData(data);
      setFormData({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        direccion: data.direccion,
        telefono: data.telefono,
        imagen: data.imagen || ImgUser,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [authToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    Swal.fire({
      title: '¿Estás seguro de esto?',
      text: 'Tendrás que esperar un tiempo para volver a actualizar la información',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('https://gaiavet-back.onrender.com/user', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to update user data');
          }

          await fetchUserData();
          setEditMode(false);

          Swal.fire({
            title: 'Datos actualizados!',
            text: 'Tu información ha sido actualizada correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        } catch (error) {
          console.error('Error updating user data:', error);

          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al actualizar tus datos. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelada',
          text: 'Tu información se mantendrá como estaba :)',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
        handleCancelClick();
      }
    });
  };

  const handleCancelClick = () => {
    setFormData({
      nombre: userData.nombre,
      apellido: userData.apellido,
      correo: userData.correo,
      direccion: userData.direccion,
      telefono: userData.telefono,
      imagen: userData.icono,
    });
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeSesion = () => {
    Swal.fire({
      title: 'GaiaVet',
      text: '¿Deseas cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Tu sesión ha sido cerrada correctamente',
          icon: 'success',
        });
        localStorage.removeItem('token', 'role');
        localStorage.removeItem('role');
        navigate('/');

        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    });
  };

  const controlSelection = () => {
    if (!iconSelection) {
      setIconSelection(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIconSelection(false);
      document.body.style.overflow = 'auto';
    }
  };

  const handleIconSelect = (imagen) => {
    setSelectedImage(imagen);
    setFormData({
      ...formData,
      imagen: imagen,
    });
    setIconSelection(false);
    document.body.style.overflow = 'auto';
    setShowConfirmButton(true);
  };

  const handleConfirmImage = () => {
    setShowConfirmButton(false);
  };

  const deleteUser = async () => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar tu cuenta?',
      text: 'Esta acción es irreversible y eliminará todos tus datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('https://gaiavet-back.onrender.com/me/deleteAccount', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }

          Swal.fire({
            title: 'Cuenta eliminada!',
            text: 'Tu cuenta ha sido eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });

          localStorage.removeItem('token', 'role');
          localStorage.removeItem('role');
          navigate('/');

          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } catch (error) {
          console.error('Error:', error);

          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al eliminar tu cuenta. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
        }
      }
    });
  };

  return (
    <>
      <Header />
      <div className="w-full pt-40">
        <div className="w-full flex justify-center flex-col">
          <h2 className="gorditas text-7xl self-center">Gestión de perfil</h2>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-72 h-72 relative group flex flex-col items-center justify-center my-8">
              <div className='h-full w-full'>
                <img
                  className="rounded-full w-full h-full shadow-formShadow object-contain"
                  src={selectedImage || userData.imagen || ImgUser}
                  alt="User"
                />
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <FaCamera className="text-white text-3xl" />
                <span className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' onClick={controlSelection}></span>
              </div>

              {iconSelection && <SelectIcon onClose={controlSelection} onSelect={handleIconSelect} />}
            </div>

            {showConfirmButton && (
              <button 
                className='w-52 h-12 rounded-xl bg-buttonProducts text-white mb-10'
                onClick={handleSaveClick} // Confirmar imagen al hacer clic
              >
                Confirmar imagen
              </button>
            )}

            <p className="text-5xl mb-5">{userData.nombre + " " + userData.apellido}</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-2/4 h-auto bg-blue-border rounded-xl p-8">
              <InputProfile lblName="Nombre" name="nombre" initialValue={formData.nombre} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName="Apellido" name="apellido" initialValue={formData.apellido} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName="Correo" name="correo" initialValue={formData.correo} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName="Dirección" name="direccion" initialValue={formData.direccion} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName="Telefono" name="telefono" initialValue={formData.telefono} editMode={editMode} onValueChange={handleChange} />

              {!editMode ? (
                <button onClick={handleEditClick} className="px-5 py-1 bg-black text-white rounded-lg float-end me-16 hover:bg-gray-700">Editar</button>
              ) : (
                <>
                  <button onClick={handleSaveClick} className="px-5 py-1 bg-white text-green-700 font-medium rounded-lg float-end mr-12">Guardar</button>
                  <button onClick={handleCancelClick} className="px-5 py-1 bg-red-600 text-white font-medium rounded-lg float-end mr-4">Cancelar</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-3/5 flex justify-evenly my-10">
            <button onClick={closeSesion} className="w-60 h-12 rounded-xl bg-buttonProducts text-white" type="button">Cerrar Sesión</button>
            <button onClick={deleteUser} className="w-60 h-12 rounded-xl bg-red-600 text-white" type="button">Eliminar cuenta</button>
          </div>
        </div>
      </div>
    </>
  );
};