import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Company.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { dialogBox } from '../../../../blocks/forms/formFuns';

import {
    updateCompany,
    deleteCompany,
    invoiceCompany
} from '../../../../../redux/actions/dasboard';

const CompanyNav = ({
    companies,
    setAlert,
    dashboard: { companyToDisplay },
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
        <nav aria-labelledby='company-nav' className='company-nav'>
            <h3 id='company-nav' className='heading heading--xs'>
                {companyName}
                <span className='sr-only'> 's navigation bar.</span>
            </h3>
            <ul aria-label="navigation list for company's page">
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                    >
                        Current Tasks
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => invoiceCompany(companyToDisplay)}
                    >
                        Invoices
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => invoiceCompany(companyToDisplay)}
                    >
                        New invoice
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                    >
                        Details
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => updateCompany(companyToDisplay)}
                    >
                        Update Company
                    </a>
                </li>
                <li>
                    <a
                        href='#'
                        className='company-nav__link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={handleDelete}
                    >
                        Delete Company
                    </a>
                </li>
            </ul>
        </nav>
    );
};

CompanyNav.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    dashboard: state.dashboard
});
export default connect(mapStateToProps, {
    setAlert,
    updateCompany,
    deleteCompany,
    invoiceCompany
})(CompanyNav);
