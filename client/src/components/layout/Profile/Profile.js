import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Profile.scss';

import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings/Settings';

const Profile = ({ history, user }) => {
    const [display, setDisplay] = useState('dashboard');
    function toggleDisplay(display) {
        setDisplay(display);
    }
    useEffect(() => {
        if (!user) history.push('/');
    });
    return (
        <Fragment>
            {user && (
                <div className='profile'>
                    <Nav toggleDisplay={toggleDisplay} />
                    <h1 className='sr-only'>{`${display} settings displayed.`}</h1>
                    {display === 'dashboard' && <Dashboard />}
                    {display === 'account' && <Settings />}
                </div>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default withRouter(connect(mapStateToProps)(Profile));
