import React from 'react'

export const Buttons = ({btnName}) => {
  return (
    <button className=' w-2/3 h-12 mt-2 rounded-xl bg-buttons bg-opacity-30 shadow-md'>
        {btnName}
    </button>
  )
}
