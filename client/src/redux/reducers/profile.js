import { GET_PROFILE, CLEAR_PROFILE, GET_PROFILE_ERR } from '../actions/types';

//loading stops from rendering DashboardInit on initial laod before useEffect
const initialState = {
    profile: null,
    loading: true,
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
        default:
            return state;
    }
}
