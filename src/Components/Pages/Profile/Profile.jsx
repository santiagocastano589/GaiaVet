import React, { useEffect, useState, useContext } from 'react';
import { Header } from '../../Layouts/Header/Header';
import ImgUser from '../../../assets/imgUser.png';
import './Profile.css';
import { InputProfile } from '../../InputProfile/InputProfile';
import { AuthContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

  const navigate = useNavigate();

  const { authToken } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: '',
    telefono: ''
  });

  useEffect(() => {
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
          telefono: data.telefono
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/usuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }else if (response.ok) {
        alert('Actualizacion exitosa')
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setFormData({
        nombre: updatedData.nombre,
        apellido: updatedData.apellido,
        correo: updatedData.correo,
        direccion: updatedData.direccion,
        telefono: updatedData.telefono,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancelClick = () => {
    setFormData({
      nombre: userData.nombre,
      apellido: userData.apellido,
      correo: userData.correo,
      direccion: userData.direccion,
      telefono: userData.telefono,
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


  const closeSesion = ()=>{
    localStorage.removeItem('token')
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div className='w-full pt-40'>
        <div className='w-full flex justify-center flex-col'>
          <h2 className=' gorditas text-7xl self-center'>Gestión de perfil</h2>
          <div className='flex flex-col items-center justify-center w-full'>
            <img className='rounded-full w-72 h-72 my-5' src={ImgUser} alt="" />
            <p className='text-5xl mb-5'>{userData.nombre + " " + userData.apellido}</p>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-2/4 h-auto bg-blue-border rounded-xl p-8'>
              <InputProfile lblName='Nombre' name='nombre' initialValue={formData.nombre} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName='Apellido' name='apellido' initialValue={formData.apellido} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName='Correo' name='correo' initialValue={formData.correo} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName='Dirección' name='direccion' initialValue={formData.direccion} editMode={editMode} onValueChange={handleChange} />
              <InputProfile lblName='Telefono' name='telefono' initialValue={formData.telefono} editMode={editMode} onValueChange={handleChange} />
              
              {!editMode ? (
                <button onClick={handleEditClick} className='px-5 py-1 bg-black text-white rounded-lg float-end me-16 hover:bg-gray-700'>Editar</button>
              ) : (
                <>
                  <button onClick={handleSaveClick} className='px-5 py-1 bg-white text-green-700 font-medium rounded-lg float-end mr-12'>Guardar</button>
                  <button onClick={handleCancelClick} className='px-5 py-1 bg-red-600 text-white font-medium rounded-lg float-end mr-4'>Cancelar</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-3/5 flex justify-evenly my-10'>
            <button onClick={closeSesion} className='w-60 h-12 rounded-xl bg-buttonProducts text-white' type="button">Cerrar Sesión</button>
            <button className='w-60 h-12 rounded-xl bg-red-600 text-white' type="button">Eliminar cuenta</button>
          </div>
        </div>
      </div>
    </>
  );
}
