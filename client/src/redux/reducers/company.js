import {
    SET_COMPANY_CURRENT_NAV_LINK,
    COMPANY_DELETED
} from '../actions/types';
//nav links: tasks | invoices | details | update | delete
const initialState = {
    currentNavLink: 'tasks',
    companyDeleted: false
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
        case COMPANY_DELETED:
            return {
                ...state,
                companyDeleted: payload
            };

        default:
            return state;
    }
}
