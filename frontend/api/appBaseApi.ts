import axios from 'axios';
export const mockAPI = axios.create({
    baseURL: 'https://6834ca8acd78db2058bf5d30.mockapi.io/beep/api/v1/',
})