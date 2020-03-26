import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';
import { getAllCompanies } from '../../redux/actions/companies';

import MainNav from '../MainNav/MainNav';
import DashboardNav from './DashboardNav';
import CompanyForm from '../../components/forms/CompanyForm';

const AddCompany = ({
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile,
    getAllCompanies
}) => {
    useEffect(() => {
        // getAllCompanies();
        getCurrentProfile();
    }, [getAllCompanies, getCurrentProfile]);
    return (
        <Fragment>
            {/* no profile created yet */}
            {!profile && !loading && <Redirect to={redirectLink} />}
            {profile && !loading && (
                <Fragment>
                    <MainNav />
                    <section className='dashboard'>
                        <DashboardNav />
                        <main id='main'>
                            <div className='dashboard__heading'>
                                <h2 className='heading heading--sm'>
                                    Add a new company form.
                                </h2>
                            </div>
                            <div className='dashboard__section'>
                                <CompanyForm />
                            </div>
                        </main>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
};

AddCompany.propTypes = {
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getAllCompanies, getCurrentProfile })(
    AddCompany
);
