import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/Context';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export const CartProducts = ({ id, title, description, price, image, category, stock }) => {
  const [showModal, setShowModal] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null); // Para la preferencia de pago
  const [buttonBuy, setButtonBuy] = useState(false);

  const cartContext = useContext(AuthContext);
  const cartItems = Array.isArray(cartContext.cart) ? cartContext.cart : [];

  const productsArray = cartItems.map((product) => ({
    idProduct: product.idProduct,
    title: product.titleProduct,
    count: product.count,
    price: parseFloat(product.priceProduct),
  }));

  const productContext = useContext(AuthContext);
  const totalAmount = cartItems
    .reduce((total, product) => {
      const price = parseFloat(product.priceProduct);
      return !isNaN(price) ? total + price * product.count : total;
    }, 0)
    .toFixed(2);

  useEffect(() => {

    const token = localStorage.getItem('token');
    setButtonBuy(!!token);
    initMercadoPago('APP_USR-3ba60abc-9bdf-4cb8-b724-62265a471d75'); // Inicializar MercadoPago
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPreferenceId(null); // Resetear el estado de preferenceId al cerrar el modal
  };

  const handleBuyNow = async () => {

    if (!buttonBuy) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para realizar una compra.',
      });
      return;
    }

    createPreferenceForSingleProduct(); // Llama directamente a la función para crear la preferencia
  };

  

  
  const createPreferenceForSingleProduct = async () => {
    const productData = {
      idProduct: id, // Asegúrate de que 'id' esté definido en tu código
      title: title, // Asegúrate de que 'title' esté definido
      count: 1, // Cantidad fija a 1 para un solo producto
      price: parseFloat(price), // Asegúrate de que 'price' esté definido y sea un número
    };
  
    console.log('Datos del producto para crear preferencia:', productData);
    
    try {
      // Verificar el stock disponible antes de enviar la solicitud
      if (stock <= 0) { 
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay stock disponible',
          showConfirmButton: true,
        });
        return;
      }
  
      const response = await axios.post('https://gaiavet-back.onrender.com/create_preference', {
        title: `Compra de ${productData.title} en GaiaVet`,
        price: productData.price,
        products: [productData], // Envía solo el producto seleccionado como un array
      });
  
      const { id } = response.data; // Asegúrate de que esta respuesta sea correcta
      if (id) {
        setPreferenceId(id); // Guarda el id de la preferencia
      }
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema, inténtalo de nuevo.',
      });
    }
  };
  

  useEffect(() => {
    if (preferenceId) {
      // Cuando se genera una preferencia, realizar alguna acción o recargar el componente
      console.log('Preferencia creada: ', preferenceId);
    }
  }, [preferenceId]);

  const addProduct = () => {
    productContext.setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((product) => product.idProduct === id);
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
              count: 1,
            },
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
    <div className='w-2/5 bg-white flex justify-evenly rounded-3xl items-center px-4 my-4 shadow-2xl sm:w-[80%] lg:w-[45%] lg:h-[15rem]'>
    <div className='w-2/6 rounded-xl'>
      <img src={image} alt='' />
    </div>
    <div className='w-3/5 flex flex-col p-4 items-start lg:p-1'>
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
          <button className='text-white ml-6 w-full px-8 py-2 rounded-full bg-teal-500 shadow-md hover:bg-teal-400 lg:w-[8rem]' onClick={handleOpenModal}>Comprar</button>
        </div>
      </div>
    </div>

    {showModal && (

      <div className="fixed inset-0 flex flec-col items-center justify-center z-50 bg-opacity-80 bg-gray-700 ">
        <div className="bg-white font-itim rounded-lg border-2 border-blue-border w-3/5 h-3/5 sm:w-[35rem] sm:h-[30rem] md:w-[45rem] lg:w-[50rem] ">
          
        <button type="button" className="float-end bg-blue-border rounded-full p-1 m-2" onClick={handleCloseModal}>
          <span className="sr-only">Cerrar</span>   
          <svg aria-hidden="true" className="w-5 h-5 text-white hover:text-black" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10L4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className='flex h-full'>

        <div className='flex flex-col justify-center items-center w-2/4 h-full sm:w-[50%] sm:justify-evenly'>
          <img className='h-96 object-cover sm:h-[20rem] sm:px-4' src={image} alt="" />
          <p className='text-3xl font-semibold sm:text-2xl'>COP ${price}</p>
        </div>

          <div className='flex flex-col justify-evenly sm:w-[50%] sm:px-2'>
            <div>
            <h2 className='text-4xl mb-3 sm:text-2xl sm:pt-2 sm:text-center md:text-3xl'>{title}</h2>
            <p className='text-lg sm:text-justify sm:pt-2 sm:text-lg md:text-xl'>{description}</p>
          </div>

          <div className='flex flex-col justify-evenly h-48 sm:h-[10rem] sm:items-center md:text-lg'>
          <p>Categoria: {category}</p>
          <p>Disponibles: {stock}</p>
          
          {/* <div className='flex items-center'>

              <button className='w-6 h-6 bg-blue-border rounded-full text-white sm:text-xl sm:pb-1 sm:w-[2rem] sm:h-[2rem] sm:flex sm:justify-center sm:items-center sm:rounded-xl'>-</button>
                <p className='mx-2 bg-gray-300 p-1 rounded-md sm:w-[2rem] sm:text-center'>1</p>
              <button className='w-6 h-6 bg-blue-border rounded-full text-white sm:text-xl sm:pb-1 sm:w-[2rem] sm:h-[2rem] sm:flex sm:justify-center sm:items-center sm:rounded-xl'>+</button>
          </div> */}

          
          </div>
                  <div className='flex justify-evenly sm:items-center sm:h-[4rem]'>
                  {buttonBuy ? (
                    <button onClick={addProduct} className='bg-teal-500 w-[10rem] h-[3rem] rounded-xl text-white  hover:bg-teal-300 hover:text-black sm:w-[7rem] sm:h-[3rem] md:w-[8rem] lg:w-[9rem]'>Agregar al carrito</button>
                  ) : (
                    <Link to={"/login"}>
                      <button className='text-white hover:bg-teal-300 rounded-lg bg-blue-border p-2'>Iniciar sesión</button>
                    </Link>
                  )}
                  
                  <button className='bg-teal-500 text-white hover:bg-teal-300 rounded-lg p-2 w-[10rem] hover:text-black sm:w-[7rem] sm:h-[3rem] sm:p-0 md:w-[8rem] lg:w-[9rem]' onClick={handleBuyNow}>
                    Comprar ahora
                  </button>
                  </div>

                  {/* Mostrar el Wallet de MercadoPago si se genera una preferencia */}
                  {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                  
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};
