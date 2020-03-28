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

const DeleteAccount = ({ setAlert, id, logoutUser, handle401Err }) => {
    const [formData, setFormData] = useState({
        password: null,
        errors: []
    });
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };
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

                await axios.post('/api/user/unregister', body, config);
                await axios.delete('/api/user/unregister');
                logoutUser();
                setAlert(
                    'Your account has been deleted successfully. We are sorry to see you going...',
                    'success',
                    'sign up page',
                    false
                );
            } catch (err) {
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
                if (err.response.status === 401) {
                    handle401Err();
                }
            }
        }
    }

    return (
        <section className='delete-account'>
            <div className='section__heading'>
                <div className='wrapper'>
                    <h2 className='heading heading--sm'>
                        Delete your account.
                    </h2>
                </div>
            </div>
            <div className='section__body'>
                <div className='wrapper'>
                    <p>
                        Once you delete your account, there is no going back.
                        Please be certain.
                    </p>
                    <form onSubmit={onSubmit}>
                        {deleteConfirmation && (
                            <Fragment>
                                <label htmlFor='password'>
                                    Enter password to confirm the deactivation
                                    of your account.
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
                                <span className='sr-only'>
                                    Display form to{' '}
                                </span>
                            )}
                            Delete Account
                            {deleteConfirmation && (
                                <span className='sr-only'> now </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

DeleteAccount.propTypes = {
    setAlert: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.user.user._id
});
export default connect(mapStateToProps, { setAlert, logoutUser, handle401Err })(
    DeleteAccount
);
