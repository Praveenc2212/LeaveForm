import axios from "axios";

const {VITE_NETWORK_IP, VITE_SERVER_PORT} = import.meta.env

export const axiosInstence = axios.create({
    baseURL: VITE_NETWORK_IP ? `http://${VITE_NETWORK_IP}:${VITE_SERVER_PORT}` : `http://localhost:${VITE_SERVER_PORT}`,
    withCredentials: true
})
