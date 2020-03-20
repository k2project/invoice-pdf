import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { dialogBox } from '../../../../blocks/forms/formFuns';

import {
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
} from '../../../../../redux/actions/dasboard';

const Company = ({
    companies,
    setAlert,
    dashboard: { currentNavLink, companyToDisplay },
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
}) => {
    const company = companies.find(c => c._id === companyToDisplay);
    let {
        companyName,
        companyAcronym,
        showAcronym,
        addressLine1,
        addressLine,
        town,
        county,
        postcode,
        email,
        website,
        mobile,
        fax,
        bankName,
        bankSortCode,
        bankAccount,
        companyInfo
    } = company;

    const handleDelete = e => {
        const targetEl = e.target;
        dialogBox(
            ` delete ${companyName}`,
            () => deleteCompany(companyToDisplay),
            targetEl
        );
        document.getElementById('dialog-cancel').focus();
    };

    return (
        <section>
            <h2>
                <span className='sr-only'>Company's setting for </span>
                {companyName}
            </h2>

            <button onClick={() => invoiceCompany(companyToDisplay)}>
                Create Invoice
            </button>
            <button onClick={() => updateCompany(companyToDisplay)}>
                Update Company
            </button>
            <button onClick={handleDelete}>Delete Company</button>
        </section>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    dashboard: state.dashboard
});
export default connect(mapStateToProps, {
    setAlert,
    displayCurrentLink,
    displayCompany,
    updateCompany,
    deleteCompany,
    invoiceCompany
})(Company);
