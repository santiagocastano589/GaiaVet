import React from 'react'
import './Main.css'
import fondo from '../../../assets/FondoPatitas.svg'

export const Main = ({children}) => {
  return (
    
    <main className='main h-screen bg-cover opacity-100 z-0'>
      <img src={fondo} alt="" />
        {children}
    </main>
    
  )
}