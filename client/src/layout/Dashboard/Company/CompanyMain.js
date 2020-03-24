import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CompanyNav from './CompanyNav';
import CompanyDetails from './CompanyDetails';
import CompanyForm from '../../../components/forms/CompanyForm';

const CompanyMain = ({ currentNavLink }) => {
    return (
        <main id='main'>
            <h2 className='sr-only'>Company's Settings</h2>
            <CompanyNav />
            {currentNavLink === 'details' && <CompanyDetails />}
            {currentNavLink === 'update' && (
                <section className='dashboard__section'>
                    <h3 className='sr-only'>Update Company</h3>
                    <CompanyForm update />
                </section>
            )}
        </main>
    );
};

CompanyMain.propTypes = {
    currentNavLink: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
    currentNavLink: state.company.currentNavLink
});
export default connect(mapStateToProps)(CompanyMain);
