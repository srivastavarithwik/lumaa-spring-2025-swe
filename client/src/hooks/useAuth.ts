import { useState } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
             setToken(response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const register = async (username: string, password: string) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, { username, password });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return { token, login, register, logout };
};

export default useAuth;