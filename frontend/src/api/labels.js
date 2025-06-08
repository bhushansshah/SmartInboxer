import axios from "axios";

const API_URL = "https://localhost:8000/labels";

// Helper: Get auth headers
const getAuthHeaders = () => {
  const local_storage = localStorage.getItem("smart-inboxer"); // or from context/state
  if (!local_storage) {
    throw new Error("User not authenticated");
  }
  const loginToken = JSON.parse(local_storage).loginToken;
  if (!loginToken) {
    throw new Error("No login token found");
  }

  return {
    Authorization: `Bearer ${loginToken}`,
    "Content-Type": "application/json",
  };
};

// GET: Fetch all labels
export const getAllLabels = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// POST: Add a new label
export const addLabel = async (label) => {
  const response = await axios.post(API_URL, label, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// PUT: Update existing label
export const updateLabel = async (labelId, updatedLabel) => {
  const response = await axios.put(`${API_URL}/${labelId}`, updatedLabel, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// DELETE: Delete a label
export const deleteLabel = async (labelId) => {
  const response = await axios.delete(`${API_URL}/${labelId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
