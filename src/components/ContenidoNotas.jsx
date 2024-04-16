import React, { useState } from "react";
import { actualizarNotas } from "../services/notasServices";
import { formatoFecha } from "../utils/utils";

function ContenidoNotas({ selectedNote, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  React.useEffect(() => {
    if (selectedNote) {
      setEditedTitle(selectedNote.titulo);
      setEditedContent(selectedNote.descripcion);
    }
  }, [selectedNote]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleSaveNote = async () => {
    try {
      await actualizarNotas(selectedNote.id, {
        ...selectedNote,
        titulo: editedTitle,
        descripcion: editedContent,
      });

      onUpdateNote({
        ...selectedNote,
        titulo: editedTitle,
        descripcion: editedContent,
      });

      setIsEditing(false); 
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      
    }
  };


  if (isEditing) {
    return (
      <div className="bg-gray-100 rounded-md p-4 mb-4">
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          className="text-lg font-semibold mb-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-black w-full"
          autoFocus // Enfoca automáticamente el campo de título al abrir la edición
        />
        <textarea
          value={editedContent}
          onChange={handleContentChange}
          className="text-gray-400 bg-transparent border border-gray-400 rounded-md p-2 mb-2 h-32 focus:outline-none focus:border-black w-full"
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-800 text-white py-1 px-2 rounded-md mr-2"
            onClick={handleSaveNote}
          >
            Guardar
          </button>
          <button
            className="bg-gray-800 text-white py-1 px-2 rounded-md"
            onClick={() => setIsEditing(false)} // Cancela la edición
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }


  return (
    <>
      {selectedNote ? (
        <div
          className="bg-gray-100 rounded-md p-4 mb-4"
          onClick={() => setIsEditing(true)}
        >
          <p className="text-gray-400 mb-2">{formatoFecha(selectedNote.fecha)}</p>
          <h3 className="text-lg font-semibold mb-2">{selectedNote.titulo}</h3>
          <p className="text-gray-400">{selectedNote.descripcion}</p>
        </div>
      ) : (
        <div>Bienvenido</div>
      )}
    </>
  );
}

export default ContenidoNotas;
