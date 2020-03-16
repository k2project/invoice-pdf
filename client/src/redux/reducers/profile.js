import { GET_PROFILE, CLEAR_PROFILE } from '../actions/types';

//loading stops from rendering DashboardInit on initial laod before useEffect
const initialState = {
    profile: null,
    loading: true
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
                loading: true
            };
        default:
            return state;
    }
}
