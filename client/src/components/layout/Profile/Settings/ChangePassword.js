import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrorsDisplay from '../../../blocks/forms/FormErrorsDisplay';
import {
    formErrorsStyling,
    inputOnChange,
    updateStateErrors
} from '../../../blocks/forms/formFuns';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';
import axios from 'axios';
import { logoutUser } from '../../../../redux/actions/auth';

const ChangePassword = ({ setAlert, history, id, logoutUser }) => {
    const [formData, setFormData] = useState({
        currentPassword: null,
        newPassword: null,
        newPasswordConfirmation: null,
        errors: []
    });
    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    async function handleUpdate(e) {
        e.preventDefault();
        const btn = e.target;
        await setDeleteConfirmation(true);
        btn.classList = 'btn btn--info';
        document.getElementById('currentPassword').focus();
    }
    function updateOnEnter(e) {
        if (e.keyCode === 13) handleUpdate(e);
    }
    function handleCancelation(e) {
        const btn = e.target;
        setDeleteConfirmation(false);
        btn.nextElementSibling.classList = 'btn btn--grey';
        setFormData({
            currentPassword: null,
            newPassword: null,
            newPasswordConfirmation: null,
            errors: []
        });
    }
    function cancelationOnEnter(e) {
        if (e.keyCode === 13) handleCancelation(e);
    }
    async function onSubmit(e) {
        e.preventDefault();
        if (deleteConfirmation) {
            const {
                currentPassword,
                newPassword,
                newPasswordConfirmation
            } = formData;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify({
                    id,
                    currentPassword,
                    newPassword,
                    newPasswordConfirmation
                });

                await axios.put('/api/auth/change-password', body, config);

                // logout user
                setAlert(
                    'Your password has been changed successfully. Please sign up with a new password.',
                    'success',
                    'login page'
                );
                localStorage.removeItem('token');
                logoutUser();
                history.push('/');
            } catch (err) {
                updateStateErrors(
                    formData,
                    setFormData,
                    err.response.data.errors
                );
            }
        }
    }
    useEffect(() => {
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <section className='change-password'>
            <h2 className='heading heading--sml'>Change password.</h2>
            <p>
                Make sure it's at least 7 characters including a number and an
                uppercase letter.
            </p>
            <p>
                Upon a successful update you will be redirected to the login
                page to sign in with the new credentials.
            </p>

            <form onSubmit={onSubmit}>
                {deleteConfirmation && (
                    <Fragment>
                        <label htmlFor='currentPassword'>
                            Enter your current password.
                        </label>
                        <input
                            type='password'
                            name='currentPassword'
                            id='currentPassword'
                            onChange={onChange}
                            className='form__input form__input--sml'
                        />
                        <label htmlFor='newPassword'>
                            Enter a new password.
                        </label>
                        <input
                            type='password'
                            name='newPassword'
                            id='newPassword'
                            onChange={onChange}
                            className='form__input form__input--sml'
                        />
                        <label htmlFor='newPasswordConfirmation'>
                            Confirm your new password.
                        </label>
                        <input
                            type='password'
                            name='newPasswordConfirmation'
                            id='newPasswordConfirmation'
                            onChange={onChange}
                            className='form__input form__input--sml'
                        />
                    </Fragment>
                )}
                {formData.errors.length > 0 && (
                    <FormErrorsDisplay
                        errors={formData.errors}
                        label='delete account'
                    />
                )}
                {deleteConfirmation && (
                    <button
                        className='btn btn--grey btn--sibling'
                        onMouseDown={handleCancelation}
                        onKeyDown={cancelationOnEnter}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type='submit'
                    className='btn btn--grey'
                    onMouseDown={handleUpdate}
                    onKeyDown={updateOnEnter}
                >
                    Change Password
                </button>
            </form>
        </section>
    );
};

ChangePassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.auth.user._id
});
export default withRouter(
    connect(mapStateToProps, { setAlert, logoutUser })(ChangePassword)
);
