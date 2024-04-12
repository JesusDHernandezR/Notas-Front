import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const NotesPanel = ({ selectedOption, notes, setNotes, onNoteSelect }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const handleAddNote = () => {
    if (newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
      const newNote = {
        category: selectedOption,
        title: newNoteTitle,
        content: newNoteContent,
        creationDate: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setShowInputs(false);
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="p-4  bg-gray-300 h-full">
      <h2 className="mb-4 ">
        {selectedOption ? (
          <div className="flex justify-between">
            <span className="font-semibold text-xl mt-0.5">
              {selectedOption}
            </span>
            <button
              className="rounded-md text-2xl justify-start"
              onClick={() => setShowInputs(!showInputs)}
            >
              +
            </button>
          </div>
        ) : (
          "Seleccione una categoría"
        )}
      </h2>
      {selectedOption && (
        <>
          {showInputs && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Título"
                className="py-1 px-3 rounded-md mr-2 mb-2"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contenido"
                className="py-1 px-3 rounded-md mr-2 mb-2"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white py-1 px-2 rounded-md"
                onClick={handleAddNote}
              >
                Agregar Nota
              </button>
            </div>
          )}
          {notes
            .filter((note) => note.category === selectedOption)
            .map((note, index) => (
              <div
                key={index}
                className="border-gray-700 border rounded-md p-3 px-5 cursor-pointer relative"
                onClick={() => onNoteSelect(note)}
              >
                <span
                  className="absolute top-1 right-1 text-gray-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(index);
                  }}
                >
                  <FaTrash />
                </span>
                <p className="text-xs text-gray-400 mb-1">
                  {note.creationDate}
                </p>
                <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
                <p className="text-gray-400 overflow-hidden whitespace-nowrap">
                  {note.content.length > 60
                    ? note.content.slice(0, 60) + "..."
                    : note.content}
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default NotesPanel;
