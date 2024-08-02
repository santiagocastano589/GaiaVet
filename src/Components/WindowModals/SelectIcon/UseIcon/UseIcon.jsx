import React from 'react'

export const UseIcon = ({icon}) => {
  return (
    <>
        <div className='w-1/4 h-40 mb-4 flex flex-col items-center'>
            <img className='w-3/5 h-36 cursor-pointer rounded-full shadow-formShadow hover:-translate-y-3 duration-500'  src={icon} alt="" />
        </div>
    </>
  )
}
