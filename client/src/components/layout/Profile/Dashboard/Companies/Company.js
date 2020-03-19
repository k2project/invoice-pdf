import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';

const Company = ({ id, companyUpdates, companies, setAlert }) => {
    const company = companies.find(c => c._id === id);
    let { companyName } = company;
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
        </section>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(Company);
