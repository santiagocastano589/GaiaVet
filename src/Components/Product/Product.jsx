import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import Swal from 'sweetalert2';

export const Product = ({ id, image, title, alt, description, price, category, stock }) => {
  const productContext = useContext(AuthContext);

  const addProduct = () => {
    // Verificar si hay stock disponible antes de agregar el producto al carrito
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
              stockProduct:stock,
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
    <div className="w-[20rem] h-full m-4 rounded-xl flex flex-col justify-between items-center shadow-md border bg-white px-2 py-6">
      <div className='w-full rounded-xl flex justify-center p-2 '>
        <img className=' rounded-2xl' src={image} alt={alt} />
      </div>
      <div className='w-full flex flex-col justify-evenly text-justify px-6 h-[20rem]'>
        <h2 className='text-4xl gorditas text-center my-2'>
          {title}
        </h2>
        <p className='gorditas text-2xl my-2'>
          ${price}
        </p>
        <p className='text-base'>
          {description}
        </p>
        <p className='text-base font-semibold'>
          Disponibles: {stock}
        </p>
        <div className='w-full flex justify-center my-4'>
          <button onClick={addProduct} className='bg-teal-500 w-[15rem] h-[3rem] rounded-xl'>Agregar</button>
        </div>
      </div>
    </div>
  );
};
