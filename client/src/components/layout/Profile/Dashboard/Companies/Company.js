import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Company.scss';

import { connect } from 'react-redux';

import CompanyNav from './CompanyNav';

const Company = ({ companies, dashboard: { companyToDisplay } }) => {
    const company = companies.find(c => c._id === companyToDisplay);
    let { companyName } = company;

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
    dashboard: state.dashboard
});
export default connect(mapStateToProps)(Company);
