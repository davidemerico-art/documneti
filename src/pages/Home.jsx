import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload } from "react-icons/fa";
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
    <div
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        backgroundColor: "#f3f3f3",
      }}
    >


      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Documenti</h1>
        <button className="btn" onClick={() => navigate("/upload")}>
          Crea Documento
        </button>
        <button className="btn" onClick={() => navigate("/messages")}>
          Invia Messaggi
        </button>
      </div>

      {/* Barra di ricerca */}
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
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  title="Scarica"
                  onClick={() => downloadFile(doc)}
                />
                <FaTrash
                  size={20}
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  title="Elimina"
                  onClick={() => deleteDocument(doc.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      
      <div
        style={{
          marginTop: "20px",
          flex: 1,                   
          borderRadius: "25px",
          backgroundImage: "url('https://wallpapers.com/images/hd/google-docs-3000-x-2000-background-ev56z6cpsw49w5rv.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
}

export default Home;