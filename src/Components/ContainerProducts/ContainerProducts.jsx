import React, { useEffect, useState, useContext } from 'react';
import { Product } from '../Product/Product';
import { AuthContext } from '../Context/Context';

export const ContainerProducts = () => {
  const [products, setProducts] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!authToken) return;

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
          setProducts(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }

      } catch (error) {
        console.log('Error al traer los productos:', error);
      }
    };

    fetchProducts();
  }, [authToken]);

  // Log de los productos para verificar
  useEffect(() => {
    console.log('Productos:', products);
  }, [products]);

  return (
    <div className='w-full flex flex-wrap p-4 justify-center items-center'>
      {products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product.idProducto}
            id={product.idProducto}
            image={product.imagen}
            description={product.descripcion}
            title={product.nombreProducto}
            alt={product.nombreProducto}
            price={product.precio}
            category={product.categoria}
          />
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};
