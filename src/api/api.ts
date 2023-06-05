import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://instagram-clone-backend-2.onrender.com/'
})

// мидлвар для запросов для вшивания токена

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})
