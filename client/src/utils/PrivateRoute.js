import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated || !localStorage.getItem('token') ? (
                <Redirect to={window.location.pathname} />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps)(PrivateRoute);
