// Card.jsx
import React from "react";

const Card = ({ title, description, darkMode }) => {
  return (
    <div className={darkMode?"bg-black p-6 rounded-lg shadow-lg max-w-sm w-full":"bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className={darkMode?"text-gray-50 bm-4":"text-gray-700 mb-4"}>{description}</p>
      <div className="flex justify-end"></div>
    </div>
  );
};

export default Card;
