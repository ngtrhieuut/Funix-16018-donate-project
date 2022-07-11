import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getAllPost = (id) => API.get(`/post/timeline`);
export const updatePost = (id, formData) => API.put(`/post/${id}`, formData);
export const uploadPost = (data) => API.post("/post", data);
export const deletePost = (id) => API.delete(`/post/${id}`);