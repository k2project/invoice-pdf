import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CompanyNav from './CompanyNav';
import CompanyTasks from './CompanyTasks';
import CompanyInvoices from './CompanyInvoices';
import CompanyDetails from './CompanyDetails';
import CompanyForm from '../../../components/forms/CompanyForm';

const CompanyMain = ({ companies, currentNavLink }) => {
    let { id } = useParams();
    const company = companies.find(c => c._id === id);
    if (!company) return <Redirect to='dashboard/company' />;
    return (
        <main id='main'>
            <h2 className='sr-only'>Company's Settings</h2>
            <CompanyNav />
            {currentNavLink === 'tasks' && <CompanyTasks />}
            {currentNavLink === 'invoices' && <CompanyInvoices />}
            {currentNavLink === 'details' && <CompanyDetails />}
            {currentNavLink === 'update' && (
                <section className='dashboard__section'>
                    <h3 className='sr-only'>Update Company</h3>
                    <CompanyForm update />
                </section>
            )}
        </main>
    );
};

CompanyMain.propTypes = {
    currentNavLink: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    currentNavLink: state.company.currentNavLink,
    companies: state.profile.profile.companies
});
export default connect(mapStateToProps)(CompanyMain);
