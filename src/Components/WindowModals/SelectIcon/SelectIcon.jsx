import React from 'react'
import { UseIcon } from './UseIcon/UseIcon'
import perro1 from '../../../assets/Caras de perros/perro1.jpg'
import perro2 from '../../../assets/Caras de perros/perro2.jpg'
import perro3 from '../../../assets/Caras de perros/perro3.jpg'
import perro4 from '../../../assets/Caras de perros/perro4.jpg'
import perro5 from '../../../assets/Caras de perros/perro5.jpg'
import perro6 from '../../../assets/Caras de perros/perro6.jpg'
import perro7 from '../../../assets/Caras de perros/perro7.jpg'
import perro8 from '../../../assets/Caras de perros/perro8.jpg'
import perro9 from '../../../assets/Caras de perros/perro9.jpg'
import perro10 from '../../../assets/Caras de perros/perro10.jpg'
import perro11 from '../../../assets/Caras de perros/perro11.jpg'
import perro12 from '../../../assets/Caras de perros/perro12.jpg'

export const SelectIcon = ({onClose}) => {
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
                    <div className=' w-4/5 flex flex-wrap justify-evenly mt-12 '>
                        <UseIcon icon={perro1} />
                        <UseIcon icon={perro2} />
                        <UseIcon icon={perro3} />
                        <UseIcon icon={perro4} />
                        <UseIcon icon={perro5} />
                        <UseIcon icon={perro6} />
                        <UseIcon icon={perro7} />
                        <UseIcon icon={perro8} />
                        <UseIcon icon={perro9} />
                        <UseIcon icon={perro10} />
                        <UseIcon icon={perro11} />
                        <UseIcon icon={perro12} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )

}
