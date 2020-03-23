import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileNav from './ProfileNav';
import ProfileDetails from './ProfileDetails';
import ProfileForm from '../../../components/forms/ProfileForm';

const ProfileMain = ({ currentNavLink }) => {
    return (
        <main id='main'>
            <h2 className='sr-only'>Profile's Settings</h2>
            <ProfileNav />
            {currentNavLink === 'details' && <ProfileDetails />}
            {currentNavLink === 'update' && (
                <section className='dashboard__section'>
                    <h3 className='sr-only'>Update Profile</h3>
                    <ProfileForm update />
                </section>
            )}
        </main>
    );
};

ProfileMain.propTypes = {
    currentNavLink: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    currentNavLink: state.profile.currentNavLink
});
export default connect(mapStateToProps)(ProfileMain);
