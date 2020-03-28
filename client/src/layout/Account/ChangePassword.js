import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormErrorsDisplay from '../../components/forms/FormErrorsDisplay';
import {
    inputOnChange,
    updateStateErrors
} from '../../components/forms/formFuns';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { logoutUser, handle401Err } from '../../redux/actions/user';
import axios from 'axios';

const ChangePassword = ({ id, setAlert, logoutUser, handle401Err }) => {
    const [formData, setFormData] = useState({
        currentPassword: null,
        newPassword: null,
        newPasswordConfirmation: null,
        errors: []
    });
    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };
    const [updateConfirmation, setUpdateConfirmation] = useState(false);

    async function handleUpdate(e) {
        if (!updateConfirmation) {
            e.preventDefault();
            const btn = e.target;
            await setUpdateConfirmation(true);
            btn.classList = 'btn btn--info';
            document.getElementById('currentPassword').focus();
        }
    }

    function handleCancelation(e) {
        const btn = e.target;
        setUpdateConfirmation(false);
        btn.nextElementSibling.classList = 'btn btn--grey';
        setFormData({
            currentPassword: null,
            newPassword: null,
            newPasswordConfirmation: null,
            errors: []
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (updateConfirmation) {
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

                await axios.put('/api/user/change-password', body, config);
                setAlert(
                    'Your password has been changed successfully. Please sign up with a new password.',
                    'success',
                    'login page',
                    false
                );
                logoutUser();
            } catch (err) {
                if (err.response.status === 401) {
                    handle401Err();
                }
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
            }
        }
    }

    return (
        <section className='change-password'>
            <div className='section__heading'>
                <div className='wrapper'>
                    <h2 className='heading heading--sm'>
                        Change your password.
                    </h2>
                </div>
            </div>
            <div className='section__body'>
                <div className='wrapper'>
                    <p>
                        Make sure it's at least 7 characters including a number
                        and an uppercase letter.
                    </p>
                    <p>
                        Upon a successful update you will be redirected to the
                        login page to sign in with the new credentials.
                    </p>

                    <form onSubmit={onSubmit}>
                        {updateConfirmation && (
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
                                label='change password'
                            />
                        )}
                        {updateConfirmation && (
                            <button
                                className='btn btn--grey btn--sibling'
                                onMouseDown={e => e.preventDefault()}
                                onClick={handleCancelation}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type='submit'
                            className='btn btn--grey'
                            onClick={handleUpdate}
                            onMouseDown={e => e.preventDefault()}
                        >
                            {!updateConfirmation && (
                                <span className='sr-only'>
                                    Display form to{' '}
                                </span>
                            )}
                            Change Password
                            {updateConfirmation && (
                                <span className='sr-only'> now </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

ChangePassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.user.user._id
});
export default connect(mapStateToProps, { setAlert, logoutUser, handle401Err })(
    ChangePassword
);
