import React from 'react'
import { CartProducts } from '../CartProducts/CartProducts'
import tapetes from '../../assets/tapetes-extra-gruesos.webp'

export const Carousel = () => {
  return (
    <div className='w-full h-full bg-slate-100 flex justify-evenly py-10 flex-wrap'>
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Diseñados con 3 capas para una máxima absorción y neutralización del olor, estos tapetes mantienen tu piso seco y libre de manchas. La capa superior es resistente a las pisadas, la capa intermedia gelatiniza los líquidos y la capa inferior aísla la humedad."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Diseñados con 3 capas para una máxima absorción y neutralización del olor, estos tapetes mantienen tu piso seco y libre de manchas. La capa superior es resistente a las pisadas, la capa intermedia gelatiniza los líquidos y la capa inferior aísla la humedad."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Diseñados con 3 capas para una máxima absorción y neutralización del olor, estos tapetes mantienen tu piso seco y libre de manchas. La capa superior es resistente a las pisadas, la capa intermedia gelatiniza los líquidos y la capa inferior aísla la humedad."} price={'300'} />
        <CartProducts image={tapetes} title={'Tapetes extra gruesos'} description={"Diseñados con 3 capas para una máxima absorción y neutralización del olor, estos tapetes mantienen tu piso seco y libre de manchas. La capa superior es resistente a las pisadas, la capa intermedia gelatiniza los líquidos y la capa inferior aísla la humedad."} price={'300'} />
    </div>
  )
}
