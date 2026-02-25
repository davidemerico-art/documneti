import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload ,FaArrowLeft} from "react-icons/fa";

function CompileTemplate() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents")) || [];
    const found = docs.find(d => d.id === Number(id));
    setDoc(found);
  }, [id]);


  const downloadFile = (doc) => {
    if (!doc || !doc.fileUrl) return;
    window.open(doc.fileUrl);
  };

  if (!doc) return <div className="container">Documento non trovato</div>;

  return (
    <div className="container" style={{ minHeight: "100vh", padding: "40px" }}>
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
          size={22}
          style={{ cursor: "pointer", color: "#4b0082" }}
          title="Scarica"
          onClick={() => downloadFile(doc)}
        />
        <div>
         <FaArrowLeft
          size={20}
         style={{ cursor: "pointer", color: "#4b0082" }}
          onClick={() => navigate("/")}
          title="Torna alla Home"
           />
         </div>
      </div>
    </div>
  );
}

export default CompileTemplate;
