import { DISPLAY_DASHNAV_CURRENT_LINK } from '../actions/types';

const initialState = {
    currentNavLink: 'invoice-form'
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case DISPLAY_DASHNAV_CURRENT_LINK:
            return {
                ...state,
                currentNavLink: payload
            };

        default:
            return state;
    }
}
