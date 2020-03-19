import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../../redux/actions/profile';
import axios from 'axios';

const Company = ({ id, companyUpdates, companies, setCompanyId, setAlert }) => {
    const company = companies.find(c => c._id === id);
    let { companyName } = company;
    async function deleteCompany() {
        try {
            await axios.delete(`/api/profile/company/${id}`);
            getCurrentProfile();
            setAlert('Company deleted successfully.', 'success', null, false);
            setCompanyId(null);
            companyUpdates('add-company-form');
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return (
        <section>
            <h2>
                <span className='sr-only'>Company's setting for </span>
                {companyName}
            </h2>

            <button onClick={() => companyUpdates('new-invoice-form')}>
                Create Invoice
            </button>
            <button onClick={() => companyUpdates('add-company-form')}>
                Update Company
            </button>
            <button onClick={deleteCompany}>Delete Company</button>
        </section>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(Company);
