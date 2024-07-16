import React from 'react'

const InputPet = ({htmlFor,nameLabel,id,value,onchange}) => {
  return (
    <div className='flex items-center mt-3'>

        <label className='w-24 text-black text-xl' htmlFor={htmlFor}>{nameLabel}</label>
            <input
              type="text"
              id={id}
              value={value}
              onChange={onchange}
              className="p-1 w-[30rem] bg-gray-200 text-black rounded-lg text-lg"
        />
            
    </div>
  )
}

export default InputPet
