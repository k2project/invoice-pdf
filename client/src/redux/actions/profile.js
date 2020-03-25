import axios from 'axios';
import {
    GET_PROFILE,
    GET_PROFILE_ERR,
    SET_PROFILE_CURRENT_NAV_LINK
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
export const setProfileCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_PROFILE_CURRENT_NAV_LINK,
        payload
    });
};
