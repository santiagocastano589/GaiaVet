import React from 'react';

export const Input = ({lblName, name, type, placeholder, onChange }) => {
  return (
    <>
      <label className='my-4 mx-9'>{lblName}</label>
      <input
        name={name}
        className='mx-9 p-3 rounded-xl border-solid border-2 border-gray-50r w-80 focus:outline-none focus:border-blue-border'
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
};
