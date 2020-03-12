import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (
    msg,
    status,
    redirection,
    timeout = 5000
) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            status,
            redirection,
            id
        }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
