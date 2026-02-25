import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload, FaPen, FaEnvelope } from "react-icons/fa";
import { useDocuments } from "../hooks/useDocuments";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { documents, deleteDocument } = useDocuments();

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const downloadFile = (doc) => {
    window.open(doc.fileUrl);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", justifyContent: "center", gap: "20px" }}>
        <h1 style={{ fontSize: "42px", margin: 0 }}>Documenti</h1>

        
        <button className="btn" onClick={() => navigate("/upload")}>
          Crea Documento
        </button>

       
        <FaEnvelope
          size={30}
          style={{ cursor: "pointer", color: "#4b0082" }}
          title="Invia email"
          onClick={() => navigate("/messages")}
        />
      </div>

      
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          className="search-input"
          placeholder="Cerca documento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    
      <div
        style={{
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {filteredDocs.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Nessun documento caricato
          </p>
        ) : (
          filteredDocs.map((doc) => (
            <div key={doc.id} className="card" style={{ marginBottom: "20px", position: "relative" }}>
              <h3 className="card-title">{doc.name}</h3>
              <div className="badge">{doc.type}</div>
              <p>{doc.description}</p>

              <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "10px" }}>
                <FaDownload
                  size={20}
                  style={{ cursor: "pointer", color: "#4b0082" }}
                  title="Scarica"
                  onClick={() => downloadFile(doc)}
                />
                <FaTrash
                  size={20}
                  style={{ cursor: "pointer", color: "#4b0082" }}
                  title="Elimina"
                  onClick={() => deleteDocument(doc.id)}
                />
                {doc.type === "template" && (
                  <FaPen
                    size={20}
                    style={{ cursor: "pointer", color: "#4b0082" }}
                    title="Compila Template"
                    onClick={() => navigate(`/compile/${doc.id}`)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
}

export default Home;