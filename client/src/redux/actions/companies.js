import axios from 'axios';
import { setAlert } from './alerts';
import {
    SET_COMPANY_CURRENT_NAV_LINK,
    GET_ALL_COMPANIES,
    COMPANY_DELETED, //for NOT FOUNF page to display text "Company Not Found"
    TASK_UPDATE
} from './types';

export const getAllCompanies = () => async dispatch => {
    try {
        const res = await axios.get('/api/company/all');
        dispatch({
            type: GET_ALL_COMPANIES,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
export const setCompanyCurrentNavLink = payload => dispatch => {
    dispatch({
        type: SET_COMPANY_CURRENT_NAV_LINK,
        payload
    });
};

export const deleteCompany = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/company/${id}`);

        dispatch(
            setAlert('Company deleted successfully.', 'success', null, false)
        );
        dispatch({
            type: COMPANY_DELETED,
            payload: true
        });
        setTimeout(() => {
            dispatch({
                type: COMPANY_DELETED,
                payload: false
            });
        }, 3000);
    } catch (err) {
        console.log(err);
    }
};

export const updateTask = payload => dispatch => {
    dispatch({
        type: TASK_UPDATE,
        payload
    });
};
export const deleteTask = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/company/tasks/${id}`);
        dispatch({
            type: GET_ALL_COMPANIES,
            payload: res.data
        });
        dispatch(
            setAlert('Task deleted successfully.', 'success', null, false)
        );
    } catch (err) {
        console.log(err);
    }
};
