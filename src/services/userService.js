import axios from "../axios";
const handleLoginUser = (email, password) => {
   return axios.post(`/api/login`, { email, password })
}
const getAllUsers = (id) => {
   return axios.get(`/api/get-all-users?id=${id}`)
}
const createNewUserFromSevice = (data) => {
   return axios.post(`/api/create-new-user`, data)
}
const deleteUserFromService = (data) => {
   return axios.delete('/api/delete-user', {
      data: {
         id: data.id
      }
   })
}
const editUserFromService =(data)=>{
   return axios.put('/api/edit-user', data)
}
const getAllcode = (typeInput)=>{
   return axios.get(`/api/getAllcodes?type=${typeInput}`)
}
export { handleLoginUser, getAllUsers, createNewUserFromSevice, deleteUserFromService , editUserFromService, getAllcode}