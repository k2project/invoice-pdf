import axios from 'axios';
import { handle401Err } from './user';
import { GET_PROFILE, SET_PROFILE_CURRENT_NAV_LINK } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
            dispatch(handle401Err());
        }
    }
};
export const setProfileCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_PROFILE_CURRENT_NAV_LINK,
        payload
    });
};
