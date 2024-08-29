import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/Context';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const Product = ({ id, image, title, alt, description, price, category, stock }) => {
  const productContext = useContext(AuthContext);
  const [buttonBuy, setButtonBuy] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setButtonBuy(!!token); 
  }, []);

  const addProduct = () => {
    productContext.setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(product => product.idProduct === id);
      const existingProduct = prevCart[existingProductIndex];

      if (existingProduct) {
        if (existingProduct.count < stock) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].count += 1;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado con éxito',
            showConfirmButton: true,
          });

          return updatedCart;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay suficiente stock disponible',
            showConfirmButton: true,
          });
          return prevCart;
        }
      } else {
        if (stock > 0) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado con éxito',
            showConfirmButton: true,
          });

          return [
            ...prevCart,
            {
              idProduct: id,
              imageProduct: image,
              titleProduct: title,
              priceProduct: price,
              categoryProduct: category,
              stockProduct: stock,
              count: 1
            }
          ];
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay stock disponible',
            showConfirmButton: true,
          });
          return prevCart;
        }
      }
    });
  };

  return (
    <div className="w-[20rem] h-[70vh] m-6 rounded-xl flex flex-col justify-between items-center shadow-md border bg-white px-2 py-6">

      <div className='w-full h-2/5 rounded-xl flex justify-center '>
        <img className='rounded-2xl' src={image} alt={alt} />
      </div>

      <div className='w-full flex flex-col justify-between px-6 flex-1'>
        <h2 className='text-2xl gorditas text-center my-2'>
          {title}
        </h2>

        <p className='gorditas text-xl my-2'>
          ${price}
        </p>
        
        <p className='text-base text-left line-clamp-3 overflow-hidden'>
          {description}
        </p>

        <p className='text-base font-semibold'>
          Disponibles: {stock}
        </p>
      </div>

      <div className='w-full flex justify-center mt-4'>
        {buttonBuy ? (
          <button onClick={addProduct} className='bg-teal-500 w-[15rem] h-[3rem] rounded-xl text-white'>Agregar</button>
        ) : (
          <Link to={"/login"}>
            <button className='bg-teal-500 w-[15rem] h-[3rem] rounded-xl text-white'>Iniciar sesión</button>
          </Link>
        )}
      </div>
    </div>
  );
};
