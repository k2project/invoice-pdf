import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/auth';

import './Register.scss';

const Register = ({ register }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });
    const { email, password, password2 } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    function onSubmit(e) {
        e.preventDefault();
        if (password !== password2) {
            console.log('error registering');
        } else {
            register(email, password);
            setFormData({
                emial: '',
                password: '',
                password2: ''
            });
        }
    }
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
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={onChange}
                    />
                    <label htmlFor='password2'>Confirm Password</label>
                    <input
                        type='password'
                        id='password2'
                        name='password2'
                        onChange={onChange}
                    />
                    <button type='submit' className='btn btn--form btn--green'>
                        Register Now
                    </button>
                </form>
            </section>
        </main>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired
};

export default connect(null, { register })(Register);
