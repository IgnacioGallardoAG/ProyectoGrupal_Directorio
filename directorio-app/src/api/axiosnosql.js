import axios from "axios";

// se crea una nueva instancia de axios
const instance = axios.create({
    baseURL: "http://localhost:4000/mongodb://127.0.0.1:27017/bd_proyecto",
    withCredentials: true
})

export default instance