import React, { useEffect, useState, useContext } from 'react';
import { CartProducts } from '../CartProducts/CartProducts';
import tapetes from '../../assets/tapetes-extra-gruesos.webp';

export const Carousel = () => {
  const [products, setProducts] = useState([]);
  const authToken = 'tu_auth_token'; // Asegúrate de que authToken esté definido

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://gaiavet-back.onrender.com/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data.slice(0, 4)); // Selecciona solo los primeros 4 productos
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer los productos:', error);
      }
    };

    fetchProducts();
  }, [authToken]);

  return (
    <div className='w-full h-full bg-slate-100 flex justify-evenly py-10 flex-wrap'>
      <div className='flex justify-evenly flex-wrap'>
        {products.map((product) => (
          <CartProducts
            key={product.idProducto}
            image={product.imagen}
            title={product.nombreProducto}
            description={product.descripcion}
            price={product.precio}
            categoria={product.categoria}
            stock={product.stock}
          />
        ))}
      </div>

      <div className='w-full flex justify-center mt-4'>
        <button className='bg-buttonProducts text-white py-3 px-7 rounded-3xl'>
          Ver todos los productos
        </button>
      </div>
    </div>
  );
};
