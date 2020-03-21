import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Company.scss';

import { connect } from 'react-redux';

import CompanyNav from './CompanyNav';

const Company = ({ companies, company: { companyToDisplay } }) => {
    const currentCompany = companies.find(c => c._id === companyToDisplay);
    let { companyName } = currentCompany;

    return (
        <section className='company'>
            <h2 className='sr-only'>Company's setting for {companyName}.</h2>
            <CompanyNav />
        </section>
    );
};

Company.propTypes = {};

const mapStateToProps = state => ({
    companies: state.profile.profile.companies,
    company: state.company
});
export default connect(mapStateToProps)(Company);
