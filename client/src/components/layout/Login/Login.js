import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import { loadUser } from '../../../redux/actions/auth';
import FormErrorsDisplay from '../../blocks/forms/FormErrorsDisplay';
import {
    formErrorsStyling,
    inputOnChange,
    updateStateErrors
} from '../../blocks/forms/formFuns';
import setAuthToken from '../../../utils/setAuthToken';

import './Login.scss';

const Login = ({ history, setAlert, loginSuccess, loadUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errors: []
    });
    const { email, password } = formData;

    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ email, password });
            const res = await axios.post('/api/auth/login', body, config);

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            loadUser();
            setAlert(
                'Login successful.',
                'success',
                "your profile's dashboard"
            );
            // redirect to dashboard
            history.push('/dashboard');
        } catch (err) {
            localStorage.removeItem('token');
            updateStateErrors(
                form,
                formData,
                setFormData,
                err.response.data.errors
            );
        }
    };

    useEffect(() => {
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, [formData.errors]);

    return (
        <Fragment>
            {localStorage.getItem('token') && history.push('/dashboard')}
            {!localStorage.getItem('token') && (
                <main className='login' id='main'>
                    <section className='login__form'>
                        <h1 className='heading heading--med'>Account Login</h1>
                        <form onSubmit={onSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                onChange={onChange}
                                className='form__input'
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                onChange={onChange}
                                className='form__input'
                            />

                            {formData.errors.length > 0 && (
                                <FormErrorsDisplay
                                    errors={formData.errors}
                                    label='login'
                                />
                            )}

                            <button
                                type='submit'
                                className='btn btn--form btn--theme'
                                onMouseDown={e => e.preventDefault()}
                            >
                                Sign In
                            </button>
                        </form>
                        <p className='p--sml'>
                            Need an account?{' '}
                            <Link to='/register'>Sign up now.</Link>
                        </p>
                    </section>
                </main>
            )}
        </Fragment>
    );
};

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
};

export default withRouter(connect(null, { setAlert, loadUser })(Login));
