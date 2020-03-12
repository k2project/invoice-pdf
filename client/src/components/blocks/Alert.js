import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div
            key={alert.id}
            className={`alert alert--${alert.status}`}
            role='alert'
        >
            {alert.msg}
            {alert.redirection && (
                <span className='sr-only'>
                    You have been redirected to{alert.redirection}.
                </span>
            )}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    alerts: state.alerts
});
export default connect(mapStateToProps)(Alert);
