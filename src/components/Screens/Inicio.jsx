import React, { useState } from "react";
import Sidebar from "../UI/Slidebar";

function Inicio() {
  const [notes, setNotes] = useState([
    
  ]);
  
  return (
    <div>
      <Sidebar notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default Inicio;
