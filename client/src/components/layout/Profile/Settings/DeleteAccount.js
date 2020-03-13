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

const DeleteAccount = ({ setAlert, history, id, logoutUser }) => {
    const [formData, setFormData] = useState({
        password: null,
        errors: []
    });
    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    async function handleDelete(e) {
        if (!deleteConfirmation) {
            e.preventDefault();
            await setDeleteConfirmation(true);
            document.getElementById('password').focus();
        }
        await setDeleteConfirmation(true);
        document.getElementById('password').focus();
    }

    function handleCancelation() {
        setDeleteConfirmation(false);
        setFormData({
            password: null,
            errors: []
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (deleteConfirmation) {
            const { password } = formData;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify({ id, password });

                await axios.post('/api/auth/unregister', body, config);
                await axios.delete('/api/auth/unregister');
                localStorage.removeItem('token');
                //clear the redux store
                logoutUser();
                setAlert(
                    'Your account has been deleted successfully. We are sorry to see you going...',
                    'success',
                    'sign up page',
                    false
                );
                // // redirect to dashboard
                history.push('/register');
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
        <section className='delete-account'>
            <h2 className='heading heading--sml'>Delete your account.</h2>
            <p>
                Once you delete your account, there is no going back. Please be
                certain.
            </p>
            <form onSubmit={onSubmit}>
                {deleteConfirmation && (
                    <Fragment>
                        <label htmlFor='password'>
                            Enter password to confirm the deactivation of your
                            account.
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
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
                        onClick={handleCancelation}
                        onMouseDown={e => e.preventDefault()}
                    >
                        Cancel
                    </button>
                )}
                <button
                    type='submit'
                    className='btn btn--danger'
                    onClick={handleDelete}
                    onMouseDown={e => e.preventDefault()}
                >
                    {!deleteConfirmation && (
                        <span className='sr-only'>Display form to </span>
                    )}
                    Delete Account
                    {deleteConfirmation && (
                        <span className='sr-only'> now </span>
                    )}
                </button>
            </form>
        </section>
    );
};

DeleteAccount.propTypes = {
    setAlert: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.auth.user._id
});
export default withRouter(
    connect(mapStateToProps, { setAlert, logoutUser })(DeleteAccount)
);
