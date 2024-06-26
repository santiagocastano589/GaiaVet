import React from 'react'

export const ContainerLocation = ({title, direction, phone, image, alt}) => {
  return (
    <div className='w-full my-6 py-8'>
        <div className='w-full h-60 bg-teal-200 flex flex-row justify-evenly items-center'>
            <div className='w-1/3 h-56 flex flex-col justify-evenly items-center text-2xl'>
                <h3>{title}</h3>
                <p>{direction}</p>
                <p>{phone}</p>
            </div>
            <div className='bg-teal-600 w-96 h-96 rounded-full p-4 flex justify-center items-center'>
                <img src={image} alt={alt} className='w-80' />
            </div>
        </div>
    </div>
  )
}
