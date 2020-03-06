import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import FormErrorsDisplay from '../../func/FormErrorsDisplay';

import './Register.scss';

const Register = ({ history, setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        errors: []
    });
    const { email, password, password2 } = formData;

    const onChange = e => {
        const name = e.target.name;
        //remove errors styling related to the input
        //empty errors array
        e.target.classList.remove('form__input--err');
        setFormData({
            ...formData,
            [name]: e.target.value,
            errors: []
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

            const body = JSON.stringify({ email, password, password2 });
            const res = await axios.post('/api/register', body, config);
            //registered successefully
            setAlert(res.data, 'success');
            // redirect to login page
            history.push('/login');
        } catch (err) {
            setFormData({
                ...formData,
                errors: [...formData.errors, ...err.response.data.errors]
            });
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
        <main className='register'>
            <section className='register__form'>
                <h1 className='heading heading--med'>Register</h1>
                <p>Create your account. It's free and only takes a minute.</p>
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
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                        type='password'
                        id='password2'
                        name='password2'
                        onChange={onChange}
                        className='form__input'
                    />
                    {formData.errors && (
                        <FormErrorsDisplay errors={formData.errors} />
                    )}

                    <button type='submit' className='btn btn--form btn--orange'>
                        Register Now
                    </button>
                </form>
            </section>
        </main>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired
};
export default withRouter(connect(null, { setAlert })(Register));
