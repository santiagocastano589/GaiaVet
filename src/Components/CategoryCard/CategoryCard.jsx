import React from 'react'

export const CategoryCard = ({image, title, alt, description}) => {
  return (
    <>
        <div className="w-1/3 m-2 rounded-xl flex justify-between items-center shadow-md hover:-translate-y-2 hover: duration-500 hover: cursor-pointer hover:bg-slate-200">
            <div className='w-1/2 rounded-xl flex justify-start p-8 object-cover'>
                <img className='object-cover rounded-2xl' src={image} alt={alt}/>
            </div>
            <div className='w-1/2 h-full flex flex-col justify-evenly text-center px-2'>
                <h2 className='text-4xl gorditas text-center text-teal-500'>
                    {title}
                </h2>
                <p className='gorditas '>
                    {description}
                </p>
            </div>
        </div>
    </>
  )
}
