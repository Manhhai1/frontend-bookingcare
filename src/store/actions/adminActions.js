import actionTypes from './actionTypes';
import { getAllcode } from '../../services/userService';
import { getTopDoctorHome, getAllDoctors, postInformationDoctor } from '../../services/doctorService'
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllcode('gender')
        if (res) {
            dispatch(fetchGenderSuccess(res))
        }
        else {
            dispatch(fetchGenderFail())
        }

    }
}
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: data
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});
export const fetchProvinceStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllcode('province')
        if (res) {
            dispatch(fetchProvinceSuccess(res))
        }
        else {
            dispatch(fetchProvinceFail())
        }

    }
}
export const fetchProvinceSuccess = (data) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: data
});
export const fetchProvinceFail = () => ({
    type: actionTypes.FETCH_PROVINCE_FAILED
});

export const fetchPaymentStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllcode('PAYMENT')
        if (res) {
            dispatch(fetchPaymentSuccess(res))
        }
        else {
            dispatch(fetchPaymentFailed())
        }

    }
}
export const fetchPaymentSuccess = (data) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: data
});
export const fetchPaymentFailed = () => ({
    type: actionTypes.FETCH_PAYMENT_FAILED
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllcode('position')
        if (res) {
            dispatch(fetchPositionSuccess(res))
        }
        else {
            dispatch(fetchPositionFail())
        }

    }
}
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: data
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllcode('role')
        if (res) {
            dispatch(fetchRoleSuccess(res))
        }
        else {
            dispatch(fetchRoleFail())
        }

    }
}
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: data
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

export const fetchTopDoctorHomePageStart = () => {
    return async (dispatch, getState) => {
        let res = await getTopDoctorHome('10')
        if (res) {
            dispatch(fetchTopDoctorHomePageSuccess(res))
        }
        else {
            dispatch(fetchTopDoctorHomePageFail())
        }

    }
}
export const fetchTopDoctorHomePageSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS,
    data: data
});
export const fetchTopDoctorHomePageFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOMEPAGE_FAILED
});

export const fetchGetAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllDoctors()
        if (res) {
            dispatch(fetchGetAllDoctorsSuccess(res))
        }
        else {
            dispatch(fetchGetAllDoctorsFailed())
        }

    }
}
export const fetchGetAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
});
export const fetchGetAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
});

export const fetchPostInformationDoctorStart = (data) => {
    return async (dispatch, getState) => {
        let res = await postInformationDoctor(data)
        if (res) {
            dispatch(fetchPostInformationDoctorSuccess(res))
        }
        else {
            dispatch(fetchPostInformationDoctorFailed())
        }

    }
}
export const fetchPostInformationDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_POST_INFORMATION_DOCTOR_SUCCESS
});
export const fetchPostInformationDoctorFailed = () => ({
    type: actionTypes.FETCH_POST_INFORMATION_DOCTOR_FAILED
});