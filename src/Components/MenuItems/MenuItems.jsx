import React, { useState } from 'react';

export const MenuItems = ({ nameItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  const animated = () => {
    setIsHovered(true);
    console.log('entro');
  };

  const notAnimated = () => {
    setIsHovered(false);
    console.log('salió');
  };

  return (
    <div className="w-full flex flex-col items-center">
      <li
        className="w-3/5 text-xl text-center cursor-pointer"
        onMouseEnter={animated}
        onMouseLeave={notAnimated}
      >
        {nameItem}
      </li>
      <span
        className={` rounded-sm mb-6 w-3/5 h-1 transition-all duration-500 ease-out ${
          isHovered ? 'animate-fade-right bg-header' : ''
        }`}
      ></span>
    </div>
  );
};
