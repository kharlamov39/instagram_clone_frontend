import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:1111'
})

// мидлвар для запросов для вшивания токена

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})
