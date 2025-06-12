import axios from 'axios';

const API_URL = "http://localhost:8000/user";

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

export const getUser = async () => {
    const response = await axios.get(`${API_URL}`, {
        headers: getAuthHeaders(),
    });

    console.log("Response from getUser: ", response.data);
    return response.data;
}