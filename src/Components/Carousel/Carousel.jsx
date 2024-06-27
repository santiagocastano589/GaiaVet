import React from 'react'
import { CartProducts } from '../CartProducts/CartProducts'
import tapetes from '../../assets/tapetes-extra-gruesos.webp'

export const Carousel = () => {
  return (
    <div className='w-full h-full bg-slate-100 flex justify-evenly py-10 flex-wrap'>
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Los Tapetes Absorbentes Extra gruesos están especialmente diseñados con 3 capas: una capa superior gruesa muy absorbente y resistente a las pisadas de tu mascota; una capa intermedia súper absorbente que gelatiniza los líquidos atrapándolos en su interior y ayudando a neutralizar el olor de la orina y una capa inferior aislante que evita que la humedad pase al piso, manteniéndolo siempre seco y limpio."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Los Tapetes Absorbentes Extra gruesos están especialmente diseñados con 3 capas: una capa superior gruesa muy absorbente y resistente a las pisadas de tu mascota; una capa intermedia súper absorbente que gelatiniza los líquidos atrapándolos en su interior y ayudando a neutralizar el olor de la orina y una capa inferior aislante que evita que la humedad pase al piso, manteniéndolo siempre seco y limpio."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Los Tapetes Absorbentes Extra gruesos están especialmente diseñados con 3 capas: una capa superior gruesa muy absorbente y resistente a las pisadas de tu mascota; una capa intermedia súper absorbente que gelatiniza los líquidos atrapándolos en su interior y ayudando a neutralizar el olor de la orina y una capa inferior aislante que evita que la humedad pase al piso, manteniéndolo siempre seco y limpio."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Los Tapetes Absorbentes Extra gruesos están especialmente diseñados con 3 capas: una capa superior gruesa muy absorbente y resistente a las pisadas de tu mascota; una capa intermedia súper absorbente que gelatiniza los líquidos atrapándolos en su interior y ayudando a neutralizar el olor de la orina y una capa inferior aislante que evita que la humedad pase al piso, manteniéndolo siempre seco y limpio."} price={'300'} />
    </div>
  )
}
