import React from 'react';
import PropTypes from 'prop-types';
import ProfileNav from './ProfileNav';

const ProfileMain = props => {
    return (
        <main id='main'>
            <h2 className='sr-only'>Profile's Settings</h2>
            <ProfileNav />
        </main>
    );
};

ProfileMain.propTypes = {};

export default ProfileMain;
