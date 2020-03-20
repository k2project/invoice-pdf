import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../../redux/actions/profile';

import DashboardNav from './DashboardNav';
import DashboardInit from './DashboardInit';
import Profile from './Profile/Profile';
import AddCompany from './Companies/AddCompany';
import Company from './Companies/Company';
import NewInvoice from './Invoices/NewInvoice';

const Dashboard = ({
    profile: { profile, loading },
    getCurrentProfile,
    dashboard: { currentNavLink }
}) => {
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
                    <DashboardNav />
                    {currentNavLink === 'profile-settings' && <Profile />}
                    {currentNavLink === 'company-form' && <AddCompany />}
                    {currentNavLink === 'invoice-form' && <NewInvoice />}
                    {currentNavLink === 'company' && <Company />}
                </div>
            )}
        </main>
    );
};

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    dashboard: state.dashboard
});
export default connect(mapStateToProps, {
    getCurrentProfile
})(Dashboard);
