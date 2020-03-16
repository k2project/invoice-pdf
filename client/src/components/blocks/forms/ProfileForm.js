import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrorsDisplay from './FormErrorsDisplay';
import {
    formErrorsStyling,
    inputOnChange,
    updateStateErrors
} from './formFuns';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import axios from 'axios';

function ProfileForm({ setAlert, user: { _id, email } }) {
    const [formData, setFormData] = useState({
        fullName: null,
        company: null,
        errors: []
    });
    const onChange = e => {
        inputOnChange(e, formData, setFormData);
    };
    async function onSubmit(e) {
        const form = e.target;
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const { fullName, company } = formData;
            const body = JSON.stringify({
                fullName,
                company
            });

            await axios.post('/api/profile/', body, config);

            // logout user
            setAlert(
                'Your profile has been created successfully. Please explore your dashboard below.',
                'success',
                null,
                false
            );
        } catch (err) {
            console.log(err);
            // updateStateErrors(
            //     form,
            //     formData,
            //     setFormData,
            //     err.response.data.errors
            // );
        }
    }

    useEffect(() => {
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor='fullName'>Full Name</label>
            <input
                type='text'
                name='fullName'
                id='fullName'
                onChange={onChange}
                className='form__input form__input--sml'
            />
            <label htmlFor='company'>Company Name</label>
            <input
                type='text'
                name='company'
                id='company'
                onChange={onChange}
                className='form__input form__input--sml'
            />
            <button
                type='submit'
                className='btn btn--grey'
                onClick={onSubmit}
                onMouseDown={e => e.preventDefault()}
            >
                Create Profile
            </button>
        </form>
    );
}

ProfileForm.propTypes = {};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, { setAlert })(ProfileForm);
