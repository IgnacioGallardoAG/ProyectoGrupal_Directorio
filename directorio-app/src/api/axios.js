import axios from "axios";

// se crea una nueva instancia de axios
const instance = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

export default instance