import React from 'react';
import PropTypes from 'prop-types';

import './Register.scss';

const Register = props => {
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <main className='register'>
            <section className='register__form'>
                <h1 className='heading heading--med'>Register</h1>
                <p>Create your account. It's free and only takes a minute.</p>
                <form onSubmit={handleSubmit}>
                    <label for='register-email'>Email</label>
                    <input
                        type='text'
                        id='register-email'
                        name='register-email'
                    />
                    <label for='register-password1'>Password</label>
                    <input
                        type='text'
                        id='register-password1'
                        name='register-password1'
                    />
                    <label for='register-password2'>Confirm Password</label>
                    <input
                        type='text'
                        id='register-password2'
                        name='register-password1'
                    />
                    <button type='submit' className='btn btn--form btn--green'>
                        Register Now
                    </button>
                </form>
            </section>
        </main>
    );
};

Register.propTypes = {};

export default Register;
