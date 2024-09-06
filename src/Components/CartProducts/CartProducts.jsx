import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/Context';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const CartProducts = ({id, title, description, price, image, category, stock }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const productContext = useContext(AuthContext);
  const [buttonBuy, setButtonBuy] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setButtonBuy(!!token); 
  }, []);
  const addProduct = () => {
    console.log("1");

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
    <div className='w-2/5 bg-white flex justify-evenly rounded-3xl items-center px-4 my-4 shadow-2xl'>
      <div className='w-2/6 rounded-xl'>
        <img src={image} alt='' />
      </div>
      <div className='w-3/5 flex flex-col p-4 items-start'>
        <div>
          <h4 className='text-center text-xl font-semibold '>{title}</h4>
        </div>
        <div className='w-full'>
          <p className='text-sm pb-8 pt-2 text-start'>{description}</p>
        </div>
        <div className='w-full flex justify-start items-center'>
          <div>
            <p className='text-lg'>${price}</p>
          </div>
          <div>
            <button className='text-white ml-6 w-full px-8 py-2 rounded-full bg-teal-500 shadow-md hover:bg-teal-400' onClick={handleOpenModal}>Comprar</button>
          </div>
        </div>
      </div>

      {showModal && (

        <div className="fixed inset-0 flex flec-col items-center justify-center z-50 bg-opacity-80 bg-gray-700">
          <div className="bg-white rounded-lg border-2 border-blue-border w-3/5 h-3/5">
            
          <button type="button" className="float-end bg-blue-border rounded-full p-1 m-2" onClick={handleCloseModal}>
            <span className="sr-only">Cerrar</span>   
            <svg aria-hidden="true" className="w-5 h-5 text-white hover:text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className='flex h-full'>

          <div className='flex flex-col justify-center items-center w-2/4 h-full'>
            <img className='h-96 object-cover' src={image} alt="" />
            <p className='text-3xl font-semibold '>COP ${price}</p>
          </div>

            <div className='flex flex-col justify-evenly'>
            <div>
            <h2 className='text-4xl mb-3'>{title}</h2>
            <p className='text-lg '>{description}</p>
            </div>

            <div className='flex flex-col justify-evenly h-48'>
            <p>Categoria: {category}</p>
            <p>Disponibles: {stock}</p>
            
            <div className='flex items-center'>

                <button className='w-6 h-6 bg-blue-border rounded-full text-white'>-</button>
                  <p className='mx-2 bg-gray-300 p-1 rounded-md'>0</p>
                <button className='w-6 h-6 bg-blue-border rounded-full text-white'>+</button></div>

            
            </div>
            <div className=' flex justify-evenly w-96'>
            {buttonBuy ? (
                 <button onClick={addProduct} className='bg-teal-500 w-[15rem] h-[3rem] rounded-xl text-white'>Agregar al carrito</button>
                ) : (
                  <Link to={"/login"}>
                    <button className='text-white hover:bg-teal-300 rounded-lg bg-blue-border p-2'>Iniciar sesión</button>
                  </Link>
                )}
                <button className='text-white hover:bg-teal-300 rounded-lg bg-blue-border p-2'>Comprar ahora</button>
            </div>
            </div>
            
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
