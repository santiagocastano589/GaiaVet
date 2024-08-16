import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';


export const PetRegister = () => {
  const { authToken } = useContext(AuthContext);
  const [successful, setSuccessful] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada
  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    tipo: '',
    raza: '',
    edad: '',
    peso: '',
    temperamento: '',
    foto: '' // Este campo se llenará con la URL de Cloudinary
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      setSelectedImage(files[0]); // Almacena la imagen seleccionada
    } else {
      formData.current[name] = value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona una imagen para la mascota.',
      });
      return;
    }

    try {
      // Subir la imagen a Cloudinary
      const uploadData = new FormData();
      uploadData.append('file', selectedImage);
      uploadData.append('upload_preset', 'hz5sgkps'); // Reemplaza 'YOUR_UPLOAD_PRESET' con tu preset de Cloudinary

      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dxg8bqs9x/image/upload', {
        method: 'POST',
        body: uploadData,
      });

      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo subir la imagen. Por favor, intenta nuevamente.',
        });
        throw new Error('Error al subir la imagen a Cloudinary');
      }

      formData.current.foto = cloudinaryData.secure_url; // Asigna la URL de Cloudinary al campo de la foto

      // Proceder con el registro de la mascota
      const dataEnd = { ...formData.current };

      const response = await fetch('https://gaiavet-back.onrender.com/newPet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(dataEnd),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        });
        throw new Error('Error en la solicitud');
      } else if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Mascota registrada!!',
          showConfirmButton: true,
        });

        setSuccessful(true);
      }

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  // Redirigir a la página de mascotas si el registro es exitoso
  if (successful) {
    navigate('/pets');
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Registrar mascota' />
      <div className='flex justify-around items-center z-0 pt-48 pb-10 '>
        <div className='w-[30rem] bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='' />
          </div>
          <h2 className='my-3'>REGISTRO DE MASCOTAS</h2>
          <form className='flex flex-col'>
            <Input name='foto' lblName='Foto de la mascota' type='file' placeholder='Seleccionar imagen de mascota' accept='image/*' onChange={handleChange} />
            <Input name='nombre' lblName='Nombre de la mascota' type='text' placeholder='Ingrese el nombre de la mascota' onChange={handleChange} />
            <Input name='tipo' lblName='Tipo de mascota' type='text' placeholder='Ingrese el tipo de mascota' onChange={handleChange} />
            <Input name='raza' lblName='Raza de la mascota' type='text' placeholder='Ingrese la raza de la mascota' onChange={handleChange} />
            <Input name='edad' lblName='Edad de la mascota (meses)' type='number' placeholder='Ingrese la edad de la mascota (meses)' onChange={handleChange} />
            <Input name='peso' lblName='Peso de la mascota (Kg)' type='number' placeholder='Ingrese el peso de la mascota (Kg)' onChange={handleChange} />
            <Input name='temperamento' lblName='Temperamento' type='text' placeholder='Ingrese Temperamento de su mascota' onChange={handleChange} />
            <div className='flex justify-center items-center flex-col'>
              <Button textButton='Registrar Mascota' onClick={handleSubmit} />
            </div>
          </form>
        </div>

        <div className='w-96 h-96 p-4 bg-white self-start mt-20 rounded-3xl shadow-formShadow'>
          <img className='w-full h-full rounded-3xl object-contain' src={selectedImage ? URL.createObjectURL(selectedImage) : 'https://res.cloudinary.com/dxg8bqs9x/image/upload/v1722549987/samples/animals/cat.jpg'} alt="Aca se vera tu mascota" />
        </div>
      </div>
    </div>
  );
};
