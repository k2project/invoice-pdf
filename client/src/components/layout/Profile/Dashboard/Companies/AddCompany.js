import React from 'react';
import PropTypes from 'prop-types';
import CompanyForm from './CompanyForm';
import { connect } from 'react-redux';

const AddCompany = ({ companyToUpdate }) => {
    return (
        <section className='add-company'>
            <div className='section__heading'>
                <h2 className='heading heading--sml' id='add-company-form'>
                    {companyToUpdate ? 'Update ' : 'Add a new '} company form.
                </h2>
            </div>
            <div className='section__body'>
                <CompanyForm />
            </div>
        </section>
    );
};

AddCompany.propTypes = {
    dashboard: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    companyToUpdate: state.dashboard.companyToUpdate
});
export default connect(mapStateToProps)(AddCompany);
