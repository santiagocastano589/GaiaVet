import React from 'react'
import { CartServices } from '../CartServices/CartServices'
import calendario from '../../assets/calendario.png'
import baño from '../../assets/aseo-de-mascotas.png'
import consultaGeneral from '../../assets/consulta.png'
import peluqueria from '../../assets/peluqueria.png'
import { Link } from 'react-router-dom'

export const ContainerServices = () => {
  return (
  <div className='w-full p-4 py-20 flex items-center justify-evenly'>

    <Link to={'/peluqueria'}><CartServices image={peluqueria} service={'Peluqueria'} alt={'Peluqueria'}/></Link>
    <Link to={'/baño'}><CartServices image={baño} service={'Baño'} alt={'Baño'}/></Link>
    <Link to={'/guarderia'}><CartServices image={calendario} service={'Guarderia'} alt={'Guarderia'}/></Link>
    <Link to={'/consulta'}><CartServices image={consultaGeneral} service={'Consulta General'} alt={'Consulta General'}/></Link>

  </div>
  )
}
