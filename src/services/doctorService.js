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
export { getTopDoctorHome, getAllDoctors, postInformationDoctor }