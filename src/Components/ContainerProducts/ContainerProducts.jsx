import React from 'react'
import { Product } from '../Product/Product';
import tapetes from "../../assets/tapetes-extra-gruesos.webp";
import comidaPerro from "../../assets/comidaPerro.png";
import comidaGato from "../../assets/comidaGato.png";
export const ContainerProducts = () => {
  return (
    <>
        <div className='w-full flex flex-wrap p-4 justify-center items-center'>
            <Product image={tapetes} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>
            <Product image={comidaPerro} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'}price={'20000'}/>
            <Product image={comidaGato} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>
            <Product image={comidaPerro} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>
            <Product image={tapetes} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>
            <Product image={comidaPerro} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'}price={'20000'}/>
            <Product image={comidaGato} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>
            <Product image={comidaPerro} description={'Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona. Descripcion del producto para generar una idea mas clara de lo que va a comprar la persona'} title={'Comida para perros'} alt={'oiuyt'} price={'20000'}/>

        </div>
    </>
  )
}
