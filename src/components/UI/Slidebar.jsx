import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaPlus } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import Profile from "../Profile";
import { useAuth0 } from "@auth0/auth0-react";
import CategoryButton from "../CategoriaBoton";
import NotesPanel from "../NotasPanel";
import ContenidoNotas from "../ContenidoNotas";

const Sidebar = ({ notes, setNotes }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [categories, setCategories] = useState(["Categoría 1", "Categoría 2"]);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { logout } = useAuth0();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAddingCategory(false);
    // Al seleccionar una categoría, también restablecer la nota seleccionada
    setSelectedNote(null);
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setAddingCategory(false);
    }
  };

  const getNoteCountByCategory = (categoria) => {
    return notes.filter((note) => note.categoria === categoria).length;
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note === selectedNote ? updatedNote : note
    );
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 overflow-y-auto relative ${
          showSidebar ? "block" : "hidden"
        }`}
      >
        <div className="p-4 mb-72">
          <Profile />
          <div>
            <div className="flex justify-between items-center">
              <button
                className={`mt-4 py-2 px-4 rounded-md w-full ${
                  selectedOption === "Categorías" ? "" : ""
                }`}
                onClick={() => handleOptionSelect("Categorías")}
              >
                Categorías
              </button>
              <div className="relative">
                <span
                  className="ml-2 cursor-pointer content-center mt-3 bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center"
                  onClick={() => setAddingCategory(!addingCategory)}
                >
                  <FaPlus size={13} />
                </span>
              </div>
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
            <div className="overflow-y-auto max-h-40">
              {categories.map((categoria, index) => (
                <CategoryButton
                  key={index}
                  category={categoria}
                  isSelected={selectedOption === categoria}
                  onClick={() => handleOptionSelect(categoria)}
                  noteCount={getNoteCountByCategory(categoria)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-4 text-white py-2 px-4 rounded-md w-full flex justify-center cursor-pointer"
          onClick={() => logout()}
        >
          <RiLogoutBoxLine className="mt-1" />
          <span>Logout</span>
        </div>
      </div>

      {/* Superponer flechas */}
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <div className="  p-2" onClick={toggleSidebar}>
          {showSidebar ? <FaArrowLeftLong /> : <FaArrowRightLong />}
        </div>
      </div>

      {/* Content */}
      {showSidebar && (
        <div className="flex-1 bg-gray-800 max-w-56">
          {/* Notes */}
          <NotesPanel
            notes={notes}
            setNotes={setNotes}
            selectedOption={selectedOption}
            onNoteSelect={handleNoteSelect} // Pasar la función para manejar la selección de notas
          />
        </div>
      )}

      <div className="flex-1 bg-gray-100 p-4">
        <ContenidoNotas
          selectedNote={selectedNote}
          onUpdateNote={handleUpdateNote}
        />
      </div>
    </div>
  );
};

export default Sidebar;
