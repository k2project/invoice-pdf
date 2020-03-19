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
    //company being currently displayed in Company component - ID
    const [companyId, setCompanyId] = useState(null);
    //company selected for update in 'add company' or 'new invoice' tab - ID
    const [companyToUpdate, setCompanyToUpdate] = useState(null);
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
                        setCompany={setCompanyId}
                        setCompanyToUpdate={setCompanyToUpdate}
                    />
                    {display === 'profile-settings' && <Profile />}
                    {display === 'add-company-form' && (
                        <AddCompany
                            company={companyToUpdate}
                            setDisplay={setDisplay}
                        />
                    )}
                    {display === 'new-invoice-form' && (
                        <NewInvoice
                            company={companyToUpdate}
                            setDisplay={setDisplay}
                        />
                    )}
                    {display === 'company' && (
                        <Company
                            id={companyId}
                            companyUpdates={tab => {
                                setDisplay(tab);
                                setCompanyToUpdate(
                                    profile.companies.find(
                                        c => c._id === companyId
                                    )
                                );
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
