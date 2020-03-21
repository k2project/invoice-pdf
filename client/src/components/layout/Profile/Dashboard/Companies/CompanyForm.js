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
import { displayCurrentLink } from '../../../../../redux/actions/dasboard';
import { displayCompany } from '../../../../../redux/actions/company';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CompanyForm({
    companies,
    company: { companyToUpdate },
    setAlert,
    getCurrentProfile,
    displayCurrentLink,
    displayCompany
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
            const _id = companyToUpdate ? companyToUpdate : uuidv4();
            const body = JSON.stringify({
                _id,
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

            let alertMsg = `${formData.companyName} has been added to your user profile.`;
            if (companyToUpdate) {
                //update company
                await axios.put(
                    `/api/company/${companyToUpdate}`,
                    body,
                    config
                );
                getCurrentProfile();
                alertMsg = `${formData.companyName} profile has been updated successfully.`;
                displayCompany(companyToUpdate);
            } else {
                //add a new company
                await axios.post('/api/company', body, config);
                await getCurrentProfile();
                displayCompany(_id);
                //open details
                document.querySelector(
                    '.dashboard-nav__list details'
                ).open = true;
            }
            setAlert(alertMsg, 'success', null, false);
            // clear form
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
            console.log(err);
            if (err.response) {
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
        const company = companies.find(c => c._id === companyToUpdate);

        if (companyToUpdate) {
            setFormData({
                ...formData,
                companyName: company.companyName || '',
                companyAcronym: company.companyAcronym || '',
                showAcronym: company.showAcronym || true,
                addressLine1: company.addressLine1 || '',
                addressLine2: company.addressLine2 || '',
                town: company.town || '',
                county: company.county || '',
                postcode: company.postcode || '',
                email: company.email || '',
                website: company.website || '',
                mobile: company.mobile || '',
                fax: company.fax || '',
                bankName: company.bankName || '',
                bankSortCode: company.bankSortCode || '',
                bankAccount: company.bankAccount || '',
                companyInfo: company.companyInfo || ''
            });
        }
    }, [companyToUpdate]);
    useEffect(() => {
        //add error styling to the inputs
        formErrorsStyling(formData.errors);
    }, [formData.errors]);
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
            {companyToUpdate && (
                <button
                    className='btn btn--grey btn--sibling'
                    onClick={() => displayCurrentLink('company')}
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
    displayCurrentLink: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired,
    company: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    company: state.company
});
export default connect(mapStateToProps, {
    setAlert,
    getCurrentProfile,
    displayCurrentLink,
    displayCompany
})(CompanyForm);
