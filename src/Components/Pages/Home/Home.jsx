import React from 'react'
import mascotas from '../../../assets/mascotas.jpeg'

import pastorcolli from '../../../assets/pastorcolli.jpeg'
import mapa from '../../../assets/mapa.png'

import { Carousel } from "../../Carousel/Carousel";
import { SectionTitle } from "../../SectionTitle/SectionTitle";
import { ContainerServices } from "../../ContainerServices/ContainerServices";
import { ContainerLocation } from "../../ContainerLocation/ContainerLocation";
import { Header } from "../../Layouts/Header/Header";
import { Main } from "../../Layouts/Main/Main";


export const Home = () => {
  return (

    <div className='w-full h-full'>
      <Header />
        <Main>
          <div>
            <img src={mascotas} alt="pets reference" className='w-full h-auto' />
          </div>

          <SectionTitle sectionTitle={'Conoce nuestros productos'} />
          <Carousel />
          <SectionTitle sectionTitle={'Conoce nuestros servicios'} />
          <ContainerServices />
          <ContainerLocation title={'Circasia Quindio'} direction={'Cra 10 # 10-46'} phone={'3205677966'} image={mapa} alt={'Ubicación'} />
      </Main>
    </div>
  )
}
