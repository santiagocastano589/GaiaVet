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
import { InfoContainer } from "../../InfoContainer/InfoContainer";

export const Home = () => {
  return (

    <div className='w-full h-full'>
      <Header />
        <Main>
          <div>
            <img src={mascotas} alt="pets reference" className='w-full h-auto' />
          </div>
          <InfoContainer 
            image={pastorcolli}
            alt={'Pastor colli'}
            title={'Urgencias veterinarias 24 horas'}
            description={"En Gaia Vet, comprendemos que la salud de tu mascota es invaluable, por eso nuestro servicio de urgencias veterinarias 24 horas está diseñado para brindar atención oportuna y de calidad a tu peludito cuando más lo necesita. Sabemos que las emergencias veterinarias pueden surgir en cualquier momento, por lo que, sin importar la hora, ponemos a tu disposición un equipo interdisciplinario de expertos altamente capacitados para atender cualquier urgencia que enfrente tu mascota.Te garantizamos que, ante cualquier eventualidad con la salud de tu fiel compañero, él se sentirá como en casa en nuestras instalaciones."}
          />

          <SectionTitle sectionTitle={'Conoce nuestros productos'} />
          <Carousel />
          <SectionTitle sectionTitle={'Conoce nuestros servicios'} />
          <ContainerServices />
          <ContainerLocation title={'Circasia Quindio'} direction={'Cra 10 # 10-46'} phone={'3205677966'} image={mapa} alt={'Ubicación'} />
      </Main>
    </div>
  )
}
