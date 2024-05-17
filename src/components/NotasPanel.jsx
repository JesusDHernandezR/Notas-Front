import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { crearNotas, eliminarNotas } from "../services/notasServices";
import { toast } from "react-toastify";
import { formatoFecha } from "../utils/utils";
import emailjs from "@emailjs/browser";
import { useAuth0 } from "@auth0/auth0-react";

const NotesPanel = ({ selectedOption, notes, setNotes, onNoteSelect }) => {
  const form = useRef();
  const [nota, setNota] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    fecha: new Date().toISOString(),
  });
  const [showInputs, setShowInputs] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const templateParams = {
    from_name: user.name,
    from_email: user.email,
    to_name: "NotasAPP",
    message: nota.titulo,
  };

  useEffect(() => {
    setNota({
      id: 0,
      titulo: "",
      descripcion: "",
      categoria: selectedOption,
      fecha: new Date().toISOString(),
    });
  }, [selectedOption]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNota((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceID = "service_mw84yzk";
    const emailTemplate = "template_41om8n3";
    const publicId = "RdVSXJ9drnttQH2YX";
    const { error } = (notes, { abortEarly: false });

    if (error) {
      console.error("Error de validación:", error.details);
      return;
    }

    try {
      await crearNotas(nota);
      e.preventDefault();
      await emailjs
        .send(serviceID, emailTemplate, templateParams, publicId)
        .then(
          (response) => {
            console.log("Email enviado!", response);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      toast.success("Nota creado con éxito");
      console.log("nota creado");
      setNota({
        titulo: "",
        descripcion: "",
        categoria: "",
        fecha: new Date().toISOString(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al crear el nota");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await eliminarNotas(id); // Llama a la función para eliminar la nota
      const newNotes = notes.filter((note) => note.id !== id); // Filtra las notas para eliminar la nota eliminada
      setNotes(newNotes); // Actualiza el estado de las notas
      toast.success("Nota eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      toast.error("Error al eliminar la nota");
    }
  };

  console.log(notes);
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
              <form onSubmit={handleSubmit} ref={form}>
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
            .filter((note) => note.categoria === selectedOption)
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
                    handleDeleteNote(note.id);
                  }}
                >
                  <FaTrash />
                </span>
                <p className="text-xs text-gray-400 mb-1">
                  {formatoFecha(note.fecha)}
                </p>
                <h3 className="font-semibold text-lg mb-1">{note.titulo}</h3>
                <p className="text-gray-400 overflow-hidden whitespace-nowrap">
                  {note.descripcion}
                </p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default NotesPanel;
