import React, { useState, useEffect } from 'react';

export const InputProfile = ({ lblName, initialValue, editMode, onValueChange, name }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onValueChange) {
      onValueChange(event); // Llamada a la función de manejo de cambios pasada desde el componente padre
    }
  };

  return (
    <div className='w-full pt-4 flex p-3 justify-center'>
      <div className='w-36'>
        <label className='text-white text-2xl font-semibold' htmlFor="">{lblName}: </label>
      </div>
      <input
        name={name} // Asegúrate de que el atributo name esté presente
        disabled={!editMode}
        type="text"
        value={value}
        onChange={handleChange}
        className='w-2/3 h-10 pl-2 text-xl bg-gray-200 rounded-lg focus:border-buttons'
      />
    </div>
  );
}