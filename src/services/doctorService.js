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
const getScheduleDoctorJoinBooking = (id) => {
    return axios.get(`api/schedule-doctor-booking?id=${id}`)
}
const postDoctorInfor = (data) => {
    return axios.post('api/post-infor-doctor', data)
}
const getDoctorInfor = (id) => {
    return axios.get(`api/doctor-infor?id=${id}`)
}
const deleteBooking = (id) => {
    return axios.delete(`api/delete-booking?id=${id}`)
}
const postHistory = (data) => {
    return axios.post('api/post-history', data)
}
const updateInforDoctor = (data) => {
    return axios.put('api/update-infor-doctor', data)
}
const getAllHistories = () => {
    return axios.get('api/all-histories')
}
export {
    getTopDoctorHome, getAllDoctors, postInformationDoctor,
    getInformationDoctor, postScheduleDoctor, getScheduleDoctor,
    postDoctorInfor, getDoctorInfor, postScheduleTeleDoctor,
    getScheduleDoctorJoinBooking,
    deleteBooking, postHistory,
    updateInforDoctor,
    getAllHistories
}