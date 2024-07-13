import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const MenuItems = ({ nameItem, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  const animated = () => {
    setIsHovered(true);
  };

  const notAnimated = () => {
    setIsHovered(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        className="w-3/5 text-xl text-center cursor-pointer"
        onMouseEnter={animated}
        onMouseLeave={notAnimated}
      >
        {nameItem}
      </ScrollLink>
      <span
        className={`rounded-sm mb-6 w-3/5 h-1 transition-all duration-500 ease-out ${
          isHovered ? 'animate-fade-right bg-header' : ''
        }`}
      ></span>
    </div>
  );
};
