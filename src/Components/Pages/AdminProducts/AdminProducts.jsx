import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Header } from '../../Layouts/Header/Header';
import UpdateProduct from '../../WindowModals/ProductsModals/UpdateProduct/UpdateProduct';
import ProductRegisterModal from "../ProductRegisterModal/ProductRegisterModal";

export const AdminProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          setFilteredProductList(data);
          
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
    const results = productsList.filter(product => 
      product.idProducto?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nombreProducto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.precio?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.stock?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductList(results);
  }, [searchTerm, productsList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductAdded = (newProduct) => {
    setProductsList((prevList) => [...prevList, newProduct]);
  };

  const controlUpdate = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  return (
    <>
      <Header title="Lista de Productos" />
      <div className='w-full flex justify-center'>
        <div className="flex flex-row items-center justify-center w-[60rem] pt-48">
          <input
            type="text"
            placeholder="Busca el producto deseado de manera rápida"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-[90%] p-6 mb-[10rem] ">
            <div className="flex items-center justify-between mb-4 bg-teal-200 h-[8rem] px-4 rounded-xl">
              <h3>Hola!! Presiona el botón para registrar un nuevo producto</h3>
              <button 
                className="bg-teal-500 text-white py-2 px-4 rounded h-[3rem] hover:bg-teal-400"
                onClick={openModal}
              >
                Registrar Producto
              </button>
            </div>
            <div className='overflow-y-auto max-h-[80vh] '>
              <table className=" bg-white border-4 mb-4 flex flex-col">
                <thead>
                  <tr className=" bg-teal-500 text-gray-800 uppercase text-lg ">
                    <th className="py-3 px-6 text-center w-1/6">Imagen del Producto</th>
                    <th className="py-3 px-6 text-center w-1/6">Nombre Producto</th>
                    <th className="py-3 px-6 text-center w-1/6">Categoría</th>
                    <th className="py-3 px-6 text-center w-1/6">Descripción</th>
                    <th className="py-3 px-6 text-center w-1/6">Stock</th>
                    <th className="py-3 px-6 text-center w-1/6">Precio</th>
                    <th className="py-3 px-6 text-center w-1/6">Administrar</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-base w-full ">
                  {filteredProductList.map((product) => (
                    <tr key={product.idProducto} className="border-b border-gray-200 hover:bg-gray-100 w-full flex items-center">
                      <td className="py-3 px-6 text-center object-contain w-1/6"><img className='w-[15vw]' src={product.imagen} alt="" /></td>
                      <td className="py-3 px-6 text-center w-1/6">{product.nombreProducto}</td>
                      <td className="py-3 px-6 text-center w-1/6">{product.categoria}</td>
                      <td className="py-3 px-6 text-center w-1/6">{product.descripcion}</td>
                      <td className="py-3 px-6 text-center w-1/6">{product.stock}</td>
                      <td className="py-3 px-6 text-center w-1/6">{product.precio}</td>
                      <td className="h-full py-3 px-6 flex flex-col items-center ">
                        <button 
                          onClick={() => controlUpdate(product)} 
                          className="px-5 py-1 w-28 bg-buttonProducts hover:bg-opacity-70 duration-300 text-white font-medium rounded-lg float-end mb-4"
                        >
                          Editar
                        </button>
                        <button className="px-5 py-1 w-28 bg-red-600 hover:bg-opacity-70 duration-300 text-white font-medium rounded-lg float-end">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <ProductRegisterModal onClose={closeModal} onProductAdded={handleProductAdded} />}
      {editOpen && selectedProduct && (
        <UpdateProduct 
          onClose={() => setEditOpen(false)}
          id={selectedProduct.idProducto} 
          img={selectedProduct.imagen} 
          name={selectedProduct.nombreProducto} 
          description={selectedProduct.descripcion}
          category={selectedProduct.categoria}
          stock={selectedProduct.stock}
          price={selectedProduct.precio}
          onProductAdded={handleProductAdded}
        />
      )}
    </>
  );
};
