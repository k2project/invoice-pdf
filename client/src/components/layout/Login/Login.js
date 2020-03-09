import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import FormErrorsDisplay from '../../func/FormErrorsDisplay';

import './Login.scss';

const Login = ({ history, setAlert }) => {
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
            //registered successefully
            setAlert('Login successful.', 'success');
            // redirect to login page
            // history.push('/');
        } catch (err) {
            console.log(err);
            // setFormData({
            //     ...formData,
            //     errors: [...formData.errors, ...err.response.data.errors]
            // });
        }
    };
    useEffect(() => {
        //add error styling to the input
        formData.errors.forEach(err => {
            if (err.param)
                document
                    .getElementById(err.param)
                    .classList.add('form__input--err');
        });
    }, [formData.errors]);
    return (
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

                    <button type='submit' className='btn btn--form btn--theme'>
                        Sign In
                    </button>
                </form>
                <p>
                    Need an account? <Link to='/register'>Sign up now.</Link>
                </p>
            </section>
        </main>
    );
};

Login.propTypes = {};

export default connect(null, { setAlert })(Login);
