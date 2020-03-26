import {
    SET_COMPANY_CURRENT_NAV_LINK,
    GET_ALL_COMPANIES,
    CLEAR_ALL_COMPANIES,
    COMPANY_DELETED,
    TASK_UPDATE
} from '../actions/types';
//nav links: tasks | invoices | details | update | delete
const initialState = {
    currentNavLink: 'tasks',
    companies: null,
    companyDeleted: false,
    taskToUpdate: null
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
        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: payload
            };
        case CLEAR_ALL_COMPANIES:
            return {
                ...state,
                currentNavLink: 'tasks',
                companies: null,
                companyDeleted: false,
                taskToUpdate: null
            };
        case COMPANY_DELETED:
            return {
                ...state,
                companyDeleted: payload
            };
        case TASK_UPDATE:
            return {
                ...state,
                taskToUpdate: payload
            };

        default:
            return state;
    }
}
