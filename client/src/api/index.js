import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4000/api/users',
})

export const Bisection = () => api.get(`/bisection`)
export const Falses = () => api.get(`/falses`)
export const Onepoint = () => api.get(`/onepoint`)
export const Raphsons = () => api.get(`/raphsons`)
export const Secants = () => api.get(`/secants`)

const apis = {
    Bisection,
    Falses,
    Onepoint,
    Raphsons,
    Secants,
}

export default apis