import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

export const MenuItems = ({ nameItem, to, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const animated = () => {
    setIsHovered(true);
  };

  const notAnimated = () => {
    setIsHovered(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {type === 'scroll' ? (
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
      ) : (
        <RouterLink
          to={to}
          className="w-3/5 text-xl text-center cursor-pointer"
          onMouseEnter={animated}
          onMouseLeave={notAnimated}
        >
          {nameItem}
        </RouterLink>
      )}
      <span
        className={`rounded-sm mb-6 w-3/5 h-1 transition-all duration-500 ease-out ${
          isHovered ? 'animate-fade-right bg-header' : ''
        }`}
      ></span>
    </div>
  );
};
