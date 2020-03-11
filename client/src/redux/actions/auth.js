import axios from 'axios';
import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from './types';
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

export const loginSuccess = token => dispatch => {
    localStorage.setItem('token', token);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: token
    });
    dispatch(loadUser());
};