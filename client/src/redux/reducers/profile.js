import {
    GET_PROFILE,
    CLEAR_PROFILE,
    SET_PROFILE_CURRENT_NAV_LINK
} from '../actions/types';

//loading stops from rendering DashboardInit on initial laod before useEffect
//links: details | update
const initialState = {
    profile: null,
    loading: true,
    currentNavLink: 'details'
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

        case SET_PROFILE_CURRENT_NAV_LINK:
            return {
                ...state,
                currentNavLink: payload
            };
        default:
            return state;
    }
}
