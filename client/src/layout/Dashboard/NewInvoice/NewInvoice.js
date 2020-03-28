import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NewInvoice.scss';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profile';
import { getAllCompanies } from '../../../redux/actions/companies';

import MainNav from '../../MainNav/MainNav';
import DashboardNav from './../DashboardNav';
import InvoiceNav from './InvoiceNav/InvoiceNav';
import InvoiceSelectCompany from './InvoiceSelectCompany';
import InvoiceDocViewer from './InvoiceDoc/InvoiceDocViewer';

const NewInvoice = ({
    profile: { profile, loading },
    companies,
    redirectLink,
    getCurrentProfile,
    getAllCompanies
}) => {
    useEffect(() => {
        getCurrentProfile();
        getAllCompanies();
    }, [getCurrentProfile, getAllCompanies]);
    const search = window.location.search;
    const company = companies.find(c => c._id === search.slice(1));
    return (
        <Fragment>
            {/* no profile created yet */}
            {!profile && !loading && <Redirect to={redirectLink} />}
            {profile && !loading && (
                <Fragment>
                    <MainNav />
                    <section className='dashboard'>
                        <DashboardNav />
                        <main id='main' className='new-invoice'>
                            <h2 className='sr-only'>Invoice Settings</h2>
                            {!company && search && (
                                <Redirect to={`dashboard/company/${search}`} />
                            )}
                            {!company && !search && <InvoiceSelectCompany />}
                            {company && search && (
                                <Fragment>
                                    <InvoiceNav />
                                    <InvoiceDocViewer />
                                </Fragment>
                            )}
                        </main>
                    </section>
                </Fragment>
            )}
        </Fragment>
    );
};

NewInvoice.propTypes = {
    profile: PropTypes.object.isRequired,
    companies: PropTypes.array.isRequired,
    redirectLink: PropTypes.string.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getAllCompanies: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    companies: state.companies.companies,
    redirectLink: state.global.redirectLink
});
export default connect(mapStateToProps, { getCurrentProfile, getAllCompanies })(
    NewInvoice
);
