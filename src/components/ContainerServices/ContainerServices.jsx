import React from 'react'
import { CartServices } from '../CartServices/CartServices'
import calendario from '../../assets/calendario.png'
import baño from '../../assets/aseo-de-mascotas.png'
import consultaGeneral from '../../assets/consulta.png'
import peluqueria from '../../assets/peluqueria.png'

export const ContainerServices = () => {
  return (
    <div className='w-full p-4 py-20 flex items-center justify-evenly'>
        <CartServices image={peluqueria} service={'Peluqueria'} alt={'Peluqueria'}/>
        <CartServices image={baño} service={'Baño'} alt={'Baño'}/>
        <CartServices image={calendario} service={'Guarderia'} alt={'Guarderia'}/>
        <CartServices image={consultaGeneral} service={'Consulta General'} alt={'Consulta General'}/>

    </div>
  )
}
