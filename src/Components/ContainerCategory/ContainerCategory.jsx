import React from 'react'
import { CategoryCard } from '../CategoryCard/CategoryCard'
import tapetes from "../../assets/tapetes-extra-gruesos.webp";
import comidaPerro from "../../assets/comidaPerro.png";
import comidaGato from "../../assets/comidaGato.png";
import gaiavet from "../../assets/alimentos-para-mascotas.png";
import gaiavet2 from "../../assets/huesos.png";
import gaiavet3 from "../../assets/comida-de-gato.png";
import gaiavet4 from "../../assets/champu-para-mascotas.png";

export const ContainerCategory = ({setSelectedCategory}) => {
  return (
    <>
        <div className='w-full pt-[10rem]'>
            <div className='w-full flex '>
            <div onClick={() => setSelectedCategory('')}>
                <CategoryCard image={gaiavet} title={'Todos los productos'} alt={'producto'}/>
              </div>
              <div onClick={() => setSelectedCategory('Comida para perros')}>
                <CategoryCard image={gaiavet2}  title={'Comida para perros'} alt={'producto'}/>
              </div>
              <div onClick={() => setSelectedCategory('Comida para gatos')}>
                <CategoryCard image={gaiavet3}  title={'Comida para gatos'} alt={'producto'}/>
              </div>
              <div onClick={() => setSelectedCategory('Aseo')}>
                <CategoryCard image={gaiavet4} title={'Aseo para tu mascota'} alt={'producto'}/>
              </div>

            </div>
        </div>
        

    </>
  )
}
