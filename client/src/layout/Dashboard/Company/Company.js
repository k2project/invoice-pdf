import React, { Fragment, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import CompanyMain from './CompanyMain';

const Company = ({
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    let { id } = useParams();

    return (
        <Fragment>
            <MainNav />
            {/* no profile created yet */}
            {!profile && !loading && <Redirect to={redirectLink} />}
            {/* company url doesnt match existing companies */}
            {profile && !profile.companies.find(c => c._id === id) && (
                <Redirect to='/dashboard/company' />
            )}
            {!loading && profile && (
                <section className='dashboard'>
                    <DashboardNav />
                    <CompanyMain />
                </section>
            )}
            {/* {profile &&
                    profile.companies.map(c => {
                        if (c._id === id)
                            return <p key={c._id}>{c.companyName}</p>;
                    })} */}
            {/* <main id='main'>{id}</main> */}
        </Fragment>
    );
};

Company.propTypes = {
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile })(Company);
