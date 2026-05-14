import axios from 'axios';

const BaseURL = "http://127.0.0.1:8000/"

const api = axios.create({

    baseURL: BaseURL,

})


export default api;