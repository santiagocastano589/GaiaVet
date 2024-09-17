import React from 'react'

export const ContainerInfo = ({image, alt, title, description}) => {
  return (
    <div className='text-justify w-full h-full p-10 flex justify-evenly items-center sm:flex-col-reverse sm:w-[100%]'>

        <div className='w-2/5 flex justify-center sm:w-[100%]'>
          <img src={image} alt={alt} className='w-96 h-96 rounded-full object-cover sm:w-[20rem] sm:h-[20rem]'/>          
        </div>
        <div className='w-2/4 h-full flex flex-col items-center sm:w-[100%]'>
          <h2 className='text-5xl p-4 sm:text-[2.4rem] sm:px-0'>{title}</h2>
          <p className='pt-6 p-4 sm:pt-4 px-6'>{description}</p>
        </div>
 
    </div>
  )
}
