import React from 'react'

export const Button = ({textButton}) => {
  return (
    <>
        <button className='hover:bg-teal-200 shadow-lg shadow-gray-500/50 p-3 my-4 rounded-lg bg-blue-border w-60'>{textButton}</button>
    </>
  )
}
