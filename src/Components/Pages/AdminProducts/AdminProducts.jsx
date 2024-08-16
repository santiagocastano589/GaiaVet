import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Header } from '../../Layouts/Header/Header';
import comida from '../../../assets/comidaGato.png'
import ProductRegisterModal from '../ProductRegisterModal/ProductRegisterModal';

export const AdminProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setProductsList(data);
          
          
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.log('Error al traer los productos:', error);
      }
    };

    fetchProducts();
  }, [authToken]);

  useEffect(() => {
  console.log(productsList);
  
  }, [productsList])
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductAdded = (newProduct) => {
    setProductsList((prevList) => [...prevList, newProduct]);
  };

  return (
    <>
      <Header title="Lista de Productos" />
      <div className="flex justify-center pt-48">
        <div className="w-full flex justify-center my-10 overflow-hidden">
          <div className="w-[90%] h-[20rem] p-6 mb-[20rem]">
            <div className="flex items-center justify-between mb-4 bg-teal-200 h-[8rem] px-4 rounded-xl">
              <h3 className=''>Hola!!  Presiona el boton para registrar un nuevo producto</h3>
              <button 
                className="bg-teal-500 text-white py-2 px-4 rounded h-[3rem] hover:bg-teal-400"
                onClick={openModal}
              >
                Registrar Producto
              </button>
            </div>
            <div className='overflow-y-auto max-h-[30rem]'>
            <table className="w-full bg-white border-4">
              <thead>
                <tr className="w-full bg-teal-500 text-gray-800 uppercase text-sm ">
                  <th className="py-3 px-6 text-center">Imagen del Producto</th>
                  <th className="py-3 px-6 text-center">Nombre Producto</th>
                  <th className="py-3 px-6 text-center">Categoria</th>
                  <th className="py-3 px-6 text-center">Descripcion</th>
                  <th className="py-3 px-6 text-center">Stock</th>
                  <th className="py-3 px-6 text-center">Precio</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {productsList.map((product) => (
                  <tr key={product.idProducto} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-center object-contain"><img className='w-[15vw]' src={product.imagen} alt="" /></td>
                    <td className="py-3 px-6 text-center">{product.nombreProducto}</td>
                    <td className="py-3 px-6 text-center">{product.categoria}</td>
                    <td className="py-3 px-6 text-center">{product.descripcion}</td>
                    <td className="py-3 px-6 text-center">{product.stock}</td>
                    <td className="py-3 px-6 text-center">{product.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            </div>
            
          </div>
        </div>
      </div>
      {isModalOpen && <ProductRegisterModal onClose={closeModal} onProductAdded={handleProductAdded} />}
    </>
  );
}
