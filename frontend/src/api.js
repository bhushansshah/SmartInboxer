import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth',
});

export const loginAuth = async (code) => {
    try {
        const response = await api.post(`/login?code=${code}`);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}