import React from 'react'
import estrella from '../../assets/estrella.webp'
import peluqueria from '../../assets/peluqueria1.jpg'

export const ContainerCard = ({name,comment,hour}) => {
  return (
    
    <div className='my-10 h-72 bg-white w-[30rem] rounded-2xl border-solid border-2 shadow-lg shadow-slate-400'> 

    <div className='flex p-5'>
        <img className='w-24 h-24 rounded-full' src={peluqueria} alt="" />
        <div className='flex flex-col justify-between items-center w-3/5 '>

        <div className='flex items-center flex-col'>
        <p>{name}</p>
        <p>{hour}</p>
        </div>

        <div className='flex justify-between w-48'> 
        <img className='h-7 w-7' src={estrella} alt="" />
        <img className='h-7 w-7' src={estrella} alt="" />
        <img className='h-7 w-7' src={estrella} alt="" />
        <img className='h-7 w-7' src={estrella} alt="" />
        <img className='h-7 w-7' src={estrella} alt="" />           
    </div>
        </div>
    </div>

    

    
    <div className="overflow-auto h-24"> 
       <p className='mx-3 ps-3'>{comment}</p>
    </div>
</div>
  )
}
