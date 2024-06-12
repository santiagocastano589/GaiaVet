import React from 'react'

export const Input = ({name,type,placeholder}) => {
  return (
    <>
    <label className='my-4 mx-9' >{name}</label>
    <input className='mx-9 p-3 rounded-xl border-solid border-2 border-blue-border w-80' type={type} placeholder={placeholder} />
    </>
  )
}
