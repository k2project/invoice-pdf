import axios from 'axios';
import { GET_PROFILE, CLEAR_PROFILE } from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/user');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};
