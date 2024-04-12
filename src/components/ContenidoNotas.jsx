import React, { useState } from "react";

function ContenidoNotas({ selectedNote, onUpdateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // Actualiza los estados de título y contenido al seleccionar una nueva nota
  React.useEffect(() => {
    if (selectedNote) {
      setEditedTitle(selectedNote.title);
      setEditedContent(selectedNote.content);
    }
  }, [selectedNote]);

  // Maneja el cambio en el título
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  // Maneja el cambio en el contenido
  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // Maneja el clic en el botón de guardar
  const handleSaveNote = () => {
    onUpdateNote({
      ...selectedNote,
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false); // Finaliza la edición al guardar
  };

  // Renderiza la vista de edición si isEditing es verdadero
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

  // Renderiza la vista de visualización si no se está editando
  return (
    <>
      {selectedNote ? (
        <div
          className="bg-gray-100 rounded-md p-4 mb-4"
          onClick={() => setIsEditing(true)}
        >
          <p className="text-gray-400 mb-2">{selectedNote.creationDate}</p>
          <h3 className="text-lg font-semibold mb-2">{selectedNote.title}</h3>
          <p className="text-gray-400">{selectedNote.content}</p>
        </div>
      ) : (
        <div>Bienvenido</div>
      )}
    </>
  );
}

export default ContenidoNotas;
