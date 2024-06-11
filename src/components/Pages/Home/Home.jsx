import React from 'react'
import mascotas from '../../../../public/mascotas.jpeg'
import { InfoContainer } from '../../infoContainer/InfoContainer'


export const Home = () => {
  return (
    <div className='w-full'>
        <div>
            <img src={mascotas} alt="pets reference" className='w-full h-auto'/>
        </div>
        <InfoContainer />        
    </div>
  )
}
