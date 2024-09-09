import React, { useState, useContext } from 'react';
import estrellaVacia from '../../../assets/estrella-vasia.png';
import estrellaLlena from '../../../assets/estrella-llena.png';
import estrellaMedia from '../../../assets/estrellaMedia.png';
import { Header } from '../../Layouts/Header/Header';
import { Button } from '../../Button/Button';
import { ContainerCard } from '../../ContainerCard/ContainerCard';
import { AuthContext } from '../../Context/Context';
import Swal from 'sweetalert2';

export const Review = () => {
  const [rating, setRating] = useState(0);  // Rating de estrellas
  const [selectedService, setSelectedService] = useState(''); // Servicio seleccionado
  const [comment, setComment] = useState(''); // Comentario
  const { authToken } = useContext(AuthContext);
  const accesRole = localStorage.getItem('role');

  const handleStarClick = (index) => {
    if (rating === index + 0.5) {
      setRating(index + 1); 
    } else {
      setRating(index + 0.5); 
    }
  };

  const renderStar = (index) => {
    if (rating >= index + 1) {
      return estrellaLlena; 
    } else if (rating >= index + 0.5) {
      return estrellaMedia; 
    } else {
      return estrellaVacia; 
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) return;
  
    const reviewData = {
      puntuacion: rating,
      comentario: comment,
      categoria: selectedService,
    };
  
    if (!authToken) {
      console.error('Token de autenticación no disponible');
      alert('Token de autenticación no disponible');
      return;
    }
  
    if (!reviewData.puntuacion || !reviewData.comentario || !reviewData.categoria ) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    try {
      const response = await fetch('https://gaiavet-back.onrender.com/NewReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(reviewData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al enviar la reseña');
      }
  
      Swal.fire({
        title: 'Reseña enviada',
        text: 'Tu reseña fue enviada exitosamente',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
  
      setComment('');
      setRating(0);
      setSelectedService('');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: `Error al enviar la reseña`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
      });
    }
  };
  

  return (
    <>
      <Header title='Reseñas' />

      <div className='pt-44 flex justify-center'>
        <form className='bg-gray-200 border-solid border-2 border-gray rounded-lg w-2/4 mb-20' onSubmit={handleSubmit}>

          <h1 className='text-5xl gorditas text-center pt-10'>Deja tu opinión</h1>

          <p className='text-2xl text-center py-5'>
            Las opiniones son públicas y contienen la información de tu cuenta
          </p>

          {/* Star Rating */}
          <div className='flex justify-center py-10'>
            <div className='flex justify-between w-64'>
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  className='h-11 w-11 cursor-pointer'
                  src={renderStar(index)}
                  alt='Estrella'
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Selección de Servicio */}
          <div className='mb-4 w-2/4 flex justify-center'>
            <select 
              className='rounded-xl p-2 border-solid border-2 border-gray' 
              name="servicio"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)} // Actualiza el estado al cambiar la selección
            >
              <option disabled value="">Seleccione el servicio</option>
              <option value="Baño">Baño</option>
              <option value="Peluquería">Peluquería</option>
              <option value="Consulta General">Consulta General</option>
              <option value="Guardería">Guardería</option>
            </select>
          </div>

          {/* Comentario */}
          <div className='flex justify-center'>
            <textarea
              className='w-2/4 h-56 p-3'
              placeholder='Escribe tu comentario'
              value={comment}
              onChange={(e) => setComment(e.target.value)} // Actualiza el estado al cambiar el comentario
            ></textarea>
          </div>

          <div className='flex justify-center'>
            <Button onClick={handleSubmit} type="submit" textButton='Enviar' /> 
          </div>
        </form>
      </div>

      {/* Reviews Section */}
      <div className='w-1/3 h-14 flex justify-center items-center rounded-r-full bg-blue-border mt-9'>
        <h1 className='text-xl text-white'>Reseñas</h1>
      </div>

      {/* Filters */}
      <div className='flex w-96 justify-evenly mt-6'>
        <h1 className='text-3xl'>Filtros :</h1>
        <button className='bg-gray-300 px-2'>Malas reseñas</button>
        <button className='bg-gray-300 px-2'>Buenas reseñas</button>
      </div>

      {/* User Reviews */}
      <div className='my-10 flex flex-wrap justify-evenly'>
        <ContainerCard
          name="Pepito Perez Peres"
          hour="Hace 3 horas"
          comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis?"
        />
        <ContainerCard
          name="Pepito Perez Peres"
          hour="Hace 3 horas"
          comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis?"
        />
        <ContainerCard
          name="Pepito Perez Peres"
          hour="Hace 3 horas"
          comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis?"
        />
        <ContainerCard
          name="Pepito Perez Peres"
          hour="Hace 3 horas"
          comment="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, fugiat corrupti! Illo placeat quis ipsa accusantium, nostrum expedita optio error doloremque unde molestias sequi dolorum praesentium eligendi at? Nam, quis?"
        />
      </div>
    </>
  );
};
