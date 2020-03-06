import axios from 'axios';
import { REGISTR_FAIL, REGISTR_SUCCESS } from './types';

export const register = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/register', body, config);

        dispatch({
            type: REGISTR_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response.data.errors);
        dispatch({
            type: REGISTR_FAIL
        });
    }
};
