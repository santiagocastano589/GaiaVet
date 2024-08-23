import React, { useContext, useState } from 'react';
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
    // Generar la descripción del carrito para Mercado Pago
    const generateCartDescription = () => {
      return cartItems.map(product => `${product.titleProduct} (x${product.count})`).join(', ');
    }
  
    // Crear el array de productos para la disminución de stock
    const productsArray = cartItems.map(product => ({
      idProduct: product.idProduct,
      title: product.titleProduct,
      count: product.count,
      price: parseFloat(product.priceProduct)
    }));
  
    try {
      // Enviar los datos para crear la preferencia de Mercado Pago
      const response = await axios.post('https://gaiavet-back.onrender.com/create_preference', {
        title: generateCartDescription(),
        price: parseFloat(totalAmount),  // Asegúrate de que el precio total esté en formato numérico
        products: productsArray  // Array de productos para la disminución de stock
      });
  
      const { id } = response.data;
  
      if (id) {
        // Aquí puedes realizar cualquier acción adicional con el ID de la preferencia
        setPreferenceId(id);
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };
  
  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
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
                    stock={product.stockProduct}  // Pasar el stock correctamente
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
              <button type="button" className='w-3/4 text-white bg-buttonProducts py-2 rounded-3xl' onClick={handleBuy}>Comprar Carrito</button>
              {preferenceId &&
                <Wallet initialization={{ preferenceId: preferenceId }} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
