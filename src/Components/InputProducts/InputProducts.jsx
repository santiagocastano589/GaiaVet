import React from 'react'

const InputProducts = ({ nameLabel, onChange, name, type = 'text', value = '' }) => {
  return (
    <div className='w-[90%] flex justify-between items-center mt-3'>
      <label className='w-[30%] text-black text-lg text-balance'>{nameLabel}</label>
      <input value={value} name={name} onChange={onChange} type={type} className="p-1 w-[70%] bg-gray-200 text-black rounded-lg text-lg"/>
    </div>
  )
}

export default InputProducts;
