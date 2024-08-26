import React from 'react'
import { CategoryCard } from '../CategoryCard/CategoryCard'
import tapetes from "../../assets/tapetes-extra-gruesos.webp";
import comidaPerro from "../../assets/comidaPerro.png";
import comidaGato from "../../assets/comidaGato.png";

export const ContainerCategory = ({setSelectedCategory}) => {
  return (
    <>
        <div className='w-full pt-[10rem]'>
            <div className='w-full flex '>
              <div onClick={() => setSelectedCategory('Comida para perros')}>
                <CategoryCard image={comidaPerro} description={'descripcion de la categoria para dar una breve informacion de la misma'} title={'Comida para perros'} alt={'producto'}/>
              </div>
              <div onClick={() => setSelectedCategory('Comida para gatos')}>
                <CategoryCard image={comidaGato} description={'descripcion de la categoria para dar una breve informacion de la misma'} title={'Comida para gatos'} alt={'producto'}/>
              </div>
              <div onClick={() => setSelectedCategory('Aseo para tu mascota')}>
                <CategoryCard image={tapetes} description={'descripcion de la categoria para dar una breve informacion de la misma'} title={'Aseo para tu mascota'} alt={'producto'}/>
              </div>
            </div>
        </div>
        

    </>
  )
}
