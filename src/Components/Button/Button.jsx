import React from 'react';

export const Button = ({ textButton, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick} 
      className='text-white hover:bg-teal-400 shadow-lg shadow-gray-500/50 p-3 w-72 my-4 rounded-lg bg-blue-border'
    >
      {textButton}
    </button>
  );
};
