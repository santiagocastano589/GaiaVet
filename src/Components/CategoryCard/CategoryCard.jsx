import React from 'react'

export const CategoryCard = ({image, title, alt, description}) => {
  return (
    <>
        <div className="h-[10rem] m-2 rounded-xl flex justify-between items-center shadow-md hover:-translate-y-2 hover: duration-500 hover: cursor-pointer hover:bg-slate-100 sm:w-[8rem] sm:flex-col md:w-[10rem] lg:w-[14rem] lg:flex-row xl:w-[20rem] 2xl:w-[22rem]">
            <div className='w-1/2 h-full rounded-3xl flex justify-start p-2 sm:w-[100%] sm:h-[6rem] lg:h-full'>
                <img className='w-[100%] h-[100%] object-contain' src={image} alt={alt}/>
            </div>
            <div className='w-1/2 text-center px-2 sm:w-[100%] sm:mb-[2rem] lg:mb-0 '>
                <h2 className='text-3xl gorditas text-center text-teal-500 sm:text-base lg:text-lg xl:text-2xl 2xl:text-3xl'>
                    {title}
                </h2>
            </div>
        </div>
    </>
  )
}
