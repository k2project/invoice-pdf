import React from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import ProfileDetails from './ProfileDetails';
const Profile = props => {
    return (
        <section>
            <h2 id='dashboard' className='sr-only'>
                Profile Settings
            </h2>
            <ProfileDetails />
        </section>
    );
};

Profile.propTypes = {};

export default Profile;
