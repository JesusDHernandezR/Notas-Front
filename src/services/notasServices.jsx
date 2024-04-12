import axios from 'axios'

const apiUrl = "https://localhost:44364/api/notas";

export const crearNotas = (data) => {
    return axios.post(apiUrl,data)
};

export const obtenerNotas = () => {
    return axios.get(apiUrl)
};

export const obtenerNotasId = (id) => {
    return axios.get(`${apiUrl}/${id}`)
}
    
export const actualizarNotas = (id,data) => {
    return axios.put(`${apiUrl}/${id}`,data)
};

export const eliminarNotas= (id) => {
    return axios.delete(`${apiUrl}/${id}`)
};