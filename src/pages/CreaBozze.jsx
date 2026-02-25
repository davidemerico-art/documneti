import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CreaBozze() {

  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [template, setTemplate] = useState("");

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(docs);
  }, []);

  const toggleAttachment = (id) => {
    setAttachments((prev) =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!name) return alert("Devi dare un nome alla bozza");
    const saved = JSON.parse(localStorage.getItem("bozze")) || [];
    const newBozza = { id: Date.now(), name, subject, attachments, template };
    localStorage.setItem("bozze", JSON.stringify([...saved, newBozza]));
    navigate("/messages"); 
  };

  return (
    <div className="container" style={{ minHeight: "100vh", padding: "40px" }}>
      <h2>Crea Nuova Bozza Email</h2>
  
      <input
        className="input"
        placeholder="Nome Bozza"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Oggetto Email"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div style={{ margin: "20px 0" }}>
        <h3>Allegati</h3>
        {documents.map((doc) => (
          <div key={doc.id}>
            <input
              type="checkbox"
              checked={attachments.includes(doc.id)}
              onChange={() => toggleAttachment(doc.id)}
            />{" "}
            {doc.name}
          </div>
        ))}
      </div>

      <div style={{ margin: "20px 0" }}>
        <h3>Template</h3>
        {documents
          .filter(doc => doc.type === "template")
          .map((doc) => (
            <div key={doc.id}>
              <input
                type="radio"
                name="template"
                checked={template === doc.id}
                onChange={() => setTemplate(doc.id)}
              />{" "}
              {doc.name}
            </div>
          ))}
      </div>
<FaArrowLeft
          size={20}
         style={{ cursor: "pointer", color: "#4b0082" }}
          onClick={() => navigate("/messages")}
          title="Torna all messaggi"
           />
      <button className="btn" onClick={handleSave}>Salva Bozza</button>
      
    </div>
    
  );
}

export default CreaBozze;
