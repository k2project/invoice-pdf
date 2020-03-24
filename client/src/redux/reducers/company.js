import { SET_COMPANY_CURRENT_NAV_LINK } from '../actions/types';

const initialState = {
    currentNavLink: 'tasks',
    detailsOpen: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_COMPANY_CURRENT_NAV_LINK:
            return {
                ...state,
                currentNavLink: payload
            };

        default:
            return state;
    }
}
