import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
    token: null,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: payload
            };
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null
            };
        default:
            return state;
    }
}
