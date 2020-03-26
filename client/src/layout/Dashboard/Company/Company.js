import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';
import { getAllCompanies } from '../../../redux/actions/companies';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import CompanyMain from './CompanyMain';

const Company = ({
    companies,
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile,
    getAllCompanies
}) => {
    useEffect(() => {
        getCurrentProfile();
        getAllCompanies();
    }, [getCurrentProfile, getAllCompanies]);

    return (
        <Fragment>
            {/* no profile created yet */}
            {!profile && !loading && <Redirect to={redirectLink} />}
            {profile && !loading && (
                <Fragment>
                    <MainNav />
                    {!companies.loading && (
                        <section className='dashboard'>
                            <DashboardNav />
                            <CompanyMain />
                        </section>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

Company.propTypes = {
    companies: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    companies: state.companies,
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile, getAllCompanies })(
    Company
);
