import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaPaperPlane, FaTrash, FaArrowLeft, FaDownload } from "react-icons/fa";
import useDocuments from "../hooks/useDocuments";

function Messages() {
  const navigate = useNavigate();
  const [bozze, setBozze] = useState([]);
  const [selectedBozze, setSelectedBozze] = useState([]);
  const { documents } = useDocuments();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bozze")) || [];
    setBozze(saved);
  }, []);

  const handleSelect = (id) => {
    setSelectedBozze((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSend = () => {
    if (selectedBozze.length === 0) {
      alert("Seleziona almeno una bozza da inviare");
      return;
    }

    const bozzeDaInviare = bozze.filter((b) =>
      selectedBozze.includes(b.id)
    );

    alert(`Simula invio di ${bozzeDaInviare.length} bozze`);

    // Dopo l'invio svuoto la selezione
    setSelectedBozze([]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa bozza?")) {
      const updated = bozze.filter((b) => b.id !== id);
      setBozze(updated);
      localStorage.setItem("bozze", JSON.stringify(updated));

      // Rimuovo anche dalla selezione se presente
      setSelectedBozze((prev) => prev.filter((item) => item !== id));
    }
  };

  const downloadFile = (bozza) => {
    const attachedDocs = documents.filter((doc) =>
      bozza.attachments.includes(doc.id)
    );

    if (attachedDocs.length === 0) {
      alert("Nessun allegato da scaricare");
      return;
    }

    attachedDocs.forEach((doc) => {
      if (!doc.fileUrl) {
        alert(`Il documento ${doc.name} non ha un file disponibile`);
        return;
      }
      window.open(doc.fileUrl);
    });
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Gestione Bozze Email</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <FaPlus
          size={22}
          style={{ cursor: "pointer", color: "#4b0082" }}
          title="Crea Nuova Bozza"
          onClick={() => navigate("/creabozze")}
        />

        <FaArrowLeft
          size={22}
          style={{ cursor: "pointer", color: "#4b0082" }}
          onClick={() => navigate("/")}
          title="Torna alla Home"
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
        {bozze.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Nessuna bozza creata
          </p>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {bozze.map((bozza) => (
                <div
                  key={bozza.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #000000",
                    borderRadius: "12px",
                    position: "relative",
                    backgroundColor: selectedBozze.includes(bozza.id)
                      ? "#9fc5ff"
                      : "#4284f7",
                  }}
                >
                  
                  <input
                    type="checkbox"
                    checked={selectedBozze.includes(bozza.id)}
                    onChange={() => handleSelect(bozza.id)}
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      transform: "scale(1.3)",
                      cursor: "pointer",
                    }}
                  />

                  <h3 style={{ marginTop: 0, marginLeft: "40px" }}>
                    {bozza.name}
                  </h3>

                  <p>
                    <strong>Oggetto:</strong>{" "}
                    {bozza.subject || "Nessun oggetto"}
                  </p>

                  <p>
                    <strong>Allegati:</strong>{" "}
                    {bozza.attachments.length > 0
                      ? bozza.attachments.join(", ")
                      : "Nessuno"}
                  </p>

                  <p>
                    <strong>Template:</strong>{" "}
                    {bozza.template || "Nessuno"}
                  </p>

                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <FaTrash
                      size={20}
                      style={{ cursor: "pointer", color: "#4b0082" }}
                      title="Elimina Bozza"
                      onClick={() => handleDelete(bozza.id)}
                    />

                    <FaDownload
                      size={20}
                      style={{ cursor: "pointer", color: "#4b0082" }}
                      title="Scarica allegati"
                      onClick={() => downloadFile(bozza)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <FaPaperPlane
                size={30}
                style={{ cursor: "pointer", color: "#4b0082" }}
                title="Invia bozze selezionate"
                onClick={handleSend}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Messages;