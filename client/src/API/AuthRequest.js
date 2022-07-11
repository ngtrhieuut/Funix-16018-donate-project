import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const logIn= (formData)=> API.post('/auth/login', formData);

export const signUp = (formData) => API.post('/auth/register', formData);

export const confirmEmail = (formData) => API.post(`/auth/${formData.userId}/${formData.token}`, formData);