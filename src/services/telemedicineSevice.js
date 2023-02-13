import axios from "../axios";

export const getAllTelemedicine = () => {
    return axios.get('telemedicines')
}
export const deleteTelemedicine = (id) => {
    return axios.delete(`delete-telemedicine?id=${id}`)
}
export const postTelemedicine = (data) => {
    return axios.post('post-infor-telemedicine', data)
}
export const getTelemedicineById = (id) => {
    return axios.get(`telemedicine-by-id?id=${id}`)
}
export const updateTelemedicine = (data) => {
    return axios.put(`update-infor-telemedicine`, data)
}
export const getAllDoctorsFromTelemedicine = (id) => {
    return axios.get(`telemedicine-all-doctors?id=${id}`)
}