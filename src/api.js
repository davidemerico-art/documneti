const BASE_URL = "http://localhost:8000";

export const getDocuments = async () => {
  const res = await fetch(`${BASE_URL}/documents`);
  return res.json();
};

export const uploadDocument = async (formData) => {
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });
  return res.json();
};

export const downloadDocument = (id) => {
  window.open(`${BASE_URL}/download/${id}`);
};

export const getDocumentById = async (id) => {
  const res = await fetch(`${BASE_URL}/documents/${id}`);
  return res.json();
};

export const compileTemplate = async (id, data) => {
  const res = await fetch(`${BASE_URL}/compile/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.blob();
};