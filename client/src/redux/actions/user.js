import axios from 'axios';
import {
    USER_REGISTERED,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = () => dispatch => {
    dispatch({ type: USER_REGISTERED });
};
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.error('AUTH ERROR ON USER LOADING', err);
        dispatch({ type: AUTH_ERROR });
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: AUTH_ERROR });
    dispatch({ type: CLEAR_PROFILE });
};
