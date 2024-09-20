import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Header } from '../../Layouts/Header/Header';
import UpdateProduct from '../../WindowModals/ProductsModals/UpdateProduct/UpdateProduct';
import ProductRegisterModal from "../ProductRegisterModal/ProductRegisterModal";
import Swal from 'sweetalert2';

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
    const results = productsList.filter((product) =>
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

  const handleDelete = async (productId) => {
    if (!authToken) return;

    Swal.fire({
      title: 'GaiaVet',
      text: '¿Deseas eliminar este producto? Esto eliminará su stock e información en la tienda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://gaiavet-back.onrender.com/producto/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            setProductsList((prevList) =>
              prevList.filter((product) => product.idProducto !== productId)
            );
            setFilteredProductList((prevList) =>
              prevList.filter((product) => product.idProducto !== productId)
            );

            Swal.fire({
              title: 'Eliminado',
              text: 'El producto ha sido eliminado con éxito.',
              icon: 'success',
            });
          } else {
            const errorData = await response.json();
            Swal.fire({
              title: 'Error',
              text: `Hubo un error al eliminar el producto: ${errorData.message}`,
              icon: 'error',
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al eliminar el producto: ${error.message}`,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <>
      <Header title="Gestión de Productos" classN="text-7xl w-[60%]" />
      <div className="w-full flex justify-center">
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
      <div className="flex justify-center">
        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-[90%] p-6 mb-[10rem]">
            <div className="flex items-center justify-between mb-4 bg-teal-200 h-[8rem] px-4 rounded-xl font-itim">
              <h3 className="text-xl">¡¡Hola!! Presiona el botón para registrar un nuevo producto</h3>
              <button
                className="bg-teal-500 text-white py-2 px-4 rounded h-[3rem] hover:bg-teal-400"
                onClick={openModal}
              >
                Registrar Producto
              </button>
            </div>
            <div className="relative overflow-x-auto shadow-xl sm:rounded-lg font-itim">
              <table className="w-full text-xl text-left rtl:text-right text-gray-300 dark:text-gray-400">
                <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-400">
                  <tr className="w-full bg-teal-500 text-gray-800 uppercase text-base pb-10">
                    <th className="py-3 px-6 text-center w-1/6">Imagen del Producto</th>
                    <th className="py-3 px-6 text-center w-1/6">Nombre Producto</th>
                    <th className="py-3 px-6 text-center w-1/6">Categoría</th>
                    <th className="py-3 px-6 text-center w-1/6">Descripción</th>
                    <th className="py-3 px-6 text-center w-1/6">Stock</th>
                    <th className="py-3 px-6 text-center w-1/6">Precio</th>
                    <th className="py-3 px-6 text-center w-1/6">Administrar</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-base w-full">
                  {filteredProductList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-lg text-gray-700">
                        {searchTerm
                          ? "No se encontraron productos que coincidan con la búsqueda."
                          : "No hay productos registrados."}
                      </td>
                    </tr>
                  ) : (
                    filteredProductList.map((product) => (
                      <tr
                        key={product.idProducto}
                        className="dark:hover:bg-gray-50 border-gray-50 odd:bg-white odd:dark:bg-gray-50 even:dark:bg-gray-50 border-b"
                      >
                        <td className="py-3 px-6 text-center object-cover w-1/6">
                          <img
                            src={product.imagen}
                            alt={product.nombreProducto}
                          />
                        </td>
                        <td className="py-3 px-6 text-center w-1/6">
                          {product.nombreProducto}
                        </td>
                        <td className="py-3 px-6 text-center w-1/6">
                          {product.categoria}
                        </td>
                        <td className="py-3 px-6 text-center w-1/6">
                          {product.descripcion}
                        </td>
                        <td className="py-3 px-6 text-center w-1/6">
                          {product.stock}
                        </td>
                        <td className="py-3 px-6 text-center w-1/6">
                          {product.precio}
                        </td>
                        <td className="py-3 px-6 flex flex-col items-center justify-center h-[10rem]">
                          <button
                            onClick={() => controlUpdate(product)}
                            className="px-5 py-1 w-28 bg-buttonProducts hover:bg-opacity-70 duration-300 text-white font-medium rounded-lg mb-4"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.idProducto)}
                            className="py-1 w-28 bg-red-600 hover:bg-opacity-70 duration-300 text-white font-medium rounded-lg"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductRegisterModal
          onClose={closeModal}
          onProductAdded={handleProductAdded}
        />
      )}
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
