import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../redux/actions/profile';

import DashboardNav from './DashboardNav';
import DashboardInit from './DashboardInit';
import Profile from './Profile/Profile';
import AddCompany from './Companies/AddCompany';
import Company from './Companies/Company';
import NewInvoice from './Invoices/NewInvoice';

const Dashboard = ({ profile: { profile, loading }, getCurrentProfile }) => {
    const [display, setDisplay] = useState('new-invoice-form');
    const [company, setCompany] = useState(null);
    const [companyInvoice, setCompanyInvoice] = useState(null);
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        <main className='dashboard' id='main'>
            <h1 id='dashboard' className='sr-only'>
                Dashboard
            </h1>
            {!loading && !profile && <DashboardInit />}
            {!loading && profile && (
                <div className='dashboard__profiled'>
                    <DashboardNav
                        setDisplay={setDisplay}
                        setCompany={setCompany}
                        setCompanyInvoice={setCompanyInvoice}
                    />
                    {display === 'profile-settings' && <Profile />}
                    {display === 'add-company-form' && <AddCompany />}
                    {display === 'new-invoice-form' && (
                        <NewInvoice
                            id={companyInvoice}
                            setDisplay={setDisplay}
                        />
                    )}
                    {display === 'company' && (
                        <Company
                            id={company}
                            createCompanyInvoice={() => {
                                setDisplay('new-invoice-form');
                                setCompanyInvoice(company);
                            }}
                        />
                    )}
                </div>
            )}
        </main>
    );
};

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
