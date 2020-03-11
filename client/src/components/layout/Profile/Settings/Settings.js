import React from 'react';
import PropTypes from 'prop-types';
import './Settings.scss';

import DeleteAccount from './DeleteAccount';

const Settings = props => {
    return (
        <div className='settings'>
            <div className='wrapper'>
                <DeleteAccount />
            </div>
        </div>
    );
};

Settings.propTypes = {};

export default Settings;
