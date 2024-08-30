import React from 'react'

export const CategoryCard = ({image, title, alt, description}) => {
  return (
    <>
        <div className="h-[10rem] m-2 rounded-xl flex justify-between items-center shadow-md hover:-translate-y-2 hover: duration-500 hover: cursor-pointer hover:bg-slate-100">
            <div className='w-1/2 h-full rounded-3xl flex justify-start p-2'>
                <img className='w-[100%] h-[100%] object-contain ' src={image} alt={alt}/>
            </div>
            <div className='w-1/2 text-center px-2'>
                <h2 className='text-3xl gorditas text-center text-teal-500'>
                    {title}
                </h2>
            </div>
        </div>
    </>
  )
}
