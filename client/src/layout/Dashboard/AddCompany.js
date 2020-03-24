import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile';

import MainNav from '../MainNav/MainNav';
import DashboardNav from './DashboardNav';
import CompanyForm from '../../components/forms/CompanyForm';

const AddCompany = ({
    profile: { profile, loading },
    redirectLink,
    getCurrentProfile
}) => {
    console.log('add-company');
    useEffect(() => {
        getCurrentProfile();
        console.log('GP ADD-Company');
    }, [getCurrentProfile]);
    return (
        <Fragment>
            <MainNav />
            <section className='dashboard'>
                {!profile && !loading && <Redirect to={redirectLink} />}
                <DashboardNav />
                <main id='main'>
                    <div className='dashboard__heading'>
                        <h2 className='heading heading--sm'>
                            Add a new company form.
                        </h2>
                    </div>
                    <div className='dashboard__section'>
                        {!loading && profile && <CompanyForm />}
                    </div>
                </main>
            </section>
        </Fragment>
    );
};

AddCompany.propTypes = {
    profile: PropTypes.object.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile })(AddCompany);
