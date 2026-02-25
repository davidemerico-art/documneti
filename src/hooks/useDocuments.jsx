import { useState, useEffect } from "react";

export const useDocuments = () => {
  // Stato dei documenti
  const [documents, setDocuments] = useState([]);

  // Al montaggio, carica i documenti da localStorage
  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(docs);
  }, []);

 
  const saveDocuments = (docs) => {
    localStorage.setItem("documents", JSON.stringify(docs));
    setDocuments(docs);
  };


  const deleteDocument = (id) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare il documento?"
    );
    if (!confirmDelete) return;
    saveDocuments(documents.filter((doc) => doc.id !== id));
  };

 
  return { documents, saveDocuments, deleteDocument };
};