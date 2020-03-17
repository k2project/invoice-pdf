import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../redux/actions/profile';

import DashboardNav from './DashboardNav';
import DashboardInit from './DashboardInit';
import Profile from './Profile/Profile';

const Dashboard = ({ profile: { profile, loading }, getCurrentProfile }) => {
    const [display, setDisplay] = useState('profile');
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
                    {display === 'profile' && <Profile />}
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
