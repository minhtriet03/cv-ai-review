import api from "./index";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await response.json();
  return data.url; // Trả về URL file đã upload
};
