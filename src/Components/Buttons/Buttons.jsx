import React from 'react';
import { Link } from 'react-router-dom';


export const Buttons = ({ btnName, to }) => {
  return (
    <Link to={to} className=" w-2/3 h-12 mt-2 rounded-xl bg-buttons bg-opacity-30 shadow-md">
      {btnName}
    </Link>
  );
};

