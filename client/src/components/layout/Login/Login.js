import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import { loginSuccess } from '../../../redux/actions/auth';
import FormErrorsDisplay from '../../func/FormErrorsDisplay';

import './Login.scss';

const Login = ({ history, setAlert, loginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errors: []
    });
    const { email, password } = formData;

    const onChange = e => {
        const name = e.target.name;
        //remove errors styling related to the input
        //empty errors array
        e.target.classList.remove('form__input--err');
        const errors = formData.errors.filter(err => err.param !== name);
        setFormData({
            ...formData,
            [name]: e.target.value,
            errors
        });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ email, password });
            const res = await axios.post('/api/auth/login', body, config);

            // localStorage.setItem('token', res.data.token);
            loginSuccess(res.data.token);
            setAlert('Login successful.', 'success');
            // redirect to dashboard
            history.push('/dashboard');
        } catch (err) {
            localStorage.removeItem('token');
            console.log(err);
            setFormData({
                ...formData,
                errors: [...formData.errors, ...err.response.data.errors]
            });
        }
    };

    useEffect(() => {
        //add error styling to the input
        formData.errors.length > 0 &&
            formData.errors.forEach(err => {
                if (err.param)
                    document
                        .getElementById(err.param)
                        .classList.add('form__input--err');
            });
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

                            {formData.errors && (
                                <FormErrorsDisplay
                                    errors={formData.errors}
                                    label='Register form errors list.'
                                />
                            )}

                            <button
                                type='submit'
                                className='btn btn--form btn--theme'
                            >
                                Sign In
                            </button>
                        </form>
                        <p>
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
    loginSuccess: PropTypes.func.isRequired
};

export default withRouter(connect(null, { setAlert, loginSuccess })(Login));
