import {
    SET_COMPANY_CURRENT_NAV_LINK,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    DISPLAY_COMPANY,
    INVOICE_COMPANY
} from '../actions/types';

const initialState = {
    currentNavLink: 'tasks',
    companyToDisplay: null,
    companyToUpdate: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_COMPANY_CURRENT_NAV_LINK:
            return {
                ...state,
                currentNavLink: payload
            };
        case DISPLAY_COMPANY:
            return {
                ...state,
                companyToDisplay: payload,
                companyToUpdate: null
            };
        case UPDATE_COMPANY:
            return {
                ...state,
                companyToDisplay: payload,
                companyToUpdate: payload
            };
        case DELETE_COMPANY:
            return {
                ...state,
                companyToDisplay: null,
                companyToUpdate: null
            };
        case INVOICE_COMPANY:
            return {
                ...state,
                companyToDisplay: payload,
                companyToUpdate: null
            };

        default:
            return state;
    }
}
