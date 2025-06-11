import axios from 'axios';

const API_URL = "http://localhost:8000/integrations";

const getAuthHeaders = () => {
  const local_storage = localStorage.getItem("smart-inboxer"); // or from context/state
  if (!local_storage) {
    throw new Error("User not authenticated");
  }
  const loginToken = JSON.parse(local_storage).login_token;
  if (!loginToken) {
    throw new Error("No login token found");
  }

  return {
    Authorization: `Bearer ${loginToken}`,
    "Content-Type": "application/json",
  };
};

export const connectGmail = async () => {
    const response = await axios.post(`${API_URL}/gmail`, {dummy: "data"}, {
        headers: getAuthHeaders(),
    });

    console.log("Response from connectGmail: ", response.data);
    return response.data;
}