import React from 'react';
import HeaderImg from '../../../assets/HeaderImg.svg';
import pastorcolli from '../../../assets/pastorcolli.jpeg';
import mapa from '../../../assets/mapa.png';
import { Carousel } from "../../Carousel/Carousel";
import { SectionTitle } from "../../SectionTitle/SectionTitle";
import { ContainerServices } from "../../ContainerServices/ContainerServices";
import { ContainerLocation } from "../../ContainerLocation/ContainerLocation";
import { Header } from "../../Layouts/Header/Header";
import { Main } from "../../Layouts/Main/Main";
import { ContainerInfo } from "../../ContainerInfo/ContainerInfo";
import { ContactForm } from '../../ContactForm/ContactForm';
import { Element } from 'react-scroll';

export const Home = () => {
  return (
    <div className='w-full h-full'>
      <Header title='GaiaVet' />
      <Main>
        <Element name="inicio">
          <div>
            <img src={HeaderImg} alt="pets reference" className='w-full h-auto' />
          </div>
        </Element>
        <Element name="sobre">
          <ContainerInfo 
            image={pastorcolli}
            alt={'Pastor colli'}
            title={'Urgencias veterinarias 24 horas'}
            description={"En Gaia Vet, comprendemos que la salud de tu mascota es invaluable, por eso nuestro servicio de urgencias veterinarias 24 horas está diseñado para brindar atención oportuna y de calidad a tu peludito cuando más lo necesita. Sabemos que las emergencias veterinarias pueden surgir en cualquier momento, por lo que, sin importar la hora, ponemos a tu disposición un equipo interdisciplinario de expertos altamente capacitados para atender cualquier urgencia que enfrente tu mascota.Te garantizamos que, ante cualquier eventualidad con la salud de tu fiel compañero, él se sentirá como en casa en nuestras instalaciones."}
          />
        </Element>
        <Element name="productos">
          <SectionTitle sectionTitle={'Conoce nuestros productos mas vendidos'} />
          <Carousel />
        </Element>
        <Element name="servicios">
          <SectionTitle sectionTitle={'Conoce nuestros servicios'} />
          <ContainerServices />
        </Element>
        
          <ContainerLocation 
            direction={'Cra 10 # 10-46, Circasia, Quindio, Colombia'} 
            phone={'3205677966'} 
            image={mapa} 
            alt={'Ubicación'} 
          />
        <Element name="contactanos">
          <ContactForm />
        </Element>
      </Main>
    </div>
  );
};
