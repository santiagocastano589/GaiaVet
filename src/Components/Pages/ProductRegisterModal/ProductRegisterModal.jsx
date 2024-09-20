import React, { useState, useContext, useEffect } from 'react';
import gato from '../../../assets/comidaGato.png';
import InputProducts from '../../InputProducts/InputProducts';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';
import Quagga from 'quagga';

const ProductRegisterModal = ({ onClose, onProductAdded }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [codeProduct, setCodeProduct] = useState('');
  const [product, setProduct] = useState({
    nombreProducto: '',
    descripcion: '',
    imagen: '',
    categoria: '',
    stock: 0,
    precio: 0,
  });

  useEffect(() => {
    console.log('producto info',product);
    
  }, [product])
  

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(gato);
  const { authToken } = useContext(AuthContext);

  // Inicialización de Quagga solo cuando showCamera es true
  const startScanner = () => {
    const target = document.querySelector('#interactive');
    if (!target) {
      console.error('No se pudo encontrar el div para el video del escaneo.');
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: target, // Div donde se mostrará el video
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // Usa la cámara trasera
          },
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader', 'upc_reader'], // Otros tipos de códigos
        },
      },
      (err) => {
        if (err) {
          console.error('Error al iniciar Quagga: ', err);
          return;
        }
        Quagga.start();
      }
    );

    // Detectar el código de barras
    Quagga.onDetected((data) => {
      Swal.fire({
        title: `Código escaneado: ${data.codeResult.code}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setCodeProduct(data.codeResult.code);
      setProduct((prevProduct) => ({
        ...prevProduct,
        idProducto: data.codeResult.code,
      }));

      Quagga.stop();
      Quagga.offDetected();
      setShowCamera(false);
    });
  };

  // Manejar la parada de Quagga de forma segura
  const stopScanner = () => {
    if (Quagga.initialized) {
      Quagga.stop();
      Quagga.offDetected();
      const interactiveElement = document.querySelector('#interactive');
      if (interactiveElement) {
        interactiveElement.innerHTML = '';
      }
    }
  };

  useEffect(() => {
    if (showCamera) {
      startScanner();
    }

    return () => {
      stopScanner(); // Asegúrate de detener Quagga cuando el componente se desmonte
    };
  }, [showCamera]);

  useEffect(() => {
    Swal.fire({
      title: 'Escanea el código de barras del producto',
      text: 'Cuando estés listo, presiona "Confirmar" para activar la cámara.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowCamera(true);
      } else {
        // Mostrar el mensaje y cerrar el modal
        Swal.fire({
          title: 'Es necesario escanear el código de barras',
          text: 'Para poder registrar un producto debes escanear el código de barras.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Cerrar el modal después del mensaje
          onClose();
        });
      }
    });
  }, [onClose]);

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

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dxg8bqs9x/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = product.imagen;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const updatedProduct = { ...product, imagen: imageUrl };

      const response = await fetch(
        'https://gaiavet-back.onrender.com/producto',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto registrado con éxito',
          showConfirmButton: true,
        });
        onProductAdded(data);
        onClose();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al registrar el producto: ' + data.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al registrar el producto',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="w-full fixed z-50 inset-0 bg-black bg-opacity-80 transition-all ease-in-out duration-300 font-itim">
      <div className="w-[70rem] h-[30rem] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-fondo rounded-lg shadow-sm">
        <div className="w-full h-[30rem] flex justify-between items-center rounded-xl bg-white">
          <div className="w-[80%] h-[30rem] p-4 text-white flex flex-col items-center justify-evenly">
            <h3 className='gorditas text-black text-3xl'>Registro de productos</h3>
            
            <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
              <InputProducts nameLabel="Codigo del producto:" name="codigo" type="text" value={codeProduct} onChange={handleChange} />
              <InputProducts nameLabel="Imagen del producto:" name="imagen" type="file" onChange={handleImageChange} />
              <InputProducts nameLabel="Nombre del producto:" name="nombreProducto" type="text" onChange={handleChange} value={product.nombreProducto} />
              <InputProducts nameLabel="Descripcion del producto:" name="descripcion" type="text" onChange={handleChange} value={product.descripcion} />
              <InputProducts nameLabel="Categoria del producto:" name="categoria" type="text" onChange={handleChange} value={product.categoria} />
              <InputProducts nameLabel="Precio del producto:" name="precio" type="number" onChange={handleChange} value={product.precio} />
              <InputProducts nameLabel="Stock del producto:" name="stock" type="number" onChange={handleChange} value={product.stock} />

              <div className="w-[90%] text-black flex justify-end">
                <button type="submit" className="w-36 bg-teal-500 mt-2 p-2 text-white rounded-md hover:bg-teal-400 hover:text-white">
                  Registrar
                </button>
              </div>
            </form>
          </div>

          <div className="h-[30rem] w-[35%] bg-teal-600 rounded-lg flex flex-col">
            <p className="mr-2 mt-2 cursor-pointer font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white self-end" onClick={onClose}>
              X
            </p>
            <div className="flex flex-col items-center mt-10">
              <img className="w-80 h-80 rounded-xl object-contain" src={imagePreview} alt="Previsualización" />
            </div>

            {
              showCamera && 
              <div id="interactive" className="fixed w-[41vw] h-[64.4vh] object-cover top-1 left-20 shadow-formShadow"></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegisterModal;
