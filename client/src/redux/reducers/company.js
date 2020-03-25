import { SET_COMPANY_CURRENT_NAV_LINK } from '../actions/types';
//nav links: tasks | invoices | details | update | delete
const initialState = {
    currentNavLink: 'tasks',
    detailsOpen: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    const currentNavLink = payload === 'default' ? 'tasks' : payload;
    switch (type) {
        case SET_COMPANY_CURRENT_NAV_LINK:
            return {
                ...state,
                currentNavLink
            };

        default:
            return state;
    }
}
