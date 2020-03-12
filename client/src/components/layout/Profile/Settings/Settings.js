import React from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';

import DeleteAccount from './DeleteAccount';

const Settings = props => {
    return (
        <main className='settings' id='main'>
            <div className='wrapper'>
                <DeleteAccount />
            </div>
        </main>
    );
};

Settings.propTypes = {};

export default Settings;
