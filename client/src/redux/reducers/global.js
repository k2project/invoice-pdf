import { SET_REDIRECT_LINK } from '../actions/types';

const initialState = {
    redirectLink: '/dashboard/profile'
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_REDIRECT_LINK:
            return {
                ...state,
                redirectLink: payload
            };
        default:
            return state;
    }
}
