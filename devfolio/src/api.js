import axios from 'axios';

export const Base_URL = "http://127.0.0.1:8000/"

const api = axios.create({
    baseURL: Base_URL

})

export default api;