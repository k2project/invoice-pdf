import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../../../../redux/actions/alerts';

const Company = ({ id, createCompanyInvoice, companies, setAlert }) => {
    const company = companies.find(c => c._id === id);
    let { companyName } = company;
    return (
        <div>
            {companyName}
            <button onClick={createCompanyInvoice}>Create Invoice</button>
        </div>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps, { setAlert })(Company);
