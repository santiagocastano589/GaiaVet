import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { ProductCart } from "./ProductCart/ProductCart";
import { AuthContext } from '../../Context/Context';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

export const Cart = ({ onClose }) => {
  const cartContext = useContext(AuthContext);

  const cartItems = Array.isArray(cartContext.cart) ? cartContext.cart : [];

  const totalAmount = cartItems.reduce((total, product) => {
    const price = parseFloat(product.priceProduct);
    return !isNaN(price) ? total + price * product.count : total;
  }, 0).toFixed(2);

  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('APP_USR-3ba60abc-9bdf-4cb8-b724-62265a471d75');

  const createPreference = async () => {

    const productsArray = cartItems.map(product => ({
      idProduct: product.idProduct,
      title: product.titleProduct,
      count: product.count,
      price: parseFloat(product.priceProduct)
    }));
  
    try {
      
      const response = await axios.post('https://gaiavet-back.onrender.com/create_preference', {
        title: 'Tu compra en GaiaVet',
        price: parseFloat(totalAmount),  
        products: productsArray  
      });
  
      const { id } = response.data;
  
      if (id) {
        setPreferenceId(id);
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };
  
  const handleBuy = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'El carrito está vacío',
        text: 'Añade productos al carrito antes de proceder con la compra.',
        confirmButtonText: 'OK'
      });
      return;
    }

    await createPreference();
  };

  const updateQuantity = (idProduct, newQuantity) => {
    cartContext.setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(product => product.idProduct !== idProduct);
      }
      return prevCart.map(product =>
        product.idProduct === idProduct
          ? { ...product, count: newQuantity }
          : product
      );
    });
  };

  const removeProduct = (idProduct) => {
    cartContext.setCart(prevCart =>
      prevCart.filter(product => product.idProduct !== idProduct)
    );
  };

  const removeAllProducts = () => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Se eliminarán todos los productos del carrito.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        cartContext.setCart([]); 
        Swal.fire({
          icon: 'success',
          title: 'Carrito vaciado',
          text: 'Todos los productos han sido eliminados.',
          confirmButtonText: 'OK'
        });
      }
    });
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
                    img={product.imageProduct || ''} 
                    title={product.titleProduct}
                    category={product.categoryProduct}
                    price={product.priceProduct}
                    quantity={product.count}
                    stock={product.stockProduct}
                    onQuantityChange={(newQuantity) => updateQuantity(product.idProduct, newQuantity)}
                    onRemove={() => removeProduct(product.idProduct)}
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
              {preferenceId === null ? (
                <button 
                  type="button" 
                  className='w-3/4 text-white bg-buttonProducts py-2 rounded-3xl'
                  onClick={handleBuy}
                >
                  Comprar Carrito
                </button>
              ) : (
                <Wallet initialization={{ preferenceId: preferenceId }} />
              )}
              <button 
                type="button" 
                className='w-3/5 py-1 rounded-3xl cursor-pointer hover:bg-gray-300 duration-700'
                onClick={removeAllProducts}
              >
                Eliminar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
