import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/auth',
});

export const googleLoginAuth = async (code) => {
    try {
        const response = await api.post('/google/login', {
            code
        });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

export const primitiveLoginAuth = async (username, password) => {
    try{
        const response = await api.post('/login', {
            username,
            password,
        });
        return response.data;
    }
    catch (error){
        console.error('Error during login:', error);
        throw error;
    }
}

export const primitiveSignupAuth = async (username, password) => {
    try{
        const response = await api.post('/signup', {
            username,
            password,
        });
        return response.data;
    }
    catch (error){
        console.error('Error during signup:', error);
        throw error;
    }
}