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

const ChangeEmail = ({ id, email, setAlert, logoutUser, handle401Err }) => {
    const [formData, setFormData] = useState({
        email: null,
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
            document.getElementById('email').focus();
        }
    }

    function handleCancelation(e) {
        const btn = e.target;
        setUpdateConfirmation(false);
        btn.nextElementSibling.classList = 'btn btn--grey';
        setFormData({
            email: null,
            errors: []
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.target;
        if (updateConfirmation) {
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

                await axios.put('/api/user/change-email', body, config);
                setAlert(
                    'Your email address has been changed successfully. Please sign up with a new email.',
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
        <section className='change-email'>
            <div className='section__heading'>
                <div className='wrapper'>
                    <h2 className='heading heading--sm'>
                        Change your user email ({email}).
                    </h2>
                </div>
            </div>
            <div className='section__body'>
                <div className='wrapper'>
                    <p>
                        Upon a successful update you will be redirected to the
                        login page to sign in with the new credentials.
                    </p>

                    <form onSubmit={onSubmit}>
                        {updateConfirmation && (
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
                                label='change email'
                            />
                        )}
                        {updateConfirmation && (
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
                            className='btn btn--grey'
                            onClick={handleUpdate}
                            onMouseDown={e => e.preventDefault()}
                        >
                            {!updateConfirmation && (
                                <span className='sr-only'>
                                    Display form to{' '}
                                </span>
                            )}
                            Change Email
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

ChangeEmail.propTypes = {
    setAlert: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    id: state.user.user._id,
    email: state.user.user.email
});
export default connect(mapStateToProps, { setAlert, logoutUser, handle401Err })(
    ChangeEmail
);
