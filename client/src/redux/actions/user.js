import axios from 'axios';
import { setAlert } from './alerts';
import {
    USER_REGISTERED,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE,
    CLEAR_ALL_COMPANIES
} from './types';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = () => dispatch => {
    dispatch({ type: USER_REGISTERED });
};
export const loadUser = () => async dispatch => {
    if (sessionStorage.token) {
        setAuthToken(sessionStorage.token);
    }
    try {
        const res = await axios.get('/api/user');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.error('AUTH ERROR ON USER LOADING', err);
        console.log(err);
        await dispatch({ type: AUTH_ERROR });
        if (err.response.status === 401) {
            dispatch(handle401Err());
        }
    }
};

export const logoutUser = () => dispatch => {
    dispatch({ type: AUTH_ERROR });
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: CLEAR_ALL_COMPANIES });
};
export const handle401Err = () => dispatch => {
    dispatch(logoutUser());
    dispatch(
        setAlert(
            'Your session expired. You have been logged out. Please sign in.',
            'danger',
            null,
            false
        )
    );
};
