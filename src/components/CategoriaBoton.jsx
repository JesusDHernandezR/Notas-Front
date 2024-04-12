import React from "react";

const CategoryButton = ({ category, isSelected, onClick, noteCount }) => {
  return (
    <button
      className={`mt-2 py-2 px-4 rounded-md w-full ${
        isSelected ? " border-l-4 border-white bg-gray-800" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span>{category}</span>
        <span className="bg-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
          {noteCount}
        </span>
      </div>
    </button>
  );
};

export default CategoryButton;
