import React from 'react'
import estrella from '../../assets/estrella.webp'
import peluqueria from '../../assets/peluqueria1.jpg'

export const ContainerCard = ({name,comment,hour}) => {
  return (
    
    <div className='bg-white w-2/5 rounded-2xl border-solid border-2 border-blue-border shadow-lg shadow-slate-400'> 

    <div className=' flex p-5'>
        <img className='w-16 h-16 rounded-full' src={peluqueria} alt="" />
        <div className='flex flex-col justify-center items-center px-2'>
        <p>{name}</p>
        <p>{hour}</p>
        </div>
    </div>

    <div className='p-5 flex justify-between w-80'> 
        <img className='h-9 w-9' src={estrella} alt="" />
        <img className='h-9 w-9' src={estrella} alt="" />
        <img className='h-9 w-9' src={estrella} alt="" />
        <img className='h-9 w-9' src={estrella} alt="" />
        <img className='h-9 w-9' src={estrella} alt="" />           
    </div>

    <div>
        <p className='p-5'>{comment}</p>
    </div>
</div>
  )
}
