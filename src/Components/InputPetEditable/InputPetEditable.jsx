import React from 'react';

const InputPetEditable = ({ htmlFor, nameLabel, id, value, onChange, type = 'text' }) => {
  return (
    <div className='flex items-center mt-3'>
        <label className='w-28 text-black text-xl' htmlFor={htmlFor}>{nameLabel}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="p-1 w-[30rem] bg-gray-200 text-black rounded-lg text-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" // Add focus styles
        />
    </div>
  );
};

export default InputPetEditable;
