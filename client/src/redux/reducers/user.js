import { USER_REGISTERED, USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
    user: null,
    isRegistered: false,
    isAuthenticated: false,
    loading: true
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_REGISTERED:
            return {
                ...state,
                isRegistered: true,
                loading: false
            };
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isRegistered: true,
                isAuthenticated: true,
                loading: false
            };

        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('link');
            return {
                ...state,
                user: null,
                isRegistered: false,
                isAuthenticated: false,
                loading: true
            };

        default:
            return state;
    }
}
