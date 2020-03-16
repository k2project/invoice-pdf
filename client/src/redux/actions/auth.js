import axios from 'axios';
import { USER_LOADED, AUTH_ERROR, CLEAR_PROFILE } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const logoutUser = () => dispatch => {
    dispatch({ type: AUTH_ERROR });
    dispatch({ type: CLEAR_PROFILE });
};
