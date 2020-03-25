import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useParams } from 'react-router-dom';
import FormErrorsDisplay from './FormErrorsDisplay';
import FormInput from './FormInput';
import { updateStateErrors, cleanData } from './formFuns';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alerts';
import { getCurrentProfile } from '../../redux/actions/profile';
import { setCompanyCurrentNavLink } from '../../redux/actions/company';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CompanyForm({
    companies,
    setAlert,
    getCurrentProfile,
    setCompanyCurrentNavLink,
    history,
    update
}) {
    const updateID = useParams().id;
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
        e.preventDefault();
        const form = e.target;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            await cleanData(formData);
            const _id = updateID ? updateID : uuidv4();
            const body = JSON.stringify({
                _id,
                ...formData
            });
            let alertMsg = `${formData.companyName} has been added to your user profile.`;
            if (updateID) {
                //update company
                await axios.put(`/api/company/${updateID}`, body, config);
                alertMsg = `${formData.companyName} profile has been updated successfully.`;
                setCompanyCurrentNavLink('details');
            } else {
                //add a new company
                await axios.post('/api/company', body, config);
                setCompanyCurrentNavLink('default');
            }
            await getCurrentProfile();
            history.push(`/dashboard/company/${_id}`);
            setAlert(alertMsg, 'success', null, false);
        } catch (err) {
            console.log('COMPANY FORM ERR');
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
        if (update) {
            const company = companies.find(c => c._id === updateID);
            setFormData({
                companyName: company.companyName || '',
                companyAcronym: company.companyAcronym || '',
                showAcronym: company.showAcronym,
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
                companyInfo: company.companyInfo || '',
                errors: []
            });
        }
    }, [updateID, companies, update]);

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
            >
                Display acronym in the menus over the company's name. Keep it
                unique.
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
            <button
                type='submit'
                className='btn btn--info'
                onClick={onSubmit}
                onMouseDown={e => e.preventDefault()}
            >
                Submit
            </button>
        </form>
    );
}

CompanyForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired,
    setCompanyCurrentNavLink: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, {
    setAlert,
    getCurrentProfile,
    setCompanyCurrentNavLink
})(withRouter(CompanyForm));
