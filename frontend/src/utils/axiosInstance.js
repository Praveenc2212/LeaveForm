import axios from "axios";

export const axiosInstence = axios.create({
    baseURL:"http://localhost:1247",
    withCredentials: true
})