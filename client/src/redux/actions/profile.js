import axios from 'axios';
import { GET_PROFILE, GET_PROFILE_ERR } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/user');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILE_ERR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
