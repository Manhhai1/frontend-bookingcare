import axios from "../axios";
export const getAllSpecialties = () => {
    return axios.get('specialty')
}
export const postInforSpecialty = (data) => {
    return axios.post('post-infor-specialty', data)
}
export const getSpecialtyById = (id) => {
    return axios.get(`specialty-by-id?id=${id}`)
}
export const getAllDoctorsFromSpecialty = (id) => {
    return axios.get(`specialty-all-doctors?id=${id}`)
}
export const updateSpecialty = (data) => {
    return axios.put(`update-infor-specialty`, data)
}
export const deleteSpecialty = (id) => {
    return axios.delete(`delete-specialty?id=${id}`)
}