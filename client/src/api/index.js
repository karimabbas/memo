import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// console.log(localStorageItem);

API.interceptors.request.use((req) => {
    if (localStorage.getItem('UserProfile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('UserProfile')).token}`;
    }
    return req;
},
    error => Promise.reject(error)
)

export const signUp = (data) => API.post(`/user/signup`, data);
export const signIn = (data) => API.post(`/user/signin`, data);

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const postlikes = (id, type) => API.patch(`/posts/${id}/likes/${type}`);







