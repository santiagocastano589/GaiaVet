import React, { useContext } from 'react';
import { AuthContext } from '../Context/Context';
import Swal from 'sweetalert2';


export const Product = ({ id, image, title, alt, description, price, category }) => {
  const productContext = useContext(AuthContext);

  const addProduct = () => {
    
    // Asegúrate de que la actualización del carrito se realice correctamente
    productContext.setCart(prevCart => [
      ...prevCart,
      {
        idProduct: id,
        imageProduct: image,
        titleProduct: title,
        priceProduct: price,
        categoryProduct: category
      }
    ]);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado con exito',
        showConfirmButton: true,
      });
  };

  return (
    <div className="w-[20rem] m-6 rounded-xl flex flex-col justify-between items-center shadow-md border bg-white px-2 py-6">
      <div className='w-full rounded-xl flex justify-center p-2 '>
        <img className=' rounded-2xl' src={image} alt={alt} />
      </div>
      <div className='w-full flex flex-col justify-evenly text-justify px-6'>
        <h2 className='text-4xl gorditas text-center my-2'>
          {title}
        </h2>
        <p className='gorditas text-2xl my-2'>
          ${price}
        </p>
        <p className='text-base'>
          {description}
        </p>
        <div className='w-full flex justify-center my-4'>
          <button onClick={addProduct} className='bg-teal-500 w-[15rem] h-[3rem] rounded-xl'>Agregar</button>
        </div>
      </div>
    </div>
  );
};
