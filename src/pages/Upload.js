import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("static");
  const [file, setFile] = useState(null);
  const [variables, setVariables] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (type === "template") {
      // Simulazione variabili trovate
      setVariables(["nome", "cognome", "via"]);
    }
  };

  const handleUpload = () => {
    if (!file || !name) return alert("Compila tutto");

    const fileUrl = URL.createObjectURL(file);

    const newDoc = {
      id: Date.now(),
      name,
      description,
      type,
      fileUrl,
      variables: type === "template" ? variables : []
    };

    const existing = JSON.parse(localStorage.getItem("documents")) || [];
    localStorage.setItem("documents", JSON.stringify([...existing, newDoc]));

    navigate("/");
  };

  return (
  <div className="container">
    <h2>Crea Documento</h2>

    <input
      className="input"
      placeholder="Nome documento"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <textarea
      className="input"
      placeholder="Descrizione"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <select
      className="select"
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      <option value="static">Statico</option>
      <option value="template">Template</option>
    </select>

    <input type="file" className="input" onChange={handleFileChange} />

    {type === "template" && variables.length > 0 && (
      <div>
        <h4>Variabili rilevanti:</h4>
        {variables.map((v, i) => (
          <div key={i}>{v}</div>
        ))}
      </div>
    )}

    <button className="btn" onClick={handleUpload}>
      {type === "static" ? "Carica" : "Conferma e Carica"}
    </button>
  </div>
);
}

export default Upload;