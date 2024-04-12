import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState(["Categoría 1", "Categoría 2"]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAddingCategory(false); // Ocultar el input al seleccionar una categoría existente
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setAddingCategory(false); // Ocultar el input después de agregar una nueva categoría
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <div className="p-4    ">
          <div className="flex">
            <img
              src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              alt="Profile"
              className="rounded-full w-10"
            />
            <h1 className="text-base font-semibold content-center ml-2">
              Jhonnier José Guzmán
            </h1>
          </div>

          <div>
            <div className="flex">
              <button
                className={`mt-4 py-2 px-4 rounded-md w-full ${
                  selectedOption === "Categorías" ? "" : ""
                }`}
                onClick={() => handleOptionSelect("Categorías")}
              >
                Categorías
              </button>
              <span
                className="ml-2 cursor-pointer content-center mt-3"
                onClick={() => setAddingCategory(!addingCategory)}
              >
                +
              </span>
            </div>

            {addingCategory && (
              <div className="mt-2">
                <input
                  type="text"
                  className="py-1 px-3 rounded-md w-full"
                  placeholder="Nueva categoría"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                />
                <button
                  className="bg-gray-800 text-white py-1 px-2 rounded-md ml-2"
                  onClick={addCategory}
                >
                  Agregar
                </button>
              </div>
            )}
            <div className="overflow-y-auto max-h-96 mb-3 w-full">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`mt-2 py-2 px-4 rounded-md w-full ${
                    selectedOption === category
                      ? " border-l-4 border-white"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-white py-2 px-4 rounded-md w-full flex justify-center">
          <RiLogoutBoxLine className="mt-1" />
          <span>Logout</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-800">
        {/* Button to toggle sidebar */}
        <div className=" text-white p-2" onClick={toggleSidebar}>
          {showSidebar ? <FaArrowLeftLong /> : <FaArrowRightLong />}
        </div>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
