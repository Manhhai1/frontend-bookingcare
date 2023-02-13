import axios from "../axios";
const getTopDoctorHome = (limitInput) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`)
}
const getAllDoctors = () => {
    return axios.get('api/get-all-doctors')
}
const postInformationDoctor = (data) => {
    return axios.post('api/post-information-doctor', data)
}
const getInformationDoctor = (id) => {
    return axios.get(`api/information-doctor?id=${id}`)
}

const postScheduleDoctor = (data) => {
    return axios.post('api/post-schedule-doctor', data)
}
const postScheduleTeleDoctor = (data) => {
    return axios.post('api/post-schedule-teledoctor', data)
}
const getScheduleDoctor = (id) => {
    return axios.get(`api/get-schedule-doctor?id=${id}`)
}
const postDoctorInfor = (data) => {
    return axios.post('api/post-infor-doctor', data)
}
const getDoctorInfor = (id) => {
    return axios.get(`api/doctor-infor?id=${id}`)
}
export { getTopDoctorHome, getAllDoctors, postInformationDoctor, getInformationDoctor, postScheduleDoctor, getScheduleDoctor, postDoctorInfor, getDoctorInfor, postScheduleTeleDoctor }