import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const ProductCart = ({ img, title, category, price, quantity: initialQuantity, onQuantityChange, onRemove, stock }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No hay suficiente stock disponible',
        showConfirmButton: true,
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    } else {
      handleRemove(); // Si la cantidad llega a 0, elimina el producto
    }
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className='h-[30%] mt-4 flex rounded-3xl'>
      <img
        className='w-1/4 h-full rounded-xl object-cover'
        src={img}
        alt="Product"
      />

      <div className='w-3/4 pl-2'>
        <h3 className='text-gray-700'>{title}</h3>
        <p className='text-gray-700 text-sm'>Categoría: {category}</p>
        <p>$ {price}</p>
        <p className='text-sm'>Disponibles: {stock}</p>

        <div className="relative flex items-center max-w-[6.4rem]">
          <button
            type="button"
            onClick={handleDecrement}
            className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-s-lg p-2.5 h-8 focus:ring-gray-300 focus:outline-none"
          >
            <svg
              className="w-2.5 h-2.5 text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="bg-gray-100 border-x-0 border-gray-300 h-8 text-center text-gray-700 text-xs focus:ring-gray-500 focus:border-gray-500 block w-full py-2"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-e-lg p-2.5 h-8 focus:ring-gray-300 focus:outline-none"
          >
            <svg
              className="w-2.5 h-2.5 text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>

        <p onClick={handleRemove} className='text-center w-16 text-gray-700 hover:border-b hover:border-gray-500 duration-300 cursor-pointer'>
          Eliminar
        </p>
      </div>
    </div>
  );
};
