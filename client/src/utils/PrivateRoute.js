import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    user: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated || !sessionStorage.token ? (
                <Redirect to={'/'} />
            ) : (
                <Component {...props} />
            )
        }
    />
);

PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(PrivateRoute);
