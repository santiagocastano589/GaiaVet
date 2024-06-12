import React from 'react'

export const InfoContainer = ({image, alt, title, description}) => {
  return (
    <div className='w-full h-full p-10 flex justify-evenly items-center'>

        <div className='w-2/5 flex justify-center'>
          <img src={image} alt={alt} className='w-96 h-96 rounded-full object-cover'/>          
        </div>
        <div className='w-2/4 h-full flex flex-col items-center' >
          <h2 className='text-5xl p-4'>{title}</h2>
          <p className='pt-6 p-4'>{description}</p>
        </div>
 
    </div>
  )
}
