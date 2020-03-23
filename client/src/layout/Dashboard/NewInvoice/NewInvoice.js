import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';

const NewInvoice = ({
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return (
        <Fragment>
            <MainNav />
            <section className='dashboard'>
                {!profile && !loading && <Redirect to={redirectLink} />}
                <DashboardNav />
                <main id='main'>invoice form</main>
            </section>
        </Fragment>
    );
};

NewInvoice.propTypes = {
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile })(NewInvoice);
