import React from 'react'

const InputPet = ({htmlFor,nameLabel,id,value,onChange}) => {
  return (
    <div className='flex items-center mt-3'>

        <label className='w-28 text-black text-xl' htmlFor={htmlFor}>{nameLabel}</label>
        <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="p-1 w-[30rem] bg-gray-200 text-black rounded-lg text-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      />
            
    </div>
  )
}
  
export default InputPet
