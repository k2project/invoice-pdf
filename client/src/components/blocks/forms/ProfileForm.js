import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrorsDisplay from './FormErrorsDisplay';
import FormInput from './FormInput';
import { formErrorsStyling, updateStateErrors, cleanData } from './formFuns';
import { connect } from 'react-redux';
import { setAlert } from '../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../redux/actions/profile';
import axios from 'axios';

function ProfileForm({ setAlert, user: { _id, email }, getCurrentProfile }) {
    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        email,
        website: '',
        mobile: '',
        fax: '',
        bankName: '',
        bankSortCode: '',
        bankAccount: '',
        errors: []
    });

    async function onSubmit(e) {
        const form = e.target;
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await cleanData(formData);
            const {
                fullName,
                company,
                addressLine1,
                addressLine2,
                town,
                county,
                postcode,
                website,
                email,
                mobile,
                fax,
                bankName,
                bankSortCode,
                bankAccount
            } = formData;
            const body = JSON.stringify({
                fullName,
                company,
                addressLine1,
                addressLine2,
                town,
                county,
                postcode,
                website,
                email,
                mobile,
                fax,
                bankName,
                bankSortCode,
                bankAccount
            });

            await axios.post('/api/profile/', body, config);
            getCurrentProfile();
            setAlert(
                'Your profile has been created successfully. Please explore your dashboard below.',
                'success',
                null,
                false
            );
        } catch (err) {
            console.log(err);
            if (err.response.data.errors) {
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
            }
        }
    }

    useEffect(() => {
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
    return (
        <form onSubmit={onSubmit}>
            <FormInput
                form={{ formData, setFormData }}
                name='fullName'
                size='md'
            >
                Full Name
            </FormInput>
            <FormInput
                form={{ formData, setFormData }}
                name='company'
                size='md'
            >
                Company Name
            </FormInput>

            <fieldset>
                <legend>Address:</legend>
                <FormInput form={{ formData, setFormData }} name='addressLine1'>
                    Address Line 1
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='addressLine2'>
                    Address Line 2 (optional)
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='town'>
                    Town/City
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='county'>
                    County
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='postcode'>
                    Postcode
                </FormInput>
            </fieldset>

            <fieldset>
                <legend>Bank Details:</legend>
                <FormInput form={{ formData, setFormData }} name='bankName'>
                    Bank Name
                </FormInput>{' '}
                <FormInput form={{ formData, setFormData }} name='bankSortCode'>
                    Sort Code
                </FormInput>{' '}
                <FormInput form={{ formData, setFormData }} name='bankAccount'>
                    Account Number
                </FormInput>
            </fieldset>
            <fieldset>
                <legend>Contact Details:</legend>
                <FormInput
                    form={{ formData, setFormData }}
                    name='email'
                    type='email'
                >
                    Email
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='website'>
                    Website
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='mobile'>
                    Tel/Mobile
                </FormInput>
                <FormInput form={{ formData, setFormData }} name='fax'>
                    Fax
                </FormInput>
            </fieldset>
            <button
                type='submit'
                className='btn btn--info'
                onClick={onSubmit}
                onMouseDown={e => e.preventDefault()}
            >
                Submit Profile
            </button>
        </form>
    );
}

ProfileForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(mapStateToProps, { setAlert, getCurrentProfile })(
    ProfileForm
);
