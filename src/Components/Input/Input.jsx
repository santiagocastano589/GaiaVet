import React from 'react'

export const Input = ({name,type,placeholder}) => {
  return (
    <>
    <label className='my-4' >{name}</label>
    <input className='p-2 rounded-xl border-solid border-2 border-blue-border ' type={type} placeholder={placeholder} />
    </>
  )
}
