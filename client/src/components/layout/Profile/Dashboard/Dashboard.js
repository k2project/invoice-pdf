import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

import { connect } from 'react-redux';
import { setAlert } from '../../../../redux/actions/alerts';
import { getCurrentProfile } from '../../../../redux/actions/profile';

import DashboardNav from './DashboardNav';
import DashboardInit from './DashboardInit';

const Dashboard = ({ profile: { profile }, getCurrentProfile }) => {
    const [display, setDisplay] = useState('profile');
    // useEffect(() => {
    //     getCurrentProfile();
    // }, []);
    return (
        <main className='dashboard' id='main'>
            <h1 id='dashboard' className='sr-only'>
                Dashboard
            </h1>
            {!profile && <DashboardInit />}
            {profile && (
                <div className='dashboard__profiled'>
                    <DashboardNav />
                </div>
            )}
            {/* {display === 'profile' && <Profile />} */}
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
