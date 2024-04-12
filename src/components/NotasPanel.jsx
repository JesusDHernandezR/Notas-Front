import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { crearNotas } from "../services/notasServices";
import { toast } from "react-toastify";
import Joi from "joi";


const NotesPanel = ({ selectedOption, notes, setNotes, onNoteSelect }) => {
  const [nota, setNota] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    fecha: new Date().toISOString(),
  });
  const [showInputs, setShowInputs] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
console.log(selectedOption)
console.log(new Date().toISOString())
useEffect(()=>{
setNota({
  id:notes.length,
  titulo: "",
    descripcion: "",
    categoria: selectedOption,
    fecha: new Date().toISOString(),
})
},[selectedOption])


 
  const handleAddNote = () => {
    if (newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
      const newNote = {
        id:notes.length,
        descripcion: selectedOption,
        title: newNoteTitle,
        descripcion: newNoteContent,
        creationDate: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setNewNoteContent("");
      setShowInputs(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNota((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos con Joi
    const { error } = (notes, { abortEarly: false });

    if (error) {
      console.error("Error de validación:", error.details);
      return;
    }

    try {
      // Llama a la función del servicio para enviar la solicitud POST
      await crearNotas(nota);

      toast.success("Nota creado con éxito");
      console.log("nota creado");
      
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al crear el nota");
      // Manejar los errores según sea necesario
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };
console.log(nota)
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
              <form onSubmit={handleSubmit}
              
              >
                <input
                type="text"
                placeholder="Título"
                className="py-1 px-3 rounded-md mr-2 mb-2"
                value={nota.titulo}
                name="titulo"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Contenido"
                name="descripcion"
                className="py-1 px-3 rounded-md mr-2 mb-2"
                value={nota.descripcion}
                onChange={handleChange}
              />
              <button
              type="submit"
                className="bg-gray-800 text-white py-1 px-2 rounded-md"
                
              >
                Agregar Nota
              </button>
              </form>
              
            </div>
          )}
          {notes
            .filter((note) => note.descripcion === selectedOption)
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
