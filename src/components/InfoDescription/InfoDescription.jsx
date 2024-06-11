import React from 'react'

export const InfoDescription = ({ title, description }) => {
  return (
    <div className='w-full h-full bg-red-500'>
        <h2 className='text-5xl'>{title}</h2>
        <p>{description}</p>
    </div>
  )
}
