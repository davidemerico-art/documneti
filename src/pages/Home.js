import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload, FaPen } from "react-icons/fa";

function Home() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(savedDocs);
  }, []);

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const downloadFile = (doc) => {
    window.open(doc.fileUrl);
  };

  const deleteDocument = (id) => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare il documento?");
    if (!confirmDelete) return;

    const updatedDocs = documents.filter(doc => doc.id !== id);
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
    setDocuments(updatedDocs);
  };

  return (
    <div className="container">
      <h2>Documenti</h2>

      <input
        className="search-input"
        placeholder="Cerca documento..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn" onClick={() => navigate("/upload")}>
        Carica Documento
      </button>

      {filteredDocs.map(doc => (
        <div key={doc.id} className="card">
          <div className="card-title">{doc.name}</div>
          <div>{doc.description}</div>
          <div className="badge">{doc.type}</div>

          <div style={{ marginTop: "15px", display: "flex", gap: "15px" }}>

            {doc.type === "static" && (
              <FaDownload
                size={20}
                style={{ cursor: "pointer", color: "black" }}
                onClick={() => downloadFile(doc)}
                title="Download"
              />
            )}

            {doc.type === "template" && (
              <>
                <FaPen
                  size={20}
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => navigate(`/compile/${doc.id}`)}
                  title="Compila"
                />

                <FaDownload
                  size={20}
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => downloadFile(doc)}
                  title="Download"
                />
              </>
            )}

            <FaTrash
              size={20}
              style={{ cursor: "pointer", color: "black" }}
              onClick={() => deleteDocument(doc.id)}
              title="Elimina"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;