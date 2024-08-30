import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/Context';
import { Input } from '../Input/Input';
import logo from '../../assets/logoGaia.webp';
import { Button } from '../Button/Button';
import { Header } from '../Layouts/Header/Header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EmployeeRegister = () => {
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    cedulaEmpleado: '',
    nombre: '',
    apellido: '',
    edad: 0,
    tiempoExp: '',
    correo: '',
    contraseña: '',
    role: 'Empleado',
  });
  const { authToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {

    console.log(employee);
    
    e.preventDefault();

    if (!authToken) {
      console.error('Token de autenticación no disponible');
      alert('Token de autenticación no disponible');
      return;
    }

    if (!employee.nombre || !employee.correo || !employee.contraseña || !employee.nombre || !employee.cedulaEmpleado || !employee.apellido || ! employee.edad || ! employee.correo) {
      Swal.fire({
        title: 'Error ',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    try {
      const response = await fetch('https://gaiavet-back.onrender.com/newEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(employee),
      });

      
      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        console.log(data.message);
        throw new Error('Error al eliminar el usuario');
        
      }

      if (response.ok) {
        Swal.fire({
          title: 'Empleado registrado',
          text: 'El empleado fue registrado exitosamente',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        setEmployee({
          cedulaEmpleado: '',
          nombre: '',
          apellido: '',
          edad: 0,
          tiempoExp: '',
          correo: '',
          contraseña: '',
          role: 'Empleado',
        });
        setSuccessful(true);
      } else {
        Swal.fire({
          title: 'Error',
          text: ('Error al registrar el empleado: ' + data.message),
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error al registrar el empleado');
    }
  };

  if (successful) {
    navigate('/admin/employees');
  }
  return (
    <div className='h-full w-full flex flex-col'>
      <Header title='Registrar Empleado' classN='text-7xl'/>
      <div className='flex justify-center items-center z-0 pt-36 pb-10 '>
        <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
          <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
            <img className='' src={logo} alt='logo' />
          </div>
          <h2 className='my-3'>REGISTRAR EMPLEADO</h2>
          <form className='flex flex-col'>
            <Input lblName={'Cedula del Empleado'} name='cedulaEmpleado' type='text' placeholder='Ingrese la cedula del empleado' onChange={handleChange} value={employee.cedulaEmpleado} />
            <Input lblName={'Nombre del empleado'} name='nombre' type='text' placeholder='Ingrese el nombre del empleado' onChange={handleChange} value={employee.nombre} />
            <Input lblName={'Apellido del empleado'} name='apellido' type='text' placeholder='Ingrese el apellido del empleado' onChange={handleChange} value={employee.apellido} />
            <Input lblName={'Edad del empleado'} name='edad' type='number' placeholder='Ingrese la edad del empleado' onChange={handleChange} value={employee.edad} />
            <Input lblName={'Tiempo de experiencia'} name='tiempoExp' type='text' placeholder='Ingrese el tiempo de experiencia del empleado' onChange={handleChange} value={employee.tiempoExp} />
            <Input lblName={'Correo del empleado'} name='correo' type='email' placeholder='Ingrese el correo del empleado' onChange={handleChange} value={employee.correo} />
            <Input lblName={'Contraseña del empleado'} name='contraseña' type='password' placeholder='Ingrese la contraseña del empleado' onChange={handleChange} value={employee.contraseña} />
            <div className='flex justify-center items-center flex-col'>
              <Button onClick={handleSubmit} textButton='Registrar Empleado' type='submit' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
