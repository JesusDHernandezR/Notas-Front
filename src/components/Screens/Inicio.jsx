import React, { useState } from "react";
import Sidebar from "../UI/Slidebar";

function Inicio() {
  const [notes, setNotes] = useState([
    {
      category: "Categoría 1",
      title: "Test",
      content: "aaaaaaaaaaaaaaaaaaa",
      creationDate: new Date().toLocaleString(),
    },
  ]);
  return (
    <div>
      <Sidebar notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default Inicio;
