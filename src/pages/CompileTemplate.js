import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CompileTemplate() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [values, setValues] = useState({});

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents")) || [];
    const found = docs.find(d => d.id === Number(id));
    setDoc(found);
  }, [id]);

  const handleChange = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const downloadCompiled = () => {
    alert("Simulazione generazione documento con variabili inserite");
  };

  if (!doc) return <div>Documento non trovato</div>;
  return (
  <div className="container">
    <h2>Compila Template</h2>

    <div className="preview-box">
      Anteprima documento...
    </div>

    {doc.variables.map((v, i) => (
      <input
        key={i}
        className="input"
        placeholder={v}
        onChange={(e) => handleChange(v, e.target.value)}
      />
    ))}

    <button className="btn" onClick={downloadCompiled}>
      Scarica File
    </button>
  </div>
);
}

export default CompileTemplate;
