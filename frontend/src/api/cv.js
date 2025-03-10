import api from "./index";

export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append("cv", file);
  try {
    const response = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
  }
};

export const fetchCVs = async () => {
  try {
    const response = await api.get("/cvs");
    return response.data;
  } catch (error) {
    console.error("Error fetching CVs:", error);
    throw error;
  }
};

export const getCVDetails = async (id) => {
  try {
    const response = await api.get(`/cv/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching CV details:", error);
    throw error;
  }
};
