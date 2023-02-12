import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    provinces: [],
    payments: [],
    dataDoctorHomePage: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS:
            state.dataDoctorHomePage = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_HOMEPAGE_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_POST_INFORMATION_DOCTOR_SUCCESS:
            return {
                ...state
            }
        case actionTypes.FETCH_POST_INFORMATION_DOCTOR_FAILED:
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_PAYMENT_FAILED:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;