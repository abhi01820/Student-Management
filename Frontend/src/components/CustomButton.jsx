import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({ text, to, icon, onClick }) => {
  return (
    <Link
      to={to || "#"}
      onClick={onClick}
      className={`
        inline-flex 
        items-center 
        justify-center 
        px-6 
        py-3 
        rounded-full 
        text-lg 
        font-semibold 
        text-white
        bg-white 
        border-2 
        border-indigo-200
        shadow-lg 
        transition-all 
        duration-300 
        ease-in-out 
        hover:bg-indigo-200
        hover:text-white 
        hover:scale-105 
        hover:shadow-2xl 
        focus:outline-none 
        focus:ring-4 
        focus:ring-indigo-300
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </Link>
  );
};

export default CustomButton;
