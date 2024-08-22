import React, { useState, useContext } from 'react';
import InputProducts from '../../../InputProducts/InputProducts';
import { AuthContext } from '../../../Context/Context';

const ProductUpdate = ({ id, img, name, description, category, price, stock, onClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    nombreProducto: name,
    descripcion: description,
    imagen: img,
    categoria: category,
    stock: stock,
    precio: price,
  });

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

    let imageUrl = img; 

    if (imageFile) {
      try {
        imageUrl = await uploadImageToCloudinary(imageFile);
      } catch (error) {
        alert('Error al subir la imagen');
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
        alert('Producto actualizado con éxito');
        if (typeof onProductAdded === 'function') {
          onProductAdded(updatedProduct);
        }
        onClose();
        window.location.reload()
      } else {
        alert('Error al actualizar el producto: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <div className="w-full fixed z-50 inset-0 bg-black bg-opacity-80 transition-all ease-in-out duration-300 font-itim">
      <div className="w-[70rem] h-[30rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-fondo rounded-lg shadow-sm">
        <div className='w-full h-[30rem] flex justify-between items-center rounded-xl bg-slate-400'>
          <div className="w-[80%] h-[30rem] p-4 text-white flex flex-col items-center justify-evenly">
            <h3 className='gorditas text-black text-4xl'>Actualización de productos</h3>
            
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
              <InputProducts nameLabel={'Imagen del producto:'} name='imagen' type='file' onChange={handleImageChange} />
              <InputProducts nameLabel={'Nombre del producto:'} value={product.nombreProducto} name='nombreProducto' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Descripción del producto:'} value={product.descripcion} name='descripcion' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Categoría del producto:'} value={product.categoria} name='categoria' type='text' onChange={handleChange} />
              <InputProducts nameLabel={'Precio del producto:'} value={product.precio} name='precio' type='number' onChange={handleChange} />
              <InputProducts nameLabel={'Stock del producto:'} value={product.stock} name='stock' type='number' onChange={handleChange} />
              
              <div className='w-[90%] text-black flex justify-end mt-4'>
                <button type="submit" className="px-5 py-1 bg-white text-green-700 font-medium rounded-lg float-end mr-12 hover:bg-green-100 duration-200">Guardar</button>
                <button type="button" className="px-5 py-1 bg-red-600 text-white font-medium rounded-lg float-end mr-4 hover:bg-opacity-70 duration-200" onClick={onClose}>Cancelar</button>
              </div>
            </form>
          </div>
          
          <div className="h-[30rem] w-[35%] bg-fondoTarjeta rounded-lg flex flex-col">
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
