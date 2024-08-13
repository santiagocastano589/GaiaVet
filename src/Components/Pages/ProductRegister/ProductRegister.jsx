import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Input } from '../../Input/Input';
import { Header } from '../../Layouts/Header/Header';
import logo from '../../../assets/logoGaia.webp';
import { Button } from '../../Button/Button';

export const ProductRegister = () => {
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    imagen: '',
    categoria: '',
    stock: 0,
    precio: 0,
  });
  const { authToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Producto registrado con éxito');
      } else {
        alert('Error al registrar el producto: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar el producto');
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };  

  return (
    <>
      <div className='h-full w-full flex flex-col'>
        <Header title='Registrar Producto' />
        <div className='flex justify-center items-center z-0 pt-36 pb-10 '>

          <div className='bg-white flex justify-center items-center flex-col border-solid border-2 border-gray rounded-lg mt-4'>
            <div className='w-24 p-3 bg-blue-border rounded-full my-6'>
              <img className='' src={logo} alt='' />
            </div>
            <h2 className='my-3'>REGISTRAR PRODUCTO</h2>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <Input lblName={'Nombre del producto'} name='nombreProducto' type='text' placeholder='Ingrese el nombre del producto' onChange={handleChange} />
              <Input lblName={'Descripcion del producto'} name='descripcion' type='textarea' placeholder='Ingrese la descripcion del producto' onChange={handleChange} />
              <Input lblName={'Imagen del producto'} name='imagen' type='text' placeholder='Ingrese la url de la imagen del producto' onChange={handleChange} />
              <Input lblName={'Categoria del producto'} name='categoria' type='text' placeholder='Ingrese la categoria del producto' onChange={handleChange} />
              <Input lblName={'Precio del producto'} name='precio' type='number' placeholder='Ingrese el precio del producto' onChange={handleChange} />
              <Input lblName={'Stock del producto'} name='stock' type='number' placeholder='Ingrese la cantidad disponible del producto' onChange={handleChange} />
              <div className='flex justify-center items-center flex-col'>
                <Button textButton='Registrar Producto' onClick={handleSubmit} />
                <div>
      <Button textButton="Abrir Modal" onClick={openModal} />
      <ProductRegisterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

