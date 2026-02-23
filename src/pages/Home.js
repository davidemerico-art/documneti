import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

        {doc.type === "static" && (
          <button className="btn" onClick={() => downloadFile(doc)}>
            Download
          </button>
        )}

        {doc.type === "template" && (
          <>
            <button
              className="btn"
              onClick={() => navigate(`/compile/${doc.id}`)}
            >
              Compila
            </button>
            <button className="btn" onClick={() => downloadFile(doc)}>
              Download
            </button>
          </>
        )}
      </div>
    ))}
  </div>
);
}

export default Home;