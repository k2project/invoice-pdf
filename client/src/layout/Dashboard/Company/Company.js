import React, { Fragment, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';

const Company = ({
    company: { currentNavLink },
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile
}) => {
    console.log('company');
    useEffect(() => {
        const detailsEl = document.querySelector(
            '.dashboard-nav__list details'
        );
        if (detailsEl && localStorage.details) {
            detailsEl.setAttribute('open', 'true');
        }
        getCurrentProfile();
        console.log('GP Company');
    }, [getCurrentProfile]);

    let { id } = useParams();

    // const company = profile.companies.find(c => c._id === id);
    // if (!company) return <Redirect to='/dashboard/company' />;

    // const currentCompany = companies.find(c => c._id === companyToDisplay);
    // let { companyName } = currentCompany;

    return (
        <Fragment>
            <MainNav />
            <section className='dashboard'>
                {!profile && !loading && <Redirect to={redirectLink} />}
                <DashboardNav />
                {/* {profile && !profile.companies.found(c => c._id === id) && (
                    <Redirect to='/dashboard/company' />
                )} */}
                {profile &&
                    profile.companies.map(c => {
                        if (c._id === id)
                            return <p key={c._id}>{c.companyName}</p>;
                    })}
                {/* <main id='main'>{id}</main> */}
            </section>
        </Fragment>
    );
};

Company.propTypes = {
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    company: state.company,
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile })(Company);
