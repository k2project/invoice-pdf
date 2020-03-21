import { DISPLAY_DASHNAV_CURRENT_LINK } from '../actions/types';

export const displayCurrentLink = payload => dispatch => {
    dispatch({
        type: DISPLAY_DASHNAV_CURRENT_LINK,
        payload
    });
};
