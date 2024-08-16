import React, { useContext, useState } from 'react';
import { ProductCart } from './ProductCart/ProductCart';
import { AuthContext } from '../../Context/Context';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

export const Cart = ({ onClose }) => {
  const cartContext = useContext(AuthContext);

  // Verificar si cartContext.cart es un array válido
  const cartItems = Array.isArray(cartContext.cart) ? cartContext.cart : [];

  // Calcular el total dinámicamente
  const totalAmount = cartItems.reduce((total, product) => {
    const price = parseFloat(product.priceProduct);
    return !isNaN(price) ? total + price : total;
  }, 0).toFixed(2);

  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('APP_USR-3ba60abc-9bdf-4cb8-b724-62265a471d75');

  const createPreference = async () => {

    const generateCartDescription = ()=>{
      return cartItems.map(product => `${product.titleProduct} (x${1})`).join(', ')
    }

    try {
      const response = await axios.post('http://localhost:3000/create_preference', {
        idProduct:1,
        title: generateCartDescription(),
        quantity: 1,
        price: totalAmount,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end font-itim">
      <div className="w-[26vw] h-screen bg-white rounded-s-3xl flex flex-col animate-flip-down p-4">
        <div className='h-[5%] self-end'>
          <p
            className="mr-2 mt-2 cursor-pointer font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white"
            onClick={onClose}
          >
            X
          </p>
        </div>

        <div className='flex flex-col justify-center h-[95%]'>
          <h2 className='font-gorditas text-3xl h-[10%]'>Carrito de compras</h2>

          <div className='h-[80%] items-start overflow-auto'>
            {
              cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <ProductCart
                    key={product.idProduct}
                    img={product.imageProduct || ''} // Asegúrate de proporcionar la URL de la imagen si es necesario
                    title={product.titleProduct}
                    category={product.categoryProduct}
                    price={product.priceProduct}
                  />
                ))
              ) : (
                <p>No hay productos en el carrito.</p>
              )
            }
          </div>

          <hr className='mt-2' />

          <div className='h-[20%]'>
            <div className='h-[30%] flex justify-between text-2xl'>
              <p>Total:</p>
              <p>${totalAmount}</p>
            </div>

            <div className='h-[70%] flex flex-col items-center justify-evenly'>
              <button type="button" className='w-3/4 text-white bg-buttonProducts py-2 rounded-3xl' onClick={handleBuy}>Comprar Carrito</button>
              {preferenceId && 
                <Wallet initialization={{ preferenceId : preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
              }
              <button type="button" className='w-3/5 py-1 rounded-3xl cursor-pointer hover:bg-gray-300 duration-700'>Eliminar carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
