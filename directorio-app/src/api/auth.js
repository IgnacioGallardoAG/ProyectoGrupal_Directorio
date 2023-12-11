import axios from "../api/axios.js"

// las consultas http del login, registro y token
export const consultaRegistro = usuario => axios.post(`/auth/register`, usuario)
export const consultaLogin = usuario => axios.post(`/auth/login`, usuario)
export const verificarToken = () => axios.get(`/auth/token`)