import axios from "../axios";
export const postBookingFromPatient =(data)=>{
    return axios.post('api/booking-from-patient', data)
}
export const postAcceptBookingFromPatient =(token)=>{
    return axios.post(`api/accept-booking-from-patient?token=${token}`)
}