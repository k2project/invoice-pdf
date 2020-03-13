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

const ChangeEmail = ({ setAlert, history, id, email, logoutUser }) => {
    const [formData, setFormData] = useState({
        email: null,
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
        document.getElementById('email').focus();
    }
    function updateOnEnter(e) {
        if (e.keyCode === 13) handleUpdate(e);
    }
    function handleCancelation(e) {
        const btn = e.target;
        setDeleteConfirmation(false);
        btn.nextElementSibling.classList = 'btn btn--grey';
        setFormData({
            email: null,
            errors: []
        });
    }
    function cancelationOnEnter(e) {
        if (e.keyCode === 13) handleCancelation(e);
    }
    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (deleteConfirmation) {
            const { email } = formData;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify({
                    id,
                    email
                });

                await axios.put('/api/auth/change-email', body, config);

                // logout user
                setAlert(
                    'Your email address has been changed successfully. Please sign up with a new email.',
                    'success',
                    'login page'
                );
                localStorage.removeItem('token');
                logoutUser();
                history.push('/');
            } catch (err) {
                updateStateErrors(
                    form,
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
        <section className='change-email'>
            <h2 className='heading heading--sml'>
                Change user email ({email}).
            </h2>
            <p>
                Upon a successful update you will be redirected to the login
                page to sign in with the new credentials.
            </p>

            <form onSubmit={onSubmit}>
                {deleteConfirmation && (
                    <Fragment>
                        <label htmlFor='email'>
                            Enter your new email address.
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
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
                    Change Email
                </button>
            </form>
        </section>
    );
};

ChangeEmail.propTypes = {
    setAlert: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.auth.user._id,
    email: state.auth.user.email
});
export default withRouter(
    connect(mapStateToProps, { setAlert, logoutUser })(ChangeEmail)
);
