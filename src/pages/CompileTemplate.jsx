import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";

function CompileTemplate() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents")) || [];
    const found = docs.find(d => d.id === Number(id));
    setDoc(found);
  }, [id]);

  const handleDownload = () => {
    alert("Download documento compilato");
  };

  

  if (!doc) return <div className="container">Documento non trovato</div>;

  return (
    <div className="container">
      <h2>Anteprima Documento</h2>

      <div className="preview-box">
        <p><strong>Nome:</strong> {doc.name}</p>
        <p><strong>Descrizione:</strong> {doc.description}</p>
        <hr />
        <p>Qui verrà mostrata l'anteprima reale del documento generato.</p>
      </div>

      <div style={{
        marginTop: "25px",
        display: "flex",
        gap: "25px",
        alignItems: "center"
      }}>

        <FaDownload
          size={28}
          style={{ cursor: "pointer", color: "#4b0082" }}
          onClick={handleDownload}
          title="Scarica Documento"
        />

      

      </div>
    </div>
  );
}

export default CompileTemplate;
