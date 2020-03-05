import { REGISTR_FAIL, REGISTR_SUCCESS } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case REGISTR_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true
            };
        case REGISTR_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false
            };
        default:
            return state;
    }
}
