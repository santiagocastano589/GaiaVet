import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logoGaia.webp';
import { Input } from '../../Input/Input';
import { Button } from '../../Button/Button';
import { Header } from '../../Layouts/Header/Header';
import { AuthContext } from '../../Context/Context';
import Select from 'react-select';
import Swal from 'sweetalert2';
import raza from '../../../../public/js/RazaPet';

export const PetRegister = () => {
  const { authToken } = useContext(AuthContext);
  const [successful, setSuccessful] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRaza, setSelectedRaza] = useState(null); // Inicializa como null

  const navigate = useNavigate();

  const formData = useRef({
    nombre: '',
    TipoMascota: '',
    raza: '',
    edad: '',
    peso: '',
    temperamento: '',
    foto: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      setSelectedImage(files[0]);
    } else {
      formData.current[name] = value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.current.TipoMascota = selectedCategory;
    formData.current.raza = selectedRaza ? selectedRaza.value : '';

    const { nombre, TipoMascota, raza, edad, peso, temperamento } = formData.current;
    if (!nombre || !TipoMascota || !raza || !edad || !peso || !temperamento || !selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos y seleccione una imagen para la mascota.',
      });
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('file', selectedImage);
      uploadData.append('upload_preset', 'hz5sgkps');

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

      formData.current.foto = cloudinaryData.secure_url;

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
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mascota registrada!!',
        showConfirmButton: true,
      });

      setSuccessful(true);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  if (successful) {
    navigate('/pets');
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Registrar mascota' classN='text-7xl'/>
      <div className='flex justify-around items-center z-0 pt-48 pb-10'>
        <div className='w-[30rem] bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='' />
          </div>
          <h2 className='my-3'>REGISTRO DE MASCOTAS</h2>
          <form className='flex flex-col'>
            <Input name='foto' lblName='Foto de la mascota' type='file' placeholder='Seleccionar imagen de mascota' accept='image/*' onChange={handleChange} />
            <Input name='nombre' lblName='Nombre de la mascota' type='text' placeholder='Ingrese el nombre de la mascota' onChange={handleChange} />
            <div className='text-black w-[90%] mt-2'>
              <label className='text-black text-lg text-balance my-4 mx-9' htmlFor="">Tipo de mascotas: </label>
              <div className='w-96 flex justify-center mt-3'>
                <select
                  id="categorias"
                  name="categoria"
                  className="block px-4 py-2 w-80 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-blue-border"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="" disabled>
                    -- Selecciona el tipo de mascota --
                  </option>
                  <option value="Gato">Gato</option>
                  <option value="Perro">Perro</option>
                  <option value="Aves">Aves</option>
                  <option value="Roedores">Roedores</option>
                  <option value="Reptiles">Reptiles</option>
                  <option value="Conejos">Conejos</option>
                  <option value="Hurones">Hurones</option>
                </select>
              </div>
            </div>

            <div className='text-black w-[100%] mt-2'>
              <label className='text-black text-lg text-balance my-4 mx-9' htmlFor="">Raza de la mascota </label>
              <div className='flex justify-center mt-3'>
                <div className='w-80'>
                  <Select
                    id="productos"
                    name="productos"
                    className="w-full"
                    options={raza}
                    value={selectedRaza}
                    placeholder="-- Selecciona una raza --"
                    onChange={(option) => setSelectedRaza(option ? option : null)}
                    isSearchable
                  />
                </div>
              </div>
            </div>

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
