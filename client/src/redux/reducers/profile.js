import {
    GET_PROFILE,
    CLEAR_PROFILE,
    GET_PROFILE_ERR,
    SET_PROFILE_CURRENT_NAV_LINK
} from '../actions/types';

//loading stops from rendering DashboardInit on initial laod before useEffect
//links: details | update
const initialState = {
    profile: null,
    loading: true,
    currentNavLink: 'details',
    errors: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: true,
                errors: null
            };
        case GET_PROFILE_ERR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case SET_PROFILE_CURRENT_NAV_LINK:
            return {
                ...state,
                currentNavLink: payload
            };
        default:
            return state;
    }
}
