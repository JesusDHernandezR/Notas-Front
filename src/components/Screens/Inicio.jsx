import React, { useEffect, useState } from "react";
import Sidebar from "../UI/Slidebar";
import { obtenerNotas } from "../../services/notasServices";

function Inicio() {



  const [notes, setNotes] = useState([
    
  ]);
  useEffect(() => {
    
    const fetchNotes = async () => {
      try {
        const response = await obtenerNotas();
        setNotes(response.data); 
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    fetchNotes();
  }, []);
  
  return (
    <div>
      <Sidebar notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default Inicio;
