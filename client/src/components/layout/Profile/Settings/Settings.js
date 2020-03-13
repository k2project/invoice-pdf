import React from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';

import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword';

const Settings = props => {
    return (
        <main className='settings' id='main'>
            <div className='wrapper'>
                <ChangePassword />
                <DeleteAccount />
            </div>
        </main>
    );
};

Settings.propTypes = {};

export default Settings;
