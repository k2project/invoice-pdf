import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Dashboard.scss';

const Dashboard = ({ history, user }) => {
    useEffect(() => {
        if (!user) history.push('/');
    });
    return <Fragment>{user && <div>dashboard</div>}</Fragment>;
};

Dashboard.propTypes = {};
const mapStateToProps = state => ({
    user: state.auth.user
});
export default withRouter(connect(mapStateToProps)(Dashboard));
