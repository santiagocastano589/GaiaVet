import React from 'react';

const InputPetNoEditable = ({ htmlFor, nameLabel, id, value, onChange }) => {
  return (
    <div className='flex items-center mt-3'>
      <label className='w-[10rem] text-black text-xl' htmlFor={htmlFor}>
        {nameLabel}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange} 
        disabled
        className="p-1 w-[30rem] bg-gray-200 text-black rounded-lg text-lg"
      />
    </div>
  );
};

export default InputPetNoEditable;
