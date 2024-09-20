import React from 'react'

export const SectionTitle = ({sectionTitle}) => {
  return (
    <div className='w-full h-10 bg-teal-500 flex justify-center items-center py-8'>
        <h2 className='text-3xl text-white sm:text-[1.7rem] xl:text-[2.2rem]'>{sectionTitle}</h2>
    </div>
  )
}
