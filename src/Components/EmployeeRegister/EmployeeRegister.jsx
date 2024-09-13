import React, { useState, useContext,useRef } from 'react';
import { AuthContext } from '../Context/Context';
import { Input } from '../Input/Input';
import logo from '../../assets/logoGaia.webp';
import { Button } from '../Button/Button';
import { Header } from '../Layouts/Header/Header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import imgUser from '../../assets/imgUser.png'


export const EmployeeRegister = () => {
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const formData = useRef({
    foto: '',
    cedulaEmpleado: '',
    nombre: '',
    apellido: '',
    edad: 0,
    tiempoExp: '',
    cargo:'',
    correo: '',
    contraseña: '',
    role: 'Empleado',
  });

  const { authToken } = useContext(AuthContext);

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
    

    if (!authToken) {
      console.error('Token de autenticación no disponible');
      alert('Token de autenticación no disponible');
      return;
    }

    // if (!employee.nombre || !employee.correo || !employee.contraseña || !employee.nombre || !employee.cedulaEmpleado || !employee.apellido || ! employee.edad || ! employee.correo) {
    //   Swal.fire({
    //     title: 'Error ',
    //     text: 'Todos los campos son obligatorios',
    //     icon: 'error',
    //     confirmButtonColor: '#3085d6',
    //   });
    //   return;
    // }


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

      const response = await fetch('https://gaiavet-back.onrender.com/newEmployee', {
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
          title: 'Empleado registrado!',
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

  if (successful) {
    navigate('/admin/employees');
  }
  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Registrar Empleado' classN='text-7xl'/>
      <div className='flex justify-evenly items-center z-0 pt-36 pb-10 '>
        <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='logo' />
          </div>
          <h2 className='my-3'>REGISTRAR EMPLEADO</h2>
          <form className='flex flex-col'>
          <Input name='foto' lblName='Foto del empleado' type='file' placeholder='Seleccionar foto de empleado' accept='image/*' onChange={handleChange} />
            <Input lblName={'Cedula del Empleado'} name='cedulaEmpleado' type='text' placeholder='Ingrese la cedula del empleado' onChange={handleChange}  />
            <Input lblName={'Nombre del empleado'} name='nombre' type='text' placeholder='Ingrese el nombre del empleado' onChange={handleChange}  />
            <Input lblName={'Apellido del empleado'} name='apellido' type='text' placeholder='Ingrese el apellido del empleado' onChange={handleChange}  />
            <Input lblName={'Edad del empleado'} name='edad' type='number' placeholder='Ingrese la edad del empleado' onChange={handleChange}  />
            <label className='my-4 mx-9'>Selecciona el cargo:</label>
            <select name="cargo" className='w-80 mx-9 p-3 rounded-xl border-solid border-2 border-gray-50r focus:outline-none focus:border-blue-border' onChange={handleChange}>
                <option defaultChecked  value="">-----</option>
                <option value="Baño">Baño</option>
                <option value="Guardería">Guardería</option>
                <option value="Peluquería">Peluquería</option>
                <option value="Consulta">Consulta</option>
            </select>
            <Input lblName={'Tiempo de experiencia'} name='tiempoExp' type='text' placeholder='Ingrese el tiempo de experiencia del empleado' onChange={handleChange}  />
            <Input lblName={'Correo del empleado'} name='correo' type='email' placeholder='Ingrese el correo del empleado' onChange={handleChange}  />
            <Input lblName={'Contraseña del empleado'} name='contraseña' type='password' placeholder='Ingrese la contraseña del empleado' onChange={handleChange}  />
            <div className='flex justify-center items-center flex-col'>
              <Button onClick={handleSubmit} textButton='Registrar Empleado' type='submit' />
            </div>
          </form>
        </div>

        <div className='w-96 h-96 p-4 bg-white self-start mt-20 rounded-3xl shadow-formShadow'>
          <img className='w-full h-full rounded-3xl object-contain' src={selectedImage ? URL.createObjectURL(selectedImage) : imgUser} alt="Aca se vera tu mascota" />
        </div>
      </div>
    </div>
  );
};
