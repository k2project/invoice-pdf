import { SET_REDIRECT_LINK } from './types';

export const setRedirectLink = payload => dispatch => {
    dispatch({
        type: SET_REDIRECT_LINK,
        payload
    });
};
