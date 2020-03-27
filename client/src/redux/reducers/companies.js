import {
    SET_COMPANY_CURRENT_NAV_LINK,
    GET_ALL_COMPANIES,
    CLEAR_ALL_COMPANIES,
    COMPANY_DELETED,
    TASK_TO_UPDATE,
    TASK_DELETED
} from '../actions/types';
//nav links: tasks | invoices | details | update | delete
const initialState = {
    currentNavLink: 'tasks',
    loading: true,
    companies: [],
    companyDeleted: false,
    taskToUpdate: null,
    taskDeleted: false
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
                loading: false,
                companies: payload
            };
        case CLEAR_ALL_COMPANIES:
            return {
                ...state,
                currentNavLink: 'tasks',
                loading: true,
                companies: [],
                companyDeleted: false,
                taskToUpdate: null
            };
        case COMPANY_DELETED:
            return {
                ...state,
                companyDeleted: payload
            };
        case TASK_TO_UPDATE:
            return {
                ...state,
                taskToUpdate: payload
            };
        case TASK_DELETED:
            return {
                ...state,
                taskDeleted: payload
            };

        default:
            return state;
    }
}
