import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import ProfileUnsubscribed from './ProfileUnsubscribed';
import ProfileMain from './ProfileMain';

const Profile = ({ profile: { profile, loading }, getCurrentProfile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return (
        <Fragment>
            <MainNav />
            {!loading && !profile && <ProfileUnsubscribed />}
            {!loading && profile && (
                <section className='dashboard'>
                    <DashboardNav />
                    <ProfileMain />
                </section>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
