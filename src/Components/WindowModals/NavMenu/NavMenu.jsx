import React from 'react'

export const NavMenu = ({onClose}) => {
  return (
    <div className='w-1/4 h-96 bg-gray-500 fixed top-28 right-0 z-0 '>
        <p onClick={onClose}>X</p>
    </div>
  )
}
