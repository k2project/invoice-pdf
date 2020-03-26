import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';
import { getAllCompanies } from '../../../redux/actions/companies';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import ProfileUnsubscribed from './ProfileUnsubscribed';
import ProfileMain from './ProfileMain';

const Profile = ({
    profile: { profile, loading },
    getCurrentProfile,
    getAllCompanies
}) => {
    useEffect(() => {
        getCurrentProfile();
        getAllCompanies();
    }, [getCurrentProfile, getAllCompanies]);
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
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile, getAllCompanies })(
    Profile
);
