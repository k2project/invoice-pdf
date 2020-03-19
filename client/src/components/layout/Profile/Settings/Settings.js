import React from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';

import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Settings = props => {
    return (
        <main className='settings' id='account'>
            <h1 id='account' className='sr-only'>
                Account settings
            </h1>
            <div className='wrapper'>
                <ChangeEmail />
                <ChangePassword />
                <DeleteAccount />
            </div>
        </main>
    );
};

Settings.propTypes = {};

export default Settings;
