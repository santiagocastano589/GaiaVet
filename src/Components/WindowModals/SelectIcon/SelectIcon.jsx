import React from 'react';
import { UseIcon } from './UseIcon/UseIcon';

export const SelectIcon = ({ onClose, onSelect }) => {
  const icons = [
    'https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000697/perro1_r23f5b.jpg',
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000697/perro3_bxvlgx.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000697/perro2_i6t4gs.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000697/perro4_xzq9wz.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000699/perro7_exnqsw.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000701/perro10_asm3da.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000702/perro6_npmani.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000703/perro5_cg17aq.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000703/perro8_kjbzjq.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000705/perro9_zncvkr.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000705/perro12_o1ghpg.jpg",
    "https://res.cloudinary.com/dxg8bqs9x/image/upload/v1723000706/perro11_riaxz6.jpg"];

  return (
    <>
      <div className='z-50 top-0 w-screen h-screen fixed bg-black bg-opacity-70 flex items-center justify-center animate-jump-in'>
        <div className='w-3/4 h-auto max-h-[90vh] fixed top-[7vh] bg-white font-itim flex flex-col rounded-2xl'>
          <div className='self-end text-end'>
            <p
              className="mr-2 mt-2 cursor-pointer font-extrabold text-xl bg-header w-7 text-center rounded-full hover:bg-buttonProducts duration-200 hover:text-white"
              onClick={onClose}
            >
              X
            </p>
          </div>

          <div className='h-auto flex flex-col items-center'>
            <h2 className='font-gorditas text-4xl'>Selecciona tu avatar</h2>
            <div className='w-4/5 flex flex-wrap justify-evenly mt-12'>
              {icons.map((icon, index) => (
                <UseIcon key={index} icon={icon} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
