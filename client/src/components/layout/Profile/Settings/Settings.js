import React from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';

import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';

const Settings = props => {
    return (
        <main className='settings' id='main'>
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
