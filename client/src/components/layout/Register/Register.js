import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import FormErrorsDisplay from '../../blocks/forms/FormErrorsDisplay';
import {
    formErrorsStyling,
    inputOnChange,
    updateStateErrors
} from '../../blocks/forms/formFuns';

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

            const body = JSON.stringify({ email, password, password2 });
            await axios.post('/api/register', body, config);
            //registered successefully
            setAlert(
                "Account's created successfully. Please sign in now. ",
                'success',
                'login page',
                false
            );
            // redirect to login page
            history.push('/');
        } catch (err) {
            console.log('REGISTER FORM ERR:', err);
            if (err.response)
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
                <main className='register' id='main'>
                    <section className='register__form'>
                        <h1 className='heading heading--med'>
                            Create Your Account
                        </h1>
                        <p className='p--lrg'>
                            {' '}
                            It's free and only takes a minute.
                        </p>
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
                            {formData.errors.length > 0 && (
                                <FormErrorsDisplay
                                    errors={formData.errors}
                                    label='register'
                                />
                            )}

                            <button
                                type='submit'
                                className='btn btn--form btn--theme'
                                onMouseDown={e => e.preventDefault()}
                            >
                                Create Account
                            </button>
                        </form>
                        <p>
                            Already have an account?{' '}
                            <Link to='/'>Sign in.</Link>
                        </p>
                    </section>
                </main>
            )}
        </Fragment>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(withRouter(Register));
