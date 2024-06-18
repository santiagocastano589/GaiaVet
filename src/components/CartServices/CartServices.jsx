import React from 'react'

export const CartServices = ({ service, image, alt }) => {
  return (
    <div className='w-96 flex flex-col items-center'>
        <div className='p-4 border-4 border-black rounded-t-3xl border-b-0'>
            <img src={image} alt={alt}/>
        </div>
        <div className='w-full bg-teal-500 flex justify-center p-4 border-4 border-black rounded-b-3xl'>
            <p>
                {service}
            </p>
        </div>
    </div>
  )
}
