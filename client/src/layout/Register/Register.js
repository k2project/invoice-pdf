import axios from 'axios';
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { registerUser } from '../../redux/actions/user';
import Logo from '../../components/logo/Logo';
import FormErrorsDisplay from '../../components/forms/FormErrorsDisplay';
import {
    inputOnChange,
    updateStateErrors
} from '../../components/forms/formFuns';
import './Register.scss';

const Register = ({
    redirectLink,
    isRegistered,
    isAuthenticated,
    setAlert,
    registerUser
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        errors: []
    });

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

            const body = JSON.stringify(formData);
            await axios.post('/api/register', body, config);
            //registered successefully
            setAlert(
                'Account hass been created successfully. Please sign in. ',
                'success',
                'login page',
                false
            );
            registerUser();
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

    if (isRegistered) return <Redirect to='/' />;
    if (isAuthenticated) return <Redirect to={redirectLink} />;

    return (
        <Fragment>
            {!isAuthenticated && !sessionStorage.token && (
                <main className='register' id='main'>
                    <section className='register__form'>
                        <Logo />
                        <h1 className='sr-only'>Register Your Account</h1>
                        <p className='p--lg'>
                            {' '}
                            Creating your account with us is free and super
                            swift.
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
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    isRegistered: state.user.isRegistered,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { setAlert, registerUser })(Register);
