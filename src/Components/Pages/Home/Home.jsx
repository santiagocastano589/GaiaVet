import React from 'react';
import HeaderImg from '../../../assets/HeaderImg.svg';
import pastorcolli from '../../../assets/pastorcolli.jpeg';
import { Carousel } from "../../Carousel/Carousel";
import { SectionTitle } from "../../SectionTitle/SectionTitle";
import { ContainerServices } from "../../ContainerServices/ContainerServices";
import { ContainerLocation } from "../../ContainerLocation/ContainerLocation";
import { Header } from "../../Layouts/Header/Header";
import { Main } from "../../Layouts/Main/Main";
import { ContainerInfo } from "../../ContainerInfo/ContainerInfo";
import { ContactForm } from '../../ContactForm/ContactForm';
import { Element } from 'react-scroll';
import LocatorApi from '../../LocatorApi/LocatorApi';

export const Home = () => {


  return (
    <div className='w-full h-full'>
      <Header title='GaiaVet' classN='text-8xl'/>
      <Main>
        <Element name="inicio">
          <div>
            <img src={HeaderImg} alt="pets reference" className='w-full h-auto sm:pt-12' />
          </div>
        </Element>
        <Element name="sobre">
          <ContainerInfo 
            image={pastorcolli}
            alt={'border collie'}
            title={'Urgencias veterinarias 24 horas'}
            description={"En Gaia Vet, comprendemos que la salud de tu mascota es invaluable, por eso nuestro servicio de urgencias veterinarias 24 horas está diseñado para brindar atención oportuna y de calidad a tu peludito cuando más lo necesita. Sabemos que las emergencias veterinarias pueden surgir en cualquier momento, por lo que, sin importar la hora, ponemos a tu disposición un equipo interdisciplinario de expertos altamente capacitados para atender cualquier urgencia que enfrente tu mascota. Té garantizamos que, ante cualquier eventualidad con la salud de tu fiel compañero, él se sentirá como en casa en nuestras instalaciones."}
          />
        </Element>
        <Element name="productos">
          <SectionTitle sectionTitle={'Conoce nuestros productos más vendidos'} />
          <Carousel />
        </Element>
        <Element name="servicios">
          <SectionTitle sectionTitle={'Conoce nuestros servicios'} />
          <ContainerServices />
        </Element>
        
          <ContainerLocation 
            direction={'Cra 10 #10-46, Circasia, Quindío, Colombia'} 
            phone={'3205677966'} 
            alt={'Ubicación'} 
          />
        <Element name="contactanos">
          <ContactForm />
        </Element>




      </Main>
    </div>
  );
};
