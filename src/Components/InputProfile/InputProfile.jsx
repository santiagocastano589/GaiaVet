import React from 'react'

export const InputProfile = ({lblName,InValue}) => {
  return (
    <>
        <div className='w-full pt-4 flex p-3 justify-center'>
            <div className='w-36'>
              <label className=' text-2xl font-semibold' htmlFor="">{lblName}: </label>
            </div>

            <input type="text" value={InValue} className='w-2/3 h-10 pl-2 text-xl bg-gray-200 rounded-lg focus:border-buttons' />
        </div>
    </>
  )
}
