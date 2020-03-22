import axios from 'axios';
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { loadUser } from '../../redux/actions/user';
import Logo from '../../components/logo/Logo';
import FormErrorsDisplay from '../../components/forms/FormErrorsDisplay';
import {
    inputOnChange,
    updateStateErrors
} from '../../components/forms/formFuns';
import setAuthToken from '../../utils/setAuthToken';

import './Login.scss';

const Login = ({ isAuthenticated, redirectLink, setAlert, loadUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const res = await axios.post('/api/user/login', body, config);
            //set the token for auth and load user
            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            loadUser();
            setAlert(
                'Login successful.',
                'success',
                "your profile's dashboard"
            );
            // redirect to dashboard
            // history.push('/dashboard');
        } catch (err) {
            localStorage.removeItem('token');
            console.log('LOGIN FORM ERR:', err);
            if (err.response)
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
        }
    };
    if (isAuthenticated) return <Redirect to={redirectLink} />;
    return (
        <Fragment>
            {!isAuthenticated && !localStorage.getItem('token') && (
                <main className='login' id='main'>
                    <section className='login__form'>
                        <Logo />
                        <h1 className='sr-only'>Account Login</h1>

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
    loadUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { setAlert, loadUser })(Login);
