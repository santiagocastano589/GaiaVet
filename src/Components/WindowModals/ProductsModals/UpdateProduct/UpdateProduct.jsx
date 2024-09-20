import React, { useState, useContext } from 'react';
import InputProducts from '../../../InputProducts/InputProducts';
import { AuthContext } from '../../../Context/Context';
import Swal from 'sweetalert2';
import productOptions from '../../../../../public/js/ProductOption'
import Select from 'react-select';

import { useEffect } from 'react';

const ProductUpdate = ({ id, img, name, description, category, price, stock, onClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    nombreProducto: name,
    descripcion: description,
    imagen: img,
    categoria: category,
    stock: stock,
    precio: price,
  });
  const [selectedCategory, setSelectedCategory] = useState(category); 
  const [selectedProduct, setSelectedProduct] = useState(null); // Inicializa como null
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState(img); 
  const { authToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hz5sgkps'); 

    const response = await fetch('https://api.cloudinary.com/v1_1/dxg8bqs9x/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: 'GaiaVet',
      text: '¿Deseas actualizar este producto? Los cambios se guardarán en la tienda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let imageUrl = img; 
  
        if (imageFile) {
          try {
            imageUrl = await uploadImageToCloudinary(imageFile);
          } catch (error) {
            Swal.fire({
              title: 'Error',
              text: 'Error al subir la imagen',
              icon: 'error',
            });
            return;
          }
        }
  
        const updatedProduct = { ...product, imagen: imageUrl };
  
        try {
          const response = await fetch(`https://gaiavet-back.onrender.com/producto/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedProduct),
          });
  
          const data = await response.json();
          
          if (response.ok) {
            Swal.fire({
              title: 'Actualizado',
              text: 'El producto ha sido actualizado con éxito.',
              icon: 'success',
            });
  
            if (typeof onProductAdded === 'function') {
              onProductAdded(updatedProduct);
            }
            onClose();
            window.location.reload();
          } else {
            Swal.fire({
              title: 'Error',
              text: `Error al actualizar el producto: ${data.message}`,
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el producto',
            icon: 'error',
          });
        }
      }
    });
  };
  

  return (
    <div className="w-full fixed z-50 inset-0 bg-black bg-opacity-80 transition-all ease-in-out duration-300 font-itim">
      <div className="w-[70rem] h-[30rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-fondo rounded-lg shadow-sm">
        <div className='w-full h-[30rem] flex justify-between items-center rounded-xl bg-white'>
          <div className="w-[80%] h-[30rem] p-4 text-white flex flex-col items-center justify-evenly">
            <h3 className='gorditas text-black text-4xl'>Actualización de productos</h3>
            
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit} >
              <InputProducts nameLabel={'Imagen del producto:'} name='imagen' type='file' onChange={handleImageChange} />
              <div className='text-black w-[90%] flex justify-between items-center mt-3'>
              <label className='w-[44%] text-black text-lg' htmlFor="productos">Nombres de productos:</label>
              <Select
              id="productos"
              name="productos"
              className="w-full"
              options={productOptions}
              value={product.nombreProducto ? { value: product.nombreProducto, label: product.nombreProducto } : null}
              onChange={(option) => {
              setSelectedProduct(option ? option : null);
              setProduct((prevProduct) => ({
              ...prevProduct,
              nombreProducto: option ? option.value : ''
                }));
              }}
              placeholder="-- Selecciona un producto --"
              isSearchable
            />
              </div>
              <InputProducts nameLabel={'Descripción del producto:'} value={product.descripcion} name='descripcion' type='text' onChange={handleChange} />
              <div className='text-black w-[90%] flex justify-between items-center mt-3'>
                <label className='w-[44%] text-black text-lg text-balance' htmlFor="">Categorias de productos: </label>
                <select
                  id="categorias"
                  name="categoria"
                  className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value); // Actualiza el estado de selectedCategory
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      categoria: e.target.value // Actualiza la categoría en el estado product
                    }));
                  }}
                >
                  <option value="" disabled>-- Selecciona una categoría --</option>
                  <option value="Comida para perros">Comida para perros</option>
                  <option value="Comida para gatos">Comida para gatos</option>
                  <option value="Aseo">Aseo</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Accesorios">Accesorios</option>
                </select>


              </div>
              <InputProducts nameLabel={'Precio del producto:'} value={product.precio} name='precio' type='number' onChange={handleChange} />
              <InputProducts nameLabel={'Stock del producto:'} value={product.stock} name='stock' type='number' onChange={handleChange} />
              
              <div className='w-[90%] text-black flex justify-end mt-4'>
                <button type="submit" className="px-5 py-1 bg-gray-200 text-green-700 font-medium rounded-lg float-end mr-12 hover:bg-green-300 duration-200" >Guardar</button>
                <button type="button" className="px-5 py-1 bg-red-600 text-white font-medium rounded-lg float-end mr-4 hover:bg-opacity-70 duration-200" onClick={onClose}>Cancelar</button>
              </div>
            </form>
          </div>
          
          <div className="h-[30rem] w-[35%] bg-teal-600 rounded-lg flex flex-col">
            <p
              className="mr-2 mt-2 cursor-pointer font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white self-end"
              onClick={onClose}
            >
              X
            </p>
            <div className='flex flex-col items-center mt-10'>
              <img className='w-80 h-80 rounded-xl object-cover' src={imagePreview} alt="Previsualización" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
