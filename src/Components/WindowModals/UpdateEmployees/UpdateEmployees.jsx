import React, { useState, useContext } from 'react';
import InputProducts from '../../InputProducts/InputProducts';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const UpdateEmployees = ({ cedulaEmpleado,nombre,apellido,edad,tiempoEXP,correo, onClose }) => {
  const [employees, setProduct] = useState({
    cedulaEmpleado:cedulaEmpleado,
    nombre:nombre,
    apellido:apellido,
    edad:edad,
    tiempoEXP:tiempoEXP,
    correo:correo,
  });

  const { authToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: 'GaiaVet',
      text: '¿Deseas actualizar este empleado? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      
      
       
        try {
          const response = await fetch(`https://gaiavet-back.onrender.com/updateEmployee/${cedulaEmpleado}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(UpdateEmployees),
          });

  alert(cedulaEmpleado);
  
          const data = await response.json();
          
          if (response.ok) {
            Swal.fire({
              title: 'Actualizado',
              text: 'El empleado ha sido actualizado con éxito.',
              icon: 'success',
            });
  
           
            onClose();
            // window.location.reload();
          } else {
            Swal.fire({
              title: 'Error',
              text: `Error al actualizar el empleado: ${data.message}`,
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el producto',
            icon: 'error',
          });
        }
      }
    );
  };
  

  return (
    <div className="w-full fixed z-50 inset-0 bg-black bg-opacity-80 transition-all ease-in-out duration-300 font-itim">
      <div className="w-[50rem] h-[30rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-fondo rounded-lg shadow-sm">
        <div className='w-full h-[30rem] flex  items-center rounded-xl bg-white'>
          <div className="w-[100%] h-[30rem] p-4 pr-0 text-white flex flex-col items-center justify-evenly">
            <h3 className='gorditas text-black text-4xl'>Actualización de empleado</h3>
            
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit} >
              <InputProducts nameLabel={'Cedula:'} value={employees.cedulaEmpleado} name='cedulaEmpleado' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Nombre :'} value={employees.nombre} name='nombre' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Apellido:'} value={employees.apellido} name='apellido' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Edad:'} value={employees.edad} name='edad' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Tiempo de experencia:'} value={employees.tiempoEXP} name='tiempoEXP' type='text' onChange={handleChange} />

              
              <div className='w-[90%] text-black flex justify-end mt-4'>
                <button  type="submit" className="px-5 py-1 bg-gray-200 text-green-700 font-medium rounded-lg float-end mr-12 hover:bg-green-100 duration-200" >Guardar</button>
                <button type="button" className="px-5 py-1 bg-red-600 text-white font-medium rounded-lg float-end mr-4 hover:bg-opacity-70 duration-200" onClick={onClose}>Cancelar</button>
              </div>
            </form>
          </div>
          
         
           <div className='h-full'>
           <p
              className="mr-2 mt-2 cursor-pointer font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white"
              onClick={onClose}
            >
              X
            </p>
           </div>
            
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployees;
