import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrorsDisplay from '../../../../blocks/forms/FormErrorsDisplay';
import FormInput from '../../../../blocks/forms/FormInput';
import {
    formErrorsStyling,
    updateStateErrors,
    cleanData
} from '../../../../blocks/forms/formFuns';
import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../../redux/actions/profile';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CompanyForm({
    setAlert,
    companies,
    getCurrentProfile,
    updateId,
    setDisplay
}) {
    //initial profile state
    //profile doesnt exist
    const [formData, setFormData] = useState({
        companyName: '',
        companyAcronym: '',
        showAcronym: true,
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        email: '',
        website: '',
        mobile: '',
        fax: '',
        bankName: '',
        bankSortCode: '',
        bankAccount: '',
        companyInfo: '',
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

            const body = JSON.stringify({
                _id: uuidv4(),
                companyName: formData.companyName,
                companyAcronym: formData.companyAcronym,
                showAcronym: formData.showAcronym,
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                town: formData.town,
                county: formData.county,
                postcode: formData.postcode,
                website: formData.website,
                email: formData.email,
                mobile: formData.mobile,
                fax: formData.fax,
                bankName: formData.bankName,
                bankSortCode: formData.bankSortCode,
                bankAccount: formData.bankAccount,
                companyInfo: formData.companyInfo
            });

            await axios.put('/api/profile/company', body, config);
            getCurrentProfile();
            let alertMsg = `${formData.companyName} has been added to your user profile.`;
            if (updateId) {
                // displayForm(false);
                alertMsg = `${formData.companyName} profile has been updated successfully.`;
            }
            setAlert(alertMsg, 'success', null, false);
            //clear form
            setFormData({
                companyName: '',
                companyAcronym: '',
                showAcronym: true,
                addressLine1: '',
                addressLine2: '',
                town: '',
                county: '',
                postcode: '',
                email: '',
                website: '',
                mobile: '',
                fax: '',
                bankName: '',
                bankSortCode: '',
                bankAccount: '',
                companyInfo: '',
                errors: []
            });
        } catch (err) {
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
        if (updateId) {
            const company = companies.filter(c => c._id === updateId);
            setFormData({
                companyName: company.companyName || '',
                companyAcronym: company.companyAcronym || '',
                showAcronym: company.showAcronym || true,
                // addressLine1: company.address[0] || '',
                // addressLine2: company.address[1] || '',
                // town: company.address[2] || '',
                // county: company.address[3] || '',
                // postcode: company.address[4] || '',
                // email: company.contact.email || '',
                // website: company.contact.website || '',
                // mobile: company.contact.mobile || '',
                // fax: company.contact.fax || '',
                // bankName: company.bank.bankName || '',
                // bankSortCode: company.bank.bankSortCode || '',
                // bankAccount: company.bank.bankAccount || '',
                // companyInfo: company.companyInfo || '',
                errors: []
            });
        }
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, []);
    return (
        <form onSubmit={onSubmit} className='form-profile'>
            <FormInput
                form={{ formData, setFormData }}
                name='companyName'
                size='md'
            >
                Company's Name
            </FormInput>
            <FormInput
                form={{ formData, setFormData }}
                name='companyAcronym'
                size='md'
            >
                Company's Acronym or Abbreviation (optional)
            </FormInput>
            <FormInput
                type='checkbox'
                form={{ formData, setFormData }}
                name='showAcronym'
                checked
            >
                Display acronym in the dashboard menu insted of the company's
                name. Keep it unique.
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
            <FormInput
                type='textarea'
                form={{ formData, setFormData }}
                name='companyInfo'
            >
                Additional Information
            </FormInput>

            {formData.errors.length > 0 && (
                <FormErrorsDisplay errors={formData.errors} label='login' />
            )}
            {updateId && (
                <button
                    className='btn btn--grey btn--sibling'
                    onClick={() => setDisplay('company')}
                >
                    Cancel
                </button>
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

CompanyForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert, getCurrentProfile })(
    CompanyForm
);