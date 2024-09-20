import React, { useEffect, useState, useContext } from 'react';
import { CartProducts } from '../CartProducts/CartProducts';
import tapetes from '../../assets/tapetes-extra-gruesos.webp';

export const Carousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://gaiavet-back.onrender.com/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, []);

  return (
    <div className='w-full h-full bg-slate-100 flex justify-evenly py-10 flex-wrap '>
      <div className='w-full flex justify-evenly flex-wrap sm:flex-col sm:items-center lg:flex-row lg:px-4'>
        {products.map((product) => (
          <CartProducts
            key={product.idProducto}
            id={product.idProducto}
            image={product.imagen}
            title={product.nombreProducto}
            description={product.descripcion}
            price={product.precio}
            category={product.categoria}
            stock={product.stock}
          />
        ))}
      </div>

      {/* <div className='w-full flex justify-center mt-4'>
        <button className='bg-buttonProducts text-white py-3 px-7 rounded-3xl'>
          Ver todos los productos
        </button>
      </div> */}
    </div>
  );
};
