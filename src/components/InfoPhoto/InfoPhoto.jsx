import React from 'react'

export const InfoPhoto = ({image, alt}) => {
  return (
    <div>
        <img src={image} alt={alt} className='w-3/4 rounded-full'/>


    </div>
  )
}
