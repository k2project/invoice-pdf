import { USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
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

        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
