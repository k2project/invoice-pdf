import {
    DISPLAY_DASHNAV_CURRENT_LINK,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    DISPLAY_COMPANY,
    INVOICE_COMPANY
} from '../actions/types';

const initialState = {
    currentNavLink: 'new-invoice-form',
    companyToDisplay: null,
    companyToUpdate: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISPLAY_DASHNAV_CURRENT_LINK:
            return {
                ...state,
                currentNavLink: payload
            };
        case DISPLAY_COMPANY:
            return {
                ...state,
                currentNavLink: 'company',
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
                currentNavLink: 'new-invoice-form',
                companyToDisplay: null,
                companyToUpdate: null
            };
        case INVOICE_COMPANY:
            return {
                ...state,
                currentNavLink: 'new-invoice-form',
                companyToDisplay: payload,
                companyToUpdate: null
            };

        default:
            return state;
    }
}
