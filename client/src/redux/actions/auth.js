import axios from 'axios';
import { REGISTR_FAIL, REGISTR_SUCCESS } from './types';

export const register = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(email);
    const body = JSON.stringify({ email, password });
    console.log(JSON.stringify({ email, password }));
    console.log(body);
    try {
        const res = await axios.post('/api/register', body, config);
        console.log(res.data);
        dispatch({
            type: REGISTR_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log('failed to send');
        dispatch({
            type: REGISTR_FAIL
        });
    }
};
