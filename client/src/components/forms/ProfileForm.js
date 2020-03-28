import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormErrorsDisplay from './FormErrorsDisplay';
import FormInput from './FormInput';
import { updateStateErrors, cleanData } from './formFuns';

import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { handle401Err } from '../../redux/actions/user';
import {
    getCurrentProfile,
    setProfileCurrentNavLink
} from '../../redux/actions/profile';

import axios from 'axios';

function ProfileForm({
    setAlert,
    user: { email },
    profile,
    setProfileCurrentNavLink,
    getCurrentProfile,
    handle401Err,
    update
}) {
    //initial profile state
    //profile doesnt exist
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

            const body = JSON.stringify(formData);

            await axios.post('/api/profile/', body, config);
            getCurrentProfile();
            console.log('GP Profile FORM');
            let alertMsg =
                'Your profile has been created successfully. Please explore your dashboard below.';
            if (update) {
                alertMsg = 'Your profile has been updated successfully.';
            }
            setProfileCurrentNavLink('details');
            setAlert(alertMsg, 'success', null, false);
        } catch (err) {
            console.log('PROFILE FORM ERR');
            console.log(err);
            if (err.response) {
                updateStateErrors(
                    form,
                    formData,
                    setFormData,
                    err.response.data.errors
                );
            }
            if (err.response.status === 401) {
                handle401Err();
            }
        }
    }

    useEffect(() => {
        if (update)
            setFormData({
                fullName: profile.fullName || '',
                company: profile.company || '',
                addressLine1: profile.address[0] || '',
                addressLine2: profile.address[1] || '',
                town: profile.address[2] || '',
                county: profile.address[3] || '',
                postcode: profile.address[4] || '',
                email: profile.contact.email || '',
                website: profile.contact.website || '',
                mobile: profile.contact.mobile || '',
                fax: profile.contact.fax || '',
                bankName: profile.bank.bankName || '',
                bankSortCode: profile.bank.bankSortCode || '',
                bankAccount: profile.bank.bankAccount || '',
                errors: []
            });
    }, [profile, update]);
    return (
        <form onSubmit={onSubmit} className='form-profile'>
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
                Company's Name
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
            {formData.errors.length > 0 && (
                <FormErrorsDisplay errors={formData.errors} label='profile' />
            )}
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
    user: state.user.user,
    profile: state.profile.profile,
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    setProfileCurrentNavLink: PropTypes.func.isRequired
});
export default connect(mapStateToProps, {
    setAlert,
    getCurrentProfile,
    setProfileCurrentNavLink,
    handle401Err
})(ProfileForm);
