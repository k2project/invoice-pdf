import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';

const Company = ({ profile }) => {
    return (
        <Fragment>
            <MainNav />
            <section className='dashboard'>
                {!profile && <Redirect to='/dashboard/profile' />}
                <DashboardNav />
                <main id='main'>company</main>
            </section>
        </Fragment>
    );
};

Company.propTypes = {};
const mapStateToProps = state => ({
    profile: state.profile.profile
});
export default connect(mapStateToProps)(Company);
