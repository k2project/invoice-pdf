import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import ProfileUnsubscribed from './ProfileUnsubscribed ';

const Profile = ({ profile }) => {
    return (
        <Fragment>
            <MainNav />
            {!profile && <ProfileUnsubscribed />}
            {profile && (
                <section className='dashboard'>
                    <DashboardNav />
                    <main id='main'>profile</main>
                </section>
            )}
        </Fragment>
    );
};

Profile.propTypes = {};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps)(Profile);
